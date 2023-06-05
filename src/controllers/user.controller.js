import User from "../models/User";

export const findUser = async (req, res) => {
  try {
    const { idFirebase } = req.params;

    console.log(idFirebase);

    const userFounded = await User.findOne({idFirebase : idFirebase});

    res.json(userFounded);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the User",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { idFirebase, nombre, apellido, edad } = req.body;
    console.log(req.body);

    const newUser = new User({
      idFirebase: idFirebase,
      nombre: nombre,
      apellido: apellido,
      edad: edad
    });
    const userSaved = await newUser.save();
    res.json({ message: "The user has been successfully created", userSaved });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating the user",
    });
  }
};

export const deleteUser = async (req, res) => {
    try {
      const { idFirebase } = req.params;
      console.log(idFirebase);
      const userDeleted = await User.findOneAndDelete({idFirebase : idFirebase});
      
  
      if (userDeleted == null) {
        return res.status(404).json({ message: "The user doesn't exists" });
      }
  
      res.json({
        message: `User with ${idFirebase} were deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something goes wrong deleting the plan",
      });
    }
  };

  export const updateUser = async (req, res) => {
    try {
      const { idFirebase } = req.params;
      const { body } = req;
      delete body._id;
  
      const updateUser = await User.findOneAndUpdate( {idFirebase: idFirebase} , {$set :body}, { new: true });

  
      if (updateUser == null) {
        return res.status(404).json({ message: "The user doesn't exists" });
      }
  
      res.json({
        message: "The plan was successfully edited",
        updateUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something goes wrong updating the plan",
      });
    }
  };
