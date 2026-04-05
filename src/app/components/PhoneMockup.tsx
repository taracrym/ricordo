"use client"
import { useState, useEffect } from "react"

const files = [
  { emoji: "🎬", name: "Reel_01.mp4",          sub: "45 MB" },
  { emoji: "📱", name: "TikTok_02.mp4",         sub: "38 MB" },
  { emoji: "📄", name: "Caption_Options.doc",   sub: "12 KB" },
  { emoji: "📁", name: "Raw_Footage",           sub: "folder" },
]

export default function PhoneMockup() {
  const [lit, setLit] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setLit(n => (n + 1) % files.length), 1100)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingBottom: "60px" }}>

      {/* Outer glow */}
      <div style={{
        position: "relative",
        filter: "none",
        animation: "phone-float 4s ease-in-out infinite",
      }}>

        {/* Phone frame */}
        <div style={{
          width: "252px",
          borderRadius: "44px",
          background: "linear-gradient(160deg, #E8E3DC 0%, #C8C2BA 100%)",
          padding: "3px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.15)",
        }}>

          {/* Side buttons */}
          <div style={{ position:"absolute", left:"-3px", top:"96px",  width:"3px", height:"26px", background:"#B8B2AA", borderRadius:"2px 0 0 2px" }} />
          <div style={{ position:"absolute", left:"-3px", top:"132px", width:"3px", height:"38px", background:"#B8B2AA", borderRadius:"2px 0 0 2px" }} />
          <div style={{ position:"absolute", left:"-3px", top:"180px", width:"3px", height:"38px", background:"#B8B2AA", borderRadius:"2px 0 0 2px" }} />
          <div style={{ position:"absolute", right:"-3px", top:"130px", width:"3px", height:"52px", background:"#B8B2AA", borderRadius:"0 2px 2px 0" }} />

          {/* Screen */}
          <div style={{
            borderRadius: "42px",
            overflow: "hidden",
            background: "#F5F5F7",
            height: "530px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}>

            {/* Status bar */}
            <div style={{ background:"#F5F5F7", padding:"14px 20px 4px", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, position:"relative" }}>
              {/* Notch */}
              <div style={{ position:"absolute", top:"0", left:"50%", transform:"translateX(-50%)", width:"100px", height:"24px", background:"#000", borderRadius:"0 0 16px 16px" }} />
              <span style={{ fontSize:"11px", fontWeight:600, color:"#133951", zIndex:1 }}>9:05</span>
              <div style={{ display:"flex", gap:"5px", alignItems:"center", zIndex:1 }}>
                <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                  <rect x="0" y="6" width="3" height="5" rx="0.5" fill="#133951"/>
                  <rect x="4" y="4" width="3" height="7" rx="0.5" fill="#133951"/>
                  <rect x="8" y="2" width="3" height="9" rx="0.5" fill="#133951"/>
                  <rect x="12" y="0" width="3" height="11" rx="0.5" fill="#133951" opacity="0.3"/>
                </svg>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M7 2.5C9.2 2.5 11.1 3.4 12.5 4.8L14 3.3C12.2 1.5 9.7 0.5 7 0.5C4.3 0.5 1.8 1.5 0 3.3L1.5 4.8C2.9 3.4 4.8 2.5 7 2.5Z" fill="#133951"/>
                  <path d="M7 5.5C8.4 5.5 9.6 6.1 10.5 7L12 5.5C10.7 4.2 9 3.5 7 3.5C5 3.5 3.3 4.2 2 5.5L3.5 7C4.4 6.1 5.6 5.5 7 5.5Z" fill="#133951"/>
                  <circle cx="7" cy="9.5" r="1.5" fill="#133951"/>
                </svg>
                <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
                  <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="#133951" strokeOpacity="0.35"/>
                  <rect x="2" y="2" width="14" height="7" rx="1.5" fill="#133951"/>
                  <path d="M19.5 3.5v4a1.5 1.5 0 0 0 0-4z" fill="#133951" fillOpacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Email nav bar */}
            <div style={{ background:"#F5F5F7", padding:"6px 16px 8px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid #E5E5EA", flexShrink:0 }}>
              <span style={{ fontSize:"20px", color:"#007AFF" }}>‹</span>
              <div style={{ display:"flex", gap:"16px" }}>
                {["✉️","⬜","•••"].map((ic,i) => <span key={i} style={{ fontSize:"14px", color:"#8E8E93" }}>{ic}</span>)}
              </div>
            </div>

            {/* Email content — scrollable area */}
            <div style={{ flex:1, overflowY:"hidden", background:"white" }}>

              {/* Subject */}
              <div style={{ padding:"14px 16px 8px", borderBottom:"1px solid #F0F0F0" }}>
                <div style={{ fontWeight:700, fontSize:"14px", color:"#133951", lineHeight:1.3, marginBottom:"10px" }}>
                  Your content is ready! ⭐
                </div>
                {/* Sender */}
                <div style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                  <div style={{ width:"34px", height:"34px", borderRadius:"50%", flexShrink:0, background:"#133951", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"'Montserrat', system-ui", fontWeight:900, fontSize:"16px", color:"#F3C12C", letterSpacing:"-0.04em", lineHeight:1 }}>r</span>
                  </div>
                  <div>
                    <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
                      <span style={{ fontWeight:600, fontSize:"12px", color:"#133951" }}>Tara</span>
                      <span style={{ fontSize:"11px", color:"#8E8E93" }}>· 9:04 AM</span>
                    </div>
                    <div style={{ fontSize:"10px", color:"#8E8E93" }}>tara@ricordosocial.com</div>
                  </div>
                  <span style={{ marginLeft:"auto", fontSize:"16px", color:"#8E8E93" }}>↩</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding:"12px 16px 10px", fontSize:"12px", color:"#3A3A3C", lineHeight:1.6 }}>
                Hey! Here&apos;s your edited content, ready to post.
              </div>

              {/* Banner */}
              {/* Banner */}
              <div style={{
                margin:"0 16px", borderRadius:"10px", overflow:"hidden",
                height:"72px", marginBottom:"12px", flexShrink:0,
              }}>
                <img src="/banner.jpg" alt="ricordo" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 70%" }} />
              </div>

              {/* Folder */}
              <div style={{ margin:"0 16px 8px", padding:"10px 12px", background:"#F5F5F7", borderRadius:"10px" }}>
                <div style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"10px" }}>
                  <span style={{ fontSize:"24px" }}>📁</span>
                  <div>
                    <div style={{ fontWeight:600, fontSize:"11px", color:"#133951" }}>YourBrand_Content</div>
                    <div style={{ fontSize:"10px", color:"#8E8E93" }}>4 items · Google Drive</div>
                  </div>
                </div>

                {/* Files */}
                <div style={{ display:"flex", flexDirection:"column", gap:"2px" }}>
                  {files.map((f, i) => (
                    <div key={i} style={{
                      display:"flex", alignItems:"center", gap:"8px",
                      padding:"6px 8px", borderRadius:"7px",
                      background: lit === i ? "rgba(239,195,116,0.18)" : "white",
                      transition:"background 0.3s ease",
                      animation: lit === i ? "file-ping 0.6s ease-out" : "none",
                    }}>
                      <span style={{ fontSize:"14px" }}>{f.emoji}</span>
                      <span style={{ fontSize:"11px", color:"#133951", fontWeight: lit === i ? 600 : 400, flex:1 }}>{f.name}</span>
                      <span style={{ fontSize:"9px", color:"#8E8E93" }}>{f.sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <div style={{ margin:"0 16px 10px" }}>
                <div style={{
                  background: "linear-gradient(90deg, #F3C12C 0%, #F5D898 50%, #F3C12C 100%)",
                  backgroundSize: "200% auto",
                  animation: "btn-shimmer 3s linear infinite",
                  borderRadius:"10px", padding:"11px",
                  textAlign:"center", fontWeight:700,
                  fontSize:"12px", color:"#133951", letterSpacing:"0.02em",
                }}>
                  View Content →
                </div>
              </div>

              {/* Sign-off */}
              <div style={{ padding:"0 16px", fontSize:"11px", color:"#8E8E93", lineHeight:1.6 }}>
                Let me know if you need any tweaks.<br/>
                <span style={{ color:"#3A3A3C", fontWeight:500 }}>– Tara</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
