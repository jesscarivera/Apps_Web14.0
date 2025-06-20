import console from 'console';
import express from 'express';
//import morgan from 'morgan';
import authRoutes from './routes/auth.routes';
import ordersRoutes from './routes/orders.routes';
import connectDBMongo from './config/db';
import productRoutes from './routes/product.routes'

const app = express(); 

const PORT = 3000; //Numero de puerto

app.use(express.json()); //Request de tipo json

//Ruta principal
app.use('/api/auth',authRoutes);
app.use('/api/orders',ordersRoutes);
app.use('/api/products',productRoutes);

connectDBMongo().then(()=>{
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto: ${PORT}`);
        console.log("Servidor corriendo en puerto:",PORT);
    })
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    
})