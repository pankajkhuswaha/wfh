const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllClients,
  updateClient,
  delteClient,
  delteMultipleClient,
  uploadClients,
} = require("../controllers/clientCtrl");
const router = express.Router();

router.get("/", authMiddleware, getAllClients);
router.post("/", authMiddleware, uploadClients);
router.delete("/", authMiddleware, isAdmin, delteMultipleClient);
router.put("/:_id", authMiddleware, updateClient);
router.delete("/:_id", authMiddleware, delteClient);

module.exports = router;
