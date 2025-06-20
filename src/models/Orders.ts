import { Document, model, Schema, Types } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrders extends Document {
  id: Types.ObjectId;
  createDate: Date;
  updateDate: Date;
  userCreate: Types.ObjectId;
  entire: number;
  subtotal: number;
  status: string;
  products: IOrderProduct[];  
}

const orderProductSchema = new Schema<IOrderProduct>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const ordersSchema = new Schema<IOrders>({
  createDate: {
    type: Date,
    default: Date.now
  },
  updateDate: {
    type: Date,
    default: Date.now
  },
  userCreate: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  entire: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pendiente'
  },
  products: {
    type: [orderProductSchema],
    required: true,
    validate: [(array: any[]) => array.length > 0, 'Debe contener al menos un producto']
  }
});

export const Orders = model<IOrders>('Order', ordersSchema);