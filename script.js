// ===============================
// PERSONALIZE YOUR WEBSITE HERE
// ===============================
const CONFIG = {
  herName: "SAFIYA",
  yourName: "THANVEER",
  birthday: "2007-10-4", // YYYY-MM-DDTHH:MM:SS
  photos: [
    {src:"assets/images/placeholder.svg", caption:"That smile ❤️"},
    {src:"assets/images/photo2.jpg", caption:"One of my favorite memories."},
    {src:"assets/images/photo3.jpg", caption:"Us ❤️"},
    {src:"assets/images/photo4.jpg", caption:"A moment I'll never forget."},
    {src:"assets/images/photo5.jpg", caption:"Beautiful, always."},// {src:"assets/images/photo1.jpg", caption:"That smile ❤️"},
    {src:"assets/images/photo6.jpg", caption:"A memory worth keeping."},
    {src:"assets/images/photo7.jpg", caption:"My favorite view."},
    {src:"assets/images/photo8.jpg", caption:"Just you being you."},
    {src:"assets/images/photo9.jpg", caption:"Another little forever."},
    {src:"assets/images/photo10.jpg", caption:"One more beautiful memory."}
  ],
  story: [
    { title:"The Day We Met", text:"I saw a girl in uniform who is looking at me with LOVE."},
    { title:"The Day You Became Special", text:"Write about the moment you realized she was important to you."},
    { title:"Our Favorite Memory", text:"Add a memory that you never want to forget."},
    { title:"A Moment I'll Always Remember", text:"Add another meaningful moment here."}
  ],
  reasons: [
    ["😊","Your Smile"],["💗","Your Kind Heart"],["😂","The Way You Make Me Laugh"],
    ["✨","Your Beautiful Personality"],["🌷","The Way You Care"],["❤️","Simply... You"]
  ],
  letter: `My Love,

Happy Birthday to the most beautiful person in my life.

I don't know if words will ever be enough to explain how special you are to me, but today I want to try.

Thank you for all the smiles, memories, conversations, little moments, and happiness you've brought into my life.

You have a way of making ordinary days feel special just by being there.

I hope this new year of your life brings you everything your heart wishes for.

Keep smiling.
Keep being the beautiful person you are.

And no matter how many birthdays come and go, I hope I get to be there to celebrate many more of them with you.

Happy Birthday,SAFIYA. ❤️

With all my love,
THANVEER`
};

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const savedHerName = localStorage.getItem("birthdayHerName");
if(savedHerName){ CONFIG.herName=savedHerName; const nameInput=$("#herNameInput"); if(nameInput) nameInput.value=savedHerName; }

function escapeHtml(value){ const d=document.createElement("div"); d.textContent=value; return d.innerHTML; }

