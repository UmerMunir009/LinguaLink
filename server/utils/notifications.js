const admin = require("../config/firebaseAdmin");

async function sendNotificationToUser(token, title, body) {
  if (!token) throw new Error("FCM token is required");

  const message = {
    notification: { title, body },
    token,
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
