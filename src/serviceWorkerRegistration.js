export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/custom-service-worker.js")
        .then((registration) => {
          console.log("Service Worker enregistré avec succès : ", registration);
        })
        .catch((error) => {
          console.log("Échec de l'enregistrement du Service Worker : ", error);
        });
    });
  }
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
