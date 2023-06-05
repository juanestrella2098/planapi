import { validationResult } from "express-validator";

export const validatorHandler = (req, res, next) => {
  try {
    //Lanza la excepción si se produce un error con la validación
    validationResult(req).throw();
    return next();
  } catch (error) {
    //Envia un array con los mensajes de errores
    res.status(403).json({ message: error.array() });
  }
};
