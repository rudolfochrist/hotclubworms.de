
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

  new CookiesEuBanner(() => {
    const ytCookieNotice = document.querySelector("#yt-cookie-notice");
    if (ytCookieNotice != null) {
      ytCookieNotice.style.display = 'none';
      const videos = document.querySelectorAll(".yt-container iframe");
      videos.forEach((video) => {
        video.src = video.dataset.src;
      });
    }
  }, true, true);

  const cookieSettingsBtn = document.querySelector("#cookie-settings");
  if (cookieSettingsBtn != null) {
    cookieSettingsBtn.onclick = () => {
      sessionStorage.clear();
      const videoContainer = document.querySelector("#video-container");
      if (videoContainer != null) {
        videoContainer.innerHTML = "";
      }
      window.location.reload();
    };
  }

  if (document.querySelector("#events")) {
    sortEvents();
  }
});
