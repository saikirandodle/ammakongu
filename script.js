// Update with your WhatsApp business number including country code, e.g. 919876543210
const WHATSAPP_NUMBER = "918686159504";
const sarees = [
  [
    "Kanchipuram Silk",
    "Kanchipuram",
    "images/collection-kanchipuram.jpg",
    "Rich zari detailing and timeless South Indian elegance.",
  ],
  [
    "Gadwal Classic",
    "Gadwal",
    "images/collection-gadwal.jpg",
    "Traditional borders and graceful colour combinations.",
  ],
  [
    "Pochampally Ikat",
    "Pochampally",
    "images/collection-pochampally.jpg",
    "Distinctive geometric patterns inspired by ikat weaving.",
  ],
  [
    "Banarasi Celebration",
    "Banarasi",
    "images/collection-banarasi.jpg",
    "A festive favourite with intricate traditional motifs.",
  ],
  [
    "Fancy Embellished",
    "Fancy",
    "images/fancy-saree-feature.jpg",
    "A touch of sparkle for celebrations and special evenings.",
  ],
  [
    "Daily Wear Edit",
    "Daily Wear",
    "images/collection-dailywear.jpg",
    "Comfortable and colourful styles for everyday elegance.",
  ],
  [
    "Festive Zari Collection",
    "Festive",
    "images/occasion-festive.jpg",
    "A statement look for weddings and family celebrations.",
  ],
  [
    "Traditional Silk Edit",
    "Traditional",
    "images/occasion-wedding.jpg",
    "Classic silk-inspired designs to treasure for years.",
  ],
];
let page = 1;
const perPage = 4,
  grid = document.getElementById("galleryGrid"),
  pager = document.getElementById("pagination");
let isScrolling = false;
let scrollTimeout = null;
function render() {
  const total = Math.ceil(sarees.length / perPage),
    items = sarees.slice((page - 1) * perPage, page * perPage);
  grid.innerHTML = items
    .map(
      (x) =>
        `<article class="gallery-card"><img src="${x[2]}" alt="${x[0]}" loading="lazy" decoding="async"><div><small>${x[1].toUpperCase()} COLLECTION</small><h3>${x[0]}</h3><p>${x[3]}</p></div></article>`,
    )
    .join("");
  pager.innerHTML = Array.from(
    { length: total },
    (_, i) =>
      `<button class="${page === i + 1 ? "active" : ""}" data-page="${i + 1}">${i + 1}</button>`,
  ).join("");
}
pager.addEventListener("click", (e) => {
  const b = e.target.closest("[data-page]");
  if (!b) return;
  page = +b.dataset.page;
  render();
  isScrolling = false;
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    isScrolling = true;
  }, 1500);
});
function whatsapp(message) {
  if (!/^91\d{10}$/.test(WHATSAPP_NUMBER)) {
    alert("Please update the WhatsApp number in script.js.");
    return;
  }
  window.open(
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message),
    "_blank",
    "noopener",
  );
}
document.getElementById("enquiryForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.currentTarget);
  whatsapp(
    `Hello AMMA KONGU!\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nInterested in: ${d.get("interest")}\nMessage: ${d.get("message")}`,
  );
});
const menu = document.querySelector(".menu-btn"),
  nav = document.querySelector(".navigation");
menu.addEventListener("click", () => nav.classList.toggle("open"));
nav
  .querySelectorAll("a")
  .forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open")),
  );
const topBtn = document.querySelector(".back-top");
window.addEventListener("scroll", () =>
  topBtn.classList.toggle("show", scrollY > 400),
);
topBtn.addEventListener("click", () =>
  scrollTo({ top: 0, behavior: "smooth" }),
);
document.getElementById("year").textContent = new Date().getFullYear();
render();

// Scroll-triggered animations
if ("IntersectionObserver" in window) {
  const animationConfig = {
    ".hero-copy": "scroll-animate fadeIn",
    ".eyebrow": "scroll-animate slide-down",
    ".hero h1": "scroll-animate slide-down",
    ".hero-btn": "scroll-animate slide-up",
    ".benefits": "scroll-animate scale-in",
    ".benefit-icon": "scroll-animate scale-in",
    ".gallery": "scroll-animate fadeIn",
    ".gallery-card": "scroll-animate scale-in",
    ".section-title": "scroll-animate fadeIn",
    ".occasion-card": "scroll-animate scale-in",
    ".story-image": "scroll-animate slide-left",
    ".story-copy h2": "scroll-animate slide-right",
    ".why-intro": "scroll-animate slide-left",
    ".why-grid article": "scroll-animate slide-up",
    ".care-image": "scroll-animate slide-left",
    ".care-copy": "scroll-animate slide-right",
    ".care-points p": "scroll-animate slide-up",
    ".faq-list details": "scroll-animate slide-up",
    "#enquiryForm": "scroll-animate scale-in",
    ".contact>div:first-child": "scroll-animate slide-left",
    footer: "scroll-animate fadeIn",
    ".contact": "scroll-animate fadeIn",
  };

  Object.entries(animationConfig).forEach(([selector, classes]) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(...classes.split(" "));
      el.style.animationDelay = `${i * 0.1}s`;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { rootMargin: "0px 0px -100px 0px", threshold: 0 },
  );

  document
    .querySelectorAll(".scroll-animate")
    .forEach((el) => observer.observe(el));
}

// Keep exactly one navigation item highlighted at a time.
// Collections and Gallery may share the same destination; prefer the clicked link.
// Scroll tracking updates highlight only when user has scrolled (not clicked recently).
(() => {
  const links = [...document.querySelectorAll("nav.navigation a[href^='#']")];
  const sections = [
    ...new Set(
      links
        .map((a) => document.querySelector(a.getAttribute("href")))
        .filter(Boolean),
    ),
  ];
  let userClickedLink = null;

  const setActive = (id, preferredLink = null) => {
    const matching = links.filter(
      (link) => link.getAttribute("href") === `#${id}`,
    );
    const activeLink =
      preferredLink && matching.includes(preferredLink)
        ? preferredLink
        : matching[matching.length - 1];
    links.forEach((link) => {
      const active = link === activeLink;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  // Detect manual scrolling vs smooth scroll from click
  window.addEventListener("wheel", () => {
    isScrolling = true;
  });
  window.addEventListener("touchmove", () => {
    isScrolling = true;
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible && isScrolling) {
          setActive(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
  }

  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      isScrolling = false;
      userClickedLink = link;
      const targetId = link.getAttribute("href").slice(1);
      setActive(targetId, link);

      // Clear scroll flag after smooth scroll animation completes
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = true;
      }, 1500);
    }),
  );

  setActive("home");
})();
