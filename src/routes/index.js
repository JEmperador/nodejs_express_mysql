import productsRouter from "./products.route.js";

const router = (app) => {
  app.use((req, res, next) => {
    res.status(404).json("Not found")
  })
  app.use("/api", productsRouter);
};

export default router;
