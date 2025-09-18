
const cases = [
  { id: 'CASE-001', title: 'Undangan Terakhir', summary: 'Kasus pengantin wanita...' },
  { id: 'CASE-002', title: 'Kejadian Motel', summary: 'Kasus di motel...' },
  { id: 'CASE-003', title: 'Laporan Pencurian', summary: 'Kasus pencurian...' },
  { id: 'CASE-004', title: 'Kasus Baru', summary: 'Kasus yang baru masuk.' }
];

let unread = 0;
let currentUser = null;

function $(sel){return document.querySelector(sel);}
function renderList(){
  const ul = $('#casesList');
  ul.innerHTML = '';
  cases.forEach((c,i)=>{
    const li = document.createElement('li');
    li.textContent = c.id + ' — ' + c.title;
    li.dataset.id = c.id;
    if(i === cases.length-1) li.classList.add('bottom-most');
    li.addEventListener('click', ()=>openCase(c.id));
    ul.appendChild(li);
  });
}

function openCase(id){
  const c = cases.find(x=>x.id===id);
  $('#caseTitle').textContent = c.id + ' — ' + c.title;
  $('#caseDetail').innerHTML = `<div class="card"><h3>${c.title}</h3><p><strong>Code:</strong> ${c.id}</p><p>${c.summary}</p></div>`;
}

document.getElementById('loginBtn').addEventListener('click', ()=>{
  const email = $('#email').value.trim();
  const pass = $('#password').value;
  if(!email.endsWith('@email.com')){ alert('Gunakan email berakhiran @email.com'); return; }
  if(pass.length < 3){ alert('Password terlalu pendek'); return; }
  // login success (dummy)
  currentUser = email;
  $('#login-screen').classList.add('hidden');
  $('#app').classList.remove('hidden');
  // show welcome modal
  $('#welcomeModal').classList.remove('hidden');
  renderList();
});

document.getElementById('welcomeOk').addEventListener('click', ()=>{
  $('#welcomeModal').classList.add('hidden');
  // after closing welcome, show bell +1 for new cases if any simulated earlier
  updateBell();
});

function updateBell(){
  const badge = $('#bellBadge');
  if(unread>0){ badge.textContent = unread; badge.classList.remove('hidden'); }
  else badge.classList.add('hidden');
}

document.getElementById('simulateNew').addEventListener('click', ()=>{
  // Add a new case to top and increment unread
  const newId = 'CASE-' + String(Math.floor(Math.random()*900+100));
  const newCase = { id: newId, title: 'Laporan Baru', summary: 'Detail laporan baru masuk.' };
  cases.push(newCase); // as requested, new case goes to bottom-most per description; you can change to unshift if needed
  unread += 1;
  updateBell();
  renderList();
});

document.getElementById('notifBell').addEventListener('click', ()=>{
  if(unread === 0){ alert('Tidak ada notifikasi baru'); return; }
  // open the newest case (bottom-most per description)
  const newest = cases[cases.length-1];
  openCase(newest.id);
  unread = 0;
  updateBell();
});

// initial render (if app was shown directly)
renderList();
