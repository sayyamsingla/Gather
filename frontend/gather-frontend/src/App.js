// import React, { useState } from "react";

// const mockResults = [
//   {
//     rank: 1,
//     name: "Capilano Suspension Bridge",
//     type: "Outdoor Adventure",
//     distance: "0.8 km",
//     duration: "1.5–2 hrs",
//     price: "$$",
//     open: true,
//     match: 97,
//     explanation:
//       "Your adventurous mood and 2-hour window are a perfect match for the canyon walkways — currently open with low wait times on a weekday afternoon.",
//     tags: ["Outdoor", "Active", "Scenic"],
//     color: "#4ade80",
//   },
//   {
//     rank: 2,
//     name: "Polygon Gallery",
//     type: "Arts & Culture",
//     distance: "2.1 km",
//     duration: "1–2 hrs",
//     price: "$",
//     open: true,
//     match: 84,
//     explanation:
//       "A low-key, budget-friendly pick for two — current exhibition runs through the weekend and the waterfront walk after is a bonus.",
//     tags: ["Indoor", "Cultural", "Relaxed"],
//     color: "#818cf8",
//   },
//   {
//     rank: 3,
//     name: "Breka Bakery & Café",
//     type: "Food & Drink",
//     distance: "0.4 km",
//     duration: "30–60 min",
//     price: "$",
//     open: true,
//     match: 76,
//     explanation:
//       "Best if you want to wind down after — open 24hrs, highly rated pastries, and fits your under-$30 budget easily for two people.",
//     tags: ["Indoor", "Food", "Chill"],
//     color: "#fb923c",
//   },
// ];

// const moods = ["Adventurous", "Relaxed", "Social", "Creative", "Romantic", "Active"];
// const groupTypes = ["Solo", "Date", "Friends", "Family"];

// export default function App() {
//   const [step, setStep] = useState("form"); // form | loading | results
//   const [mood, setMood] = useState("");
//   const [groupType, setGroupType] = useState("");
//   const [budget, setBudget] = useState(30);
//   const [time, setTime] = useState(2);
//   const [outdoor, setOutdoor] = useState(null);
//   const [location, setLocation] = useState("Vancouver, BC");
//   const [expanded, setExpanded] = useState(null);
//   const [radius, setRadius] = useState(5000);

//   // const handleSubmit = () => {
//   //   setStep("loading");
//   //   setTimeout(() => setStep("results"), 2200);
//   // };


// const [recommendations, setRecommendations] = useState([]);
// const [error, setError] = useState(null);

// const handleSubmit = async () => {
//   setStep("loading");
//   setError(null);
  
//   try {
//     const response = await fetch("http://localhost:8000/recommendations", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         location: location,
//         mood: mood,
//         group_type: groupType,
//         indoor_outdoor: outdoor,
//         budget: budget,
//         time_available: time,
//         radius: radius,
//       }),
//     });

//     const data = await response.json();
//     setRecommendations(data.recommendations);
//     setStep("results");
//   } catch (err) {
//     setError("Something went wrong. Please try again.");
//     setStep("form");
//   }
// };

//   const ready = mood && groupType && outdoor !== null;

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: "#0a0a0f",
//       fontFamily: "'Georgia', 'Times New Roman', serif",
//       color: "#f0ede8",
//       position: "relative",
//       overflow: "hidden",
//     }}>
//       {/* Background texture */}
//       <div style={{
//         position: "fixed", inset: 0, pointerEvents: "none",
//         background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1a1040 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, #0d2818 0%, transparent 60%)",
//         zIndex: 0,
//       }} />

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

//         {/* Header */}
//         <div style={{ marginBottom: 48 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
//             <div style={{
//               width: 8, height: 8, borderRadius: "50%",
//               background: "#4ade80",
//               boxShadow: "0 0 12px #4ade80",
//               animation: "pulse 2s infinite",
//             }} />
//             <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6b7280", fontFamily: "monospace", textTransform: "uppercase" }}>
//               Live · Nearby · Now
//             </span>
//           </div>
//           <h1 style={{
//             fontSize: "clamp(36px, 8vw, 64px)",
//             fontWeight: 400,
//             lineHeight: 1.05,
//             margin: 0,
//             letterSpacing: "-0.02em",
//             color: "#f0ede8",
//           }}>
//             What should<br />
//             <em style={{ color: "#a78bfa" }}>you do</em> right now?
//           </h1>
//           <p style={{ color: "#6b7280", marginTop: 12, fontSize: 15, fontFamily: "monospace" }}>
//             Tell us your mood. We'll handle the rest.
//           </p>
//         </div>

