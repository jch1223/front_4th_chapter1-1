import { router } from "@/core/router";

export const render = () => {
  window.addEventListener("popstate", () => {
    router.navigateTo(window.location.pathname);
  });
};
