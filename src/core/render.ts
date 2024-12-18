import { router } from "@/core/router";

export const render = () => {
  router.navigateTo(window.location.pathname);

  window.addEventListener("popstate", () => {
    router.navigateTo(window.location.pathname);
  });

  window.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};
