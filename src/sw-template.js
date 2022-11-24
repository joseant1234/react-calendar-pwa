// https://developer.chrome.com/docs/workbox/modules/workbox-sw/
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

workbox.loadModule('workbox-background-sync');

// durante el proceso de instalación revisa el directorio en cual está e instala todo lo q está en el precache y en workbox.config - globPatterns
// 'el WB_MANIFEST' es para que el worbox tenga que ir a buscar para leer los archivos que se encuentran ahi
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies
const { BackgroundSyncPlugin } = workbox.backgroundSync;

registerRoute(
    new RegExp('http://localhost:3001/api/auth/renew'),
    new NetworkFirst()
)

registerRoute(
    new RegExp('http://localhost:3001/api/events'),
    new NetworkFirst()
)

// cuando venga una ruta que cumpla la condición que se pone en regexp, se aplica una estrategia
// si está en CacheFirst primero lo lee del cache sino de internet
// no se hace el precache de las rutas en registerRoute, esa solo se ponen en cache cuando se solicitan
// lo va a poner en cache storage /workbox-runtime...
registerRoute(
    new RegExp('https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'),
    new CacheFirst()
)

registerRoute(
    new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css'),
    new CacheFirst()
)

// posteos offline
// todo lo q no sea metodo GET solo funciona con network only, ya ue varia con la infomacion que lleva, por ejemplo un post lleva un body distinto al de otro request a pesar q es el mismo endpoint

const bgSyncPlugin = new BackgroundSyncPlugin('posteos-offline', {
    maxRetentionTime: 24 * 60 // máximo guarda 1 día
})
registerRoute(
    new RegExp('http://localhost:3001/api/events'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
)

registerRoute(
    new RegExp('http://localhost:3001/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'DELETE'
)

registerRoute(
    new RegExp('http://localhost:3001/api/events/'),
    new NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'PUT'
)
