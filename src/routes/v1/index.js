const express = require("express");
const config = require("../../config/config");
const authRoute = require("./auth.routes");
const userRoute = require("./user.routes");
const docsRoute = require("./docs.routes");
const subcriptionRoutes = require("./subcription.routes");
const mySubcriptionRoute = require("./mySubctiption.routes");
const myMatchRoute = require("./myMatch.routes");
const blockUserRoute = require("./blockUser.routes");
const notInterestedRoute = require("./notInterested.routes");
const shortListedProfileRoute = require("./shortListedProfile.routes");
const paymentRoute = require("./payment.routes");
const categoryRouter = require("./category.routes");
const subCategoryRouter = require("./subCategory.routes");
const serviceRouter = require("./service.routes");


const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/subcription",
    route: subcriptionRoutes,
  },
  {
    path: "/mySubcription",
    route: mySubcriptionRoute,
  },
  {
    path: "/myMatch",
    route: myMatchRoute,
  },
  {
    path: "/blockUser",
    route: blockUserRoute,
  },
  {
    path: "/notInterested",
    route: notInterestedRoute,
  },
  {
    path: "/shortListProfile",
    route:shortListedProfileRoute,
  },
  {
    path: "/payment",
    route:paymentRoute,
  },
  {
    path: "/category",
    route:categoryRouter,
  },
  {
    path: "/subCategory",
    route:subCategoryRouter,
  },
  {
    path: "/service",
    route:serviceRouter,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
