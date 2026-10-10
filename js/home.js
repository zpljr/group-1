document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("members-grid");
  if (!grid) return;

  members.forEach(function (m) {
    const link = document.createElement("a");
    link.className = "member-card";
    link.href = "profile.html?id=" + m.id;

    const img = document.createElement("img");
    img.src = m.photo;
    img.alt = "Photo of " + m.name;

    const name = document.createElement("h3");
    name.textContent = m.name;

    link.append(img, name);
    grid.appendChild(link);
  });
});
