import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, deleteToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAYcwN2iEQgBvCQryQpH1_Encyum7YT444",
  authDomain: "full-stack-projects-54681.firebaseapp.com",
  projectId: "full-stack-projects-54681",
  storageBucket: "full-stack-projects-54681.firebasestorage.app",
  messagingSenderId: "823346609695",
  appId: "1:823346609695:web:67d3f4bacd0b3211ec1f2a",
  measurementId: "G-6C7W27SY6S",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    await deleteToken(messaging);

    const token = await getToken(messaging, {
      vapidKey: "BIfcLzPjUn8DvBsEo4ZaOr6BXFtHTeZC7ntkDZOrr57GUYts8ZjtI-vubdFv4S-7dHdQvsjTowL_Vu5PXhhfz3k",
      serviceWorkerRegistration: registration,
    });

    console.log("Fresh FCM Token:", token);
    return token;
  } catch (err) {
    console.error("Error while refreshing token: ", err);
    return null;
  }
};

