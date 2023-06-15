import { Schema, model, models } from "mongoose";
const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    address: String,
    cep: String,
    house: String,
    complement: String,
    paid:{type: Boolean,}

}, {
    timestamps: true,
});

export const Order = models?.Order || model("Order", OrderSchema);