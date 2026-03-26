import { useState } from "react";

const days = [
  {
    day: "Fri 3/27",
    title: "Drive Down + First Look",
    theme: "~7 hr drive from ATL. Arrive mid-afternoon, explore Tampa's core.",
    stops: [
      { time: "7:00 AM", name: "Leave Atlanta", type: "explore", note: "~450 mi, 6.5–7 hrs via I-75 S the whole way.", addr: "I-75 South" },
      { time: "~8:30 AM", name: "Buc-ee's — Warner Robins", type: "food", note: "Exit 144 off I-75. Fuel up, stretch, grab brisket sandwiches and Beaver Nuggets for the road.", addr: "6201 GA-96, Fort Valley, GA 31030" },
      { time: "~2:30 PM", name: "Check in + Bayshore Blvd", type: "activity", note: "Drop bags at W Hamilton Ave, then drive 10 min to Bayshore. Walk the world's longest continuous sidewalk (4.5 mi). Decompress after the drive.", addr: "4222 W Hamilton Ave → Bayshore Blvd" },
      { time: "4:30 PM", name: "Hyde Park Village", type: "explore", note: "Walk around Tampa's most livable neighborhood. 10 min from your place.", addr: "1602 W Swann Ave", hrs: "Fri 10am–8pm" },
      { time: "5:30 PM", name: "🩰 Buttercup Pole Dance", type: "activity", note: "Drive-by / peek in — it's 5 min from your place on W Hillsborough. 4.8 stars, 96 reviews. Check their Sat class schedule if you want to drop in this weekend.", addr: "3251 W Hillsborough Ave", hrs: "Fri 6:45–7:45am" },
      { time: "6:30 PM", name: "Curtis Hixon Park + Riverwalk", type: "explore", note: "Walk the Riverwalk, check out downtown Tampa. Grab dinner wherever looks good along the way.", addr: "600 N Ashley Dr → Riverwalk" },
    ],
  },
  {
    day: "Sat 3/28",
    title: "Closer-In Zone + Game Day",
    theme: "Tour Westchase & Carrollwood — your Sandy Springs equivalents — then streetcar to the 1pm game.",
    stops: [
      { time: "8:30 AM", name: "🏘 Westchase — drive the community", type: "explore", note: "Master-planned, 2,800 acres. Drive The Bridges, The Fords, Reserve at Westchase (gated, $700K–$1.1M). 28 distinct subdivisions. Homes up to 5,500 sqft. Pools, golf, tennis, trails. 20 min to downtown Tampa.", addr: "Westchase — Countryway Blvd entrance" },
      { time: "9:00 AM", name: "📍 Westchase amenities loop", type: "explore", note: "West Park Village Town Center (walkable shops + restaurants), Westchase Swim & Tennis, Shops at Westchase, Publix. This is your Sandy Springs errand loop equivalent — everything within 5 min.", addr: "West Park Village → Shops at Westchase" },
      { time: "9:20 AM", name: "📋 Westchase public schools", type: "school", note: "Westchase Elementary (top 10% in FL, 80% math proficiency). Feeder: Davidsen Middle → Alonso High. All within community boundaries. Strong public backup if you go private.", addr: "Westchase Elementary, 9517 W Linebaugh Ave" },
      { time: "9:45 AM", name: "🏘 Carrollwood Village", type: "explore", note: "Established community, larger lots than Westchase. Estate homes on golf course & lakefront up to 6,000 sqft. Original Carrollwood has ski lake access. More character than new construction — like Roswell's older neighborhoods. $500K–$1M+.", addr: "Carrollwood Village — off Dale Mabry / Ehrlich" },
      { time: "10:15 AM", name: "🎓 Carrollwood Day School", type: "school", note: "Drive by campus. Non-sectarian, full IB (PK–12). A+ Niche. First school in FL with all 3 IB levels. 1,200+ students, 10:1 ratio. Tuition ~$17K–$27K. RIGHT HERE in north Tampa — 5 min from Carrollwood Village. Bus routes to Westchase.", addr: "1515 W Bearss Ave" },
      { time: "10:45 AM", name: "🩰 Niko's Lair Pole Studio", type: "activity", note: "Perfect 5.0, on LOL Blvd. Only 15 min north of Carrollwood. Classes Mon–Thu evenings. Drive by and check the space.", addr: "2020 Land O' Lakes Blvd #2, Lutz", hrs: "Mon–Thu 4:30–9:30pm" },
      { time: "11:15 AM", name: "Park in Ybor City", type: "explore", note: "Park near Centro Ybor (way cheaper than arena parking). Walk to the TECO streetcar stop on 8th Ave.", addr: "Centro Ybor garage, 7th/8th Ave" },
      { time: "~11:45 AM", name: "🚃 TECO Streetcar → Arena", type: "activity", note: "FREE ride, every 15 min on Sat. ~20 min to Channelside. Vintage replica streetcars.", addr: "Centennial Park Station → Channelside" },
      { time: "12:20 PM", name: "⚡ Lightning vs Senators", type: "event", note: "In seats for warmups (~12:30). Puck drop at 1pm.", addr: "401 Channelside Dr (Benchmark Arena)" },
      { time: "~4:00 PM", name: "🚃 Streetcar back → Ybor City", type: "activity", note: "Ride back. Explore Ybor on foot — cobblestones, cigar shops, murals, roaming chickens. Pizza at Due Amici.", addr: "Channelside → Centennial Park Station" },
      { time: "7:30 PM", name: "District South Kitchen & Craft", type: "food", note: "Casual dinner on Dale Mabry. Great Cubano, good craft beer.", addr: "3301 S Dale Mabry Hwy", hrs: "Sat 11am–12am" },
    ],
  },
  {
    day: "Sun 3/29",
    title: "LOL Zone + Beach + Comparison",
    theme: "Tour the LOL communities & Academy at the Lakes. Then beach + compare closer-in vs. further-out.",
    stops: [
      { time: "8:30 AM", name: "🎓 Academy at the Lakes", type: "school", note: "Drive both campuses on Collier Pkwy. Non-denominational, PK3–12, A+ Niche, 8:1 ratio. Tuition ~$19K–$29K. 540+ students. KEY FACT: Families already commute here from Westchase & Carrollwood (25–30 min). School offers bus transport.", addr: "2331 Collier Pkwy, LOL 34639" },
      { time: "9:00 AM", name: "🏘 Terra Bella", type: "explore", note: "Where the Zillow listing is. Drive Calvano Dr, walk the pool/clubhouse, check lot sizes. ~$800K–$1M. Zoned: Denham Oaks Elem (8/10), Rushe Middle, Sunlake High.", addr: "Off Collier Pkwy, LOL 34639" },
      { time: "9:30 AM", name: "📍 LOL amenities (Collier Pkwy)", type: "explore", note: "Publix → Land O' Lakes Library → Crunch Fitness → Walmart. All within 5 min. Compare this to the Westchase loop you did yesterday.", addr: "Collier Pkwy corridor" },
      { time: "10:00 AM", name: "🏘 Bexley", type: "explore", note: "Walk the Bexley Club, resort pools, Twisted Sprocket Café, trails. Resales $500K–$850K. Same school zone as Terra Bella.", addr: "Off SR-54, LOL 34638" },
      { time: "10:45 AM", name: "🏘 Connerton — model homes", type: "explore", note: "Walk-in models by M/I Homes (no appt). Homes $442K–$900K+, up to 5,000 sqft. Zoned: Connerton Elem, PineView Middle, LOL High. More house for the money, but further from everything.", addr: "Connerton Blvd off US-41, LOL 34637" },
      { time: "11:15 AM", name: "🏘 Wilderness Lake Preserve", type: "explore", note: "Drive through, check the lodge and 38-acre spring-fed lake. Resort-style, gated. $350K–$800K. Across from LOL High.", addr: "Off US-41, LOL 34638" },
      { time: "12:00 PM", name: "Ukulele Brand's", type: "food", note: "Quick lakefront lunch before heading to the beach.", addr: "4805 Land O' Lakes Blvd", hrs: "Sun 11am–12am" },
      { time: "1:00 PM", name: "Honeymoon Island State Park", type: "activity", note: "Your future weekend beach. Trails, shells, dolphins. ~45 min from LOL, ~35 min from Westchase.", addr: "1 Causeway Blvd, Dunedin" },
      { time: "4:30 PM", name: "🩰 House of Chrome Pole Fitness", type: "activity", note: "5.0 stars, 278 reviews — Tampa's top-rated studio. On W Kennedy near Hyde Park. Open Sun 9am–9:30pm. Drop in or check the space.", addr: "4333 W Kennedy Blvd", hrs: "Sun 9am–9:30pm" },
      { time: "6:00 PM", name: "Oxford Exchange", type: "coffee", note: "Coffee + bookstore + brunch. The kind of place you'd come to on weekends from either Westchase or LOL.", addr: "420 W Kennedy Blvd", hrs: "Sun 8am–5:30pm" },
      { time: "7:00 PM", name: "Uncle Mike's Pizzeria", type: "food", note: "Hidden gem right in Westchase. Try the prosciutto with fig jam or the pear & gorgonzola with pine nuts. Family-run, creative pies, great prices. This is the kind of local spot you'd end up at once a week.", addr: "9556 W Linebaugh Ave, Tampa 33626", hrs: "Sun 11am–9pm" },
    ],
  },
  {
    day: "Mon 3/30",
    title: "Commute Reality Check",
    theme: "The day that tells you the truth. Time every drive that matters. Then east to Boynton Beach.",
    stops: [
      { time: "7:30 AM", name: "⏱ Westchase → Academy at the Lakes", type: "commute", note: "School commute if you live closer-in. Sheldon Rd → Veterans Expy → SR-54 → Collier Pkwy. TIME IT. Should be ~25–30 min.", addr: "Westchase → 2331 Collier Pkwy" },
      { time: "8:15 AM", name: "⏱ Academy → Downtown Tampa", type: "commute", note: "Drop kids, then commute to work. Worst-case morning chain. TIME IT.", addr: "Collier Pkwy → Downtown Tampa" },
      { time: "9:15 AM", name: "Lettuce Lake Park", type: "activity", note: "Boardwalk through cypress swamp — gators, turtles, birds. $2 cash only. Decompress and compare notes.", addr: "6920 E Fletcher Ave", hrs: "Mon 8am–6pm" },
      { time: "10:30 AM", name: "⏱ Carrollwood → Academy", type: "commute", note: "Drive from Carrollwood Village to the school. Should be ~20–25 min. Compare to the Westchase route.", addr: "Carrollwood Village → 2331 Collier Pkwy" },
      { time: "11:00 AM", name: "⏱ Carrollwood → CDS", type: "commute", note: "Now test the backup school. Drive from Carrollwood Village to CDS on Bearss Ave. Should be ~5–8 min. This is the killer advantage of living closer-in.", addr: "Carrollwood Village → 1515 W Bearss Ave" },
      { time: "11:30 AM", name: "Wesley Chapel / Wiregrass", type: "explore", note: "Target, movies, Noble Crust for lunch. Where both LOL and Carrollwood people do errands. Feel it on a weekday.", addr: "28330 Paseo Dr, Wesley Chapel" },
      { time: "1:30 PM", name: "⏱ LOL → Downtown (afternoon)", type: "commute", note: "Drive from Terra Bella area to downtown Tampa in afternoon traffic. TIME IT. Is this the same Roswell commute you're trying to escape?", addr: "LOL (Collier Pkwy) → Downtown via I-75/I-275" },
      { time: "2:30 PM", name: "⏱ Westchase → Downtown", type: "commute", note: "Same drive from Westchase. TIME IT. This should be your Sandy Springs equivalent — 20–25 min even in traffic.", addr: "Westchase → Downtown Tampa" },
      { time: "3:00 PM", name: "Head east → Boynton Beach", type: "explore", note: "Bags already in the car. ~3.5 hrs via I-4 E → FL Turnpike. Leaving by 3 gets you past Orlando before rush hour. Gut-check conversation in the car: Westchase vs. Carrollwood vs. LOL — which felt like home?", addr: "I-4 East → FL Turnpike South → Boynton Beach" },
    ],
  },
];

