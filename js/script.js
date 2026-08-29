// Site behavior — plain browser JavaScript. No build tool or framework needed.
const data = portfolioData;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const slug = (label) => label.toLowerCase();
const externalAttrs = `target="_blank" rel="noreferrer"`;

function button(label, href, solid = false, extra = "") {
  if (!href)
    return `<span class="button ${solid ? "button--solid" : "button--outline"} button--disabled" aria-disabled="true" title="Update this editable placeholder in js/data.js">${label} <span>↗</span></span>`;
  return `<a class="button ${solid ? "button--solid" : "button--outline"}" href="${href}" ${extra}>${label} <span>↗</span></a>`;
}

function renderNavigation() {
  const navItems = data.nav
    .map(
      (item, i) =>
        `<a href="#${slug(item)}" data-section="${item}"><span>${String(i + 1).padStart(2, "0")}</span>${item}</a>`,
    )
    .join("");
  $("#desktop-nav").innerHTML = navItems;
  $("#mobile-menu").innerHTML =
    `${data.nav.map((item) => `<a href="#${slug(item)}">${item}</a>`).join("")}<div class="mobile-socials"><a href="${data.github}" ${externalAttrs}>GITHUB ↗</a><a href="${data.linkedin}" ${externalAttrs}>LINKEDIN ↗</a><span>RESUME / ADD FILE</span></div>`;
  $("#social-links").innerHTML =
    `<a href="${data.github}" ${externalAttrs}>GITHUB <span>↗</span></a><a href="${data.linkedin}" ${externalAttrs}>LINKEDIN <span>↗</span></a>${data.resumeAvailable ? `<a href="${data.resumePath}" download>RESUME <span>↗</span></a>` : `<span class="placeholder-link" title="Add /assets/Romeo-Dagohoy-Resume.pdf, then set resumeAvailable to true in js/data.js">RESUME / ADD FILE</span>`}`;
}

function renderFooter() {
  $("#footer-links").innerHTML =
    `<a href="${data.github}" ${externalAttrs}>GITHUB</a><a href="${data.linkedin}" ${externalAttrs}>LINKEDIN</a><a href="mailto:${data.email}">EMAIL</a>`;
}

function renderHero() {
  $("#status-rows").innerHTML = data.statuses
    .map(
      ([label, state]) =>
        `<div class="status-row"><span>${label}</span><b class="status-symbol status-symbol--${state}" aria-label="${state}"></b></div>`,
    )
    .join("");
  $("#hero-actions").innerHTML =
    `${button("EXPLORE MY WORK", "#projects", true)}${data.resumeAvailable ? button("DOWNLOAD RESUME ↓", data.resumePath, false, "download") : `<span class="resume-status" title="Add the resume file at ${data.resumePath}, then enable it in js/data.js">DOWNLOAD RESUME ↓ / ADD FILE</span>`}`;
}

function renderAboutAndSkills() {
  $("#traits").innerHTML = data.traits
    .map(
      (trait, i) =>
        `<span><i>${String(i + 1).padStart(2, "0")}</i>${trait}</span>`,
    )
    .join("");
  $("#skill-list").innerHTML =
    `<div class="skill-list__header"><span>SKILL</span><span>WORKING LEVEL</span></div>${data.skills.map(([name, level], i) => `<div class="skill-row"><span><i>${String(i + 1).padStart(2, "0")}</i>${name}</span><b>${level}</b></div>`).join("")}`;
  $("#learning-list").innerHTML = data.learning
    .map(
      (item, i) =>
        `<div><span>${String(i + 1).padStart(2, "0")}</span>${item}<i>↗</i></div>`,
    )
    .join("");
}