function applyPersonalization(){
  document.title = `For ${CONFIG.herName} ❤️`;
  document.querySelectorAll(".page").forEach(p=>p.dataset.ready="true");
  document.querySelector("#page2 h2").innerHTML = `Happy Birthday,<br><span>My Love, ${escapeHtml(CONFIG.herName)} ❤️</span>`;
  document.querySelector("#page9 h2").innerHTML = `One Last <span>Thing...</span>`;
  const opening=document.querySelector("#page1 h1"); if(opening) opening.innerHTML=`Hey ${escapeHtml(CONFIG.herName)} <span>❤️</span>`;
  renderGallery(); renderTimeline(); renderReasons(); renderCollage(); renderLetter();
}
function imageHTML(item, slot, caption){
  return `<label class="upload-photo" onclick="event.stopPropagation()"><input class="photo-upload" data-slot="${slot}" type="file" accept="image/*"><img src="${item.src}" alt="${caption || item.caption || 'Photo'}" onerror="this.src='assets/images/placeholder.svg'"><span class="upload-badge">＋ Change photo</span></label>`;
}
function renderGallery(){
  $("#gallery").innerHTML = CONFIG.photos.slice(0,10).map((p,i)=>`
    <div class="memory" data-index="${i}">${imageHTML(p, 'gallery-'+i, p.caption)}<p>${p.caption}</p></div>`).join("");
  bindUploads();
  $$(".memory").forEach(card=>card.onclick=()=>{
    const p=CONFIG.photos[+card.dataset.index];
    $("#lightboxImg").src=p.src; $("#lightboxImg").onerror=()=>$("#lightboxImg").src="assets/images/placeholder.svg";
    $("#lightboxCaption").textContent=p.caption; $("#lightbox").classList.add("show");
  });
}
function renderTimeline(){
  $("#timeline").innerHTML=CONFIG.story.map(e=>`
    <div class="event"><div class="date">${e.date}</div><h3>${e.title}</h3><p>${e.text}</p></div>
  `).join("");
}
function renderReasons(){
  $("#reasons").innerHTML=CONFIG.reasons.map(r=>`
    <div class="reason"><div class="icon">${r[0]}</div><h3>${r[1]}</h3></div>
  `).join("");
}
function renderCollage(){
  $("#collage").innerHTML = CONFIG.photos.slice(0,6).map((p,i)=>`
    <div class="tile" style="left:${[4,38,68,18,52,72][i]}%;top:${[20,80,25,300,350,430][i]}px;transform:rotate(${[-4,3,-2,4,-3,2][i]}deg)">${imageHTML(p, 'collage-'+i, p.caption)}<p>${p.caption}</p></div>`).join("");
  bindUploads();
}
function renderLetter(){
  $("#letter").textContent=CONFIG.letter
    .replaceAll("HER NAME",CONFIG.herName)
    .replaceAll("YOUR NAME",CONFIG.yourName);
}

function goTo(n){
  const current=$(".page.active");
  const next=$("#page"+n);
  if(!next)return;
  current.classList.remove("active");
  next.classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
  spawnParticles(10);
}
$$(".next").forEach(b=>b.addEventListener("click",()=>{
  if(b.dataset.next==="2"){
    const input=$("#herNameInput"); const name=input ? input.value.trim() : "";
    if(!name){ $("#nameError").classList.add("show"); input.focus(); return; }
    CONFIG.herName=name; localStorage.setItem("birthdayHerName",name);
    $("#nameError").classList.remove("show");
    applyPersonalization();
  }
  goTo(+b.dataset.next);
}));

$("#secretBtn").onclick=()=>{
  $("#secretMessage").classList.add("show");
  $("#secretNext").classList.remove("hidden");
  for(let i=0;i<18;i++) setTimeout(()=>spawnParticle("❤️"),i*80);
};

$("#envelope").onclick=()=>{
  $("#envelope .envelope").classList.add("open");
  setTimeout(()=>$("#letter").classList.remove("hidden"),650);
  setTimeout(()=>$("#letter").scrollIntoView({behavior:"smooth",block:"center"}),750);
};

$("#restart").onclick=()=>{
  $("#letter").classList.add("hidden");
  $("#envelope .envelope").classList.remove("open");
  $("#page9").scrollTo({top:0,behavior:"smooth"});
};

$("#closeLightbox").onclick=()=>$("#lightbox").classList.remove("show");
$("#lightbox").onclick=e=>{if(e.target.id==="lightbox")$("#lightbox").classList.remove("show")};

let musicOn=false;
$("#musicBtn").onclick=async()=>{
  const audio=$("#bgMusic");
  if(!musicOn){try{await audio.play();musicOn=true;$("#musicBtn").textContent="❚❚"}catch(e){alert("Add your own music as assets/music.mp3, then press the music button again.")}}
  else{audio.pause();musicOn=false;$("#musicBtn").textContent="♫"}
};

function updateCountdown(){
  const target=new Date(CONFIG.birthday).getTime(), now=Date.now(), diff=Math.max(0,target-now);
  const d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000), m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
  $("#countdown").innerHTML=[["Days",d],["Hours",h],["Minutes",m],["Seconds",s]].map(x=>`<div class="time-box"><b>${String(x[1]).padStart(2,"0")}</b><small>${x[0]}</small></div>`).join("");
  if(diff===0) $("#countdown").innerHTML=`<h3 style="font:3rem 'Great Vibes';color:#e7a9b7">IT'S YOUR DAY! 🎂❤️</h3>`;
}
setInterval(updateCountdown,1000); updateCountdown();

