
function toggleNavbar(event) {
  const els = document.querySelectorAll('nav > a:not(#nav-toggle)');
  els.forEach((el) => {
    el.style.display = el.style.display === "block"
      ? "none"
      : "block";
  });
}

function docReady(fn) {
  if (document.readyState !== "loading") {
    fn();
  }
  else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function sortEvents() {
  const $events = document.querySelector("#events");
  const $upcomingContainer = document.querySelector("#upcoming");
  const today = new Date();

  // sort them in reverse
  [...$events.children]
    .sort((a, b) => new Date(a.dataset.date) < new Date(b.dataset.date) ? 1 : -1)
    .forEach(node => $events.appendChild(node));

  // move to upcoming
  [...$events.children].forEach((event) => {
    const eventDate = new Date(event.dataset.date);
    if (eventDate >= today) $upcomingContainer.appendChild(event);
  });

  const $noUpcomingNote = document.querySelector("#no-upcoming-note");
  if ($upcomingContainer.children.length === 0) {
    $noUpcomingNote.classList.remove("is-hidden");
  } else {
    [...$upcomingContainer.children]
      .sort((a, b) => new Date(a.dataset.date) > new Date(b.dataset.date) ? 1 : -1)
      .forEach(node => $upcomingContainer.appendChild(node));
  }
}

docReady(() => {
  const navToggle = document.querySelector("#nav-toggle");
  navToggle.onclick = toggleNavbar;

  const cookieSettingsBtn = document.querySelector("#cookie-settings");
  if (cookieSettingsBtn != null) {
    cookieSettingsBtn.onclick = () => {
    };
  }

  if (document.querySelector("#events")) {
    sortEvents();
  }
});
