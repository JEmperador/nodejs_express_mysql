import productsRouter from "./products.route.js";

const router = (app) => {
  app.use("/api", productsRouter);
};

export default router;
