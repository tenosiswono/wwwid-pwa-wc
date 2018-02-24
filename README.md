## Vanilla Webcomponent WWWID PWA Example

See this application live at: https://idpwa-wc.firebaseapp.com

This is an example of a PWA built using Vanilla Webcomponent, Webpack, ~~Redux~~ and some other modules for [WWWID Performance Challenge](https://medium.com/wwwid/tantangan-web-developer-untuk-membuat-aplikasi-web-bisa-digunakan-kurang-dari-5-detik-70bb7431741d)

Made with _love_ 💔


## Installation

1. Install yarn
    * https://yarnpkg.com/en/docs/install
2. Install firebase tools
    * npm install -g firebase-tools
3. Install Yarn Dependencies
    * yarn install
4. Deploy Firebase function
    * firebase deploy
5. Run Locally
    * yarn start (chrome only)

## Features

- Webcomponent with es6 modules including the polyfill
- ~~Redux for state management~~
- ~~Redux thunk for async fetch~~
- Lightweight unfetch for fetch polyfill
- Intersection Observer API for lazy loading image not in viewport
- Firebase function for API manipulation through RSS feeds
- Firebase preload setting for server push resources
- Workbox to generate the service worker
- Lot of bugs

## Performance Score

Tested with [www.webpagetest.org](https://www.webpagetest.org/easy.php) with `Mobile Slow 3G` and `Run Lighthouse Audit` enable.

From: Dulles, VA - Moto G4 - Chrome - 3GSlow

2/25/2018, 2:26:33 AM GMT+7

Score Link: [score](https://www.webpagetest.org/result/180224_GY_04331286bd7e24239eb54e6e0b1e31de/)

Lighthouse Link: [lighthouse](https://www.webpagetest.org/lighthouse.php?test=180224_GY_04331286bd7e24239eb54e6e0b1e31de&run=1)

Lighthouse First meaningful paint: 1,940 ms


Lighthouse First Interactive (beta): 3,430 ms


Lighthouse PWA Score: 91/100 (webpagetest pwa score seems to be broken the https redirect [#2363](https://github.com/GoogleChrome/lighthouse/issues/2363))

