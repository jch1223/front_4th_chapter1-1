import { MainPage } from "@/pages/Main";
import { ErrorPage } from "@/pages/Error";
import { LoginPage } from "@/pages/Login";
import { ProfilePage } from "@/pages/Profile";
import { userStore } from "@/store/userStore";

const render = (component: () => string) => {
  const $root = document.getElementById("root");

  if (!$root) return;

  $root.innerHTML = component();
};

const routes = {
  "/": () => {
    render(MainPage);
  },
  "/login": () => {
    if (userStore.getUser()) {
      router.navigateTo("/");
      return;
    }

    render(LoginPage);
  },
  "/profile": () => {
    if (!userStore.getUser()) {
      router.navigateTo("/login");
      return;
    }

    render(ProfilePage);
  },
  "/error": () => {
    render(ErrorPage);
  },
};

const createRouter = (routes: Record<string, () => void>) => {
  return {
    navigateTo(path: string) {
      if (!Object.keys(routes).includes(path)) {
        routes["/error"]();
        return;
      }

      history.pushState(null, "", path);
      routes[path]();
    },
  };
};

const createHashRouter = (routes: Record<string, () => void>) => {
  return {
    navigateTo(path: string) {
      if (!Object.keys(routes).includes(`${path}`)) {
        window.location.hash = `#/error`;
        routes["/error"]();
        return;
      }

      window.location.hash = `#${path}`;
      history.pushState(null, "", `#${path}`);
      routes[path]();
    },
  };
};

const browserRouter = createRouter(routes);
const hashRouter = createHashRouter(routes);

const router = window.location.hash ? hashRouter : browserRouter;

export { router };
