import {Document, Schema, Types, model} from "mongoose"

export interface IProduct extends Document{
name:string;
price:number;
_id: Types.ObjectId;
status:boolean;
description:string;
quantity:string;

}

const productSchema= new Schema<IProduct>({
    name:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:String,
        required:true
    }

});

export const Product = model<IProduct>('Product', productSchema);
