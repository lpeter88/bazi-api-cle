export default function handler(req, res) {
  if (req.method === 'POST') {
    const { datetime, timezone } = req.body;
    res.status(200).json({ datetime, timezone, message: "API works!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
