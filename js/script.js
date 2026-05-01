
// Notifications
function showNotification(message, type = "success"){
  let container = document.querySelector(".notification-container");

  if(!container){
    container = document.createElement("div");
    container.className = "notification-container";
    document.body.appendChild(container);
  }

  const note = document.createElement("div");
  note.className = `notification ${type === "info" ? "info" : ""}`;
  note.textContent = message;

  container.appendChild(note);

  setTimeout(() => {
    note.style.opacity = "0";
    note.style.transform = "translateX(20px)";
    note.style.transition = ".25s ease";

    setTimeout(() => note.remove(), 250);
  }, 2500);
}

function notifyThenGo(message, url, type = "success") {
  showNotification(message, type);
  setTimeout(() => {
    window.location.href = url;
  }, 650);
}

const internships = [
  {title:"Customer Success Intern", company:"Estarta Solutions", initials:"ES", city:"Irbid", work:"Hybrid", duration:"3 months", major:"Business Administration", desc:"Work side by side with technical account managers to support Cisco enterprise customers. Great fit for students with strong English communication.", url:"internships/internship-customer-success.html"},
  {title:"Cloud Infrastructure Intern", company:"Estarta Solutions", initials:"ES", city:"Amman", work:"Onsite", duration:"6 months", major:"Information Technology", desc:"Hands-on with AWS, Cisco Meraki, and observability tooling supporting enterprise customers across the region.", url:"internships/internship-cloud-infrastructure.html"},
  {title:"Mobile Engineering Intern", company:"Maktoob Studio", initials:"MS", city:"Amman", work:"Remote", duration:"3 months", major:"Software Engineering", desc:"Ship features in our React Native apps used across the region. Pair with senior engineers and own real product tasks.", url:"internships/internship-mobile-engineering.html"},
  {title:"Product Design Intern", company:"Maktoob Studio", initials:"MS", city:"Amman", work:"Remote", duration:"4 months", major:"Graphic Design", desc:"Design beautiful interfaces for our consumer apps. Strong Figma skills, attention to typography, and curiosity required.", url:"internships/internship-product-design.html"},
  {title:"Marketing Intern", company:"Arab Bank", initials:"AB", city:"Amman", work:"Hybrid", duration:"3 months", major:"Marketing", desc:"Support brand and digital marketing campaigns across the bank's retail products. You will help with copywriting and reporting.", url:"internships/internship-marketing.html"},
  {title:"Finance Intern", company:"Arab Bank", initials:"AB", city:"Amman", work:"Onsite", duration:"3 months", major:"Finance", desc:"Rotate through corporate finance, treasury, and risk teams at Arab Bank headquarters. Strong analytical thinking preferred.", url:"internships/internship-finance.html"}
];

const allInternships = [
  ...internships,
  {title:"Data Analysis Intern", company:"Orange Jordan", initials:"OJ", city:"Amman", work:"Hybrid", duration:"4 months", major:"Information Technology", desc:"Analyze customer and network data, build dashboards, and support reporting for internal teams.", url:"internships/internship-data-analysis.html"},
  {title:"Backend Developer Intern", company:"Mawdoo3", initials:"MD", city:"Amman", work:"Onsite", duration:"3 months", major:"Software Engineering", desc:"Work with APIs, databases, and backend services used by content and product teams.", url:"internships/internship-backend-developer.html"},
  {title:"HR Intern", company:"Zain Jordan", initials:"ZJ", city:"Amman", work:"Onsite", duration:"2 months", major:"Business Administration", desc:"Support recruitment, onboarding, employee records, and training coordination.", url:"internships/internship-hr.html"},
  {title:"UI Designer Intern", company:"Aspire", initials:"AS", city:"Amman", work:"Remote", duration:"3 months", major:"Graphic Design", desc:"Create clean web and mobile layouts, improve design systems, and prepare handoff files.", url:"internships/internship-ui-designer.html"},
  {title:"Accounting Intern", company:"Housing Bank", initials:"HB", city:"Amman", work:"Onsite", duration:"3 months", major:"Finance", desc:"Assist finance teams with reconciliation, reports, and daily accounting operations.", url:"internships/internship-accounting.html"},
  {title:"Social Media Intern", company:"Jeeny", initials:"JY", city:"Irbid", work:"Hybrid", duration:"2 months", major:"Marketing", desc:"Help plan content, write captions, follow campaign performance, and support brand growth.", url:"internships/internship-social-media.html"}
];

