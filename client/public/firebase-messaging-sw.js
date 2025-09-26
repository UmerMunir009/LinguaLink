importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

const firebase = self.firebase;

const firebaseConfig = {
  apiKey: "AIzaSyAYcwN2iEQgBvCQryQpH1_Encyum7YT444",
  authDomain: "full-stack-projects-54681.firebaseapp.com",
  projectId: "full-stack-projects-54681",
  storageBucket: "full-stack-projects-54681.firebasestorage.app",
  messagingSenderId: "823346609695",
  appId: "1:823346609695:web:67d3f4bacd0b3211ec1f2a",
  measurementId: "G-6C7W27SY6S",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message: ", payload);

  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon.png",
    badge: "/icon.png",
    // image: payload.notification.image || "/icon.png",
    requireInteraction: false,
    silent: false,
    tag: "lingua-link-notification",
    data: payload.data || {},
  };

  self.registration.showNotification(
    payload.notification.title,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("[v0] Notification clicked:", event)

  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("lingua-link-zeta.vercel.app") && "focus" in client) {
          return client.focus()
        }
      }

      if (clients.openWindow) {
        return clients.openWindow("https://lingua-link-zeta.vercel.app")
      }
    }),
  )
})
