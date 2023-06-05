import { Router } from "express";

import * as userController from "../controllers/user.controller";

const router = Router();

//usuarios
router.get("/:idFirebase", userController.findUser);
router.post("/", userController.createUser);
router.put("/:idFirebase", userController.updateUser);
router.delete("/:idFirebase", userController.deleteUser);

export default router;