// Theme
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("tadreeb_theme", theme);
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}
setTheme(localStorage.getItem("tadreeb_theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}



// Keep student logged in across public pages
function applyLoggedInNavbar() {
  const role = localStorage.getItem("tadreeb_user_role");
  const initials = localStorage.getItem("tadreeb_user_initials") || "LH";
  const userName = localStorage.getItem("tadreeb_user_name") || "Laith Haddad";
  const navLinks = document.getElementById("navLinks");
  const navActions = document.querySelector(".nav-actions");

  if (role !== "student" || !navLinks || !navActions) return;

  const isInsideFolder = location.pathname.includes("/internships/") || location.pathname.includes("/companies/") || location.pathname.includes("/dashboards/");
  const prefix = isInsideFolder ? "../" : "";

  navLinks.innerHTML = `
    <a href="${prefix}dashboards/student-dashboard.html">Dashboard</a>
    <a href="${prefix}internships.html">Find Internships</a>
    <a href="${prefix}companies.html">Companies</a>
    <a href="${prefix}dashboards/student-applications.html">My Applications</a>
    <a href="${prefix}dashboards/student-saved.html">Saved</a>
  `;

  const themeBtn = navActions.querySelector("#themeToggle");
  const menuBtn = navActions.querySelector("#menuBtn");

  navActions.innerHTML = "";
  if (themeBtn) navActions.appendChild(themeBtn);

  const profileWrap = document.createElement("div");
  profileWrap.className = "profile-wrap";

  const avatar = document.createElement("button");
  avatar.className = "user-avatar";
  avatar.textContent = initials;
  avatar.title = "Student account";

  const menu = document.createElement("div");
  menu.className = "profile-menu";
  menu.innerHTML = `
    <strong>${userName}</strong>
    <span>STUDENT</span>
    <hr>
    <a href="${prefix}dashboards/student-profile.html">♡ Profile</a>
    <button type="button" id="logoutBtn">↪ Sign out</button>
  `;

  profileWrap.appendChild(avatar);
  profileWrap.appendChild(menu);
  navActions.appendChild(profileWrap);

  avatar.addEventListener("click", (e) => {
    e.stopPropagation();
    profileWrap.classList.toggle("open");
  });

  menu.querySelector("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("tadreeb_user_role");
    localStorage.removeItem("tadreeb_user_initials");
    localStorage.removeItem("tadreeb_user_name");
    notifyThenGo("Signed out", `${prefix}index.html`, "info");
  });

  document.addEventListener("click", () => {
    profileWrap.classList.remove("open");
  });

  if (menuBtn) navActions.appendChild(menuBtn);
}
applyLoggedInNavbar();

// Home featured cards
const grid = document.getElementById("internshipGrid");

function renderHomeCards() {
  if (!grid) return;
  grid.innerHTML = internships.slice(0, 6).map(item => `
    <a class="internship-card card-link" href="${item.url}">
      <div class="card-head">
        <div class="avatar">${item.initials}</div>
        <div>
          <h3>${item.title}</h3>
          <span class="company">${item.company}</span>
        </div>
      </div>
      <div class="tags">
        <span class="tag">⌾ ${item.city}</span>
        <span class="tag work">${item.work}</span>
        <span class="tag duration">${item.duration}</span>
        <span class="tag">${item.major}</span>
      </div>
      <p>${item.desc}</p>
      <div class="card-foot">
        <span>9 min ago</span>
        <span class="view">View →</span>
      </div>
    </a>
  `).join("");
}
renderHomeCards();

// Full internships page
const internshipList = document.getElementById("internshipList");
const resultCount = document.getElementById("resultCount");
const listSearch = document.getElementById("listSearch");
const listMajor = document.getElementById("listMajor");
const listCity = document.getElementById("listCity");
const listWork = document.getElementById("listWork");
const applyFilters = document.getElementById("applyFilters");
const resetFilters = document.getElementById("resetFilters");

function renderInternshipList() {
  if (!internshipList || !resultCount) return;

  const search = (listSearch?.value || "").toLowerCase();
  const major = listMajor?.value || "all";
  const city = listCity?.value || "all";
  const work = listWork?.value || "all";

  const filtered = allInternships.filter(item => {
    const text = `${item.title} ${item.company} ${item.major} ${item.desc}`.toLowerCase();
    return text.includes(search)
      && (major === "all" || item.major === major)
      && (city === "all" || item.city === city)
      && (work === "all" || item.work === work);
  });

  resultCount.textContent = `Showing ${filtered.length} result${filtered.length === 1 ? "" : "s"}`;

  internshipList.innerHTML = filtered.map(item => `
    <a class="list-card card-link" href="${item.url}">
      <div class="avatar">${item.initials}</div>
      <div>
        <h3>${item.title}</h3>
        <span class="company">${item.company}</span>
        <div class="tags">
          <span class="tag">⌾ ${item.city}</span>
          <span class="tag work">${item.work}</span>
          <span class="tag duration">${item.duration}</span>
          <span class="tag">${item.major}</span>
        </div>
        <p>${item.desc}</p>
        <div class="card-foot">
          <span>1h ago</span>
          <span class="view">View →</span>
        </div>
      </div>
    </a>
  `).join("") || `<div class="empty-list">No internships found. Try changing your filters.</div>`;
}

if (internshipList) {
  renderInternshipList();
  applyFilters?.addEventListener("click", renderInternshipList);
  [listSearch, listMajor, listCity, listWork].forEach(el => {
    if (el) el.addEventListener("input", renderInternshipList);
  });
  resetFilters?.addEventListener("click", () => {
    listSearch.value = "";
    listMajor.value = "all";
    listCity.value = "all";
    listWork.value = "all";
    renderInternshipList();
  });
}

// Modals
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = document.getElementById(btn.dataset.open);
    if (modal) modal.showModal();
  });
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Demo login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = {
      "admin@internjo.jo": { password: "admin123", page: "dashboards/admin-dashboard.html", role: "admin", initials: "PA", name: "Platform Admin" },
      "student@ju.edu.jo": { password: "student123", page: "dashboards/student-dashboard.html", role: "student", initials: "LH", name: "Laith Haddad" },
      "hr@aramex.com": { password: "company123", page: "dashboards/company-dashboard.html", role: "company", initials: "AH", name: "Aramex HR" }
    };

    if (users[email] && users[email].password === password) {
      localStorage.setItem("tadreeb_user_role", users[email].role);
      localStorage.setItem("tadreeb_user_initials", users[email].initials);
      localStorage.setItem("tadreeb_user_name", users[email].name || "Laith Haddad");
      notifyThenGo("Welcome back!", users[email].page);
    } else {
      showNotification("Wrong email or password", "info");
    }
  });
}

// Signup role switch
const signupForm = document.getElementById("signupForm");
const roleCards = document.querySelectorAll(".role-card");
const studentFields = document.getElementById("studentFields");
const companyFields = document.getElementById("companyFields");

if (roleCards.length && studentFields && companyFields) {
  roleCards.forEach(card => {
    card.addEventListener("click", () => {
      roleCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      const role = card.dataset.role;
      if (role === "company") {
        studentFields.classList.add("hidden");
        companyFields.classList.remove("hidden");
      } else {
        companyFields.classList.add("hidden");
        studentFields.classList.remove("hidden");
      }
    });
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Account created successfully");
    window.location.href = "login.html";
  });
}


// Profile form demo save
const profileForm = document.getElementById("profileForm");
if (profileForm) {
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showNotification("Profile changes saved!");
  });
}


