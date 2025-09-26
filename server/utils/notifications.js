const admin = require("../config/firebaseAdmin")

async function sendNotificationToUser(token, title, body) {
  if (!token) throw new Error("FCM token is required")

  const message = {
    token,
    notification: {
      title,
      body,
    },
    webpush: {
      notification: {
        icon: "/icon.png",
        badge: "/icon.png",
        requireInteraction: false,
        tag: "lingua-link-notification",
      },
    },
    android: {
      notification: {
        icon: "ic_notification",
      },
    },
    apns: {
      payload: {
        aps: {
          sound: "default",
        },
      },
    },
  }

  try {
    const response = await admin.messaging().send(message)
    console.log("Notification sent successfully:", response)
    return response
  } catch (err) {
    console.error("Error sending notification:", err)
    throw err
  }
}

module.exports = sendNotificationToUser
