import { Schema, model } from "mongoose";

const PlanSchema = new Schema(
  {
    nombre: { type: String, require: true },
    foto: { type: String, require: true, trim: true },
    desc: { type: String, require: true },
    tipoPlan: [{ type: String }],
    cAutonoma: { type: String, require: true },
    provincia: { type: String, require: true },
    rating: { type: Number, require: true, default: 0 },
    costePlan: { type: Number, require: true },
    contador : {type: Number, require:true},
    cantSumada: {type: Number, require:true, default  : 0}

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Plan", PlanSchema);