// Apply + Save internship interactions
function getStoredList(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function setStoredList(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Initialize default saved internships only once
function initializeDefaultStudentData() {
  const savedInitialized = localStorage.getItem("tadreeb_saved_initialized");
  if (!savedInitialized) {
    setStoredList("tadreeb_saved", [
      {
        id:"internship-software-aramex",
        title:"Software Engineering Intern",
        company:"Aramex",
        initials:"A",
        city:"Amman",
        work:"Hybrid",
        duration:"3 months",
        major:"Computer Science",
        desc:"Join the Aramex platform team to build and maintain Node.js microservices powering our shipment tracking experience.",
        url:"../internships/internship-software-aramex.html"
      },
      {
        id:"internship-frontend-orange",
        title:"Frontend Developer Intern",
        company:"Orange Jordan",
        initials:"OJ",
        city:"Amman",
        work:"Remote",
        duration:"3 months",
        major:"Software Engineering",
        desc:"Build customer-facing web experiences with React and TypeScript. Collaborate closely with product designers.",
        url:"../internships/internship-frontend-orange.html"
      }
    ]);
    localStorage.setItem("tadreeb_saved_initialized", "true");
  }
}
initializeDefaultStudentData();


function currentPrefix() {
  return location.pathname.includes("/internships/") || location.pathname.includes("/companies/") || location.pathname.includes("/dashboards/") ? "../" : "";
}

function setupApplyAndSave() {
  const role = localStorage.getItem("tadreeb_user_role");

  document.querySelectorAll(".apply-interaction").forEach(box => {
    const form = box.querySelector(".apply-form");
    const appliedBox = box.querySelector(".already-applied");
    const id = box.dataset.id;

    if (role !== "student") {
      box.innerHTML = `<p>Want to apply? <a href="../login.html">Log in</a> or <a href="../signup.html">create a student account</a>.</p>`;
      return;
    }

    const applications = getStoredList("tadreeb_applications");
    const already = applications.some(item => item.id === id);

    if (already) {
      form.classList.add("hidden");
      appliedBox.classList.remove("hidden");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const applications = getStoredList("tadreeb_applications");
      if (!applications.some(item => item.id === id)) {
        applications.push({
          id,
          title: box.dataset.title,
          company: box.dataset.company,
          initials: box.dataset.initials,
          status: "Pending",
          applied: "Just now",
          url: `../internships/${location.pathname.split("/").pop()}`
        });
        setStoredList("tadreeb_applications", applications);
      }

      form.classList.add("hidden");
      appliedBox.classList.remove("hidden");
      showNotification("Application submitted!");
    });
  });

  document.querySelectorAll(".save-internship-btn").forEach(btn => {
    const id = btn.dataset.id;
    const saved = getStoredList("tadreeb_saved");
    const isSaved = saved.some(item => item.id === id);

    function renderButton(state) {
      btn.classList.toggle("saved", state);
      btn.innerHTML = state ? "♥ Saved" : "♡ Save for later";
    }

    renderButton(isSaved);

    btn.addEventListener("click", () => {
      let savedList = getStoredList("tadreeb_saved");
      const exists = savedList.some(item => item.id === id);

      if (exists) {
        savedList = savedList.filter(item => item.id !== id);
        renderButton(false);
        showNotification("Removed from saved", "info");
      } else {
        savedList.push({
          id,
          title: btn.dataset.title,
          company: btn.dataset.company,
          initials: btn.dataset.initials,
          url: `../internships/${location.pathname.split("/").pop()}`
        });
        renderButton(true);
        showNotification("Saved!");
      }

      setStoredList("tadreeb_saved", savedList);
    });
  });
}

setupApplyAndSave();

function renderApplicationsPage() {
  const rows = document.getElementById("applicationsRows");
  if (!rows) return;

  const base = [
    {title:"Frontend Developer Intern", company:"Orange Jordan", status:"Accepted", applied:"5h ago", url:"../internships/internship-frontend-orange.html"},
    {title:"Software Engineering Intern", company:"Aramex", status:"Pending", applied:"5h ago", url:"../internships/internship-software-aramex.html"}
  ];

  const stored = getStoredList("tadreeb_applications");
  const all = [...base, ...stored.filter(s => !base.some(b => b.title === s.title))];

  rows.innerHTML = all.map(app => {
    let url = app.url || "#";
    if (url.startsWith("/")) {
      const parts = url.split("/internships/");
      url = parts.length > 1 ? `../internships/${parts[1]}` : url;
    }
    return `
      <div class="table-row applications-row">
        <span>${app.title}</span>
        <span>${app.company}</span>
        <span><b class="status ${app.status.toLowerCase()}">${app.status}</b></span>
        <span>${app.applied}</span>
        <a class="table-view-btn" href="${url}">View</a>
      </div>
    `;
  }).join("");
}

renderApplicationsPage();

function renderSavedPage() {
  const savedGrid = document.getElementById("savedGrid");
  if (!savedGrid) return;

  const all = getStoredList("tadreeb_saved");

  if (!all.length) {
    savedGrid.innerHTML = `
      <div class="empty-saved-state">
        <div class="empty-heart">♡</div>
        <h2>No saved internships yet</h2>
        <p>Tap the heart on any internship to save it here.</p>
        <a class="primary" href="../internships.html">Browse internships</a>
      </div>
    `;
    return;
  }

  savedGrid.innerHTML = all.map(item => `
    <a class="internship-card card-link" href="${item.url}">
      <div class="card-head">
        <div class="avatar">${item.initials}</div>
        <div>
          <h3>${item.title}</h3>
          <span class="company">${item.company}</span>
        </div>
      </div>
      <div class="tags">
        <span class="tag">⌾ ${item.city || "Amman"}</span>
        <span class="tag work">${item.work || "Hybrid"}</span>
        <span class="tag duration">${item.duration || "3 months"}</span>
        <span class="tag">${item.major || "Computer Science"}</span>
      </div>
      <p>${item.desc || "Saved internship opportunity."}</p>
      <div class="card-foot">
        <span>Saved</span>
        <span class="view">View →</span>
      </div>
    </a>
  `).join("");
}

renderSavedPage();




// Student dashboard dynamic numbers
function updateStudentDashboardStats() {
  const totalEl = document.getElementById("totalApplicationsCount");
  const pendingEl = document.getElementById("pendingApplicationsCount");
  const acceptedEl = document.getElementById("acceptedApplicationsCount");
  const savedEl = document.getElementById("savedCount");

  if (!totalEl || !pendingEl || !acceptedEl || !savedEl) return;

  const defaultApplications = [
    { title: "Frontend Developer Intern", status: "Accepted" },
    { title: "Software Engineering Intern", status: "Pending" }
  ];

  const storedApplications = getStoredList("tadreeb_applications");
  const saved = getStoredList("tadreeb_saved");

  const applications = [
    ...defaultApplications,
    ...storedApplications.filter(app => !defaultApplications.some(d => d.title === app.title))
  ];

  totalEl.textContent = applications.length;
  pendingEl.textContent = applications.filter(app => app.status === "Pending").length;
  acceptedEl.textContent = applications.filter(app => app.status === "Accepted").length;
  savedEl.textContent = saved.length;
}

updateStudentDashboardStats();

// Company dashboard data
function getCompanyApplications(){const studentApps=getStoredList("tadreeb_applications");const defaults=[{id:"app-omar-software",student:"Omar Khalid",email:"omar@just.edu.jo",education:"Jordan University of Science and Technology · Software Engineering",letter:"Software engineering student at JUST with backend internship experience.",title:"Software Engineering Intern",company:"Aramex",status:"Pending",applied:"20h ago"},{id:"app-layla-software",student:"Layla Haddad",email:"student@ju.edu.jo",education:"University of Jordan · Computer Science",letter:"I am a third-year CS student at the University of Jordan with strong Node.js experience.",title:"Software Engineering Intern",company:"Aramex",status:"Pending",applied:"20h ago"},{id:"app-noor-data",student:"Noor Saleh",email:"noor@psut.edu.jo",education:"Princess Sumaya University for Technology · Data Science",letter:"Data Science student at PSUT with experience in pandas and SQL.",title:"Data Analytics Intern",company:"Aramex",status:"Accepted",applied:"20h ago"}];const laithApps=studentApps.filter(app=>app.company==="Aramex").map(app=>({id:app.id,student:"Laith Haddad",email:"student@ju.edu.jo",education:"University of Jordan · Computer Science",letter:"Application submitted from student account.",title:app.title,company:app.company,status:app.status||"Pending",applied:app.applied||"Just now"}));const merged=[...defaults];laithApps.forEach(app=>{const i=merged.findIndex(item=>item.id===app.id||(item.title===app.title&&item.student===app.student));if(i>=0)merged[i]={...merged[i],...app};else merged.unshift(app)});const overrides=getStoredList("tadreeb_company_status_overrides");return merged.map(app=>{const o=overrides.find(item=>item.id===app.id||(item.title===app.title&&item.student===app.student));return o?{...app,status:o.status}:app})}
function updateStudentApplicationStatus(title,status){const apps=getStoredList("tadreeb_applications");setStoredList("tadreeb_applications",apps.map(app=>app.title===title&&app.company==="Aramex"?{...app,status}:app))}
function setCompanyApplicantStatus(app,status){const overrides=getStoredList("tadreeb_company_status_overrides");const next=overrides.filter(item=>!(item.id===app.id||(item.title===app.title&&item.student===app.student)));next.push({id:app.id,title:app.title,student:app.student,status});setStoredList("tadreeb_company_status_overrides",next);if(app.student==="Laith Haddad"||app.student==="Layla Haddad")updateStudentApplicationStatus(app.title,status);showNotification(`Application ${status.toLowerCase()}!`);renderCompanyApplicantPages();renderCompanyDashboard()}
function applicantStatusBadge(status){return `<b class="status ${status.toLowerCase()}">${status}</b>`}
function renderCompanyDashboard(){const recent=document.getElementById("companyRecentApplicants"),pending=document.getElementById("companyPendingCount"),accepted=document.getElementById("companyAcceptedCount"),softLabel=document.getElementById("softwareApplicantsLabel"),softCount=document.getElementById("softwareApplicantsCount");if(!recent&&!pending&&!accepted&&!softLabel&&!softCount)return;const apps=getCompanyApplications();const soft=apps.filter(app=>app.title==="Software Engineering Intern");if(pending)pending.textContent=apps.filter(app=>app.status==="Pending").length;if(accepted)accepted.textContent=apps.filter(app=>app.status==="Accepted").length;if(softLabel)softLabel.textContent=`${soft.length} applicant${soft.length===1?"":"s"}`;if(softCount)softCount.textContent=soft.length;if(recent)recent.innerHTML=apps.slice(0,4).map(app=>`<div class="table-row applicants-row"><span class="student-name">${app.student}<small>${app.education.split("·").pop().trim()}</small></span><span>${app.title}</span><span>${applicantStatusBadge(app.status)}</span><span>${app.applied}</span></div>`).join("")}
function renderCompanyApplicantPages(){const list=document.getElementById("softwareApplicantsList"),count=document.getElementById("softwareApplicantsPageCount");if(!list)return;const apps=getCompanyApplications().filter(app=>app.title==="Software Engineering Intern");if(count)count.textContent=`${apps.length} applicant${apps.length===1?"":"s"}`;list.innerHTML=apps.map(app=>`<div class="applicant-card"><div class="applicant-status">${applicantStatusBadge(app.status)}<span>${app.applied}</span></div><h2>${app.student}</h2><p>${app.email}</p><p>${app.education}</p><div class="cover-letter">${app.letter}</div><div class="applicant-actions"><button class="accept-btn" data-id="${app.id}">✓ Accept</button><button class="reject-btn" data-id="${app.id}">× Reject</button><button class="reset-btn-inline" data-id="${app.id}">Reset to pending</button></div></div>`).join("");list.querySelectorAll("[data-id]").forEach(btn=>{btn.addEventListener("click",()=>{const app=apps.find(item=>item.id===btn.dataset.id);if(!app)return;if(btn.classList.contains("accept-btn"))setCompanyApplicantStatus(app,"Accepted");if(btn.classList.contains("reject-btn"))setCompanyApplicantStatus(app,"Rejected");if(btn.classList.contains("reset-btn-inline"))setCompanyApplicantStatus(app,"Pending")})})}
document.querySelectorAll(".applicant-actions").forEach(actions=>{const app=getCompanyApplications().find(item=>item.title===actions.dataset.appTitle&&item.student===actions.dataset.student);if(!app)return;actions.querySelector(".accept-btn")?.addEventListener("click",()=>setCompanyApplicantStatus(app,"Accepted"));actions.querySelector(".reject-btn")?.addEventListener("click",()=>setCompanyApplicantStatus(app,"Rejected"));actions.querySelector(".reset-btn-inline")?.addEventListener("click",()=>setCompanyApplicantStatus(app,"Pending"))});
document.getElementById("postInternshipForm")?.addEventListener("submit",e=>{e.preventDefault();showNotification("Internship posted!")});
document.getElementById("companyProfileForm")?.addEventListener("submit",e=>{e.preventDefault();showNotification("Company profile saved!")});
renderCompanyDashboard();renderCompanyApplicantPages();

// Company final fixes
function companyListingsBase(){
  let list=getStoredList("tadreeb_company_listings");
  if(list.length) return list;
  list=[
    {id:"internship-data-analytics-aramex",title:"Data Analytics Intern",major:"Data Science",city:"Amman",type:"Onsite",status:"Active",applicants:1,duration:"4 months",desc:"Help our analytics team turn shipment and operations data into insights using SQL, Python, and Looker.",url:"../internships/internship-data-analytics-aramex.html"},
    {id:"internship-software-aramex",title:"Software Engineering Intern",major:"Computer Science",city:"Amman",type:"Hybrid",status:"Active",applicants:2,duration:"3 months",desc:"Join the Aramex platform team to build and maintain Node.js microservices.",url:"../internships/internship-software-aramex.html"}
  ];
  setStoredList("tadreeb_company_listings",list);
  return list;
}
function saveCompanyListings(list){setStoredList("tadreeb_company_listings",list)}
function syncInactive(){setStoredList("tadreeb_inactive_company_internships",companyListingsBase().filter(x=>x.status!=="Active").map(x=>x.id))}
function applyCompanyNavbarFixed(){
  if(localStorage.getItem("tadreeb_user_role")!=="company") return;
  const navLinks=document.getElementById("navLinks"), navActions=document.querySelector(".nav-actions");
  if(!navLinks||!navActions) return;
  const prefix=location.pathname.includes("/dashboards/")?"../":"";
  navLinks.innerHTML=`<a href="${prefix}dashboards/company-dashboard.html">Dashboard</a><a href="${prefix}dashboards/company-listings.html">Listings</a><a href="${prefix}dashboards/company-profile.html">Company profile</a>`;
  navLinks.querySelectorAll("a").forEach(a=>{if(location.pathname.includes(a.href.split("/").pop()))a.classList.add("active")});
  const theme=navActions.querySelector("#themeToggle"), menu=navActions.querySelector("#menuBtn");
  navActions.innerHTML="";
  if(theme) navActions.appendChild(theme);
  const wrap=document.createElement("div");
  wrap.className="profile-wrap";
  wrap.innerHTML=`<button class="user-avatar">AH</button><div class="profile-menu"><strong>Aramex HR Team</strong><span>COMPANY</span><hr><a href="${prefix}dashboards/company-profile.html">▦ Company profile</a><button type="button" id="companyLogoutBtn">↪ Sign out</button></div>`;
  navActions.appendChild(wrap);
  wrap.querySelector(".user-avatar").onclick=e=>{e.stopPropagation();wrap.classList.toggle("open")};
  wrap.querySelector("#companyLogoutBtn").onclick=()=>{localStorage.removeItem("tadreeb_user_role");localStorage.removeItem("tadreeb_user_initials");localStorage.removeItem("tadreeb_user_name");notifyThenGo("Signed out",`${prefix}index.html`,"info")};
  document.addEventListener("click",()=>wrap.classList.remove("open"));
  if(menu) navActions.appendChild(menu);
}
applyCompanyNavbarFixed();

function renderCompanyListingsFixed(){
  const table=document.querySelector(".listings-table");
  if(!table) return;
  const head=table.querySelector(".table-head");
  table.innerHTML=""; table.appendChild(head);
  companyListingsBase().forEach(item=>{
    const row=document.createElement("div");
    row.className="table-row listings-row";
    const inactive=item.status!=="Active";
    row.innerHTML=`<strong>${item.title}</strong><span>${item.major}</span><span>${item.city}</span><span>${item.type}</span><span><b class="status ${inactive?'pending':'accepted'}">${item.status}</b></span><span>${item.applicants}</span><span class="listing-actions"><a class="table-view-btn" href="${item.title.includes('Software')?'company-applicants-software.html':'company-applicants-data.html'}">View</a><a class="icon-edit" href="company-edit-internship.html?id=${item.id}">✎</a><button class="link-btn toggle-listing" data-id="${item.id}">${inactive?'Activate':'Deactivate'}</button><button class="delete-btn" data-id="${item.id}">🗑</button></span>`;
    table.appendChild(row);
  });
  table.querySelectorAll(".toggle-listing").forEach(btn=>btn.onclick=()=>{let list=companyListingsBase().map(x=>x.id===btn.dataset.id?{...x,status:x.status==="Active"?"Inactive":"Active"}:x);saveCompanyListings(list);syncInactive();showNotification("Listing status updated!");renderCompanyListingsFixed()});
  table.querySelectorAll(".delete-btn").forEach(btn=>btn.onclick=()=>{if(!confirm("Are you sure you want to delete this internship?"))return;saveCompanyListings(companyListingsBase().filter(x=>x.id!==btn.dataset.id));syncInactive();showNotification("Internship deleted!","info");renderCompanyListingsFixed()});
}
renderCompanyListingsFixed();

function renderEditInternshipFixed(){
  const form=document.getElementById("editInternshipForm"); if(!form)return;
  const id=new URLSearchParams(location.search).get("id")||"internship-data-analytics-aramex";
  const item=companyListingsBase().find(x=>x.id===id)||companyListingsBase()[0];
  editTitle.value=item.title; editDesc.value=item.desc||""; editMajor.value=item.major; editCity.value=item.city; editWork.value=item.type==="Onsite"?"On-site":item.type; editDuration.value=item.duration||"3 months";
  form.onsubmit=e=>{e.preventDefault();saveCompanyListings(companyListingsBase().map(x=>x.id===id?{...x,title:editTitle.value,desc:editDesc.value,major:editMajor.value,city:editCity.value,type:editWork.value.replace("On-site","Onsite"),duration:editDuration.value}:x));showNotification("Internship updated!");setTimeout(()=>location.href="company-listings.html",600)}
}
renderEditInternshipFixed();

const postFormFixed=document.getElementById("postInternshipForm");
if(postFormFixed){postFormFixed.onsubmit=e=>{e.preventDefault();const els=postFormFixed.querySelectorAll("input, textarea, select");let list=companyListingsBase();list.push({id:"internship-company-"+Date.now(),title:els[0].value||"New Internship",desc:els[1].value||"New internship opportunity.",major:els[2].value==="Select major"?"Computer Science":els[2].value,city:els[3].value==="Select city"?"Amman":els[3].value,type:els[4].value.replace("On-site","Onsite"),duration:els[5].value||"3 months",status:"Active",applicants:0,url:"#"});saveCompanyListings(list);showNotification("Internship posted!");setTimeout(()=>location.href="company-listings.html",700)}}

function hideInactiveFromStudents(){const inactive=getStoredList("tadreeb_inactive_company_internships");if(!inactive.length)return;document.querySelectorAll('a[href*="internship-"]').forEach(a=>{const href=a.getAttribute("href")||"";if(inactive.some(id=>href.includes(id)))a.remove()})}
hideInactiveFromStudents();

function enhanceCompanyApplicantButtons(){document.querySelectorAll(".applicant-card").forEach(card=>{const badge=card.querySelector(".status");const actions=card.querySelector(".applicant-actions");if(!badge||!actions)return;const status=badge.textContent.trim();actions.querySelectorAll(".accept-btn,.reject-btn").forEach(b=>b.style.display=status==="Pending"?"":"none")})}
setTimeout(enhanceCompanyApplicantButtons,300);
if(typeof setCompanyApplicantStatus==="function"){const old=setCompanyApplicantStatus;setCompanyApplicantStatus=function(app,status){old(app,status);setTimeout(enhanceCompanyApplicantButtons,300)}}

// Company dashboard polish fixes v2
function companyListingsV2() {
  let list = getStoredList("tadreeb_company_listings");
  if (!list.length) {
    list = [
      {id:"internship-data-analytics-aramex", title:"Data Analytics Intern", major:"Data Science", city:"Amman", type:"Onsite", status:"Active", applicants:1, duration:"4 months", desc:"Help our analytics team turn shipment and operations data into insights using SQL, Python, and Looker.", url:"../internships/internship-data-analytics-aramex.html"},
      {id:"internship-software-aramex", title:"Software Engineering Intern", major:"Computer Science", city:"Amman", type:"Hybrid", status:"Active", applicants:2, duration:"3 months", desc:"Join the Aramex platform team to build and maintain Node.js microservices.", url:"../internships/internship-software-aramex.html"}
    ];
    setStoredList("tadreeb_company_listings", list);
  }
  return list;
}

function saveCompanyListingsV2(list) {
  setStoredList("tadreeb_company_listings", list);
}

function aramexAppsV2() {
  return typeof getCompanyApplications === "function" ? getCompanyApplications() : [];
}

function appCountV2(title) {
  return aramexAppsV2().filter(app => app.title === title).length;
}

function updateCompanyStatsV2() {
  const cards = document.querySelectorAll(".company-stats article strong");
  if (!cards.length) return;
  const listings = companyListingsV2();
  const apps = aramexAppsV2();
  if (cards[0]) cards[0].textContent = listings.length;
  if (cards[1]) cards[1].textContent = listings.filter(x => x.status === "Active").length;
  if (cards[2]) cards[2].textContent = apps.filter(x => x.status === "Pending").length;
  if (cards[3]) cards[3].textContent = apps.filter(x => x.status === "Accepted").length;
}

function renderActiveInternshipsV2() {
  const grid = document.querySelector(".company-active-grid");
  if (!grid) return;
  const active = companyListingsV2().filter(x => x.status === "Active");
  grid.innerHTML = active.length ? active.map(item => {
    const count = appCountV2(item.title) || item.applicants || 0;
    const page = item.title.includes("Software") ? "company-applicants-software.html" : "company-applicants-data.html";
    return `
      <article class="company-active-card">
        <h3>${item.title}</h3>
        <div class="tags">
          <span class="tag">${item.major}</span>
          <span class="tag work">${item.type}</span>
          <span class="tag accepted-tag">Active</span>
        </div>
        <p>${count} applicant${count === 1 ? "" : "s"}</p>
        <div class="active-card-actions">
          <a class="secondary" href="${page}">Applicants</a>
          <a class="icon-edit" href="company-edit-internship.html?id=${item.id}">✎</a>
        </div>
      </article>`;
  }).join("") : `<div class="empty-list">No active internships yet.</div>`;
}

function renderListingsV2() {
  const table = document.querySelector(".listings-table");
  if (!table) return;
  const head = table.querySelector(".table-head");
  table.innerHTML = "";
  if (head) table.appendChild(head);
  companyListingsV2().forEach(item => {
    const count = appCountV2(item.title) || item.applicants || 0;
    const inactive = item.status !== "Active";
    const row = document.createElement("div");
    row.className = "table-row listings-row";
    row.innerHTML = `
      <strong>${item.title}</strong>
      <span>${item.major}</span>
      <span>${item.city}</span>
      <span>${item.type}</span>
      <span><b class="status ${inactive ? "pending" : "accepted"}">${item.status}</b></span>
      <span>${count}</span>
      <span class="listing-actions">
        <a class="table-view-btn" href="${item.title.includes("Software") ? "company-applicants-software.html" : "company-applicants-data.html"}">View</a>
        <a class="icon-edit" href="company-edit-internship.html?id=${item.id}">✎</a>
        <button class="link-btn toggle-v2" data-id="${item.id}">${inactive ? "Activate" : "Deactivate"}</button>
        <button class="delete-btn delete-v2" data-id="${item.id}">🗑</button>
      </span>`;
    table.appendChild(row);
  });
  table.querySelectorAll(".toggle-v2").forEach(btn => {
    btn.onclick = () => {
      const next = companyListingsV2().map(x => x.id === btn.dataset.id ? {...x, status:x.status === "Active" ? "Inactive" : "Active"} : x);
      saveCompanyListingsV2(next);
      setStoredList("tadreeb_inactive_company_internships", next.filter(x => x.status !== "Active").map(x => x.id));
      showNotification("Listing status updated!");
      renderListingsV2();
      renderActiveInternshipsV2();
      updateCompanyStatsV2();
    };
  });
  table.querySelectorAll(".delete-v2").forEach(btn => {
    btn.onclick = () => {
      if (!confirm("Are you sure you want to delete this internship?")) return;
      const next = companyListingsV2().filter(x => x.id !== btn.dataset.id);
      saveCompanyListingsV2(next);
      const hidden = getStoredList("tadreeb_inactive_company_internships");
      hidden.push(btn.dataset.id);
      setStoredList("tadreeb_inactive_company_internships", hidden);
      showNotification("Internship deleted!", "info");
      renderListingsV2();
      renderActiveInternshipsV2();
      updateCompanyStatsV2();
    };
  });
}

function handlePostV2() {
  const form = document.getElementById("postInternshipForm");
  if (!form) return;
  form.onsubmit = e => {
    e.preventDefault();
    const fields = form.querySelectorAll("input, textarea, select");
    const list = companyListingsV2();
    list.push({
      id:"internship-company-" + Date.now(),
      title:fields[0].value || "New Internship",
      desc:fields[1].value || "New internship opportunity.",
      major:fields[2].value === "Select major" ? "Computer Science" : fields[2].value,
      city:fields[3].value === "Select city" ? "Amman" : fields[3].value,
      type:fields[4].value.replace("On-site", "Onsite"),
      duration:fields[5].value || "3 months",
      status:"Active",
      applicants:0,
      url:"#"
    });
    saveCompanyListingsV2(list);
    showNotification("Internship posted!");
    setTimeout(() => location.href = "company-listings.html", 700);
  };
}

function handleEditV2() {
  const form = document.getElementById("editInternshipForm");
  if (!form) return;
  const id = new URLSearchParams(location.search).get("id") || "internship-data-analytics-aramex";
  const item = companyListingsV2().find(x => x.id === id) || companyListingsV2()[0];
  editTitle.value = item.title;
  editDesc.value = item.desc || "";
  editMajor.value = item.major;
  editCity.value = item.city;
  editWork.value = item.type === "Onsite" ? "On-site" : item.type;
  editDuration.value = item.duration || "3 months";
  form.onsubmit = e => {
    e.preventDefault();
    const next = companyListingsV2().map(x => x.id === id ? {
      ...x, title:editTitle.value, desc:editDesc.value, major:editMajor.value,
      city:editCity.value, type:editWork.value.replace("On-site","Onsite"), duration:editDuration.value
    } : x);
    saveCompanyListingsV2(next);
    showNotification("Internship updated!");
    setTimeout(() => location.href = "company-listings.html", 700);
  };
}

function applicantButtonsV2() {
  document.querySelectorAll(".applicant-card").forEach(card => {
    const badge = card.querySelector(".status");
    const accept = card.querySelector(".accept-btn");
    const reject = card.querySelector(".reject-btn");
    const reset = card.querySelector(".reset-btn-inline");
    if (!badge || !accept || !reject || !reset) return;
    const isPending = badge.textContent.trim() === "Pending";
    accept.style.display = isPending ? "inline-flex" : "none";
    reject.style.display = isPending ? "inline-flex" : "none";
    reset.style.display = "inline-flex";
  });
}

if (typeof setCompanyApplicantStatus === "function") {
  const oldSetV2 = setCompanyApplicantStatus;
  setCompanyApplicantStatus = function(app, status) {
    oldSetV2(app, status);
    setTimeout(() => {
      applicantButtonsV2();
      updateCompanyStatsV2();
      renderActiveInternshipsV2();
      renderListingsV2();
    }, 200);
  };
}

function hideInactiveFromStudentsV2() {
  const hidden = getStoredList("tadreeb_inactive_company_internships");
  if (!hidden.length) return;
  document.querySelectorAll('a[href*="internship-"]').forEach(a => {
    const href = a.getAttribute("href") || "";
    if (hidden.some(id => href.includes(id))) a.remove();
  });
}

handlePostV2();
handleEditV2();
renderActiveInternshipsV2();
renderListingsV2();
updateCompanyStatsV2();
setTimeout(applicantButtonsV2, 300);
hideInactiveFromStudentsV2();

// Admin dashboard
function applyAdminNavbar() {
  if (localStorage.getItem("tadreeb_user_role") !== "admin") return;
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  const themeBtn = navActions.querySelector("#themeToggle");
  const menuBtn = navActions.querySelector("#menuBtn");

  navActions.innerHTML = "";
  if (themeBtn) navActions.appendChild(themeBtn);

  const wrap = document.createElement("div");
  wrap.className = "profile-wrap";
  wrap.innerHTML = `
    <button class="user-avatar">PA</button>
    <div class="profile-menu">
      <strong>Platform Admin</strong>
      <span>ADMIN</span>
      <hr>
      <button type="button" id="adminLogoutBtn">↪ Sign out</button>
    </div>
  `;

  navActions.appendChild(wrap);

  wrap.querySelector(".user-avatar").addEventListener("click", e => {
    e.stopPropagation();
    wrap.classList.toggle("open");
  });

  wrap.querySelector("#adminLogoutBtn").addEventListener("click", () => {
    localStorage.removeItem("tadreeb_user_role");
    localStorage.removeItem("tadreeb_user_initials");
    localStorage.removeItem("tadreeb_user_name");
    notifyThenGo("Signed out", "../index.html", "info");
  });

  document.addEventListener("click", () => wrap.classList.remove("open"));
  if (menuBtn) navActions.appendChild(menuBtn);
}
applyAdminNavbar();

function adminDefaultCompanies() {
  let companies = getStoredList("tadreeb_admin_companies");
  if (companies.length) return companies;

  companies = [
    {id:"zain", name:"Zain Jordan", initials:"ZJ", industry:"Telecommunications", city:"Amman", status:"Pending", desc:"Zain Jordan is a leading mobile telecommunications company providing innovative digital and 5G services across the Kingdom.", website:"https://www.jo.zain.com"},
    {id:"aramex", name:"Aramex", initials:"A", industry:"Logistics", city:"Amman", status:"Approved", desc:"Aramex is a leading global logistics and transportation provider founded in Amman in 1982, serving customers across the Middle East and beyond.", website:"https://www.aramex.com"},
    {id:"arab", name:"Arab Bank", initials:"AB", industry:"Banking", city:"Amman", status:"Approved", desc:"Arab Bank is one of the largest financial institutions in the Middle East, headquartered in Amman with a global presence.", website:"https://www.arabbank.com"},
    {id:"maktoob", name:"Maktoob Studio", initials:"MS", industry:"Technology", city:"Amman", status:"Approved", desc:"Maktoob is an Amman-based product studio building consumer apps and design tooling for the Arabic-speaking world.", website:"https://maktoob.io"},
    {id:"estarta", name:"Estarta Solutions", initials:"ES", industry:"Technology", city:"Amman", status:"Approved", desc:"Estarta is a Cisco-recognized managed services partner delivering networking, cybersecurity, and customer experience solutions from its Amman hub.", website:"https://www.estarta.com"},
    {id:"orange", name:"Orange Jordan", initials:"OJ", industry:"Telecommunications", city:"Amman", status:"Rejected", desc:"Orange Jordan is one of the largest telecommunications providers in Jordan, offering mobile, internet, and digital services nationwide.", website:"https://www.orange.jo"},
    {id:"nayasoft", name:"NayaSoft", initials:"N", industry:"Technology", city:"Amman", status:"Rejected", desc:"An early-stage Amman startup building accounting software for small Jordanian retailers.", website:"https://nayasoft.jo"}
  ];

  setStoredList("tadreeb_admin_companies", companies);
  return companies;
}

function adminSaveCompanies(companies) {
  setStoredList("tadreeb_admin_companies", companies);
}

function adminUpdateCompanyCounts() {
  const companies = adminDefaultCompanies();
  const pending = companies.filter(c => c.status === "Pending").length;
  const approved = companies.filter(c => c.status === "Approved").length;
  const rejected = companies.filter(c => c.status === "Rejected").length;

  const p = document.getElementById("pendingTabCount");
  const a = document.getElementById("approvedTabCount");
  const r = document.getElementById("rejectedTabCount");

  if (p) p.textContent = pending;
  if (a) a.textContent = approved;
  if (r) r.textContent = rejected;

  const approvedCount = document.getElementById("adminApprovedCount");
  const pendingSmall = document.getElementById("adminPendingSmall");
  if (approvedCount) approvedCount.textContent = approved;
  if (pendingSmall) pendingSmall.textContent = `${pending} pending`;
}

function renderAdminCompanies(tab = "pending") {
  const list = document.getElementById("adminCompanyList");
  if (!list) return;

  const companies = adminDefaultCompanies();
  const selected = companies.filter(c => c.status.toLowerCase() === tab);

  list.innerHTML = selected.map(company => {
    const isPending = company.status === "Pending";
    const isApproved = company.status === "Approved";
    const isRejected = company.status === "Rejected";

    return `
      <article class="admin-company-card">
        <div class="company-avatar">${company.initials}</div>
        <div>
          <h2>${company.name}</h2>
          <p>${company.industry} · ${company.city}</p>
          <p>${company.desc}</p>
          <a href="${company.website}" target="_blank">${company.website}</a>
        </div>
        <div class="admin-actions">
          ${!isApproved ? `<button class="approve-btn" data-id="${company.id}">✓ Approve</button>` : ""}
          ${!isRejected ? `<button class="reject-btn" data-id="${company.id}">× Reject</button>` : ""}
          ${!isPending ? `<button class="reset-btn" data-id="${company.id}">Reset</button>` : ""}
        </div>
      </article>
    `;
  }).join("") || `<div class="empty-list">No companies here.</div>`;

  list.querySelectorAll(".approve-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      adminSaveCompanies(adminDefaultCompanies().map(c => c.id === btn.dataset.id ? {...c, status:"Approved"} : c));
      showNotification("Company approved!");
      adminUpdateCompanyCounts();
      renderAdminCompanies(tab);
    });
  });

  list.querySelectorAll(".reject-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      adminSaveCompanies(adminDefaultCompanies().map(c => c.id === btn.dataset.id ? {...c, status:"Rejected"} : c));
      showNotification("Company rejected!", "info");
      adminUpdateCompanyCounts();
      renderAdminCompanies(tab);
    });
  });

  list.querySelectorAll(".reset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      adminSaveCompanies(adminDefaultCompanies().map(c => c.id === btn.dataset.id ? {...c, status:"Pending"} : c));
      showNotification("Company reset to pending", "info");
      adminUpdateCompanyCounts();
      renderAdminCompanies(tab);
    });
  });
}

