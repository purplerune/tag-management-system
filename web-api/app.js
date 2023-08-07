import express from "express";
import cors from "cors";
const app = express();
import {
  createTag,
  listTags,
  getTagById,
  updateTag,
  deleteTag,
} from "./app/controllers/tagController.js";

const PORT = 3100;

app.use(express.json());
app.use(cors());

app.post("/api/tags", createTag);
app.get("/api/tags", listTags);
app.get("/api/tags/:id", getTagById);
app.put("/api/tags/:id", updateTag);
app.delete("/api/tags/:id", deleteTag);

app.get("/", (_, res) => {
  console.log("Server Web API runnig ...");
  res.send("This is API root!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
