require("dotenv").config();
const express =require("express");
const cors =require("cors");
const cookieparser =require("cookie-parser");
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./docs/swagger.json");
const db = require("./app/models/index")
const { veryfyToken } = require("./app/middlewares/auth.middleware");
const port = process.env.PORT || 3003;
const app = express();

const userRouts = require('./app/routes/user.route');
const authRouts = require('./app/routes/auth.route');
const roleRouts = require('./app/routes/role.route');

app.use(cors());
app.use(express.json());
app.use(cookieparser());

db.sequelize.sync({ force: false }).then(() => {
   
});
// db.sequelize.sync().then(() => {
//   console.log("Server Start");
// });

// ---route----
app.get("/", (req, res) => {
    res.json({ message: "Code-js webApi." });
});
app.use('/user', userRouts);
app.use('/auth', authRouts);
app.use('/role', veryfyToken,roleRouts);

// -------------


app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument,{ explorer: true }));

app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
