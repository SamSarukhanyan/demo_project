import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import db from "./models/index.js";

import homeRoutes from "./routes/home.js";
import adminRoutes from "./routes/admin.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  try {
    const user = await db.User.findByPk(1);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
});

//Routes
app.use(homeRoutes);
app.use("/products", adminRoutes);
app.use("/categories", categoryRoutes);
app.use((req, res) => {
  const viewsData = {
    pageTitle: "Page Not Foundddd",
  };
  res.status(404).json(viewsData);
});

app.listen(5000, async () => {
  try {
    await db.sequelize.sync({force: true});
    const user = await db.User.findByPk(1);
    if (!user) {
     await db.User.create({ name: "Samvel", email: "Samvel@mail.ru" });
      console.log("Server is running on port 5000");
    }
  } catch (error) {
    console.log(error);
  }
});
