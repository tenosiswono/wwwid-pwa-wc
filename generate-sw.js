const workboxBuild = require('workbox-build');

workboxBuild.generateSW({
  globDirectory: './build/',
  globPatterns: ['**\/*.{html,js,css}'],
  globIgnores: ['**/sw.js'],
  swDest: './build/sw.js',
  navigateFallback: '/',
  templatedUrls: {
    '/': ['index.html']
  }
})
.then(() => {
  console.log('Service worker generated.');
});
