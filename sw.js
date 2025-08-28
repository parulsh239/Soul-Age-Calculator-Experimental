const CACHE_NAME = 'soul-age-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './privacy.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// FAQ functionality
function toggleFaq(questionElement) {
    const answer = questionElement.nextElementSibling;
    const toggle = questionElement.querySelector('.faq-toggle');
    
    if (answer.classList.contains('show')) {
        answer.classList.remove('show');
        toggle.classList.remove('rotated');
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
            openAnswer.classList.remove('show');
            openAnswer.previousElementSibling.querySelector('.faq-toggle').classList.remove('rotated');
        });
        
        // Open this FAQ
        answer.classList.add('show');
        toggle.classList.add('rotated');
    }
}