const typeColors = { coffee: "#8B6914", activity: "#1a7a5a", explore: "#5a5a8a", food: "#b85c38", event: "#1565c0", school: "#7b1fa2", commute: "#c62828" };
const typeLabels = { coffee: "Coffee", activity: "Do", explore: "Explore", food: "Eat", event: "Event", school: "School", commute: "Time It" };

const tips = {
  0: { title: "💡 Buc-ee's is ~1.5 hrs in. Buttercup Pole Dance is 5 min from your place.", body: "Your Airbnb on W Hamilton Ave is ~10 min to Bayshore, ~10 min to downtown, ~20 min to Westchase, ~35 min to LOL. Great home base for the whole trip." },
  1: { title: "🏠 Today: Your Sandy Springs equivalents. Westchase (20 min) and Carrollwood (15 min).", body: "KEY: Carrollwood Day School (non-sectarian, full IB, A+ Niche) is RIGHT in Carrollwood — 5 min from the neighborhoods you're touring. CDS runs buses to Westchase too. TECO streetcar is FREE, every 15 min Sat." },
  2: { title: "🏠 Today: LOL zone. Academy families ALREADY commute from Westchase & Carrollwood.", body: "You don't have to live in LOL to attend Academy. The school confirms families from Westchase, Carrollwood, New Tampa, and Lutz all attend. Compare: which daily-life infrastructure feels more like what you want?" },
  3: { title: "⏱ Today: 6 timed drives, then east to Boynton Beach.", body: "The two big questions: (1) Can you live in Westchase/Carrollwood and make the Academy commute work? (2) Is the LOL → downtown commute the same Roswell problem you're escaping? Get your answers, pack up, and hit I-4 East by 3 to beat Orlando traffic." },
};

