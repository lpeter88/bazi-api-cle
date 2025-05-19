// api/bazi.js
import { getBazi } from '../lib/bazi';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { datetime, timezone } = req.body;

  try {
    const result = getBazi(datetime, timezone);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to calculate Bazi' });
  }
}
