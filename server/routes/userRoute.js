const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  updateRole,
  isAdminuser,
  checkSignup,
  checkresetPasswordUser,
  verifyUser,
  deleteMultipleUser,
  deleteUser,
} = require("../controllers/userCtrl");
const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");

const router = express.Router();

//*-------------- In used-------------
router.post("/signup", createUser);
router.post("/login", loginUserCtrl);
router.get("/profile", verifyUser);
router.delete("/profile", updatedUser);
router.get("/",authMiddleware,isAdmin, getallUser);
router.delete("/",authMiddleware,isAdmin, deleteMultipleUser);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.put("/:id", authMiddleware, isAdmin, updateRole);


router.get("/verify", verifyUser);
router.post("/check", checkSignup);
router.post("/forgot-password-token", forgetPasswordToken);
router.get("/reset-password/:token", checkresetPasswordUser);
router.put("/reset-password/:token", resetPassword);

//TODO----------- Un used-------------
router.post("/isadmin", isAdminuser);
router.put("/password", authMiddleware, updatePassword);
router.post("/admin-login", loginAdmin);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logout);
router.put("/order/update-order/:id", authMiddleware);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, isSuper, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, isSuper, unblockUser);

module.exports = router;
