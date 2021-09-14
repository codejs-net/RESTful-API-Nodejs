require("dotenv").config();
const express =require("express");
const cors =require("cors");
const cookieparser =require("cookie-parser");
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./docs/swagger.json");
const db = require("./app/models/index")
const port = process.env.PORT || 3003;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieparser());

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and sync db.");
});

  


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Code-js webApi." });
});


app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument,{ explorer: true }));
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
