import app from "./src/middleware/appRouteMiddlewares.js";
import ENV from "./src/config/keys.js";
import allRouters from "./src/routes/index.js";
import DB from "./src/config/db.js";
import errorHandler from "./src/utils/ErrorHandler.js";


// use middleware routers
app.use("/api/testing", allRouters);
app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`ECC is running on port ${ENV.PORT}`);
  DB();
});
