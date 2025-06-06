import mongoose from "mongoose";

const connectDBMongo = async():Promise<void> => {
    const mongoUri="mongodb://127.0.0.1:27017/admin";

    if (!mongoUri) {
      throw new Error ('MONGI_URI no eata definida en .env');
    }

    try{
      await mongoose.connect(mongoUri);
      console.log("#Conexion con mongo")

    }catch(error){
        console.log("Error al conectarse con mongo:", error)
    }
}
export default connectDBMongo;