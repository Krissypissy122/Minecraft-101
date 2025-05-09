const guides = [
  {
    title: "Redstone Triple Door",
    category: "Redstone",
    content: "Lag en skjult tredobbel stempel-dør med redstone, observers og slime blocks.",
    videoLink: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Video for Redstone
  },
  {
    title: "Enderman XP Farm",
    category: "Farming",
    content: "Effektiv XP-farm i The End med blader og endermite som agn.",
    videoLink: "https://www.youtube.com/embed/9bZkp7q19f0" // Video for Farming
  },
  {
    title: "Nether Portal Optimalisering",
    category: "Exploration",
    content: "Bruk 1:8-forholdet mellom Nether og Overworld for smart portalplassering.",
    videoLink: "https://www.youtube.com/embed/t7Uxj3vYI2c" // Video for Exploration
  },
  {
    title: "Kommandoblokk Timer",
    category: "Commands",
    content: "Lag en løkke med kommandoblokker som kjører automatiske funksjoner.",
    videoLink: "https://www.youtube.com/embed/abcdefg" // Video for Commands
  },
  {
    title: "Overlevelsesbase i fjell",
    category: "Projects",
    content: "Bygg en imponerende fjellbase med lagringsrom, gårder og portaler innebygd i steinen.",
    videoLink: "https://www.youtube.com/embed/hijklmn" // Video for Projects
  },
  {
    title: "Automatisk matfabrikk",
    category: "Projects",
    content: "Bygg en fabrikk som kombinerer redstone og bønder for å produsere og koke mat automatisk.",
    videoLink: "https://www.youtube.com/embed/pqrstuv" // Video for Projects
  },
  {
    title: "Kreativt Luftskip",
    category: "Creative",
    content: "Design et gigantisk luftskip med interiør, kanoner og drivsystem – perfekt for eventyrverden.",
    videoLink: "https://www.youtube.com/embed/wxyz" // Video for Creative
  },
  {
    title: "Underjordisk Eventyrkart",
    category: "Creative",
    content: "Lag en temabasert dungeon med loot, gåter og bosskamper for multiplayeropplevelser.",
    videoLink: "https://www.youtube.com/embed/12345678" // Video for Creative
  }
];

let currentTab = 'all';
const favorites = new Set();

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(btn => {
    if (btn.innerText === tab || (tab === 'all' && btn.innerText === 'Alle')) {
      btn.classList.add('active');
    }
  });
  filterGuides();
  showVideo(tab);
}

function filterGuides() {
  const search = document.getElementById("searchBox").value.toLowerCase();
  const container = document.getElementById("guideList");
  container.innerHTML = "";
  guides.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(search) || g.content.toLowerCase().includes(search);
    const matchesTab = currentTab === 'all' || g.category === currentTab || (currentTab === 'Favorites' && favorites.has(g.title));
    return matchesSearch && matchesTab;
  }).forEach(guide => {
    const div = document.createElement("div");
    div.className = "guide";
    div.innerHTML = `
      <h3>${guide.title}</h3>
      <p><strong>Kategori:</strong> ${guide.category}</p>
      <p>${guide.content}</p>
      <button class="favoriteButton" onclick="toggleFavorite('${guide.title}')">
        ${favorites.has(guide.title) ? '★' : '☆'}
      </button>
    `;
    container.appendChild(div);
  });
}

function toggleFavorite(title) {
  if (favorites.has(title)) {
    favorites.delete(title);
  } else {
    favorites.add(title);
  }
  filterGuides();
}

function showVideo(category) {
  document.querySelectorAll('.videoTab').forEach(tab => tab.style.display = 'none'); // Hide all video tabs
  const videoTab = document.getElementById(`video${category}`);
  if (videoTab) {
    videoTab.style.display = 'block'; // Show the selected video tab
  }
}

window.onload = () => {
  filterGuides();
  showVideo('Redstone'); // Default video on load (Redstone)
};
