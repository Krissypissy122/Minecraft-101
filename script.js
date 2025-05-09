const guides = [
  {
    title: "Redstone Triple Door",
    category: "Redstone",
    content: "Lag en skjult tredobbel stempel-dør med redstone, observers og slime blocks.",
    image: "https://i.imgur.com/yourImage1.jpg"
  },
  {
    title: "Enderman XP Farm",
    category: "Farming",
    content: "Effektiv XP-farm i The End med blader og endermite som agn.",
    image: "https://i.imgur.com/yourImage2.jpg"
  },
  {
    title: "Nether Portal Optimalisering",
    category: "Exploration",
    content: "Bruk 1:8-forholdet mellom Nether og Overworld for smart portalplassering.",
    image: "https://i.imgur.com/yourImage3.jpg"
  },
  {
    title: "Kommandoblokk Timer",
    category: "Commands",
    content: "Lag en løkke med kommandoblokker som kjører automatiske funksjoner.",
    image: "https://i.imgur.com/yourImage4.jpg"
  },
  {
    title: "Overlevelsesbase i fjell",
    category: "Projects",
    content: "Bygg en imponerende fjellbase med lagringsrom, gårder og portaler innebygd i steinen.",
    image: "https://i.imgur.com/yourImage5.jpg"
  },
  {
    title: "Automatisk matfabrikk",
    category: "Projects",
    content: "Bygg en fabrikk som kombinerer redstone og bønder for å produsere og koke mat automatisk.",
    image: "https://i.imgur.com/yourImage6.jpg"
  },
  {
    title: "Kreativt Luftskip",
    category: "Creative",
    content: "Design et gigantisk luftskip med interiør, kanoner og drivsystem – perfekt for eventyrverden.",
    image: "https://i.imgur.com/yourImage7.jpg"
  },
  {
    title: "Underjordisk Eventyrkart",
    category: "Creative",
    content: "Lag en temabasert dungeon med loot, gåter og bosskamper for multiplayeropplevelser.",
    image: "https://i.imgur.com/yourImage8.jpg"
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
      <img src="${guide.image}" alt="${guide.title}" style="width:100%; height:auto;">
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

window.onload = filterGuides;
