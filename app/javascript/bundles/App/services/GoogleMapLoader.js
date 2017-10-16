
export default function LoadGoogleMap() {
    // Asynchronously load the Google Maps script, passing in the callback reference
    return loadGoogleMapJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyCW2E6DiG06OMQH7ENDVLJVb1uwQXuWmaA&libraries=places&callback=_$_google_map_initialize_$_')
}

let loadPromise = null;

function loadGoogleMapJS(src) {
    if (loadPromise) {
        return loadPromise;
    }

    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
    loadPromise = new Promise((resolve, reject) => {

        if (window.google && window.google.maps) {
            resolve(window.google.maps);
            return;
        }

        if (typeof window._$_google_map_initialize_$_ !== 'undefined') {
            reject(new Error('google map initialization error'));
        }

        script.onerror = () => {
            reject(new Error('google map initialization error'));
        };

        window._$_google_map_initialize_$_ = () => {
            delete window._$_google_map_initialize_$_;
            resolve(window.google.maps);
        };
    });
    return loadPromise;
}