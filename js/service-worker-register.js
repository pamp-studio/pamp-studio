var serviceWorkerVersion = serviceWorkerVersion ?? 0;

if ('serviceWorker' in navigator) {
    var swURL = "/service-worker.js?"+serviceWorkerVersion;
    function register() {
            navigator.serviceWorker.register('swURL').then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    };
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    if (registrations.length) {
                registrations.forEach(function(reg, i) {
                    if (reg.active.scriptURL.indexOf(swURL) !== -1) {
                            reg.unregister().then(function(bla) {
                                    if(i==registrations.length-1){
                                            register();
                                            location.reload(); 
                                    }
                            });
                        }
                });
            } else { register(); }
            }).catch(function(err) {
                console.log('Service Worker unregistration failed: ', err);
            });
};