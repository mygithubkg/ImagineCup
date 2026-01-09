import { BlobServiceClient } from '@azure/storage-blob';

// Azure Storage Configuration
const STORAGE_ACCOUNT = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT;
const SAS_TOKEN = import.meta.env.VITE_AZURE_SAS_TOKEN;
const CONTAINER_NAME = 'crop-images'; // Your container name for uploaded images
const API_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Uploads an image to Azure Blob Storage
 * @param {string} imageDataUrl - Base64 data URL of the image
 * @param {string} userId - User identifier (email or ID)
 * @returns {Promise<Object>} Upload result with blob URL and filename
 */
export async function uploadImageToBlob(imageDataUrl, userId) {
  try {
    // Convert data URL to Blob
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${userId.replace(/[@.]/g, '_')}_${timestamp}.jpg`;
    
    // Create blob service client using SAS token
    const blobServiceClient = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT}.blob.core.windows.net?${SAS_TOKEN}`
    );
    
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);
    const blockBlobClient = containerClient.getBlockBlobClient(filename);
    
    // Upload with metadata
    await blockBlobClient.uploadData(blob, {
      blobHTTPHeaders: { 
        blobContentType: 'image/jpeg' 
      },
      metadata: {
        userId: userId,
        uploadTime: new Date().toISOString(),
        source: 'agri-eye-scanner'
      }
    });
    
    console.log(`✅ Image uploaded successfully: ${filename}`);
    
    return {
      success: true,
      blobUrl: blockBlobClient.url,
      filename: filename
    };
  } catch (error) {
    console.error('❌ Blob upload error:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
}

/**
 * Polls Azure Function to get analysis results
 * @param {string} filename - The filename to check for results
 * @returns {Promise<Object>} Analysis result data
 */
export async function getAnalysisResult(filename) {
  try {
    const response = await fetch(`${API_URL}/getAnalysis`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ filename })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('❌ Get analysis error:', error);
    throw new Error(`Failed to retrieve analysis: ${error.message}`);
  }
}

/**
 * Checks if Azure Storage is properly configured
 * @returns {boolean} True if configuration is valid
 */
export function isAzureConfigured() {
  return !!(STORAGE_ACCOUNT && SAS_TOKEN && API_URL);
}

/**
 * Gets configuration status for debugging
 * @returns {Object} Configuration status
 */
export function getConfigStatus() {
  return {
    hasStorageAccount: !!STORAGE_ACCOUNT,
    hasSasToken: !!SAS_TOKEN,
    hasApiUrl: !!API_URL,
    storageAccount: STORAGE_ACCOUNT || 'NOT_SET',
    apiUrl: API_URL || 'NOT_SET'
  };
}
