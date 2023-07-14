import {Schema, model, models} from "mongoose"

const settingsSchema = new Schema({
    name: {type: String,
           required: true,
           unique: true,
        },
    value: {type: Object},
})

export const Setting = models?.Setting || model("Setting", settingsSchema);