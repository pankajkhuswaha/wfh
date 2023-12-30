const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllClients,
  updateClient,
  delteClient,
  delteMultipleClient,
  uploadClients,
  clientStatus,
} = require("../controllers/clientCtrl");
const router = express.Router();

router.get("/", authMiddleware, getAllClients);
router.get("/stats", authMiddleware, clientStatus);
router.post("/", authMiddleware, uploadClients);
router.delete("/", authMiddleware, isAdmin, delteMultipleClient);
router.put("/:_id", authMiddleware, updateClient);
router.delete("/:_id", authMiddleware, delteClient);

module.exports = router;
