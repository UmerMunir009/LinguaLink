const admin = require("../config/firebaseAdmin");

async function sendNotificationToUser(token, title, body) {
  if (!token) throw new Error("FCM token is required");

  //this will send firebase default notification
  // const message = {
  //   notification: { title, body },
  //   token,
  // };

  const message = {
  token,
  notification: { 
    title, 
    body, 
    image: "https://lingua-link-zeta.vercel.app/icon.png" // 🔹 large image
  },
  android: {
    notification: {
      icon: "ic_notification", // small icon
      imageUrl: "https://lingua-link-zeta.vercel.app/icon.png",
    },
  },
  apns: {
    payload: {
      aps: {
        sound: "default",
      },
    },
    fcm_options: {
      image: "https://lingua-link-zeta.vercel.app/icon.png",
    },
  },
};



  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent successfully:", response);
    return response;
  } catch (err) {
    console.error("Error sending notification:", err);
    throw err;
  }
}

module.exports = sendNotificationToUser;
