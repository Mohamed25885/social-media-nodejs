<<<<<<< HEAD:server/index.js
"use strict";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./src/config/db.js";
import CommentsController from "./src/controllers/comments_controller.js";
import PostsController from "./src/controllers/posts_controller.js";

dotenv.config();


const port = process.env.APP_PORT || 5000;

app.listen(port, async () => {
  console.log(`tg on port ${port} ...`);
  await connectDB(process.env.DATABASE_URI);
  
  console.log(`listening on port ${port} ...`);
});
=======
"use strict";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./src/config/db.js";

dotenv.config();


const port = process.env.APP_PORT || 5000;

app.listen(port, async () => {
  console.log(`tg on port ${port} ...`);
  await connectDB(process.env.DATABASE_URI);
  
  console.log(`listening on port ${port} ...`);
});
>>>>>>> 4ebb730306b5e0f0c0daa4545b5f3b19a04b4af6:index.js