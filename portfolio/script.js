const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

function initializeTheme() {
	const update = () => {
		const dark = root.dataset.theme === 'dark';
		themeLabel.textContent = dark ? 'DARK' : 'LIGHT';
		themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
	};
	themeToggle.addEventListener('click', () => {
		root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('romeo-theme', root.dataset.theme);
		update();
	});
	update();
}

function initializeNavigation() {
	const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
		if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
	}), { rootMargin: '-35% 0px -55% 0px' });
	sections.forEach((section) => observer.observe(section));
	navLinks.forEach((link) => link.addEventListener('click', () => {
		document.body.classList.remove('nav-open');
		menuToggle.setAttribute('aria-expanded', 'false');
	}));
	menuToggle.addEventListener('click', () => {
		document.body.classList.toggle('nav-open');
		menuToggle.setAttribute('aria-expanded', document.body.classList.contains('nav-open'));
	});
}

function initializeSmoothScroll() {
	document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
		const target = document.querySelector(link.getAttribute('href'));
		if (target) { event.preventDefault(); target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }
	}));
}

function initializeScrollAnimation() {
	const reveals = document.querySelectorAll('.reveal');
	const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .12 });
	reveals.forEach((item) => observer.observe(item));
}

function initializeRobotAnimation() {
	const robot = document.querySelector('.robot');
	const line = document.querySelector('.journey-line span');
	let ticking = false;
	const update = () => {
		const max = document.documentElement.scrollHeight - innerHeight;
		const progress = max ? scrollY / max : 0;
		robot.style.setProperty('--scroll-progress', progress);
		robot.style.transform = `translate(-50%, calc(-43% + ${progress * 22}px))`;
		line.style.width = `${Math.max(18, progress * 100)}%`;
		ticking = false;
	};
	addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
	update();
}

function initializeProjectInteractions() {
	const dialog = document.querySelector('.case-study');
	document.querySelector('[data-project="agent"] .project-link').addEventListener('click', () => dialog.showModal());
	document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
	dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}

function initializeBackgroundAnimation() {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelector('.scan-line').hidden = true;
}

initializeTheme();
initializeNavigation();
initializeSmoothScroll();
initializeScrollAnimation();
initializeRobotAnimation();
initializeProjectInteractions();
initializeBackgroundAnimation();
