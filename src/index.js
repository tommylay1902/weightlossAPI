const express = require("express");
const app = express();
const db = require("./models");
const userRouter = require("./routes/userRouter");
const macroRouter = require("./routes/macroRouter");

app.use(express.json());

app.use("/user", userRouter);
app.use("/macros", macroRouter);

db.sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => console.log("running"));
});
