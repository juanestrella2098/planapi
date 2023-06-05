import { body, param } from "express-validator";
import { validatorHandler } from "../shared/validation.handler";

export const findOnePlanValidator = [
  param("id").exists().withMessage("The id parameter is required"),
  (req, res, next) => {
    console.log(req.params.id);
    validatorHandler(req, res, next);
  },
];

export const updatePlanValidator = [
  body("nombre").escape().optional(),
  body("foto").optional().trim(),
  body("desc").escape().optional(),
  body("tipoPlan").escape().optional(),
  body("cAutonoma").escape().optional(),
  body("provincia").escape().optional(),
  body("rating")
    .escape()
    .optional()
    .isInt({
      min: 0,
      max: 5,
    })
    .withMessage("Field 'rating' needs to be a integer"),
  body("costePlan")
    .escape()
    .optional()
    .isInt({
      min: 0,
      max: 5,
    })
    .withMessage(
      "Field 'costePlan' needs to be a integer, min value: 0 and max value: 5"
    ),
  (req, res, next) => {
    validatorHandler(req, res, next);
  },
];

export const deletePlanValidator = [
  param("id").exists().withMessage("The id parameter is required"),
  (req, res, next) => {
    validatorHandler(req, res, next);
  },
];

export const createPlanValidator = [
  body("nombre")
    .escape()
    .notEmpty()
    .withMessage("Field 'nombre' cannot be empty"),
  body("foto")
    .notEmpty()
    .withMessage("Field 'foto' cannot be empty")
    .trim(),
  body("desc").escape().notEmpty().withMessage("Field 'desc' cannot be empty"),
  body("tipoPlan")
    .escape()
    .notEmpty()
    .withMessage("Field 'tipoPlan' cannot be empty"),
  body("cAutonoma")
    .escape()
    .notEmpty()
    .withMessage("Field 'cAutonoma' cannot be empty"),
  body("provincia")
    .escape()
    .notEmpty()
    .withMessage("Field 'provincia' cannot be empty"),
  body("rating")
    .escape()
    .notEmpty()
    .withMessage("Field 'rating' cannot be empty")
    .isInt({
      min: 0,
      max: 5,
    })
    .withMessage("Field 'rating' needs to be a integer"),
  body("costePlan")
    .escape()
    .notEmpty()
    .withMessage(
      "Field 'costePlan' cannot be empty, min value: 0 and max value:3"
    )
    .isInt({
      min: 0,
      max: 5,
    })
    .withMessage(
      "Field 'numCoches' needs to be a integer, min value: 0 and max value: 5"
    ),
  (req, res, next) => {
    validatorHandler(req, res, next);
  },
];
