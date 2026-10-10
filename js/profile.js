document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("profile");
  if (!container) return;

  const id = Number(new URLSearchParams(location.search).get("id"));
  const m = members.find(function (x) {
    return x.id === id;
  });

  if (!m) {
    container.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = "profile-missing";
    msg.append("Member not found. ");
    const back = document.createElement("a");
    back.href = "index.html#members";
    back.textContent = "Back to members";
    msg.appendChild(back);
    container.appendChild(msg);
    return;
  }

  document.title = m.name + " | Group 1";

  document.getElementById("profile-photo").src = m.photo;
  document.getElementById("profile-photo").alt = "Photo of " + m.name;
  document.getElementById("profile-name").textContent = m.name;
  document.getElementById("profile-role").textContent = m.role;
  document.getElementById("profile-intro").textContent = m.intro;

  function fillList(listId, items) {
    const ul = document.getElementById(listId);
    items.forEach(function (item) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  fillList("profile-hobbies", m.hobbies);
  fillList("profile-skills", m.skills);

  const other = document.getElementById("profile-other");
  Object.keys(m.other).forEach(function (key) {
    const dt = document.createElement("dt");
    dt.textContent = key;
    const dd = document.createElement("dd");
    dd.textContent = m.other[key];
    other.append(dt, dd);
  });
});