function featuredProject(project) {
  return `<article class="project project--featured reveal">
    <div class="project-bar"><span>${project.number} / ${project.type}</span><span>ROLE / ${project.role}</span></div>
    <div class="featured-grid">
      <div class="featured-copy"><h3>${project.name}<span>.</span></h3><p class="project-subtitle">${project.subtitle}</p><p class="project-description">${project.description}</p><div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><div class="featured-meta"><div><span>PLATFORM</span><b>${project.platform}</b></div><div><span>CHALLENGE</span><b>${project.challenge}</b></div></div></div>
      <div class="project-visual project-visual--featured">
        <img src="${project.imagePath}" alt="Sanitized screenshot placeholder for the Moderator project" loading="lazy" />
        <div class="visual-fallback"><span>SCREENSHOT SLOT / 01</span><strong>ADD SANITIZED<br />PROJECT PREVIEW</strong><i>assets/images/moderator/</i></div>
      </div>
      <div class="agent-console" aria-label="Conceptual moderation agent workflow">
        <div class="agent-console__head"><span>MODERATOR / CONCEPTUAL FLOW</span><i>● SAFE DEMO</i></div>
        <div class="agent-flow">${project.workflow.map((item, i) => `<div class="agent-flow__step"><span>${String(i + 1).padStart(2, "0")}</span><strong>${item}</strong>${i < project.workflow.length - 1 ? "<i>↓</i>" : ""}</div>`).join("")}</div>
        <p>Conceptual visualization only. No confidential policies, data, or workflows are shown.</p>
      </div>
    </div>
    <div class="learned"><span>WHAT I LEARNED</span><div>${project.learned.map((item) => `<b>${item}</b>`).join("")}</div>${button(project.linkLabel, project.link, false)}</div>
  </article>`;
}

function standardProject(project) {
  return `<article class="project project--standard reveal"><div class="project-number">${project.number}</div><div class="project-main"><p class="eyebrow">${project.type}</p><h3>${project.name.replace("\n", "<br />")}<span>.</span></h3><p class="project-subtitle">${project.subtitle}</p><p>${project.description}</p></div><div class="project-detail"><div class="project-visual"><img src="${project.imagePath}" alt="Screenshot placeholder for ${project.name.replace("\n", " ")}" loading="lazy" /><div class="visual-fallback"><span>VISUAL SLOT / ${project.number}</span><strong>[ADD SCREENSHOT]</strong></div></div><div class="tag-list">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div><ul>${project.details.map((detail) => `<li>${detail}</li>`).join("")}</ul><p class="project-note">${project.note}</p>${button(project.linkLabel, project.link)}</div></article>`;
}

function renderProjects() {
  $("#project-list").innerHTML = data.projects
    .map((project) =>
      project.featured ? featuredProject(project) : standardProject(project),
    )
    .join("");
}

function renderExperience() {
  $("#experience-list").innerHTML = data.experience
    .map(
      (item, index) =>
        `<article class="timeline-item reveal"><div class="timeline-point"><span>${String(index + 1).padStart(2, "0")}</span></div><div class="timeline-date">${item.date}</div><div class="timeline-role"><p>${item.company}</p><h3>${item.title}</h3></div><p class="timeline-description">${item.description}</p></article>`,
    )
    .join("");
}

function renderEducation() {
  const e = data.education;
  $("#education-content").innerHTML =
    `<article class="education-card"><span>EDUCATION / 01</span><h3>${e.school}</h3><p>${e.degree}</p><small>${e.detail}</small><div class="capstone">CAPSTONE <b>${e.capstone}</b></div></article><div class="cert-head"><span>CREDENTIALS / EDITABLE</span><p>Certifications will go here — only verified details, nothing invented.</p></div><div class="cert-list">${data.certifications.map(([number, name, org, date, link]) => `<article><span>${number}</span><div><h4>${name}</h4><p>${org} <i>·</i> ${date}</p></div><b>${link} ↗</b></article>`).join("")}</div>`;
}

function renderLearningAndContact() {
  const mode = ["ACTIVE", "EXPLORING", "NEXT"];
  $("#learning-track").innerHTML = data.learning
    .map(
      (item, i) =>
        `<article><span>${mode[i]}</span><b>${String(i + 1).padStart(2, "0")}</b><h3>${item}</h3><i aria-hidden="true">${i === 2 ? "↗" : "↓"}</i></article>`,
    )
    .join("");
  $("#contact-details").innerHTML =
    `<a href="mailto:${data.email}"><span>EMAIL</span><b>${data.email}</b><i>↗</i></a><span class="contact-placeholder"><span>PHONE</span><b>${data.phone}</b></span><a href="${data.linkedin}" ${externalAttrs}><span>LINKEDIN</span><b>CONNECT ON LINKEDIN</b><i>↗</i></a><a href="${data.github}" ${externalAttrs}><span>GITHUB</span><b>VIEW GITHUB PROFILE</b><i>↗</i></a><span class="contact-placeholder"><span>OTHER</span><b>${data.otherLink || "[ADD LINK]"}</b></span>`;
}

