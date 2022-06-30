import url from 'url';
import { Router } from 'express';
import needle from 'needle';
import apicache from 'apicache';

const API_URL = process.env.API_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const cache = apicache.middleware;

const router = Router();

router.get('/', cache('2 minutes'), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
      aqi: 'no',
    });
    const apiRes = await needle('get', `${API_URL}?${params}`);
    const weatherInfo = apiRes.body;
    res.status(200).json({ weatherInfo, message: 'ok' });
  } catch (e) {
    res.status(500).json({ e });
  }
});

export default router;
