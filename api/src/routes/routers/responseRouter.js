const { Router } = require("express");
const responseRouter = Router();

const {
  getResponse,
  getResponseById,
  createResponse,
  deleteResponse,
  restoreResponse
} = require("../controllers/responseController");

responseRouter.get("/getResponse", getResponse);

responseRouter.get("/getResponseById", getResponseById);

responseRouter.post("/createResponse", createResponse)

responseRouter.post("/restoreResponse", restoreResponse);

responseRouter.delete("/deleteResponse", deleteResponse);

module.exports = responseRouter;