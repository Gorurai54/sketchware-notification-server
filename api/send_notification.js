export default function handler(req, res) {
    if (req.method === 'POST') {
        const { title, message } = req.body;

        console.log("Notification Received:", title, message);

        res.status(200).json({ success: true, title, message });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
