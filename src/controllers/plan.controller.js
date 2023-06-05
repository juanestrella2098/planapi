import Plan from "../models/Plan";
import { comunidadesAutonomas } from "../utils/utils";

export const findAllPlansOrByQuery = async (req, res) => {
  try {
    const query = req.query;
    var plansFounded = [];

    if (req.query.tipoPlan) {
      const tipoPlan = query.tipoPlan;
      delete query.tipoPlan;
      var plans = await Plan.find(query);
      plansFounded = plans.filter((plan) => {
        return plan.tipoPlan.some((tipo) => tipoPlan.includes(tipo));
      });
    } else {
      plansFounded = await Plan.find(query);
    }
    res.json(plansFounded);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the plans",
    });
  }
};

export const createPlan = async (req, res) => {
  try {
    const {
      nombre,
      foto,
      desc,
      tipoPlan,
      cAutonoma,
      provincia,
      rating,
      costePlan,
      cantSumada,
      contador
    } = req.body;

    if (!comunidadesAutonomas[cAutonoma].includes(provincia)) {
      return res.status(400).json({
        message: `The given province (${provincia}) does not belong to the autonomous community (${cAutonoma}) or you have spelt it wrong, it has to have its accents and start with a capital letter.`,
      });
    }

    const newPlan = new Plan({
      nombre: nombre,
      foto: foto,
      desc: desc,
      tipoPlan: tipoPlan,
      cAutonoma: cAutonoma,
      provincia: provincia,
      rating: rating,
      costePlan: costePlan,
      cantSumada: cantSumada,
      contador: contador
    });
    const planSaved = await newPlan.save();
    res.json({ message: "The plan has been successfully created", planSaved });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating the plan",
    });
  }
};

export const findOnePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const planFounded = await Plan.findById(id);

    if (!planFounded)
      return res
        .status(404)
        .json({ message: `The plan with id: ${id} doesn't exists` });

    res.json(planFounded);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong retrieving the plan",
    });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const planDeleted = await Plan.findByIdAndDelete(id);

    if (planDeleted == null) {
      return res.status(404).json({ message: "The plan doesn't exists" });
    }

    res.json({
      message: `Plan with ${id} were deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong deleting the plan",
    });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;


    if ("cAutonoma" in body) {
      if (!comunidadesAutonomas[body.cAutonoma].includes(body.provincia)) {
        return res.status(400).json({
          message: `The given province (${body.provincia}) does not belong to the autonomous community (${body.cAutonoma}) or you have spelt it wrong, it has to have its accents and start with a capital letter.`,
        });
      }
    }

    const updatedPlan = await Plan.findByIdAndUpdate(id, body, { new: true });

    if (updatedPlan == null) {
      return res.status(404).json({ message: "The plan doesn't exists" });
    }

    res.json({
      message: "The plan was successfully edited",
      updatedPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
