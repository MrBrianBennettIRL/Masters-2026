export default async function handler(req, res) {
  const HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json",
    "Origin": "https://www.espn.com",
    "Referer": "https://www.espn.com/golf/leaderboard",
  };

  const URLS = [
    "https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?event=401811941",
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard",
  ];

  for (const url of URLS) {
    try {
      const response = await fetch(url, { headers: HEADERS });
      if (response.ok) {
        const data = await response.json();
        res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
        res.setHeader("Access-Control-Allow-Origin", "*");
        return res.status(200).json(data);
      }
    } catch (e) {
      continue;
    }
  }

  res.status(500).json({ error: "Could not fetch from ESPN after all attempts" });
}
