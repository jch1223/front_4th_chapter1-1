import { MainPage } from "@/pages/Main";
import { ErrorPage } from "@/pages/Error";
import { LoginPage } from "@/pages/Login";
import { ProfilePage } from "@/pages/Profile";
import { userStore } from "@/store/userStore";

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

const routeGuard = (render: () => void) => () => {
  if (window.location.pathname !== "/login" && !userStore.getUser()) {
    router.navigateTo("/login");
    return;
  }

  if (window.location.pathname === "/login" && userStore.getUser()) {
    router.navigateTo("/");
    return;
  }

  render();
};

const routes = {
  "/": MainPage.render,
  "/login": routeGuard(LoginPage.render),
  "/profile": routeGuard(ProfilePage.render),
  "/error": ErrorPage.render,
};

const router = createRouter(routes);

export { router };
