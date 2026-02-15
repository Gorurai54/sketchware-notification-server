import admin from "firebase-admin";
import serviceAccount from "../../firebaseServiceAccount.json"; // path correct

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { topic, title, body, image } = req.body;

    if (!topic || !title || !body) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const message = {
      topic: topic,
      notification: {
        title: title,
        body: body,
        image: image || undefined,
      },
      android: {
        priority: "high",
        notification: { channel_id: "channelID" },
      },
    };

    try {
      const response = await admin.messaging().send(message);
      res.status(200).json({ success: true, messageId: response });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
