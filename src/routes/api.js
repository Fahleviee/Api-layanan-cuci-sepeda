import express from "express";
import customerController from "../controllers/customerController.js";
import serviceController from "../controllers/serviceController.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/customer", customerController.getAll);
router.get("/customer/:id", customerController.getById);
router.post("/customer", customerController.create);
router.put("/customer/:id", customerController.update);
router.delete("/customer/:id", customerController.delete);

router.get("/service", serviceController.getAll);
router.get("/service/:id", serviceController.getById);
router.post("/service", serviceController.create);
router.put("/service/:id", serviceController.update);
router.delete("/service/:id", serviceController.delete);

router.get("/order", orderController.getAll);
router.get("/order/:id", orderController.getById);
router.post("/order", orderController.create);
router.put("/order/:id", orderController.update);
router.delete("/order/:id", orderController.delete);
router.patch("/order/:id/status", orderController.updateStatus);

export default router;