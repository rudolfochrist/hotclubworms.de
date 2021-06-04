
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
  const $events = document.getElementById("events").children;
  const $upcomingContainer = document.getElementById("upcoming-events");
  const today = new Date();

  for (const $event of $events) {
    const eventDate = new Date($event.dataset['date']);
    if (eventDate >= today) {
      $upcomingContainer.append($event);
    }
  }

  const $noUpcomingNote = document.getElementById("no-upcoming-note");
  if ($upcomingContainer.children.length === 0) {
    $noUpcomingNote.classList.remove("hidden");
  }
}

function toggleBw(event) {
  const imgs = document.querySelectorAll(".profile-image img");
  imgs.forEach((img) => {
    if (img.src.search("-bw") >= 0) {
      img.src = img.src.replace("-bw", "");
    } else {
      img.src = img.src.replace(/\/(\w+)\.jpg/, "/$1-bw.jpg");
    }
  });
}

docReady(() => {
  const navToggle = document.querySelector("#nav-toggle");
  navToggle.onclick = toggleNavbar;

  const toggleBwButton = document.querySelector("#bw-toggle");
  toggleBwButton.onclick = toggleBw;
});
