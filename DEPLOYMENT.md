# GitHub Pages Deployment Guide

This guide explains how to deploy your Firebase-powered Branch Scheduler to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Firebase project configured
- Node.js and npm installed
- Repository pushed to GitHub

## 🚀 Deployment Steps

### 1. Configure Vite for GitHub Pages

Update your `vite.config.js` to include the correct base path:

```javascript
export default defineConfig({
  base: '/your-repo-name/', // Replace with your actual repository name
  // ... rest of config
})
```

### 2. Add Deployment Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 4. Create GitHub Workflow (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 5. Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select "Deploy from a branch"
4. Choose `gh-pages` branch and `/ (root)` folder
5. Click Save

### 6. Update Firebase Configuration

Make sure your Firebase project allows your GitHub Pages domain:

1. Go to Firebase Console
2. Select your project
3. Navigate to Authentication → Settings → Authorized domains
4. Add your GitHub Pages URL: `username.github.io`

### 7. Deploy

Push your changes to the main branch:

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

Or deploy manually:

```bash
npm run deploy
```

## 🔧 Additional Configuration

### Custom Domain (Optional)

If you have a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Add your custom domain to Firebase authorized domains

### Environment Variables

For production environment variables, use GitHub Secrets:

1. Go to repository Settings → Secrets and variables → Actions
2. Add your environment variables as secrets
3. Reference them in your workflow file

### 404 Handling for SPAs

GitHub Pages doesn't handle client-side routing by default. Your `index.html` file already includes proper meta redirects, but you may want to add a `404.html` file:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Branch Scheduler</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

## 📊 Monitoring and Analytics

### GitHub Pages Status

Monitor your deployment status at:
`https://github.com/username/repository/deployments`

### Firebase Analytics

Your Firebase Analytics will automatically track page views on your GitHub Pages site.

### Build Status

Add a build status badge to your README:

```markdown
[![Deploy Status](https://github.com/username/repository/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/username/repository/actions)
```

## 🔍 Troubleshooting

### Common Issues

1. **Build fails**: Check the Actions tab for error details
2. **404 errors**: Ensure your base path in vite.config.js matches your repo name
3. **Firebase errors**: Verify your domain is in Firebase authorized domains
4. **Assets not loading**: Check that asset paths are correct for your base path

### Debug Steps

1. Check GitHub Actions logs
2. Verify Firebase configuration
3. Test build locally: `npm run build && npm run preview`
4. Check browser console for errors

## 🔄 Updating Your Site

Your site will automatically update when you push to the main branch. Manual deployment:

```bash
npm run deploy
```

## 🛡️ Security Considerations

- Never commit your Firebase private keys
- Use GitHub Secrets for sensitive configuration
- Regularly update dependencies
- Monitor Firebase usage and billing

## 🎯 Performance Tips

- Enable Firebase CDN
- Optimize images and assets
- Use Firebase Hosting instead of GitHub Pages for better performance (optional)
- Implement service worker for offline support

Your Branch Scheduler is now ready for production on GitHub Pages! 🚀
