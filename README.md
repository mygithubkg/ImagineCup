# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# ImagineCup

## Demo Mode

**LivingHarvest** now supports a demo/guest mode that allows users to explore the application without authentication!

### Features:
- **No Authentication Required**: Users can click "Try Demo Version (Guest)" on the login page to access the app instantly
- **Full Functionality**: Demo users have access to all features including:
  - Plant disease scanning
  - Dashboard with weather and alerts
  - Scan history (stored locally in browser)
  - All UI features and navigation
- **Visual Indicators**: Demo users see a prominent yellow banner on Dashboard and History pages indicating they're in demo mode
- **Easy Upgrade Path**: Demo banners include a "Sign Up" button to encourage users to create a permanent account

### How It Works:
1. On the login page, click the **"Try Demo Version (Guest)"** button
2. The app stores a guest user profile in localStorage with:
   - `type: 'guest'`
   - `name: 'Demo User'`
   - Demo authentication token
3. The `ProtectedRoute` component allows access for both authenticated users and demo users
4. Demo users can use all features, but their data is only stored locally in the browser

### Implementation Details:
- **Files Modified**:
  - `src/components/ProtectedRoute.jsx` - Updated to allow demo users
  - `src/pages/LoginPage.jsx` - Enhanced guest mode setup with demo token
  - `src/pages/Dashboard.jsx` - Added demo mode banner
  - `src/pages/HistoryPage.jsx` - Added demo mode banner
- **User Data Structure** for Demo:
  ```json
  {
    "type": "guest",
    "name": "Demo User",
    "email": "demo@livingharvest.app"
  }
  ```

### Benefits:
- Lower barrier to entry for new users
- Users can try the app before committing to registration
- Maintains security for authenticated users
- Encourages conversion to registered accounts

