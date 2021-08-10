import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoMemoryServer = async () => {
  const mongod = await MongoMemoryServer.create();
  return mongod;
};

const connect = async (): Promise<void> => {
  const mongod = await mongoMemoryServer();
  const uri = mongod.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

const closeDatabase = async (): Promise<void> => {
  const mongod = await mongoMemoryServer();
  await mongod.stop();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export { connect, closeDatabase, clearDatabase };
