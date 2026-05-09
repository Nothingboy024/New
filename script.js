const ADMIN_PASSWORD = "admin123";

// Login
function checkPassword(){
  let p=document.getElementById("adminPass").value;
  if(p===ADMIN_PASSWORD){
    loginBox.style.display="none";
    adminPanel.style.display="block";
  }else alert("Wrong password");
}

// Add Episode
function addEpisode(){
  let a=anime.value;
  let p=poster.value;
  let e=episode.value;
  let l480=link480.value;
  let l720=link720.value;
  let l1080=link1080.value;

  let data=JSON.parse(localStorage.getItem("animeData"))||{};

  if(!data[a]) data[a]={poster:p, episodes:[]};

  data[a].episodes.push({ep:e,l480,l720,l1080});
  localStorage.setItem("animeData",JSON.stringify(data));
  alert("Added!");
}

// Home Page Cards
if(document.getElementById("animeGrid")){
  loadCards();
}

function loadCards(){
  let grid=document.getElementById("animeGrid");
  let data=JSON.parse(localStorage.getItem("animeData"))||{};

  for(let a in data){
    let card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${data[a].poster}">
      <h3>${a}</h3>
    `;
    card.onclick=()=>{
      window.location.href=`anime.html?name=${encodeURIComponent(a)}`;
    };
    grid.appendChild(card);
  }
}

// Episodes Page
if(window.location.pathname.includes("anime.html")){
  loadEpisodesPage();
}

function loadEpisodesPage(){
  let params=new URLSearchParams(window.location.search);
  let anime=params.get("name");

  let data=JSON.parse(localStorage.getItem("animeData"));
  let container=document.getElementById("episodeList");
  let title=document.getElementById("animeTitle");

  title.innerText=anime;

  data[anime].episodes.forEach(e=>{
    let div=document.createElement("div");
    div.className="anime-card";
    div.innerHTML=`
      <h3>Episode ${e.ep}</h3>
      <a href="${e.l480}">Download 480p</a><br>
      <a href="${e.l720}">Download 720p</a><br>
      <a href="${e.l1080}">Download 1080p</a>
      <hr>
    `;
    container.appendChild(div);
  });
}

// Search
function searchAnime(){
  let s=search.value.toLowerCase();
  document.querySelectorAll(".card").forEach(c=>{
    c.style.display=c.innerText.toLowerCase().includes(s)?"block":"none";
  });
}
