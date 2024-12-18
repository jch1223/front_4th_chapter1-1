import { router } from "@/core/router";

const DOMAIN = "localhost:5173";

export const render = () => {
  router.navigateTo(window.location.pathname);

  window.addEventListener("popstate", () => {
    router.navigateTo(window.location.pathname);
  });

  window.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  window.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();

      const href = e.target.href;
      const link = href.replace(new RegExp(`.*${DOMAIN}(.*)`), "$1");

      if (link) router.navigateTo(link);
    }
  });
};
