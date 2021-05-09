const express = require("express");
const app = express();
const db = require("./models");
const userRouter = require("./routes/userRouter");

app.use(express.json());

app.use("/user", userRouter);
db.sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => console.log("running"));
});
