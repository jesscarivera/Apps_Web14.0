import { Request, Response } from "express";
import { RequestOptions } from "https";
import { generateAceesToken } from "../utils/generateToken";
import { cache } from "../utils/cache";
import { time } from "console";
import  dayjs  from "dayjs";
import { User } from "../models/User";
import bcrypt from 'bcryptjs';
import { Product } from "../models/Product";
import { Orders } from "../models/Orders";

//Endpoint, recibe un request, responde un response 
export const login =  async (req:Request,res:Response) =>{
    let number:number=1; //: ASIGNA EL TIPO DE VARIABLE Y ASIGNAR VALOR ES CON =

    const {username,password} = req.body;  //del cuerpo del request se recibe o busca user y pass

    const user = await User.findOne({username});
      if(!user){
       return res.status(401).json({message:"Credenciales incorrectas"});

    }
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        throw new Error('Contraseña incorrecta');
    };



  // comparando cadenas o caracterres son ===
  // comparando numeros o logicos ==
  //Investigar los tipos de errores//401 y 403 error de autorizacion
  //404 no existe
  //426 error personalizado
  //500 error de servidor
  //413 tamano de peticiones

  const accessToken=generateAceesToken(user.id);

  cache.set(user.id, accessToken, 60 * 15 )
  return res.json({message: "Login Exitoso",
    accessToken
  })
  
    
}

export const getTimeToken = (req: Request, res: Response) => {
  //const userId = "123456789";
  const { userId} = req.params;
  const ttl=cache.getTtl(userId);

  if (!ttl) {
    return res.status(404).json({message: "Token no encontrado"});
  }

  const now=Date.now();
  const timeToLifeSeconds=Math.floor((ttl-now)/1000);

  const expTime=dayjs(ttl).format('HH:mm:ss')

  return res.json({
    timeToLifeSeconds,
    expTime
  })
}

export const updateToken=(req:Request, res:Response)=>{
  const { userId} = req.params;
  const ttl=cache.getTtl(userId);

  if (!ttl) {
    return res.status(404).json({message: "Token no encontrado"});
  }
  const newTime:number = 60 * 15;
  cache.ttl(userId, newTime); //Actualiza ttl del Token;

  return res.json({message:"Actualizacion con exito"});

}

export const getAllUsers= async (req:Request, res:Response)=>{
  const userList = await User.find();//PARA ENCONTRAR TODOS LOS REGISTROS

  return res.json({userList});

}

export const getUserByUser = async (req:Request, res:Response) => {
  const {userName}=req.params;

  const userByUsername= await User.find({username: userName});
  //SELECT * FROM user WHERE username=userName

  if(!userByUsername) {
    return res.status(404).json({message: "usuario no existe"})

  }

    return res.json({userByUsername})
}

export const saveUser= async (req:Request, res:Response) => {


  try {
    const { name, username, email, phone, password, role} = req.body;

   const newUser= new User ({
    name,
    username,
    email,
    phone,
    password, role,
    status:true
    });

   const user = await newUser.save();

   return res.json({ user });
    
    
  }catch(error){
    console.log("Error ocurrio en SAVEUSER:", error)

   }
}

export const updateUser= async(req: Request, res: Response) =>{
try{
    const{userId}=req.params;
  const{emailUser, phone, password, role, name}=req.body;

  const user=await User.findById(userId);

    const encryptedPassword = await bcrypt.hash(password, 10);

//validar que exista
  if(!user){
    return res.status(404).json({
      message:"Usuario no encontrado"

    });

  }
//validar que no se repita correo
  const userEmail=await User.find({email: emailUser})
  if (userEmail && userEmail.length > 0) {
    return res.status(426).json({
      message:"El correo ya esta registrado"
    });

  }

  user.email=emailUser;
  user.password=password != null ? encryptedPassword: user.password; //if ternario
  user.role=role;
  user.phone=phone;
  user.name=name;

  const updateUser= await user.save();

  return res.json({ updateUser})

}catch(error){
  console.log("Error en updateUser:", error);
  return res.status(426).json({ error })
}

}

export const encryptPassword = async (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Ingrese una contraseña" });
  }

  try {
    const encryptedPassword = await bcrypt.hash(password, 10); // 🔐 Aquí encriptamos
    return res.json({ 
      success: true,
      encryptedPassword 
    });

  } catch (error) {
    console.error("Error al encriptar:", error);
    return res.status(500).json({ 
      message: "Error interno al encriptar la contraseña" 
    });
  }
};

export const deleteUser=async(req:Request, res:Response) => {
  const {userId}=req.params;
  const user = await User.findById(userId);

  if (!user){
    return res.status(404).json({message: "Usuario no encontrado"});

  }
  user.status=false;
  user.deleteDate= new Date;

  await user.save();

  return res.json({message: "Eliminacion exitosa"});
}

