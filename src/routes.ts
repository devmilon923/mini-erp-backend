import { Router } from "express";
import { AuthRoute } from "./modules/auth.route";
const router = Router();
export const appRouters = [
  {
    path: "/auth",
    handler: AuthRoute,
  },
];

// ready for use
appRouters.forEach(({ path, handler }) => {
  router.use(path, handler);
});

export default router;
