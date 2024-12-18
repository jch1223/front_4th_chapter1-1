import { MainPage } from "@/pages/Main";
import { ErrorPage } from "@/pages/Error";
import { LoginPage } from "@/pages/Login";
import { ProfilePage } from "@/pages/Profile";

const createRouter = (routes: { [key: string]: () => void }) => {
  return {
    navigateTo(path: string) {
      if (!Object.keys(routes).includes(path)) {
        path = "/error";
      }

      history.pushState(null, "", path);
      routes[path]();
    },
  };
};

const routes = {
  "/": MainPage.render,
  "/login": LoginPage.render,
  "/profile": ProfilePage.render,
  "/error": () => {
    const $root = document.querySelector("#root");

    if (!$root) return;

    $root.innerHTML = ErrorPage();
  },
};

const router = createRouter(routes);

export { router };
