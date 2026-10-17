"use strict";

const projects = [
  { image: "cleartrip.jpg", size: [2380, 2380], title: "Cleartrip Concept", category: "branding", label: "Branding" },
  { image: "delhivery.jpg", size: [1080, 1440], title: "Delhivery Concept", category: "branding", label: "Branding" },
  { image: "lenskart.jpg", size: [1080, 1440], title: "Lenskart Concept", category: "branding", label: "Branding" },
  { image: "practo.jpg", size: [1080, 1440], title: "Practo Concept", category: "branding", label: "Branding" },
  { image: "third-wave-coffee.jpg", size: [1080, 1350], title: "Third Wave Coffee", category: "branding", label: "Branding" },
  { image: "branding-01.jpg", size: [1080, 1350], title: "Brand Identity Study", category: "branding", label: "Branding" },
  { image: "after-dark.jpg", size: [1587, 2245], title: "After Dark", category: "social", label: "Social media" },
  { image: "black-friday.jpg", size: [735, 1040], title: "Black Friday", category: "social", label: "Social media" },
  { image: "ola.jpg", size: [1080, 1440], title: "Ola Campaign", category: "social", label: "Social media" },
  { image: "open-secret.jpg", size: [1587, 2245], title: "Open Secret", category: "social", label: "Social media" },
  { image: "digital_01.jpg", size: [1080, 1440], title: "Digital Campaign Study", category: "social", label: "Social media" },
  { image: "hornheroes.jpg", size: [1122, 1402], title: "Horn Heroes", category: "poster", label: "Poster" },
  { image: "i-love-her.jpg", size: [1024, 1536], title: "I Love Her", category: "poster", label: "Poster" },
  { image: "yamaha-guitar.jpg", size: [1587, 2245], title: "Yamaha Guitar", category: "poster", label: "Poster" },
  { image: "poster-01.jpg", size: [1122, 1402], title: "Poster Study", category: "poster", label: "Poster" },
  { image: "camera.jpg", size: [1587, 2245], title: "Camera Study", category: "product", label: "Product advertising" },
  { image: "coffee.jpg", size: [1587, 2245], title: "Coffee Concept", category: "product", label: "Product advertising" },
  { image: "eyewear.jpg", size: [1587, 2245], title: "Eyewear Study", category: "product", label: "Product advertising" },
  { image: "headphones.jpg", size: [1587, 2245], title: "Headphones", category: "product", label: "Product advertising" },
  { image: "skincare.jpg", size: [1587, 2245], title: "Skincare Concept", category: "product", label: "Product advertising" },
  { image: "sneakers.jpg", size: [1587, 2245], title: "Sneaker Study", category: "product", label: "Product advertising" },
  { image: "wristwatch.jpg", size: [1587, 2245], title: "Wristwatch", category: "product", label: "Product advertising" },
  { image: "quiet-form.jpg", size: [1587, 2245], title: "Quiet Form", category: "other", label: "Other design" },
  { image: "tanya.jpg", size: [1122, 1402], title: "Tanya", category: "other", label: "Other design" },
  { image: "untitled-2.jpg", size: [1122, 1402], title: "Untitled Study 02", category: "other", label: "Other design" },
  { image: "untitled-4.jpg", size: [1122, 1402], title: "Untitled Study 04", category: "other", label: "Other design" },
  { image: "v.jpg", size: [1122, 1402], title: "V", category: "other", label: "Other design" },
  { image: "xtro-eris.jpg", size: [1080, 1350], title: "Xtro Eris", category: "other", label: "Other design" }
];

