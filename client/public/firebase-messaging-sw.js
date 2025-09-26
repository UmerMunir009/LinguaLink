importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyAYcwN2iEQgBvCQryQpH1_Encyum7YT444",
  authDomain: "full-stack-projects-54681.firebaseapp.com",
  projectId: "full-stack-projects-54681",
  storageBucket: "full-stack-projects-54681.firebasestorage.app",
  messagingSenderId: "823346609695",
  appId: "1:823346609695:web:67d3f4bacd0b3211ec1f2a",
  measurementId: "G-6C7W27SY6S",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();



messaging.onBackgroundMessage((payload) => {
  console.log("📩 Received background message: ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png", 
  });
});