if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>a(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(i(...e),t)))}}define(["./workbox-4d767a27"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/V8LB5c9i-WsHnItleq9Mt/_buildManifest.js",revision:"fee116973e41bcfad0d3cb679c8c42ac"},{url:"/_next/static/V8LB5c9i-WsHnItleq9Mt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/framework-64ad27b21261a9ce.js",revision:"64ad27b21261a9ce"},{url:"/_next/static/chunks/main-8e2b1acf6870436f.js",revision:"8e2b1acf6870436f"},{url:"/_next/static/chunks/pages/Termes-cee46dfe5dc293c9.js",revision:"cee46dfe5dc293c9"},{url:"/_next/static/chunks/pages/_app-f4760c5fd0839f82.js",revision:"f4760c5fd0839f82"},{url:"/_next/static/chunks/pages/_error-77823ddac6993d35.js",revision:"77823ddac6993d35"},{url:"/_next/static/chunks/pages/achievements-4b1f9e90a9060812.js",revision:"4b1f9e90a9060812"},{url:"/_next/static/chunks/pages/admin-bcc87a89a0dd77ef.js",revision:"bcc87a89a0dd77ef"},{url:"/_next/static/chunks/pages/index-55fd3145cbe5aa7b.js",revision:"55fd3145cbe5aa7b"},{url:"/_next/static/chunks/pages/language/%5BlanguageId%5D/stages-0c6829728a52e0b6.js",revision:"0c6829728a52e0b6"},{url:"/_next/static/chunks/pages/language/%5BlanguageId%5D/stages/%5BstageId%5D/play-d1d546dcf7ca057c.js",revision:"d1d546dcf7ca057c"},{url:"/_next/static/chunks/pages/layout-77d940e8f5b76902.js",revision:"77d940e8f5b76902"},{url:"/_next/static/chunks/pages/login-c4555f41a6f729e5.js",revision:"c4555f41a6f729e5"},{url:"/_next/static/chunks/pages/profile-f1292b2b7285d923.js",revision:"f1292b2b7285d923"},{url:"/_next/static/chunks/pages/signup-e139e725735e3eb8.js",revision:"e139e725735e3eb8"},{url:"/_next/static/chunks/pages/welcome-58ce95a950f2addd.js",revision:"58ce95a950f2addd"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-87b3a303122f2f0d.js",revision:"87b3a303122f2f0d"},{url:"/_next/static/css/c98a5d31e2db9fe6.css",revision:"c98a5d31e2db9fe6"},{url:"/assets/icons/achivement.svg",revision:"7e6e85b74b70a18ef519ce28509eb416"},{url:"/assets/icons/admin.svg",revision:"d21002ed90aad1b63d5010ee00640581"},{url:"/assets/icons/cle.svg",revision:"fe40c19558627dac935d3336a76590f5"},{url:"/assets/icons/closed.svg",revision:"114544a723b72e8b3719123beb15b79b"},{url:"/assets/icons/coeur.svg",revision:"8f5e83b2dbcdb2c008dd1b3a6316ae68"},{url:"/assets/icons/energie.svg",revision:"1d9311b21363dff3538650346688273a"},{url:"/assets/icons/euro.svg",revision:"6bae30503f10ad9c65688ce916be6e42"},{url:"/assets/icons/icon.svg",revision:"5a60e708f19d49b4638f4b8a28e5c6a0"},{url:"/assets/icons/learn.svg",revision:"8d8b921d3a85489204d611bb53bf3979"},{url:"/assets/icons/profile.svg",revision:"b9b62122d34aec8a4b673d80490d438f"},{url:"/assets/icons/remarque.svg",revision:"5e02d97122c7369073eecf5a74d957dc"},{url:"/assets/icons/sante.svg",revision:"b48d1f8422761d2463ecf12195bb7b67"},{url:"/assets/icons/toxique.svg",revision:"6045183a426c8a4e0653994f95fc445b"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/manifest.json",revision:"0334714cdacf4c5951b9a12f1ee9c45d"},{url:"/uploads/1727536223120-doc1.jpg",revision:"31e565e1cc21ffe71f88a0a8e0ad12a6"},{url:"/uploads/1727632530693-doc4.jpg",revision:"0e3177d351df876fd4d31f5b953d4a60"},{url:"/uploads/1727632532928-doc4.jpg",revision:"0e3177d351df876fd4d31f5b953d4a60"},{url:"/uploads/1727632605925-doc2.jpg",revision:"871949189323a01b6387d89267d89714"},{url:"/uploads/1727705868772-doc1.jpg",revision:"31e565e1cc21ffe71f88a0a8e0ad12a6"},{url:"/uploads/1727709475519-Screenshot from 2024-09-29 23-35-57.png",revision:"ffdd68465c30b71850ea91b3b9362511"},{url:"/uploads/1727714550924-Screenshot from 2024-09-30 17-31-06.png",revision:"1d5128b1c98d271cd38d48e5bafb4a72"},{url:"/uploads/1727777741617-doc2.jpg",revision:"871949189323a01b6387d89267d89714"},{url:"/uploads/1727777944682-doc2.jpg",revision:"871949189323a01b6387d89267d89714"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
