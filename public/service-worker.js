

// Service Worker install event
self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

// Service Worker activate event
self.addEventListener('activate', (event) => {
    console.log('Service worker activated');
});

