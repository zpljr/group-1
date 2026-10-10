// Gallery items; member photos come from members.js.
const galleryCategories = [
  { key: "all", label: "All" },
  { key: "members", label: "Members" },
  { key: "activities", label: "Group Activities" },
  { key: "projects", label: "School Projects" },
  { key: "events", label: "Events" },
  { key: "moments", label: "Memorable Moments" },
];

function placeholderItems(category, captionPrefix, count) {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      src: "images/placeholder-wide.svg",
      caption: captionPrefix + " " + i + " - short description placeholder.",
      category: category,
    });
  }
  return items;
}

const galleryItems = [].concat(
  members.map(function (m) {
    return { src: m.photo, caption: m.name, category: "members" };
  }),
  placeholderItems("activities", "Group activity", 3),
  placeholderItems("projects", "School project", 3),
  placeholderItems("events", "Event", 3),
  placeholderItems("moments", "Memorable moment", 3)
);

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("gallery-grid");
  const filters = document.getElementById("gallery-filters");
  const dialog = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCaption = document.getElementById("lightbox-caption");
  if (!grid || !filters || !dialog) return;

  const figures = galleryItems.map(function (item) {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    figure.dataset.category = item.category;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-thumb";
    button.setAttribute("aria-label", "View larger: " + item.caption);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.caption;
    img.loading = "lazy";
    button.appendChild(img);

    const caption = document.createElement("figcaption");
    caption.textContent = item.caption;

    figure.append(button, caption);
    grid.appendChild(figure);
    return figure;
  });

  function visibleFigures() {
    return figures.filter(function (f) {
      return !f.hidden;
    });
  }

  // Filters
  galleryCategories.forEach(function (cat, index) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn" + (index === 0 ? " active" : "");
    btn.textContent = cat.label;
    btn.dataset.filter = cat.key;
    btn.setAttribute("aria-pressed", String(index === 0));
    filters.appendChild(btn);
  });

  filters.addEventListener("click", function (e) {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".filter-btn").forEach(function (b) {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", String(on));
    });
    figures.forEach(function (f) {
      f.hidden = btn.dataset.filter !== "all" && f.dataset.category !== btn.dataset.filter;
    });
  });

  // Lightbox
  let currentIndex = 0;

  function show(index) {
    const list = visibleFigures();
    currentIndex = (index + list.length) % list.length;
    const img = list[currentIndex].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
  }

  grid.addEventListener("click", function (e) {
    const thumb = e.target.closest(".gallery-thumb");
    if (!thumb) return;
    show(visibleFigures().indexOf(thumb.parentElement));
    dialog.showModal();
  });

  document.getElementById("lightbox-close").addEventListener("click", function () {
    dialog.close();
  });
  document.getElementById("lightbox-prev").addEventListener("click", function () {
    show(currentIndex - 1);
  });
  document.getElementById("lightbox-next").addEventListener("click", function () {
    show(currentIndex + 1);
  });

  // Clicking the backdrop closes the dialog.
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(currentIndex - 1);
    if (e.key === "ArrowRight") show(currentIndex + 1);
  });
});
