
(function(){
  // --- Konami code sequence ---
  const KONAMI = ["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"];
  const buffer = [];
  let cseInjected = false;

  // --- create overlay for search ---
  const overlay = document.createElement('div');
  overlay.id = "cse-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    display: "none",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 20px",
    background: "rgba(0,0,0,0.6)",
    zIndex: "9999",
    backdropFilter: "blur(4px)"
  });

  const card = document.createElement('div');
  card.id = "cse-card";
  Object.assign(card.style, {
    width: "min(1000px,96%)",
    maxHeight: "85vh",
    overflow: "auto",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    padding: "18px",
    position: "relative"
  });
  overlay.appendChild(card);

  // --- close button ---
  const closeBtn = document.createElement('button');
  closeBtn.id = "cse-close";
  closeBtn.textContent = "Close";
  Object.assign(closeBtn.style, {
    position: "absolute",
    right: "28px",
    top: "24px",
    background: "#111",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  });
  closeBtn.onclick = () => overlay.style.display = 'none';
  card.appendChild(closeBtn);

  // --- div where CSE will appear ---
  const searchDiv = document.createElement('div');
  searchDiv.className = "gcse-search";
  card.appendChild(searchDiv);

  document.body.appendChild(overlay);

  // --- inject Google CSE script ---
  function injectCSE(){
    if(cseInjected) return;
    cseInjected = true;

    
    const CX = "c45cd8cfdc3db40fe";

    
    if(!CX || CX === "YOUR_CX_HERE"){
      const msg = document.createElement('div');
      msg.innerHTML = "<strong>Replace</strong> YOUR_CX_HERE with your CSE ID!";
      msg.style.padding = "12px 0 8px";
      searchDiv.prepend(msg);
      return;
    }

    const s = document.createElement('script');
    s.src = "https://cse.google.com/cse.js?cx=" + encodeURIComponent(CX);
    s.async = true;
    document.head.appendChild(s);
  }

  // --- show overlay and focus search input ---
  function showOverlay(){
    overlay.style.display = 'flex';
    const input = overlay.querySelector('input');
    if(input) input.focus();
  }

  // --- keyboard listener ---
  window.addEventListener('keydown', (e) => {
    buffer.push(e.key.toLowerCase());
    if(buffer.length > KONAMI.length) buffer.shift();
    if(buffer.length === KONAMI.length && KONAMI.every((k,i)=>buffer[i]===k)){
      injectCSE();
      showOverlay();
      buffer.length = 0;
    }
    if(e.key === 'Escape' && overlay.style.display === 'flex'){
      overlay.style.display = 'none';
    }
  });

  // --- click outside card closes overlay ---
  overlay.addEventListener('click', (ev) => {
    if(ev.target === overlay) overlay.style.display = 'none';
  });

})();
