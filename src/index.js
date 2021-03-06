const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const userRouter = require("./routes/userRouter");
const nutritionRouter = require("./routes/nutritionRouter");
const exerciseRouter = require("./routes/exerciseRouter");
const authRouter = require("./routes/authRouter");
const workoutRouter = require("./routes/workoutRouter");

const db = require("./models");

//dotenv config
const dotenv = require("dotenv");
dotenv.config();

const app = express();

//set up helmet
app.use(helmet());

//set up rate limit
const limiter = rateLimit({
    windowMS: 15 * 60 * 1000, //15 minutes
    max: 100, //only 100 request per IP every ^^^ minutes
    delayMs: 0, // delay time between request
});

app.use(limiter);
app.use(cors("*"));
app.use(express.json());

//create options for swagger documentation
let options = {
    definition: {
        swagger: "2.0",
        info: {
            title: "Weight Loss API", // Title (required)
            version: "0.0.1", // Version (required)
            contact: { name: "", url: "http://localhost:3000" },
        },
    },
    apis: ["./src/routes/*"],
};

const swaggerDocs = swaggerJsDocs(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/user", userRouter);
app.use("/nutrition", nutritionRouter);
app.use("/exercise", exerciseRouter);
app.use("/auth", authRouter);
app.use("/workout", workoutRouter);

//{force:true}
db.sequelize.sync({ force: true }).then(() => {
    app.listen(process.env.PORT, () => console.log("running"));
});
