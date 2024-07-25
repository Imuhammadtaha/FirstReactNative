import express from "express";
import {
  loginController,
  registerController,
  requireSignIn,
  updateProfileController,
} from "../controllers/userController.js";

const router = express.Router();
/**----------
 *
 * - SIGNUP
 * -- */
router.post("/register", registerController);
/**----------
 *
 * - LOGIN
 * -- */
router.post("/login", loginController);

/**----------
 *
 * - UPDATE PROFILE
 * -- */

router.put("/update-profile", requireSignIn, updateProfileController);
export default router;
