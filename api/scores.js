export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

  const attempts = [];

  const tryFetch = async (url, opts = {}) => {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);
    try {
      const r = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(t);
      if (r.ok) return await r.json();
      attempts.push(`${url} → ${r.status}`);
    } catch (e) {
      clearTimeout(t);
      attempts.push(`${url} → ${e.message}`);
    }
    return null;
  };

  // Try 1: ESPN PGA scoreboard (no event ID needed — picks up active tournament)
  const d1 = await tryFetch("https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard");
  if (d1?.events?.length) return res.status(200).json({ source: "espn", ...d1 });

  // Try 2: ESPN with specific event ID
  const d2 = await tryFetch("https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?event=401811941");
  if (d2?.events?.length) return res.status(200).json({ source: "espn", ...d2 });

  // Try 3: Masters.com official JSON feed
  const d3 = await tryFetch("https://www.masters.com/en_US/scores/feeds/2026/scores.json", {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
  });
  if (d3) return res.status(200).json({ source: "masters", data: d3 });

  // All failed
  return res.status(500).json({ error: "All sources failed", attempts });
}
