const workboxBuild = require('workbox-build');

workboxBuild.generateSW({
  globDirectory: './build/',
  globPatterns: ['**\/*.{html,js,css}'],
  globIgnores: ['**/sw.js'],
  swDest: './build/sw.js',
  navigateFallback: '/',
  templatedUrls: {
    '/': ['index.html']
  },
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
      handler: 'cacheFirst',
      options: {
        cacheName: 'image',
        expiration: {
          maxEntries: 10,
        },
      },
    },
    {
      urlPattern: /\bapi\b$/,
      handler: 'networkFirst',
      options: {
        cacheName: 'api',
        expiration: {
          maxEntries: 20,
        },
      },
    },
    {
      urlPattern: /^https:\/\/idpwa-wc.firebaseapp.com\/api.*/ ,
      handler: 'networkFirst',
      options: {
        cacheName: 'api',
        expiration: {
          maxEntries: 20,
        },
      },
    },
  ],
})
.then(() => {
  console.log('Service worker generated.');
});