function setupAdminCompanyTabs() {
  const tabs = document.querySelectorAll(".admin-tabs button");
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderAdminCompanies(tab.dataset.tab);
    });
  });

  renderAdminCompanies("pending");
  adminUpdateCompanyCounts();
}
setupAdminCompanyTabs();

function adminInternshipData() {
  const base = [
    {title:"Customer Success Intern", company:"Estarta Solutions", companyStatus:"Approved", major:"Business Administration", status:"Active", applicants:1},
    {title:"Cloud Infrastructure Intern", company:"Estarta Solutions", companyStatus:"Approved", major:"Information Technology", status:"Active", applicants:0},
    {title:"Mobile Engineering Intern", company:"Maktoob Studio", companyStatus:"Approved", major:"Software Engineering", status:"Active", applicants:0},
    {title:"Product Design Intern", company:"Maktoob Studio", companyStatus:"Approved", major:"Graphic Design", status:"Active", applicants:0},
    {title:"Marketing Intern", company:"Arab Bank", companyStatus:"Approved", major:"Marketing", status:"Active", applicants:0},
    {title:"Finance Intern", company:"Arab Bank", companyStatus:"Approved", major:"Finance", status:"Active", applicants:0},
    {title:"AI Research Intern", company:"Zain Jordan", companyStatus:"Pending", major:"Artificial Intelligence", status:"Active", applicants:2},
    {title:"Cybersecurity Intern", company:"Zain Jordan", companyStatus:"Pending", major:"Cybersecurity", status:"Active", applicants:0},
    {title:"Frontend Developer Intern", company:"Orange Jordan", companyStatus:"Rejected", major:"Software Engineering", status:"Active", applicants:1},
    {title:"Network Engineering Intern", company:"Orange Jordan", companyStatus:"Rejected", major:"Electrical Engineering", status:"Active", applicants:0}
  ];

  const aramex = getStoredList("tadreeb_company_listings").map(item => ({
    title:item.title,
    company:"Aramex",
    companyStatus:"Approved",
    major:item.major,
    status:item.status,
    applicants:item.applicants || 0,
    id:item.id
  }));

  return [...base, ...aramex];
}

