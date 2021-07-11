
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
});