function spawnParticle(symbol="♥"){
  const el=document.createElement("div"); el.className="particle"; el.textContent=symbol;
  el.style.left=Math.random()*100+"vw"; el.style.top=(90+Math.random()*15)+"vh";
  el.style.fontSize=(10+Math.random()*18)+"px"; el.style.animationDuration=(5+Math.random()*6)+"s";
  $("#particles").appendChild(el); setTimeout(()=>el.remove(),12000);
}
function spawnParticles(n=6){for(let i=0;i<n;i++)setTimeout(()=>spawnParticle(Math.random()>.35?"♥":"✦"),i*180)}
setInterval(()=>spawnParticle(Math.random()>.3?"♥":"✦"),1800);

function savePhoto(slot, dataUrl){ localStorage.setItem("birthdayPhoto_"+slot, dataUrl); }
function getSavedPhoto(slot){ return localStorage.getItem("birthdayPhoto_"+slot); }
function bindUploads(){
  $$(".photo-upload").forEach(input=>{
    input.onchange=e=>handlePhotoUpload(e);
    const saved=getSavedPhoto(input.dataset.slot);
    if(saved){ const img=input.parentElement.querySelector("img"); if(img) img.src=saved; }
  });
}
function handlePhotoUpload(event){
  const input=event.target, file=input.files && input.files[0]; if(!file) return;
  if(!file.type.startsWith("image/")){ alert("Please choose an image file."); return; }
  const reader=new FileReader();
  reader.onload=()=>{
    const dataUrl=reader.result; savePhoto(input.dataset.slot,dataUrl);
    const img=input.parentElement.querySelector("img"); if(img) img.src=dataUrl;
    const slot=input.dataset.slot;
    if(slot.startsWith("gallery-")){ const i=+slot.split("-")[1]; CONFIG.photos[i].src=dataUrl; }
    if(slot.startsWith("collage-")){ const i=+slot.split("-")[1]; CONFIG.photos[i].src=dataUrl; }
    if(slot==="hero"){ const hero=$("#heroPhoto"); if(hero) hero.src=dataUrl; }
  }; reader.readAsDataURL(file);
}
function restoreHeroPhoto(){ const saved=getSavedPhoto("hero"); if(saved && $("#heroPhoto")) $("#heroPhoto").src=saved; }

restoreHeroPhoto();
applyPersonalization();


// Your name personalization
(function () {
  const input = document.getElementById("yourNameInput");
  if (!input) return;

  const saved = localStorage.getItem("birthday_your_name");
  if (saved) input.value = saved;

  input.addEventListener("input", () => {
    localStorage.setItem("birthday_your_name", input.value.trim());
    updateYourName();
  });

  function updateYourName() {
    const name = input.value.trim() || "[YOUR NAME]";
    document.querySelectorAll("[data-your-name]").forEach(el => {
      el.textContent = name;
    });
  }

  updateYourName();
  window.updateYourName = updateYourName;
})();


// Birthday date personalization
(function () {
  const input = document.getElementById("birthdayInput");
  if (!input) return;

  const saved = localStorage.getItem("birthday_date_selected");
  if (saved) input.value = saved;

  input.addEventListener("change", () => {
    localStorage.setItem("birthday_date_selected", input.value);
    updateBirthdayDate();
    // Refresh countdown if the existing site exposes a countdown initializer.
    if (typeof window.startCountdown === "function") {
      window.startCountdown();
    }
  });

  function updateBirthdayDate() {
    const value = input.value;
    if (!value) return;

    const d = new Date(value + "T00:00:00");
    const formatted = d.toLocaleDateString(undefined, {
      day: "numeric", month: "long", year: "numeric"
    });

    document.querySelectorAll("[data-birthday-date]").forEach(el => {
      el.textContent = formatted;
    });
  }

  updateBirthdayDate();
  window.getSelectedBirthday = () => input.value;
})();
