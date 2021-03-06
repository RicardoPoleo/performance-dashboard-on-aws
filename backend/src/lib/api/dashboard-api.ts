import { Router } from "express";
import DashboardCtrl from "../controllers/dashboard-ctrl";
import WidgetCtrl from "../controllers/widget-ctrl";
import withErrorHandler from "./middleware/error-handler";

const router = Router();

router.get("/", withErrorHandler(DashboardCtrl.listDashboards));
router.get("/:id", withErrorHandler(DashboardCtrl.getDashboardById));
router.get("/:id/versions", withErrorHandler(DashboardCtrl.getVersions));
router.post("/:id", withErrorHandler(DashboardCtrl.createNewDraft));
router.post("/", withErrorHandler(DashboardCtrl.createDashboard));
router.put("/:id/publish", withErrorHandler(DashboardCtrl.publishDashboard));
router.put(
  "/:id/publishpending",
  withErrorHandler(DashboardCtrl.publishPendingDashboard)
);
router.put("/:id/archive", withErrorHandler(DashboardCtrl.archiveDashboard));
router.put("/:id/draft", withErrorHandler(DashboardCtrl.moveToDraftDashboard));
router.put("/:id/widgetorder", withErrorHandler(WidgetCtrl.setWidgetOrder));
router.put("/:id", withErrorHandler(DashboardCtrl.updateDashboard));
router.delete("/", withErrorHandler(DashboardCtrl.deleteDashboards));
router.delete("/:id", withErrorHandler(DashboardCtrl.deleteDashboard));
router.post("/:id/widget", withErrorHandler(WidgetCtrl.createWidget));
router.get("/:id/widget/:widgetId", withErrorHandler(WidgetCtrl.getWidgetById));
router.put("/:id/widget/:widgetId", withErrorHandler(WidgetCtrl.updateWidget));
router.delete(
  "/:id/widget/:widgetId",
  withErrorHandler(WidgetCtrl.deleteWidget)
);

export default router;