//         {/* FORM */}
//         {step === "form" && (
//           <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

//             {/* Location */}
//             <Field label="Where are you?">
//               <input
//                 value={location}
//                 onChange={e => setLocation(e.target.value)}
//                 style={{
//                   background: "rgba(255,255,255,0.04)",
//                   border: "1px solid rgba(255,255,255,0.1)",
//                   borderRadius: 8,
//                   padding: "12px 16px",
//                   color: "#f0ede8",
//                   fontSize: 16,
//                   width: "100%",
//                   boxSizing: "border-box",
//                   outline: "none",
//                   fontFamily: "monospace",
//                 }}
//               />
//             </Field>

//             {/* Mood */}
//             <Field label="What's your mood?">
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
//                 {moods.map(m => (
//                   <Chip key={m} label={m} selected={mood === m} onClick={() => setMood(m)} color="#a78bfa" />
//                 ))}
//               </div>
//             </Field>

//             {/* Who */}
//             <Field label="Who are you with?">
//               <div style={{ display: "flex", gap: 10 }}>
//                 {groupTypes.map(g => (
//                   <Chip key={g} label={g} selected={groupType === g} onClick={() => setGroupType(g)} color="#60a5fa" />
//                 ))}
//               </div>
//             </Field>

//             {/* Indoor / Outdoor */}
//             <Field label="Indoor or outdoor?">
//               <div style={{ display: "flex", gap: 10 }}>
//                 {["Outdoor", "Indoor", "Either"].map(opt => (
//                   <Chip key={opt} label={opt} selected={outdoor === opt} onClick={() => setOutdoor(opt)} color="#4ade80" />
//                 ))}
//               </div>
//             </Field>

//             {/* Budget */}
//             <Field label={`Budget — up to $${budget}`}>
//               <input type="range" min={5} max={200} step={5} value={budget}
//                 onChange={e => setBudget(Number(e.target.value))}
//                 style={{ width: "100%", accentColor: "#f59e0b" }}
//               />
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>
//                 <span>$5</span><span>$200</span>
//               </div>
//             </Field>

//             <Field label={`Search radius — ${radius/1000}km`}>
//               <input type="range" min={1000} max={20000} step={1000} value={radius}
//                 onChange={e => setRadius(Number(e.target.value))}
//                 style={{ width: "100%", accentColor: "#4ade80" }}
//               />
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>
//                 <span>1km</span><span>20km</span>
//               </div>
//             </Field>

//             {/* Time */}
//             <Field label={`Time available — ${time} hour${time !== 1 ? "s" : ""}`}>
//               <input type="range" min={0.5} max={6} step={0.5} value={time}
//                 onChange={e => setTime(Number(e.target.value))}
//                 style={{ width: "100%", accentColor: "#fb923c" }}
//               />
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>
//                 <span>30 min</span><span>6 hrs</span>
//               </div>
//             </Field>

//             {/* Submit */}
//             <button
//               onClick={handleSubmit}
//               disabled={!ready}
//               style={{
//                 marginTop: 8,
//                 padding: "18px 32px",
//                 background: ready ? "linear-gradient(135deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.06)",
//                 border: "none",
//                 borderRadius: 12,
//                 color: ready ? "#0a0a0f" : "#374151",
//                 fontSize: 16,
//                 fontWeight: 700,
//                 fontFamily: "monospace",
//                 letterSpacing: "0.05em",
//                 cursor: ready ? "pointer" : "not-allowed",
//                 transition: "all 0.2s",
//                 textTransform: "uppercase",
//               }}
//             >
//               Find My Activities →
//             </button>
//             {!ready && (
//               <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, fontFamily: "monospace", marginTop: -20 }}>
//                 select mood, group, and indoor/outdoor to continue
//               </p>
//             )}
//           </div>
//         )}

//         {/* LOADING */}
//         {step === "loading" && (
//           <div style={{ textAlign: "center", padding: "80px 0" }}>
//             <div style={{ fontSize: 40, marginBottom: 24 }}>
//               <LoadingDots />
//             </div>
//             <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: 13 }}>
//               Scanning nearby places...
//             </p>
//             <p style={{ color: "#4b5563", fontFamily: "monospace", fontSize: 12, marginTop: 8 }}>
//               Asking Claude to rank results for you
//             </p>
//           </div>
//         )}