const projectGrid = document.querySelector("#project-grid");
const projectCount = document.querySelector("#project-count");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectDialog = document.querySelector("#project-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogCaption = document.querySelector("#dialog-caption");
const previousButton = document.querySelector(".dialog-previous");
const nextButton = document.querySelector(".dialog-next");
let visibleProjects = projects;
let activeProjectIndex = 0;
let lastFocusedElement = null;

function renderProjects() {
  const fragment = document.createDocumentFragment();

  projects.forEach((project, index) => {
    const card = document.createElement("button");
    card.className = "project-card";
    card.type = "button";
    card.dataset.category = project.category;
    card.dataset.projectIndex = String(index);
    card.setAttribute("aria-label", `View ${project.title}, ${project.label}`);

    const frame = document.createElement("span");
    frame.className = "project-image-frame";
    const image = document.createElement("img");
    image.src = `images/${project.image}`;
    image.alt = `${project.title} ${project.label.toLowerCase()} design`;
    image.width = project.size[0];
    image.height = project.size[1];
    image.loading = "lazy";
    image.decoding = "async";
    frame.append(image);

    const overlay = document.createElement("span");
    overlay.className = "project-overlay";
    overlay.setAttribute("aria-hidden", "true");
    const openIcon = document.createElement("span");
    openIcon.textContent = "↗";
    overlay.append(openIcon);
    frame.append(overlay);
    card.append(frame);

    const meta = document.createElement("span");
    meta.className = "project-meta";
    const title = document.createElement("strong");
    title.textContent = project.title;
    const category = document.createElement("span");
    category.textContent = project.label;
    meta.append(title, category);
    card.append(meta);
    card.addEventListener("click", () => openProject(projects.indexOf(project)));
    fragment.append(card);
  });

  projectGrid.replaceChildren(fragment);
}

function setFilter(category) {
  const cards = [...projectGrid.querySelectorAll(".project-card")];
  visibleProjects = projects.filter((project) => category === "all" || project.category === category);

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === category;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  cards.forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
  });
  projectCount.textContent = `Showing ${visibleProjects.length} ${visibleProjects.length === 1 ? "project" : "projects"}`;
}

function updateDialog() {
  const project = visibleProjects[activeProjectIndex];
  dialogImage.src = `images/${project.image}`;
  dialogImage.alt = `${project.title} ${project.label.toLowerCase()} design`;
  dialogCaption.textContent = `${project.title}  ·  ${project.label}  ·  ${activeProjectIndex + 1} of ${visibleProjects.length}`;
  previousButton.disabled = visibleProjects.length < 2;
  nextButton.disabled = visibleProjects.length < 2;
}

function openProject(projectIndex) {
  const project = projects[projectIndex];
  activeProjectIndex = visibleProjects.indexOf(project);
  if (activeProjectIndex < 0) return;

  lastFocusedElement = document.activeElement;
  updateDialog();
  projectDialog.showModal();
  document.body.classList.add("dialog-open");
  document.querySelector(".dialog-close").focus();
}

function closeProject() {
  if (projectDialog.open) projectDialog.close();
}

function stepProject(direction) {
  activeProjectIndex = (activeProjectIndex + direction + visibleProjects.length) % visibleProjects.length;
  updateDialog();
}

renderProjects();
setFilter("all");
document.querySelector("#all-project-count").textContent = String(projects.length);
document.querySelector("#year").textContent = String(new Date().getFullYear());

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelector(".dialog-close").addEventListener("click", closeProject);
previousButton.addEventListener("click", () => stepProject(-1));
nextButton.addEventListener("click", () => stepProject(1));
projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) closeProject();
});
projectDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  dialogImage.removeAttribute("src");
  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
});
document.addEventListener("keydown", (event) => {
  if (!projectDialog.open) return;
  if (event.key === "Escape") {
    event.preventDefault();
    closeProject();
    return;
  }
  if (event.key === "ArrowLeft") stepProject(-1);
  if (event.key === "ArrowRight") stepProject(1);
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navLinks.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});
document.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const sections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter((section) => section instanceof HTMLElement);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
    if (!visible) return;

    sectionLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${visible.target.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.1, 0.3, 0.6] });

  sections.forEach((section) => sectionObserver.observe(section));
} else {
  sectionLinks[0]?.setAttribute("aria-current", "location");
}
