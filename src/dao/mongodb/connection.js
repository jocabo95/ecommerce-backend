import mongoose from 'mongoose'

const connectionString = process.env.connectionString

let initMongoDb =async()=>{
  try {
    await mongoose.connect(connectionString)
    console.log('conectado a mongoDb');
  } catch (error) {
    console.log(error);
  }
}

export default initMongoDb