//         {/* RESULTS */}
//         {step === "results" && (
//           <div>
//             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
//               <h2 style={{ fontWeight: 400, fontSize: 24, margin: 0 }}>
//                 Top picks for a <em style={{ color: "#a78bfa" }}>{mood.toLowerCase()}</em> {time}hr {groupType.toLowerCase()}
//               </h2>
//               <button onClick={() => setStep("form")} style={{
//                 background: "none", border: "1px solid rgba(255,255,255,0.1)",
//                 color: "#6b7280", padding: "6px 14px", borderRadius: 6,
//                 cursor: "pointer", fontFamily: "monospace", fontSize: 12,
//               }}>
//                 ← Redo
//               </button>
//             </div>

//             <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//               {recommendations.map((r, i) => (
//                 <div key={i}
//                   onClick={() => setExpanded(expanded === i ? null : i)}
//                   style={{
//                     background: "rgba(255,255,255,0.03)",
//                     border: `1px solid ${expanded === i ? r.color + "44" : "rgba(255,255,255,0.07)"}`,
//                     borderRadius: 14,
//                     padding: "20px 24px",
//                     cursor: "pointer",
//                     transition: "all 0.25s",
//                     boxShadow: expanded === i ? `0 0 40px ${r.color}11` : "none",
//                   }}
//                 >
//                   <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
//                     {/* Rank */}
//                     <div style={{
//                       minWidth: 36, height: 36, borderRadius: "50%",
//                       background: `${r.color}22`,
//                       border: `1px solid ${r.color}66`,
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       fontSize: 13, fontWeight: 700, color: r.color, fontFamily: "monospace",
//                     }}>
//                       {r.rank}
//                     </div>

//                     <div style={{ flex: 1 }}>
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                         <div>
//                           <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 2 }}>{r.name}</div>
//                           <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{r.type} · {r.distance} away · {r.price}</div>
//                         </div>
//                         <div style={{
//                           background: `${r.color}22`, border: `1px solid ${r.color}55`,
//                           borderRadius: 6, padding: "4px 10px",
//                           fontSize: 12, fontFamily: "monospace", color: r.color, fontWeight: 700,
//                         }}>
//                           {r.match_score}% match
//                         </div>
//                       </div>

//                       {/* Tags */}
//                       <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
//                         {r.tags.map(t => (
//                           <span key={t} style={{
//                             fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
//                             background: "rgba(255,255,255,0.05)", borderRadius: 4,
//                             padding: "3px 8px", color: "#9ca3af", textTransform: "uppercase",
//                           }}>{t}</span>
//                         ))}
//                         <span style={{
//                           fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
//                           background: "rgba(74,222,128,0.1)", borderRadius: 4,
//                           padding: "3px 8px", color: "#4ade80", textTransform: "uppercase",
//                         }}>● Open Now</span>
//                       </div>

//                       {/* Expanded explanation */}
//                       {expanded === i && (
//                         <div style={{
//                           marginTop: 16,
//                           padding: "14px 16px",
//                           background: "rgba(255,255,255,0.03)",
//                           borderRadius: 8,
//                           borderLeft: `3px solid ${r.color}`,
//                           fontSize: 14,
//                           lineHeight: 1.6,
//                           color: "#c9c5be",
//                           fontStyle: "italic",
//                         }}>
//                           <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280", fontStyle: "normal", display: "block", marginBottom: 6 }}>
//                             WHY CLAUDE PICKED THIS FOR YOU
//                           </span>
//                           {r.explanation}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <p style={{ textAlign: "center", color: "#374151", fontSize: 11, fontFamily: "monospace", marginTop: 32 }}>
//               click any card to see why claude chose it · powered by google places + claude api
//             </p>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }
//         @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
//         input[type=range] { -webkit-appearance: none; appearance: none; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; outline: none; }
//         input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: currentColor; cursor: pointer; }
//       `}</style>
//     </div>
//   );
// }

// function Field({ label, children }) {
//   return (
//     <div>
//       <div style={{
//         fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
//         color: "#6b7280", fontFamily: "monospace", marginBottom: 12,
//       }}>{label}</div>
//       {children}
//     </div>
//   );
// }

// function Chip({ label, selected, onClick, color }) {
//   return (
//     <button onClick={onClick} style={{
//       padding: "8px 16px",
//       borderRadius: 100,
//       border: `1px solid ${selected ? color : "rgba(255,255,255,0.1)"}`,
//       background: selected ? `${color}22` : "transparent",
//       color: selected ? color : "#6b7280",
//       fontSize: 13,
//       fontFamily: "monospace",
//       cursor: "pointer",
//       transition: "all 0.15s",
//       fontWeight: selected ? 600 : 400,
//     }}>
//       {label}
//     </button>
//   );
// }

