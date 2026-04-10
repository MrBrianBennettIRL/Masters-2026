import { useState, useEffect, useCallback } from "react";

const MC = 100;

const RAW = [
  [1,"Adam 'Pirate' Shapiro","Xander Schauffele","Justin Thomas","Bryson DeChambeau","Patrick Cantlay","Brian Harman","Jordan Spieth","Brooks Koepka"],
  [2,"Alastair 'Baloney' Loney","Matt Fitzpatrick","Ludvig Aberg","Jon Rahm","Nicolai Hojgaard","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [3,"Alex 'Dravid' Wall","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Nicolai Hojgaard","Jake Knapp","Adam Scott","Haotong Li"],
  [4,"Andrew 'GayJay' Jeffree","Scottie Scheffler","Ludvig Aberg","Jon Rahm","Shane Lowry","Corey Conners","Jordan Spieth","Brooks Koepka"],
  [5,"Andrew 'Bullet Baxter' Moffat","Rory McIlroy","Hideki Matsuyama","Bryson DeChambeau","Tyrrell Hatton","Jason Day","Adam Scott","Brooks Koepka"],
  [6,"Andy 'Beaker' Perkins","Justin Rose","Ludvig Aberg","Patrick Reed","Tyrrell Hatton","Jason Day","Adam Scott","Haotong Li"],
  [7,"Anthony 'The Big V' Vernuccio","Scottie Scheffler","Patrick Reed","Jon Rahm","Shane Lowry","Jake Knapp","Jordan Spieth","Tom McKibbin"],
  [8,"Barry 'Peter' O'Hanrahan","Xander Schauffele","Ludvig Aberg","Jon Rahm","Nicolai Hojgaard","Jake Knapp","Sungjae Im","Brooks Koepka"],
  [9,"Ben 'Emma' Dale","Scottie Scheffler","Ludvig Aberg","Min Woo Lee","Nicolai Hojgaard","Corey Conners","Michael Kim","Aldrich Potgieter"],
  [10,"Ben 'Lansdown' Hargreaves","Scottie Scheffler","Hideki Matsuyama","Bryson DeChambeau","Jason Day","Adam Scott","Jordan Spieth","Haotong Li"],
  [11,"Ben 'Proper Chopper' Harris","Scottie Scheffler","Ludvig Aberg","Jon Rahm","Kurt Kitayama","Jason Day","Jordan Spieth","Brooks Koepka"],
  [12,"Bill Lafferrandre III","Matt Fitzpatrick","Ludvig Aberg","Bryson DeChambeau","Shane Lowry","Corey Conners","Gary Woodland","Aldrich Potgieter"],
  [13,"Braydon 'Bend it Like' Barcham","Scottie Scheffler","Akshay Bhatia","Min Woo Lee","Nicolai Hojgaard","Jake Knapp","Harry Hall","Aldrich Potgieter"],
  [14,"Brian 'Gordon' Bennett","Cameron Young","Ludvig Aberg","Jon Rahm","Tyrrell Hatton","Ryan Fox","Adam Scott","Wyndham Clark"],
  [15,"Charlie 'Smirnoff' Vodrazka","Tommy Fleetwood","Ludvig Aberg","Bryson DeChambeau","Nicolai Hojgaard","Andrew Novak","Michael Kim","Aldrich Potgieter"],
  [16,"Chris 'Blubba' Watson","Tommy Fleetwood","Jacob Bridgeman","Jon Rahm","Jason Day","Corey Conners","Jordan Spieth","Cameron Smith"],
  [17,"Chris O'Keeffe","Cameron Young","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Corey Conners","Gary Woodland","Brooks Koepka"],
  [18,"Chris 'Don Q' Rodwell","Matt Fitzpatrick","Ludvig Aberg","Jon Rahm","Nicolai Hojgaard","Jake Knapp","Ryo Hisatsune","Cameron Smith"],
  [19,"Colin 'Massage' McCreadie","Tommy Fleetwood","Patrick Reed","Jon Rahm","Shane Lowry","Adam Scott","Rasmus Hojgaard","Brooks Koepka"],
  [20,"Craig 'Katherine' Jenkins","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Marco Penge","Jason Day","Gary Woodland","Aldrich Potgieter"],
  [21,"Daniel 'Austin' Healey","Matt Fitzpatrick","Ludvig Aberg","Jon Rahm","Nicolai Hojgaard","Corey Conners","Adam Scott","Brooks Koepka"],
  [22,"Daniel 'Snake' Martin","Xander Schauffele","Patrick Reed","Jon Rahm","Nicolai Hojgaard","Jake Knapp","Jordan Spieth","Cameron Smith"],
  [23,"Daniel 'Port' Vale","Justin Rose","Robert MacIntyre","Bryson DeChambeau","Patrick Cantlay","Corey Conners","Jordan Spieth","Brooks Koepka"],
  [24,"Danny 'Bin' Grimes","Matt Fitzpatrick","Ludvig Aberg","Patrick Reed","Nicolai Hojgaard","Jason Day","Gary Woodland","Brooks Koepka"],
  [25,"Darren 'Little Plum' Robinson","Matt Fitzpatrick","Jacob Bridgeman","Bryson DeChambeau","Shane Lowry","Brian Harman","Gary Woodland","Tony Finau"],
  [26,"Dave 'Molton' Browne","Scottie Scheffler","Robert MacIntyre","Bryson DeChambeau","Marco Penge","Jake Knapp","Gary Woodland","Aldrich Potgieter"],
  [27,"Dave 'Mmmbop' Hanson","Scottie Scheffler","Sepp Straka","Patrick Reed","Tyrrell Hatton","Ryan Fox","Gary Woodland","Brooks Koepka"],
  [28,"David 'Mob' Barley","Scottie Scheffler","Ludvig Aberg","Patrick Reed","Shane Lowry","Corey Conners","Jordan Spieth","Cameron Smith"],
  [29,"David 'Simon Says' Simonsen","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Jason Day","Corey Conners","Adam Scott","Cameron Smith"],
  [30,"David 'Wayne' Kerr","Cameron Young","Ludvig Aberg","Bryson DeChambeau","Nicolai Hojgaard","Jake Knapp","Sungjae Im","Brooks Koepka"],
  [31,"David 'Elvis' King","Cameron Young","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [32,"Douglas 'Silly' Isles","Cameron Young","Robert MacIntyre","Bryson DeChambeau","Nicolai Hojgaard","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [33,"Emily 'Dogs and' Katz","Rory McIlroy","Ludvig Aberg","Min Woo Lee","Nicolai Hojgaard","Jason Day","Adam Scott","Cameron Smith"],
  [34,"Giap 'Dec' Tjan","Cameron Young","Hideki Matsuyama","Bryson DeChambeau","Shane Lowry","Corey Conners","Gary Woodland","Max Homa"],
  [35,"Harry 'Organ' Gabb","Justin Rose","Patrick Reed","Jon Rahm","Tyrrell Hatton","Jake Knapp","Brooks Koepka","Matt Wallace"],
  [36,"Ian 'Plums' Milne","Scottie Scheffler","Robert MacIntyre","Patrick Reed","Marco Penge","Corey Conners","Jordan Spieth","Brooks Koepka"],
  [37,"James '1DPT' Templeman","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Jake Knapp","Rasmus Hojgaard","Brooks Koepka"],
  [38,"James 'Alan' Partridge","Xander Schauffele","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Corey Conners","Sungjae Im","Brooks Koepka"],
  [39,"James 'Dry Hands' Evans","Rory McIlroy","Ludvig Aberg","Bryson DeChambeau","Aaron Rai","Corey Conners","Adam Scott","Aldrich Potgieter"],
  [40,"James 'Harvito Bandito' Harvey","Matt Fitzpatrick","Ludvig Aberg","Jon Rahm","Shane Lowry","Corey Conners","Adam Scott","Tom McKibbin"],
  [41,"James 'Hillbilly' Kilbee","Justin Rose","Robert MacIntyre","Bryson DeChambeau","Shane Lowry","Gary Woodland","Joaquin Niemann","Tony Finau"],
  [42,"Jamie 'Bubbles' Hamilton","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Shane Lowry","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [43,"Jamie 'The Reverend' Green","Matt Fitzpatrick","Ludvig Aberg","Bryson DeChambeau","Patrick Cantlay","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [44,"Jeanette 'Jimmy' Hennix","Scottie Scheffler","Patrick Reed","Jon Rahm","Nicolai Hojgaard","Max Homa","Jordan Spieth","Brooks Koepka"],
  [45,"Jim 'Steve' McMahon","Tommy Fleetwood","Ludvig Aberg","Bryson DeChambeau","Daniel Berger","Jason Day","Adam Scott","Brooks Koepka"],
  [46,"John 'Balsa' Wood","Rory McIlroy","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Jake Knapp","Gary Woodland","Brooks Koepka"],
  [47,"Jonathan 'Nigel' Spink","Tommy Fleetwood","Ludvig Aberg","Jon Rahm","Tyrrell Hatton","Corey Conners","Harry Hall","Brooks Koepka"],
  [48,"Julien 'Oliver' Reidy","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Shane Lowry","Jason Day","Adam Scott","Cameron Smith"],
  [49,"Justin 'Tally' Price","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Tyrrell Hatton","Corey Conners","Jordan Spieth","Brooks Koepka"],
  [50,"Katy 'Pumpy' Mclean","Matt Fitzpatrick","Robert MacIntyre","Jon Rahm","Marco Penge","Jason Day","Jordan Spieth","Aldrich Potgieter"],
  [51,"Luke 'Duplo' Townsend","Scottie Scheffler","Robert MacIntyre","Jon Rahm","Tyrrell Hatton","Jason Day","Jordan Spieth","Cameron Smith"],
  [52,"Marcus 'Dicky' Davies","Cameron Young","Robert MacIntyre","Patrick Reed","Shane Lowry","Jake Knapp","Adam Scott","Brooks Koepka"],
  [53,"Marcus 'Eric' Barstow","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Jason Day","Corey Conners","Adam Scott","Brooks Koepka"],
  [54,"Mark 'Big Bang' Sheldon","Robert MacIntyre","Patrick Reed","Jon Rahm","Tyrrell Hatton","Rasmus Hojgaard","Sungjae Im","Tom McKibbin"],
  [55,"Mark 'Teflon' Templeman","Matt Fitzpatrick","Ludvig Aberg","Bryson DeChambeau","Daniel Berger","Gary Woodland","Adam Scott","Brooks Koepka"],
  [56,"Matt 'Father' Latino","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Sam Burns","Corey Conners","Harry Hall","Aldrich Potgieter"],
  [57,"Matt 'Smithy' Smith","Collin Morikawa","Ludvig Aberg","Si Woo Kim","Corey Conners","Jordan Spieth","Brooks Koepka","Max Homa"],
  [58,"Matthew 'Beevower' Price","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Tyrrell Hatton","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [59,"Michael '35 million' Carroll","Matt Fitzpatrick","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Jake Knapp","Adam Scott","Cameron Smith"],
  [60,"Michael 'Safe' Havens","Matt Fitzpatrick","Ludvig Aberg","Jon Rahm","Jake Knapp","Joaquin Niemann","Jordan Spieth","Brooks Koepka"],
  [61,"Michael 'Leggy Blond Swede' Khor","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Jason Day","Jake Knapp","Adam Scott","Brooks Koepka"],
  [62,"Michael 'Lobo' Loberman","Xander Schauffele","Ludvig Aberg","Patrick Reed","Nicolai Hojgaard","Adam Scott","Jordan Spieth","Brooks Koepka"],
  [63,"Michael 'Beebs' McGarry","Tommy Fleetwood","Robert MacIntyre","Jon Rahm","Shane Lowry","Jason Day","Brooks Koepka","Max Homa"],
  [64,"Michael 'Pogo' Paterson","Justin Rose","Ludvig Aberg","Bryson DeChambeau","Shane Lowry","Corey Conners","Adam Scott","Thorbjorn Olesen"],
  [65,"Michael 'Shin' Fein","Tommy Fleetwood","Ludvig Aberg","Patrick Reed","Shane Lowry","Jake Knapp","Adam Scott","Brooks Koepka"],
  [66,"Mike 'Moron' Moran","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Shane Lowry","Corey Conners","Gary Woodland","Max Homa"],
  [67,"Nicole 'Grey Goose' Vodrazka","Matt Fitzpatrick","Ludvig Aberg","Patrick Reed","Patrick Cantlay","Jason Day","Jordan Spieth","Max Homa"],
  [68,"Oli Roland-Jones","Matt Fitzpatrick","Hideki Matsuyama","Patrick Reed","Patrick Cantlay","Jason Day","Jordan Spieth","Brooks Koepka"],
  [69,"Oliver 'Naked' Martin","Cameron Young","Robert MacIntyre","Bryson DeChambeau","Nicolai Hojgaard","Jake Knapp","Gary Woodland","Brooks Koepka"],
  [71,"Paul 'Hack Lamb' Hallam","Cameron Young","Ludvig Aberg","Jon Rahm","Tyrrell Hatton","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [72,"Phil 'Billy Bunter' Gennaoui","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Sam Burns","Brian Harman","Jordan Spieth","David Puig"],
  [73,"Remi 'RAR' Tache","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Shane Lowry","Corey Conners","Adam Scott","Brooks Koepka"],
  [74,"Rene 'Cheech &' Chong","Scottie Scheffler","Jacob Bridgeman","Jon Rahm","Tyrrell Hatton","Jake Knapp","Jordan Spieth","Cameron Smith"],
  [75,"Richard 'Porridge' Holloway","Xander Schauffele","Ludvig Aberg","Bryson DeChambeau","Shane Lowry","Corey Conners","Adam Scott","Brooks Koepka"],
  [76,"Richard 'Schlungs' Sexton","Scottie Scheffler","Jon Rahm","Bryson DeChambeau","Marco Penge","Jake Knapp","Brian Campbell","Brooks Koepka"],
  [77,"Richard 'Rocky' Wright","Matt Fitzpatrick","Akshay Bhatia","Bryson DeChambeau","Marco Penge","Jake Knapp","Adam Scott","Brooks Koepka"],
  [78,"Rob 'Glands' Hands","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Jake Knapp","Corey Conners","Jordan Spieth","Brooks Koepka"],
  [79,"Rob 'Nosey' Parker","Scottie Scheffler","Ludvig Aberg","Bryson DeChambeau","Tyrrell Hatton","Jason Day","Gary Woodland","Brooks Koepka"],
  [80,"Ron 'Burgundy' Goding","Xander Schauffele","Bryson DeChambeau","Jon Rahm","Tyrrell Hatton","Jason Day","Adam Scott","Brooks Koepka"],
  [81,"Sean 'The Equaliser' Brennan","Scottie Scheffler","J.J. Spaun","Bryson DeChambeau","Tyrrell Hatton","Corey Conners","Brooks Koepka","Joaquin Niemann"],
  [82,"Simon 'Toasty' French","Xander Schauffele","Bryson DeChambeau","Patrick Reed","Tyrrell Hatton","Corey Conners","Gary Woodland","Zach Johnson"],
  [83,"Simon 'Norman' Harvey","Scottie Scheffler","Ludvig Aberg","Patrick Reed","Patrick Cantlay","Jason Day","Adam Scott","Cameron Smith"],
  [84,"Sohil 'Kung Fu' Pandya","Xander Schauffele","Bryson DeChambeau","Jon Rahm","Shane Lowry","Brian Harman","Tom McKibbin","Cameron Smith"],
  [85,"Stephen 'Button Head' Harcombe","Scottie Scheffler","Robert MacIntyre","Jon Rahm","Tyrrell Hatton","Corey Conners","Adam Scott","Brooks Koepka"],
  [86,"Stephen 'The Pig' Farmer","Scottie Scheffler","Ludvig Aberg","Jon Rahm","Nicolai Hojgaard","Casey Jarvis","Sungjae Im","Brooks Koepka"],
  [87,"Stephen 'Tramps' Begley","Tommy Fleetwood","Ludvig Aberg","Bryson DeChambeau","Patrick Cantlay","Corey Conners","Gary Woodland","Joaquin Niemann"],
  [88,"Steve 'Archie' Bishop","Xander Schauffele","Patrick Reed","Bryson DeChambeau","Nicolai Hojgaard","Jake Knapp","Jordan Spieth","Brooks Koepka"],
  [89,"Steve 'Gone for a' Burton","Scottie Scheffler","Ludvig Aberg","Patrick Reed","Corey Conners","Jordan Spieth","Sungjae Im","Max Homa"],
  [90,"Stuart 'Emmett' Brown","Justin Rose","Ludvig Aberg","Patrick Reed","Shane Lowry","Jake Knapp","Adam Scott","Brooks Koepka"],
  [91,"Tim 'Nadia' Spragg","Justin Rose","Hideki Matsuyama","Min Woo Lee","Marco Penge","Jason Day","Adam Scott","Cameron Smith"],
  [92,"Tiso Faletoese","Patrick Reed","Bryson DeChambeau","Jon Rahm","Corey Conners","Ryan Fox","Sungjae Im","Brooks Koepka"],
  [93,"Todd 'Ronald' McDonald","Scottie Scheffler","Hideki Matsuyama","Jon Rahm","Nicolai Hojgaard","Jake Knapp","Jordan Spieth","Carlos Ortiz"],
  [94,"Tom 'Damage' Sarginson","Scottie Scheffler","Bryson DeChambeau","Jon Rahm","Jake Knapp","Corey Conners","Max Homa","Brooks Koepka"],
  [95,"Tom 'Dodecahedron' Browning","Scottie Scheffler","Hideki Matsuyama","Jon Rahm","Tyrrell Hatton","Corey Conners","Adam Scott","Brooks Koepka"],
  [96,"Tom 'Wobbly' Wheeler","Scottie Scheffler","Jon Rahm","Bryson DeChambeau","Nicolai Hojgaard","Corey Conners","Jordan Spieth","Brooks Koepka"],
  [97,"Tommy 'Hawk' Hawker","Cameron Young","Jacob Bridgeman","Jon Rahm","Nicolai Hojgaard","Jordan Spieth","Gary Woodland","Brooks Koepka"],
  [98,"Tommy 'The Viking' Rathleff","Justin Rose","Ludvig Aberg","Patrick Reed","Nicolai Hojgaard","Adam Scott","Nick Taylor","Brooks Koepka"],
  [99,"Trevor 'Super Trev' Haeger","Matt Fitzpatrick","Hideki Matsuyama","Min Woo Lee","Shane Lowry","Jason Day","Gary Woodland","Aldrich Potgieter"],
  [100,"Will 'Boris' Buck","Justin Rose","Hideki Matsuyama","Jon Rahm","Shane Lowry","Corey Conners","Adam Scott","Brooks Koepka"],
];

const PARTICIPANTS = RAW.map(([id, name, ...picks]) => ({ id, name, picks }));

function norm(n) {
  return n.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z\s.]/g, "").replace(/\s+/g, " ").trim();
}

function fmt(score) {
  if (score === MC) return "MC";
  if (score === null || score === undefined) return "—";
  if (score === 0) return "E";
  return score > 0 ? `+${score}` : `${score}`;
}

function scoreColor(score) {
  if (score === null || score === undefined) return "#6B9E7A";
  if (score === MC) return "#e05c5c";
  if (score < 0) return "#4ade80";
  if (score > 0) return "#f97316";
  return "#F5F0E0";
}

export default function App() {
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [roundInfo, setRoundInfo] = useState("");
  const [countdown, setCountdown] = useState(180);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=JetBrains+Mono:wght@400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  // Reset countdown when scores update
  useEffect(() => {
    if (lastUpdated) setCountdown(180);
  }, [lastUpdated]);

  // Tick countdown every second
  useEffect(() => {
    const tick = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(tick);
  }, []);

  const fetchScores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?event=401811941"
      );
      if (!res.ok) throw new Error(`ESPN returned ${res.status}`);
      const data = await res.json();

      const competition = data.events?.[0]?.competitions?.[0];
      const competitors = competition?.competitors || [];
      if (!competitors.length) throw new Error("No competitors found in ESPN data");

      const period = competition?.status?.period;
      setRoundInfo(period ? `R${period}` : "");

      const map = {};
      competitors.forEach((c, idx) => {
        const name = c.athlete?.displayName || "";
        if (!name) return;
        const statusName = (c.status?.type?.name || "").toUpperCase();
        const scoreStr = c.score || "E";
        const position = idx + 1; // ESPN sorts by leaderboard position

        const isCut = statusName.includes("CUT") || statusName.includes("WITHDRAW") || statusName.includes("DISQUALIF");
        const outsideTop100 = position > 100;

        let score;
        if (isCut || outsideTop100) {
          score = MC;
        } else if (scoreStr === "E" || scoreStr === "--" || scoreStr === "") {
          score = 0;
        } else {
          score = parseInt(scoreStr, 10);
          if (isNaN(score)) score = 0;
        }

        map[norm(name)] = score;
      });

      setScores(map);
      setLastUpdated(new Date());
    } catch (e) {
      setError("Could not fetch scores: " + e.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, 3 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getScore = (name) => {
    const key = norm(name);
    return scores[key] !== undefined ? scores[key] : null;
  };

  const ranked = PARTICIPANTS.map(p => {
    const pickScores = p.picks.map(name => ({ name, score: getScore(name) }));
    const known = pickScores.filter(ps => ps.score !== null);
    const sortedScores = [...known].sort((a, b) => a.score - b.score);
    const best5 = sortedScores.slice(0, 5);
    const total = known.length >= 5 ? best5.reduce((s, x) => s + x.score, 0) : null;
    return { ...p, pickScores, total, best5Names: best5.map(x => norm(x.name)) };
  }).sort((a, b) => {
    if (a.total === null && b.total === null) return 0;
    if (a.total === null) return 1;
    if (b.total === null) return -1;
    return a.total - b.total;
  });

  const withPos = ranked.map((p, i, arr) => {
    if (p.total === null) return { ...p, pos: "—" };
    const first = arr.findIndex(x => x.total === p.total);
    const tied = arr.filter(x => x.total === p.total).length > 1;
    return { ...p, pos: tied ? `T${first + 1}` : `${first + 1}` };
  });

  const hasScores = Object.keys(scores).length > 0;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #071A0F 0%, #0D2B1B 60%, #0A2217 100%)", fontFamily: "'JetBrains Mono', monospace", color: "#F5F0E0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #0B2516 0%, #0F2E1A 100%)", borderBottom: "2px solid #C9A537", padding: "28px 24px 20px", textAlign: "center", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <span style={{ color: "#C9A537", fontSize: 22 }}>⛳</span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 5vw, 36px)", fontWeight: 900, color: "#F5F0E0", margin: 0, letterSpacing: "0.04em" }}>
            MASTERS 2026
          </h1>
          <span style={{ color: "#C9A537", fontSize: 22 }}>⛳</span>
        </div>
        <p style={{ color: "#C9A537", fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 14, margin: "0 0 12px", letterSpacing: "0.08em" }}>
          Augusta National · April 9–12
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {roundInfo && (
            <span style={{ background: "#C9A537", color: "#0D2B1B", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, letterSpacing: "0.1em" }}>
              {roundInfo}
            </span>
          )}
          {lastUpdated && (
            <span style={{ color: "#6B9E7A", fontSize: 11 }}>
              Updated {lastUpdated.toLocaleTimeString()} · next in {Math.floor(countdown/60)}:{String(countdown%60).padStart(2,"0")}
            </span>
          )}
          <button
            onClick={fetchScores}
            disabled={loading}
            style={{ background: loading ? "#1C4A2E" : "#C9A537", color: loading ? "#6B9E7A" : "#0D2B1B", border: "none", padding: "6px 16px", borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: loading ? "wait" : "pointer", letterSpacing: "0.08em", transition: "all 0.2s", fontFamily: "inherit" }}
          >
            {loading ? "FETCHING..." : "↻ REFRESH"}
          </button>
        </div>
        {error && (
          <div style={{ marginTop: 10, color: "#e05c5c", fontSize: 11, background: "rgba(224,92,92,0.1)", padding: "6px 14px", borderRadius: 4, display: "inline-block" }}>
            {error}
          </div>
        )}
      </div>

      {/* Rules bar */}
      <div style={{ background: "rgba(201,165,55,0.08)", borderBottom: "1px solid rgba(201,165,55,0.2)", padding: "8px 16px", textAlign: "center" }}>
        <span style={{ color: "#6B9E7A", fontSize: 11, letterSpacing: "0.06em" }}>
          SCORING: Best 5 of 7 picks · Total to par · Missed cut = +100 · Lowest score wins · {PARTICIPANTS.length} entrants
        </span>
      </div>

      {/* Loading skeleton */}
      {loading && !hasScores && (
        <div style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ color: "#C9A537", fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: "italic", marginBottom: 12 }}>
            Searching for live scores...
          </div>
          <div style={{ color: "#6B9E7A", fontSize: 11 }}>Connecting to ESPN leaderboard</div>
        </div>
      )}

      {/* Leaderboard */}
      {(hasScores || !loading) && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 8px 40px" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 70px 60px", gap: 0, padding: "10px 12px", borderBottom: "1px solid rgba(201,165,55,0.3)", marginBottom: 2 }}>
            <span style={{ color: "#6B9E7A", fontSize: 10, letterSpacing: "0.1em" }}>POS</span>
            <span style={{ color: "#6B9E7A", fontSize: 10, letterSpacing: "0.1em" }}>ENTRANT</span>
            <span style={{ color: "#6B9E7A", fontSize: 10, letterSpacing: "0.1em", textAlign: "right" }}>SCORE</span>
            <span style={{ color: "#6B9E7A", fontSize: 10, letterSpacing: "0.1em", textAlign: "right" }}></span>
          </div>

          {withPos.map((p, idx) => {
            const isExpanded = expanded === p.id;
            const isTop3 = idx < 3 && p.total !== null;
            const rowBg = isTop3
              ? `rgba(201,165,55,${0.12 - idx * 0.03})`
              : idx % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent";

            return (
              <div key={p.id}>
                {/* Main row */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : p.id)}
                  style={{ display: "grid", gridTemplateColumns: "56px 1fr 70px 60px", gap: 0, padding: "11px 12px", background: rowBg, borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", transition: "background 0.15s", borderLeft: isTop3 ? `3px solid ${["#C9A537","#aaa","#cd7f32"][idx]}` : "3px solid transparent" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(201,165,55,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.background = rowBg}
                >
                  {/* Position */}
                  <span style={{ fontSize: 13, fontWeight: 700, color: isTop3 ? ["#C9A537","#C0C0C0","#CD7F32"][idx] : "#6B9E7A", alignSelf: "center" }}>
                    {p.pos}
                  </span>

                  {/* Name */}
                  <span style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#F5F0E0", alignSelf: "center", fontFamily: "'Playfair Display', serif", fontWeight: idx < 3 ? 700 : 400 }}>
                    {p.name}
                  </span>

                  {/* Score */}
                  <span style={{ fontSize: 15, fontWeight: 700, color: scoreColor(p.total), textAlign: "right", alignSelf: "center", letterSpacing: "0.02em" }}>
                    {fmt(p.total)}
                  </span>

                  {/* Expand toggle */}
                  <span style={{ textAlign: "right", color: "#6B9E7A", fontSize: 11, alignSelf: "center" }}>
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </div>

                {/* Expanded picks */}
                {isExpanded && (
                  <div style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(201,165,55,0.3)", padding: "10px 12px 14px 68px" }}>
                    <div style={{ fontSize: 10, color: "#C9A537", letterSpacing: "0.1em", marginBottom: 8 }}>PICKS (★ = counts toward score)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {p.pickScores.map((ps, i) => {
                        const counts = p.best5Names.includes(norm(ps.name));
                        return (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ color: counts ? "#C9A537" : "#2D5E3A", fontSize: 12, width: 14 }}>
                              {counts ? "★" : "·"}
                            </span>
                            <span style={{ fontSize: 12, color: counts ? "#F5F0E0" : "#4A7A5A", flex: 1 }}>
                              {ps.name}
                            </span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor(ps.score), minWidth: 36, textAlign: "right" }}>
                              {fmt(ps.score)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid rgba(201,165,55,0.2)", display: "flex", justifyContent: "flex-end", gap: 6, alignItems: "center" }}>
                      <span style={{ color: "#6B9E7A", fontSize: 11 }}>Best 5 total:</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: scoreColor(p.total) }}>{fmt(p.total)}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "16px 24px 32px", color: "#2D5E3A", fontSize: 10, letterSpacing: "0.06em" }}>
        M7 GOLF · 2026 MASTERS SWEEPSTAKE · AUGUSTA NATIONAL
      </div>
    </div>
  );
}