const compRows = [
  { label: "→ Downtown", wc: "20–25 min", cw: "15–20 min", lol: "35–60 min" },
  { label: "→ Academy", wc: "25–30 min", cw: "20–25 min", lol: "5–10 min" },
  { label: "→ CDS", wc: "15 min (bus)", cw: "5–8 min", lol: "25–30 min" },
  { label: "→ Beach", wc: "25 min", cw: "30 min", lol: "45 min" },
  { label: "$1M buys", wc: "~3,200 sqft", cw: "~3,800 sqft", lol: "~4,500 sqft" },
  { label: "ATL equiv.", wc: "Sandy Springs", cw: "Buckhead edge", lol: "Roswell" },
  { label: "Vibe", wc: "Master-planned", cw: "Established", lol: "New builds" },
];

export default function App() {
  const [day, setDay] = useState(0);
  const [comp, setComp] = useState(false);
  const [expanded, setExpanded] = useState({});
  const d = days[day];
  const tip = tips[day];

  const toggle = (i) => setExpanded(p => ({ ...p, [i]: !p[i] }));

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", maxWidth: 480, margin: "0 auto", background: "#fafafa", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "white", padding: "20px 16px 14px" }}>
        <div style={{ fontSize: 13, opacity: 0.7, letterSpacing: 1, textTransform: "uppercase" }}>Tampa Scouting Trip</div>
        <div style={{ fontSize: 22, fontWeight: 700, margin: "4px 0 2px" }}>March 27–30, 2026</div>
        <div style={{ fontSize: 13, opacity: 0.6 }}>Atlanta → Westchase · Carrollwood · Land O' Lakes</div>
      </div>

      <div style={{ display: "flex", background: "#fff", borderBottom: "1px solid #e0e0e0", position: "sticky", top: 0, zIndex: 10 }}>
        {days.map((dy, i) => (
          <button key={i} onClick={() => { setDay(i); setExpanded({}); }} style={{ flex: 1, padding: "10px 4px", background: day === i ? "#fff" : "#f5f5f5", border: "none", borderBottom: day === i ? "3px solid #1565c0" : "3px solid transparent", cursor: "pointer", fontSize: 12, fontWeight: day === i ? 700 : 500, color: day === i ? "#1565c0" : "#666", transition: "all 0.15s" }}>
            {dy.day.split(" ")[0]}<br /><span style={{ fontSize: 11 }}>{dy.day.split(" ")[1]}</span>
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 16px 0" }}>
        <button onClick={() => setComp(!comp)} style={{ width: "100%", padding: "10px 14px", background: comp ? "#e8eaf6" : "#fff", border: "1px solid #c5cae9", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#283593", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s" }}>
          <span>{comp ? "▼" : "▶"} Neighborhood Comparison</span>
          <span style={{ fontSize: 11, opacity: 0.7 }}>Westchase vs Carrollwood vs LOL</span>
        </button>
      </div>

      {comp && (
        <div style={{ padding: "8px 16px 0" }}>
          <div style={{ background: "#fff", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "82px 1fr 1fr 1fr", fontSize: 11, fontWeight: 600 }}>
              <div style={{ padding: "8px 8px", background: "#f5f5f5", borderBottom: "1px solid #e0e0e0" }} />
              <div style={{ padding: "8px 4px", background: "#e3f2fd", borderBottom: "1px solid #e0e0e0", textAlign: "center", color: "#1565c0" }}>Westchase</div>
              <div style={{ padding: "8px 4px", background: "#f3e5f5", borderBottom: "1px solid #e0e0e0", textAlign: "center", color: "#7b1fa2" }}>Carrollwood</div>
              <div style={{ padding: "8px 4px", background: "#fff3e0", borderBottom: "1px solid #e0e0e0", textAlign: "center", color: "#e65100" }}>LOL</div>
            </div>
            {compRows.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "82px 1fr 1fr 1fr", fontSize: 11, borderBottom: i < compRows.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                <div style={{ padding: "7px 8px", fontWeight: 600, color: "#555" }}>{r.label}</div>
                <div style={{ padding: "7px 4px", textAlign: "center", color: "#333" }}>{r.wc}</div>
                <div style={{ padding: "7px 4px", textAlign: "center", color: "#333" }}>{r.cw}</div>
                <div style={{ padding: "7px 4px", textAlign: "center", color: "#333" }}>{r.lol}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e" }}>{d.title}</div>
        <div style={{ fontSize: 13, color: "#777", marginTop: 2, lineHeight: 1.4 }}>{d.theme}</div>
      </div>

      <div style={{ padding: "8px 16px 0" }}>
        {d.stops.map((s, i) => {
          const isOpen = expanded[i];
          const col = typeColors[s.type] || "#888";
          return (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 2 }}>
              <div style={{ minWidth: 54, textAlign: "right", paddingTop: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#777" }}>{s.time}</div>
              </div>
              <div style={{ width: 2, background: i < d.stops.length - 1 ? "#ddd" : "transparent", position: "relative", flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: col, position: "absolute", top: 16, left: -4 }} />
              </div>
              <div
                onClick={() => toggle(i)}
                style={{
                  flex: 1, background: "#fff", borderRadius: 10, padding: "10px 14px", marginBottom: 10,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  borderLeft: s.type === "commute" ? `3px solid ${col}` : s.type === "school" ? `3px solid ${col}` : "3px solid transparent",
                  cursor: "pointer", transition: "box-shadow 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e", lineHeight: 1.3, flex: 1 }}>{s.name}</div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: col, background: col + "15", padding: "2px 7px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>{typeLabels[s.type]}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{s.note}</div>
                    <div style={{ marginTop: 6, fontSize: 11, color: "#999" }}>
                      📍 {s.addr}{s.hrs ? ` · 🕐 ${s.hrs}` : ""}
                    </div>
                  </div>
                )}
                {!isOpen && (
                  <div style={{ fontSize: 12, color: "#999", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {s.note.substring(0, 65)}…
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ padding: "8px 16px 24px" }}>
        <div style={{ background: "#fff3e0", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e65100", marginBottom: 4 }}>{tip.title}</div>
          <div style={{ fontSize: 12, color: "#bf360c", lineHeight: 1.45 }}>{tip.body}</div>
        </div>
      </div>

      <div style={{ padding: "0 16px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
          {Object.entries(typeLabels).map(([k, v]) => (
            <span key={k} style={{ fontSize: 10, color: typeColors[k], background: typeColors[k] + "12", padding: "3px 8px", borderRadius: 12, fontWeight: 600 }}>{v}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
