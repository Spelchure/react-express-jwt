import createExpressApp from './app';
import mongoose from 'mongoose';

const startServer = async () => {
  const port = +(process.env.PORT || 8082);
  const app = createExpressApp();

  try {
    await mongoose.connect(<string>process.env.MONGODB_URL);

    app.listen(port);
    console.log(`Server is listening ${port}`);
  } catch (error) {
    console.log(`An error ocurred while starting server: ${error}`);
    process.exit(1);
  }
};

startServer();
