import { Router } from "express";
import { AuthRoute } from "./modules/auth/auth.route";
import { UserRoute } from "./modules/user/user.route";
import { MediaRouter } from "./modules/media/media.route";
const router = Router();

export const appRouters = [
  {
    path: "/auth",
    handler: AuthRoute,
  },
  {
    path: "/user",
    handler: UserRoute,
  },
  {
    path: "/media",
    handler: MediaRouter,
  },
];

// ready for use
appRouters.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
