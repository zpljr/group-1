// Shared header and footer template, injected into every page.
(function () {
  const pages = [
    { href: "index.html", label: "Home" },
    { href: "gallery.html", label: "Gallery" },
    { href: "about.html", label: "About Us" },
    { href: "contact.html", label: "Contact" },
  ];

  const current = location.pathname.split("/").pop() || "index.html";

  const links = pages
    .map((p) => {
      const active = p.href === current ? ' aria-current="page" class="active"' : "";
      return `<li><a href="${p.href}"${active}>${p.label}</a></li>`;
    })
    .join("");

  const headerHTML = `
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="Group 1 home">
        <span class="logo-mark" aria-hidden="true">G1</span>
        <span class="logo-text">Group 1</span>
      </a>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-nav">
        <span></span><span></span><span></span>
      </button>
      <nav id="site-nav" class="site-nav" aria-label="Main navigation">
        <ul>${links}</ul>
      </nav>
    </div>`;

  const footerHTML = `
    <div class="container footer-inner">
      <p class="footer-brand"><strong>Group 1</strong> &mdash; Meet the team.</p>
      <ul class="footer-links">${links}</ul>
      <p class="footer-copy">&copy; ${new Date().getFullYear()} Group 1. All rights reserved.</p>
    </div>`;

  document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");
    if (header) header.innerHTML = headerHTML;
    if (footer) footer.innerHTML = footerHTML;

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  });
})();