// function LoadingDots() {
//   return (
//     <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
//       {[0, 1, 2].map(i => (
//         <div key={i} style={{
//           width: 10, height: 10, borderRadius: "50%",
//           background: "#a78bfa",
//           animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
//         }} />
//       ))}
//     </div>
//   );
// }



import React, { useState } from "react";

const moods = ["Adventurous", "Relaxed", "Social", "Creative", "Romantic", "Active"];
const groupTypes = ["Solo", "Date", "Friends", "Family"];
const colors = ["#4ade80", "#a78bfa", "#60a5fa", "#fb923c", "#f59e0b"];

export default function App() {
  const [step, setStep] = useState("form");
  const [mood, setMood] = useState("");
  const [groupType, setGroupType] = useState("");
  const [budget, setBudget] = useState(30);
  const [time, setTime] = useState(2);
  const [outdoor, setOutdoor] = useState(null);
  const [location, setLocation] = useState("Vancouver, BC");
  const [expanded, setExpanded] = useState(null);
  const [radius, setRadius] = useState(5000);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setStep("loading");
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          mood,
          group_type: groupType,
          indoor_outdoor: outdoor,
          budget,
          time_available: time,
          radius,
        }),
      });

      const data = await response.json();
      setRecommendations(data.recommendations);
      setStep("results");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStep("form");
    }
  };

  const ready = mood && groupType && outdoor !== null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#f0ede8",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, #1a1040 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 80%, #0d2818 0%, transparent 60%)",
        zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 12px #4ade80",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: "#6b7280", fontFamily: "monospace", textTransform: "uppercase" }}>
              Live · Nearby · Now
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(36px, 8vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.02em",
            color: "#f0ede8",
          }}>
            What should<br />
            <em style={{ color: "#a78bfa" }}>you do</em> right now?
          </h1>
          <p style={{ color: "#6b7280", marginTop: 12, fontSize: 15, fontFamily: "monospace" }}>
            Tell us your mood. We'll handle the rest.
          </p>
        </div>

        {/* FORM */}
        {step === "form" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

            {error && (
              <div style={{ color: "#f87171", fontFamily: "monospace", fontSize: 13, textAlign: "center" }}>
                {error}
              </div>
            )}

            <Field label="Where are you?">
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "12px 16px",
                  color: "#f0ede8",
                  fontSize: 16,
                  width: "100%",
                  boxSizing: "border-box",
                  outline: "none",
                  fontFamily: "monospace",
                }}
              />
            </Field>

            <Field label="What's your mood?">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {moods.map(m => (
                  <Chip key={m} label={m} selected={mood === m} onClick={() => setMood(m)} color="#a78bfa" />
                ))}
              </div>
            </Field>

            <Field label="Who are you with?">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {groupTypes.map(g => (
                  <Chip key={g} label={g} selected={groupType === g} onClick={() => setGroupType(g)} color="#60a5fa" />
                ))}
              </div>
            </Field>

            <Field label="Indoor or outdoor?">
              <div style={{ display: "flex", gap: 10 }}>
                {["Outdoor", "Indoor", "Either"].map(opt => (
                  <Chip key={opt} label={opt} selected={outdoor === opt} onClick={() => setOutdoor(opt)} color="#4ade80" />
                ))}
              </div>
            </Field>

            <Field label={`Budget — up to $${budget}`}>
              <input type="range" min={5} max={200} step={5} value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#f59e0b" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>
                <span>$5</span><span>$200</span>
              </div>
            </Field>

            <Field label={`Time available — ${time} hour${time !== 1 ? "s" : ""}`}>
              <input type="range" min={0.5} max={6} step={0.5} value={time}
                onChange={e => setTime(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#fb923c" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>
                <span>30 min</span><span>6 hrs</span>
              </div>
            </Field>

            <Field label={`Search radius — ${radius / 1000}km`}>
              <input type="range" min={1000} max={20000} step={1000} value={radius}
                onChange={e => setRadius(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#4ade80" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginTop: 4 }}>
                <span>1km</span><span>20km</span>
              </div>
            </Field>

            <button
              onClick={handleSubmit}
              disabled={!ready}
              style={{
                marginTop: 8,
                padding: "18px 32px",
                background: ready ? "linear-gradient(135deg, #a78bfa, #60a5fa)" : "rgba(255,255,255,0.06)",
                border: "none",
                borderRadius: 12,
                color: ready ? "#0a0a0f" : "#374151",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "monospace",
                letterSpacing: "0.05em",
                cursor: ready ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                textTransform: "uppercase",
              }}
            >
              Find My Activities →
            </button>
            {!ready && (
              <p style={{ textAlign: "center", color: "#4b5563", fontSize: 12, fontFamily: "monospace", marginTop: -20 }}>
                select mood, group, and indoor/outdoor to continue
              </p>
            )}
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 40, marginBottom: 24 }}>
              <LoadingDots />
            </div>
            <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: 13 }}>
              Scanning nearby places...
            </p>
            <p style={{ color: "#4b5563", fontFamily: "monospace", fontSize: 12, marginTop: 8 }}>
              Asking Claude to rank results for you
            </p>
          </div>
        )}

        {/* RESULTS */}
        {step === "results" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 32 }}>
              <h2 style={{ fontWeight: 400, fontSize: 24, margin: 0 }}>
                Top picks for a <em style={{ color: "#a78bfa" }}>{mood.toLowerCase()}</em> {time}hr {groupType.toLowerCase()}
              </h2>
              <button onClick={() => setStep("form")} style={{
                background: "none", border: "1px solid rgba(255,255,255,0.1)",
                color: "#6b7280", padding: "6px 14px", borderRadius: 6,
                cursor: "pointer", fontFamily: "monospace", fontSize: 12,
              }}>
                ← Redo
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {recommendations.map((r, i) => {
                const color = colors[i] || "#4ade80";
                return (
                  <div key={i}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: `1px solid ${expanded === i ? color + "44" : "rgba(255,255,255,0.07)"}`,
                      borderRadius: 14,
                      padding: "20px 24px",
                      cursor: "pointer",
                      transition: "all 0.25s",
                      boxShadow: expanded === i ? `0 0 40px ${color}11` : "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                      <div style={{
                        minWidth: 36, height: 36, borderRadius: "50%",
                        background: `${color}22`,
                        border: `1px solid ${color}66`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700, color: color, fontFamily: "monospace",
                      }}>
                        {r.rank}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 2 }}>{r.name}</div>
                            <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace" }}>{r.address}</div>
                          </div>
                          <div style={{
                            background: `${color}22`, border: `1px solid ${color}55`,
                            borderRadius: 6, padding: "4px 10px",
                            fontSize: 12, fontFamily: "monospace", color: color, fontWeight: 700,
                            whiteSpace: "nowrap", marginLeft: 12,
                          }}>
                            {r.match_score}% match
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                          <span style={{
                            fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
                            background: r.open_now === true ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)",
                            borderRadius: 4, padding: "3px 8px",
                            color: r.open_now === true ? "#4ade80" : "#9ca3af",
                            textTransform: "uppercase",
                          }}>
                            {r.open_now === true ? "● Open Now" : "● Hours Unknown"}
                          </span>
                          {r.rating && r.rating !== "No rating" && (
                            <span style={{
                              fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em",
                              background: "rgba(255,255,255,0.05)", borderRadius: 4,
                              padding: "3px 8px", color: "#9ca3af", textTransform: "uppercase",
                            }}>
                              ★ {r.rating}
                            </span>
                          )}
                        </div>

                        {expanded === i && (
                          <div style={{
                            marginTop: 16,
                            padding: "14px 16px",
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: 8,
                            borderLeft: `3px solid ${color}`,
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "#c9c5be",
                            fontStyle: "italic",
                          }}>
                            <span style={{ fontSize: 11, fontFamily: "monospace", color: "#6b7280", fontStyle: "normal", display: "block", marginBottom: 6 }}>
                              WHY CLAUDE PICKED THIS FOR YOU
                            </span>
                            {r.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p style={{ textAlign: "center", color: "#374151", fontSize: 11, fontFamily: "monospace", marginTop: 32 }}>
              click any card to see why claude chose it · powered by google places + claude api
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }
        input[type=range] { -webkit-appearance: none; appearance: none; height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: currentColor; cursor: pointer; }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{
        fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase",
        color: "#6b7280", fontFamily: "monospace", marginBottom: 12,
      }}>{label}</div>
      {children}
    </div>
  );
}

function Chip({ label, selected, onClick, color }) {
  return (
    <button onClick={onClick} style={{
      padding: "8px 16px",
      borderRadius: 100,
      border: `1px solid ${selected ? color : "rgba(255,255,255,0.1)"}`,
      background: selected ? `${color}22` : "transparent",
      color: selected ? color : "#6b7280",
      fontSize: 13,
      fontFamily: "monospace",
      cursor: "pointer",
      transition: "all 0.15s",
      fontWeight: selected ? 600 : 400,
    }}>
      {label}
    </button>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "#a78bfa",
          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}
