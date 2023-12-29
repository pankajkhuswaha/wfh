const { mongooseError } = require("../middlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const Clients = require("../models/clientModel");

const uploadClients = asyncHandler(async (req, res) => {
  const { excelData } = req.body;
  let faultyData = [];
  let validData = [];
  await Promise.all(
    excelData.map(async (data) => {
      try {
        await Clients.validate(data);
        validData.push(data);
      } catch (validationError) {
        faultyData.push({
          ...data,
          error: validationError?.message,
        });
      }
    })
  );

  try {
    const result = await Clients.insertMany(validData);
    return res.json({
      message: "Data uploaded successfully",
      insertedCount: result.length,
      faultyData,
    });
  } catch (error) {
    console.log(error)
    
    return res.status(500).json({
      message: "Duplicate Mobile no.found Please check the again",
      error
    });
  }
});

const getAllClients = asyncHandler(async (req, res) => {
  const user = req.user;
  const clients = await Clients.find();
  if (!user) return res.status(402).json({ error: "User not found" });
  switch (user.role) {
    case "admin":
      return res.json(clients);
    case "employee":
      const filterClients = clients.filter(
        (client) => client.empId == user.empId
      );
      return res.json(filterClients);
  }
});

const delteClient = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    await Clients.findByIdAndDelete(_id);
    return res.json({ message: "Client deleted Sucessfully" });
  } catch (error) {
    mongooseError(error, res);
  }
});

const updateClient = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  try {
    await Clients.findByIdAndUpdate(_id, req.body);
    return res.json({ message: "Client deleted Sucessfully" });
  } catch (error) {
    mongooseError(error, res);
  }
});

const delteMultipleClient = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  try {
    // Delete items based on provided IDs
    await Clients.deleteMany({ _id: { $in: ids } });
    return res.json({ message: "Clients Deleted successfully" });
  } catch (error) {
    mongooseError(error, res);
  }
});

module.exports = {
  getAllClients,
  delteClient,
  updateClient,
  delteMultipleClient,
  uploadClients,
};
