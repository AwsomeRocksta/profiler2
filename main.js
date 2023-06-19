const videoContainer = document.querySelector(".intro-video-container");
const video = videoContainer.querySelector(".intro");
const skipButton = videoContainer.querySelector("#skip-intro-button");
const replayButton = document.querySelector("#replay-intro-button");
const scrollDownWrapper = document.querySelector("#scroll-down-wrapper");

// lazy load

document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;

          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

// document.body.onload = function () {
//   setTimeout(function () {
//     const preloader = document.getElementById("page-preloader");
//     if (!preloader.classList.contains("done")) {
//       preloader.classList.add("done");
//     }
//   }, 10000);
// };

function showScrollDown() {
  scrollDownWrapper.style.display = "none";
  setTimeout(function () {
    scrollDownWrapper.classList.add("show");
    scrollDownWrapper.style.display = "block";
  }, 3000);
}
function disableScroll(event) {
  event.preventDefault();
}
function enableScroll() {
  window.removeEventListener("wheel", disableScroll);
  window.addEventListener("wheel", enableScroll, { passive: false });
}
video.addEventListener("ended", function () {
  video.pause();
  videoContainer.style.display = "none";
  window.removeEventListener("wheel", disableScroll);
  showScrollDown();
});

skipButton.addEventListener("click", function () {
  video.pause();
  videoContainer.style.display = "none";
  window.removeEventListener("wheel", disableScroll);
  enableScroll();
  showScrollDown();
});

replayButton.addEventListener("click", function () {
  video.currentTime = 0;
  video.play();
  videoContainer.style.display = "block";
  window.addEventListener("wheel", disableScroll, { passive: false });
  scrollDownWrapper.style.display = "none";
});

video.addEventListener("play", function () {
  window.addEventListener("wheel", disableScroll, { passive: false });
});

video.addEventListener("ended", function () {
  videoContainer.style.display = "none";
  window.removeEventListener("wheel", disableScroll);
  window.addEventListener("wheel", enableScroll, { passive: false });
  showScrollDown();
});

const overlay = document.querySelector(".overlay");
const expBtn = document.querySelector("#exp-btn");

expBtn.addEventListener("click", () => {
  if (overlay.style.display === "block") {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "block";
  }
});

document.querySelector("#up-btn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#me-btn").addEventListener("click", () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
});
