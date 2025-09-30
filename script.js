async function loadMenu(path = []) {
  const res = await fetch("menu.json");
  const data = await res.json();

  let current = data;
  for (let p of path) {
    current = current[p];
  }

  const menuDiv = document.getElementById("menu");
  menuDiv.innerHTML = "";

  if (typeof current === "object") {
    Object.keys(current).forEach(key => {
      const value = current[key];
      if (typeof value === "object") {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary btn-menu";
        btn.textContent = key;
        btn.onclick = () => loadMenu([...path, key]);
        menuDiv.appendChild(btn);
      } else {
        const link = document.createElement("a");
        link.href = value;
        link.target = "_blank";
        const btn = document.createElement("button");
        btn.className = "btn btn-success btn-menu";
        btn.textContent = key;
        link.appendChild(btn);
        menuDiv.appendChild(link);
      }
    });

    if (path.length > 0) {
      const backBtn = document.createElement("button");
      backBtn.className = "btn btn-secondary btn-menu btn-back";
      backBtn.textContent = "⬅ بازگشت";
      backBtn.onclick = () => loadMenu(path.slice(0, -1));
      menuDiv.appendChild(backBtn);
    }
  }
}

// شروع
loadMenu();