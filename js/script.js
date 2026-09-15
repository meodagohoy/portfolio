// Site behavior — plain browser JavaScript. No build tool or framework needed.
const data = portfolioData;

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const slug = (label) => label.toLowerCase();
const externalAttrs = `target="_blank" rel="noreferrer"`;

function icon(name) {
  const paths = {
    github: '<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 7.6c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>',
    linkedin: '<path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3.5ZM5 10h3v9H5v-9Zm5 0h2.9v1.23h.04c.4-.76 1.38-1.56 2.84-1.56C18.82 9.67 20 11.4 20 14v5h-3v-4.42c0-1.05-.02-2.4-1.47-2.4-1.47 0-1.69 1.15-1.69 2.32V19h-3v-9Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z"/>',
  };
  return `<svg class="nav-icon nav-icon--${name}" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
}

function button(label, href, solid = false, extra = "", variant = "") {
  return `<a class="button ${solid ? "button--solid" : "button--outline"} ${variant}" href="${href}" ${extra}>${label} <span>↗</span></a>`;
}

function renderNavigation() {
  const navItems = data.nav
    .map(
      (item, i) =>
        `<a href="#${slug(item)}" data-section="${item}"><span>${String(i + 1).padStart(2, "0")}</span>${item}</a>`,
    )
    .join("");
  $("#desktop-nav").innerHTML = navItems;

  const socialItems = [
    { name: "github", href: data.github, label: "GitHub" },
    { name: "linkedin", href: data.linkedin, label: "LinkedIn" },
    { name: "mail", href: `mailto:${data.email}`, label: "Email" },
  ].filter((item) => item.href);

  const socialLinks = socialItems
    .map(
      (item) =>
        `<a class="icon-link" href="${item.href}" ${item.name === "mail" ? "" : externalAttrs} aria-label="${item.label}" title="${item.label}">${icon(item.name)}</a>`,
    )
    .join("");

  $("#mobile-menu").innerHTML =
    `${data.nav.map((item) => `<a href="#${slug(item)}">${item}</a>`).join("")}<div class="mobile-socials"><div class="mobile-social-icons">${socialLinks}</div></div>`;
  $("#social-links").innerHTML = `<div class="social-icons">${socialLinks}</div>`;
}

function renderFooter() {
  $("#footer-links").innerHTML =
    `<a href="${data.github}" ${externalAttrs}>GITHUB</a><a href="${data.linkedin}" ${externalAttrs}>LINKEDIN</a><a href="mailto:${data.email}">EMAIL</a>`;
}

function renderHero() {
  $("#hero-actions").innerHTML =
    `${button("EXPLORE MY WORK", "#projects", true)}${data.resumeAvailable ? button("DOWNLOAD RESUME ↓", data.resumePath, true, "download", "button--resume") : `<span class="resume-status" title="Add the resume file at ${data.resumePath}, then set resumeAvailable to true in js/data.js">DOWNLOAD RESUME ↓ / ADD FILE</span>`}`;
}

function renderAboutAndSkills() {
  $("#traits").innerHTML = data.traits
    .map(
      (trait, i) =>
        `<span><i>${String(i + 1).padStart(2, "0")}</i>${trait}</span>`,
    )
    .join("");
  $("#skill-list").innerHTML = data.skills
    .map(
      (category) =>
        `<div class="skill-category"><div class="skill-list__header"><span>${category.category}</span></div><div class="skill-pills">${category.items.map((name) => `<span class="skill-pill">${name}</span>`).join("")}</div></div>`,
    )
    .join("");
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
    $("#theme-toggle").setAttribute("title", `Switch to ${light ? "dark" : "light"} mode`);
    $(".theme-toggle__label").textContent = light ? "Dark mode" : "Light mode";
    $(".theme-toggle__sun").innerHTML = light ? icon("sun") : icon("moon");
    $("#mobile-theme-toggle").innerHTML = light ? icon("sun") : icon("moon");
    $("#mobile-theme-toggle").setAttribute("aria-label", `Switch to ${light ? "dark" : "light"} mode`);
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
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    $("#form-message").textContent = "OPENING YOUR EMAIL APP...";
    window.location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
initImageFallbacks();
initInteractions();
