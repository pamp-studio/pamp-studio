var cacheHistory = ['v0','v0.01','v0.02'];
var cacheName = 'v0.03'
var urlsToCache = [
  'js/figlet.js',
  'js/ASCIILogoGenerator.js',
  'js/script.js',
  'js/moireCanvas.js',
  'media/icons/GitHub-Mark.png'
].concat([
  "fonts/3D Diagonal.flf",
  "fonts/3D-ASCII.flf",
  "fonts/3x5.flf",
  "fonts/5 Line Oblique.flf",
  "fonts/Alpha.flf",
  "fonts/Alphabet.flf",
  "fonts/AMC AAA01.flf",
  "fonts/AMC Razor.flf",
  "fonts/AMC Untitled.flf",
  "fonts/ANSI Regular.flf",
  "fonts/ANSI Shadow.flf",
  "fonts/ASCII New Roman.flf",
  "fonts/Banner.flf",
  "fonts/Banner3.flf",
  "fonts/Banner4.flf",
  "fonts/Bell.flf",
  "fonts/Benjamin.flf",
  "fonts/Big Chief.flf",
  "fonts/Big Money-ne.flf",
  "fonts/Big Money-nw.flf",
  "fonts/Big Money-se.flf",
  "fonts/Big Money-sw.flf",
  "fonts/Big.flf",
  "fonts/Bigfig.flf",
  "fonts/Block.flf",
  "fonts/Bloody.flf",
  "fonts/Bolger.flf",
  "fonts/Bright.flf",
  "fonts/Broadway KB.flf",
  "fonts/Broadway.flf",
  "fonts/Bubble.flf",
  "fonts/Bulbhead.flf",
  "fonts/Caligraphy.flf",
  "fonts/Caligraphy2.flf",
  "fonts/Calvin S.flf",
  "fonts/Catwalk.flf",
  "fonts/Chiseled.flf",
  "fonts/Chunky.flf",
  "fonts/Coinstak.flf",
  "fonts/Cola.flf",
  "fonts/Colossal.flf",
  "fonts/Computer.flf",
  "fonts/Contessa.flf",
  "fonts/Crawford.flf",
  "fonts/Crawford2.flf",
  "fonts/Crazy.flf",
  "fonts/Cricket.flf",
  "fonts/Cursive.flf",
  "fonts/Cygnet.flf",
  "fonts/Def Leppard.flf",
  "fonts/Delta Corps Priest 1.flf",
  "fonts/Diamond.flf",
  "fonts/Diet Cola.flf",
  "fonts/Digital.flf",
  "fonts/Doh.flf",
  "fonts/Doom.flf",
  "fonts/Dot Matrix.flf",
  "fonts/Double.flf",
  "fonts/Dr Pepper.flf",
  "fonts/Electronic.flf",
  "fonts/Elite.flf",
  "fonts/Epic.flf",
  "fonts/Fender.flf",
  "fonts/Fire Font-k.flf",
  "fonts/Fire Font-s.flf",
  "fonts/Flower Power.flf",
  "fonts/Four Tops.flf",
  "fonts/Fraktur.flf",
  "fonts/Fuzzy.flf",
  "fonts/Georgi16.flf",
  "fonts/Georgia11.flf",
  "fonts/Ghost.flf",
  "fonts/Ghoulish.flf",
  "fonts/Glenyn.flf",
  "fonts/Goofy.flf",
  "fonts/Gothic.flf",
  "fonts/Graceful.flf",
  "fonts/Graffiti.flf",
  "fonts/Heart Left.flf",
  "fonts/Heart Right.flf",
  "fonts/Henry 3D.flf",
  "fonts/Hollywood.flf",
  "fonts/Impossible.flf",
  "fonts/Invita.flf",
  "fonts/Isometric1.flf",
  "fonts/Isometric2.flf",
  "fonts/Isometric3.flf",
  "fonts/Isometric4.flf",
  "fonts/Italic.flf",
  "fonts/Ivrit.flf",
  "fonts/Jacky.flf",
  "fonts/JS Block Letters.flf",
  "fonts/JS Capital Curves.flf",
  "fonts/JS Cursive.flf",
  "fonts/JS Stick Letters.flf",
  "fonts/Keyboard.flf",
  "fonts/Knob.flf",
  "fonts/Larry 3D.flf",
  "fonts/LCD.flf",
  "fonts/Lean.flf",
  "fonts/Letters.flf",
  "fonts/Line Blocks.flf",
  "fonts/Lockergnome.flf",
  "fonts/Merlin1.flf",
  "fonts/Modular.flf",
  "fonts/Ogre.flf",
  "fonts/Slant Relief.flf",
  "fonts/Slant.flf",
  "fonts/Small Isometric1.flf",
  "fonts/Small Slant.flf",
  "fonts/Soft.flf",
  "fonts/Standard.flf",
  "fonts/Star Wars.flf",
  "fonts/Sub-Zero.flf",
  "fonts/Swamp Land.flf",
  "fonts/Sweet.flf",
  "fonts/The Edge.flf",
  "fonts/THIS.flf",
  "fonts/Train.flf",
  "fonts/Twisted.flf"
]) 

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) { 
          return response;
        }
        return fetch(event.request).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            var responseToCache = response.clone();
            caches.open(cacheName)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheHistory.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});