function initTheme() {
  const saved = localStorage.getItem("rd-theme");
  const preferred = "light";
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rd-theme", theme);
    const light = theme === "light";
    $("#theme-toggle").setAttribute("aria-pressed", String(light));
    $("#theme-toggle").setAttribute(
      "aria-label",
      `Switch to ${light ? "dark" : "light"} theme`,
    );
    $(".theme-toggle__label").textContent = light ? "DARK MODE" : "LIGHT MODE";
    $("#mobile-theme-toggle").textContent = light ? "◐" : "☼";
  };
  setTheme(saved || preferred);
  const toggle = () =>
    setTheme(
      document.documentElement.dataset.theme === "light" ? "dark" : "light",
    );
  $("#theme-toggle").addEventListener("click", toggle);
  $("#mobile-theme-toggle").addEventListener("click", toggle);
}

function initBuildMachine() {
  const states = ["LEARN", "BUILD", "AUTOMATE", "EVOLVE"];
  let active = 0;
  const render = () => {
    $("#machine-states").innerHTML = states
      .map(
        (state, i) =>
          `<span class="${i === active ? "is-active" : i < active ? "is-done" : ""}">${state}</span>`,
      )
      .join(`<i aria-hidden="true">↓</i>`);
    $("#build-machine").setAttribute(
      "aria-label",
      `Advance the build state. Current state: ${states[active]}`,
    );
  };
  render();
  $("#build-machine").addEventListener("click", () => {
    active = (active + 1) % states.length;
    render();
  });
}

function initInteractions() {
  const menuToggle = $("#menu-toggle"),
    mobileMenu = $("#mobile-menu");
  const closeMenu = (returnFocus = false) => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (returnFocus) menuToggle.focus();
  };
  const openMenu = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    document.body.classList.add("menu-open");
    $("#mobile-menu a").focus();
  };
  menuToggle.addEventListener("click", () =>
    menuToggle.getAttribute("aria-expanded") === "true"
      ? closeMenu()
      : openMenu(),
  );
  $$("#mobile-menu a").forEach((link) =>
    link.addEventListener("click", () => closeMenu()),
  );
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  const reveals = $$(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 },
  );
  reveals.forEach((item) => revealObserver.observe(item));
  const navObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          $$(".desktop-nav a").forEach((link) =>
            link.classList.toggle(
              "is-active",
              link.dataset.section === entry.target.dataset.nav,
            ),
          );
      }),
    { rootMargin: "-35% 0px -55% 0px" },
  );
  $$("[data-nav]").forEach((section) => navObserver.observe(section));
  $("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    $("#form-message").textContent =
      "CONTACT ROUTING / Add your form endpoint to enable sending.";
  });
}

function initImageFallbacks() {
  $$(".project-visual img").forEach((image) => {
    const visual = image.closest(".project-visual");
    image.addEventListener("load", () => visual.classList.add("has-image"));
    image.addEventListener("error", () => visual.classList.remove("has-image"));
    if (image.complete && image.naturalWidth > 0)
      visual.classList.add("has-image");
  });
  const profile = $("#profile-photo");
  const profileWrap = $("#profile-image");
  profile.src = data.profileImage;
  profile.addEventListener("load", () =>
    profileWrap.classList.add("has-image"),
  );
  profile.addEventListener("error", () =>
    profileWrap.classList.remove("has-image"),
  );
  if (profile.complete && profile.naturalWidth > 0)
    profileWrap.classList.add("has-image");
}

renderNavigation();
renderFooter();
renderHero();
renderAboutAndSkills();
renderProjects();
renderExperience();
renderEducation();
renderLearningAndContact();
initTheme();
initBuildMachine();
initImageFallbacks();
initInteractions();
