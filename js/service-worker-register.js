var serviceWorkerVersion = window.serviceWorkerVersion !== undefined ? window.serviceWorkerVersion : 0;

function register(SW) {
    navigator.serviceWorker.register(SW).then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope, '. version ', serviceWorkerVersion);
    }, function(err) {
        console.log('ServiceWorker '+serviceWorkerVersion+' registration failed: ', err);
    });
}

if ('serviceWorker' in navigator) {
    var SW = "/service-worker.js?"+serviceWorkerVersion;
            navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    if (registrations.length) {
                registrations.forEach(function(reg, i) {
                    if (reg.active.scriptURL.indexOf(SW) === -1) {
                            reg.unregister().then(function() {
                                    if(i==registrations.length-1){
                                            register(SW);
                                            location.reload(); 
                                    }
                            });
                        }
                });
            } else { register(SW); }
            }).catch(function(err) {
                console.log('Removing old registrations failed: ', err);
            });
}