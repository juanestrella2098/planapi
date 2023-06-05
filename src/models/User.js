import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    idFirebase: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    viajesFavoritos: { type: [String], default: [] },
    viajesRealizados: {
      type: [
        {
          id: { type: String, required: true },
          cantVotada: { type: Number, default: 0 },
          votado: { type: Boolean, default: false },
        },
      ],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

export default model("User", UserSchema);