function renderAdminInternships() {
  const rows = document.getElementById("adminInternshipRows");
  if (!rows) return;

  const deleted = getStoredList("tadreeb_admin_deleted_internships");
  const data = adminInternshipData().filter(item => !deleted.includes(item.title));

  rows.innerHTML = data.map(item => {
    const companyClass = item.companyStatus.toLowerCase();
    const statusClass = item.status === "Active" ? "accepted" : "pending";

    return `
      <div class="table-row admin-intern-row">
        <span>${item.title}</span>
        <span>${item.company}<b class="status ${companyClass === "approved" ? "accepted" : companyClass === "rejected" ? "rejected" : "pending"} company-status">${item.companyStatus}</b></span>
        <span>${item.major}</span>
        <span><b class="status ${statusClass}">${item.status}</b></span>
        <span>${item.applicants}</span>
        <button class="delete-btn admin-delete-internship" data-title="${item.title}">🗑 Delete</button>
      </div>
    `;
  }).join("");

  rows.querySelectorAll(".admin-delete-internship").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!confirm("Are you sure you want to delete this internship?")) return;
      const deleted = getStoredList("tadreeb_admin_deleted_internships");
      deleted.push(btn.dataset.title);
      setStoredList("tadreeb_admin_deleted_internships", deleted);
      showNotification("Internship deleted!", "info");
      renderAdminInternships();
    });
  });

  const count = document.getElementById("adminInternshipCount");
  const activeSmall = document.getElementById("adminActiveSmall");
  if (count) count.textContent = data.length;
  if (activeSmall) activeSmall.textContent = `${data.filter(x => x.status === "Active").length} active`;
}
renderAdminInternships();

function updateAdminOverviewStats() {
  adminUpdateCompanyCounts();
  const apps = getStoredList("tadreeb_applications");
  const baseTotal = 8 + apps.length;
  const accepted = 2 + apps.filter(x => x.status === "Accepted").length;
  const pending = 5 + apps.filter(x => x.status === "Pending").length;
  const rejected = 1 + apps.filter(x => x.status === "Rejected").length;
  const total = accepted + pending + rejected;

  const appCount = document.getElementById("adminApplicationCount");
  const acceptedSmall = document.getElementById("adminAcceptedSmall");
  const donutTotal = document.getElementById("donutTotal");
  const acceptedLegend = document.getElementById("acceptedLegend");
  const pendingLegend = document.getElementById("pendingLegend");
  const rejectedLegend = document.getElementById("rejectedLegend");

  if (appCount) appCount.textContent = total;
  if (acceptedSmall) acceptedSmall.textContent = `${accepted} accepted`;
  if (donutTotal) donutTotal.textContent = total;
  if (acceptedLegend) acceptedLegend.textContent = accepted;
  if (pendingLegend) pendingLegend.textContent = pending;
  if (rejectedLegend) rejectedLegend.textContent = rejected;
}
updateAdminOverviewStats();
