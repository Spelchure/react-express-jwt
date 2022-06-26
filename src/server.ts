import createExpressApp from "./app";

const startServer = async () => {
  const port = +(process.env.PORT || 8082);
  const app = createExpressApp();

  try {
    app.listen(port);
    console.log(`Server is listening ${port}`);
  } catch (error) {
    console.log(`An error ocurred while starting server: ${error}`);
    process.exit(1);
  }
};

startServer();
