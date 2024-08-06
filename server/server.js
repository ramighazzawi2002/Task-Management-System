const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const userRouter = require("./routes/userRouters");
const taskRouter = require("./routes/taskRouter");
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
