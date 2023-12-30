const { mongooseError } = require("../middlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const Clients = require("../models/clientModel");

const statusEnum = [
  "Call Back",
  "Interested",
  "Not Interested",
  "Follow Up Next Month",
  "Demo time",
];

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
    console.log(error);

    return res.status(500).json({
      message: "Duplicate Mobile no.found Please check the again",
      error,
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
  const {
    name,
    empId,
    mobile,
    assignTo,
    location,
    address,
    status,
    subStatus,
    remarks,
  } = req.body;

  try {
    const client = await Clients.findById(_id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (name) client.name = name;
    if (empId) client.empId = empId;
    if (mobile) client.mobile = mobile;
    if (assignTo) client.assignTo = assignTo;
    if (location) client.location = location;
    if (address) client.address = address;
    if (status) client.status = status;
    if (subStatus) client.subStatus = subStatus;
    if (remarks && Array.isArray(remarks)) {
      remarks.forEach((remark) => {
        if (remark) {
          client.remarks.push({ val: remark, time: new Date() });
        }
      });
    }

    await client.save();
    res.status(200).json({ message: "Client updated successfully", client });
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

const clientStatus = asyncHandler(async (req, res) => {
  const clients = await Clients.find();
  let filterClients = [];
  const user = req.user;
  if (!user) return res.status(402).json({ error: "User not found" });
  switch (user.role) {
    case "admin":
      filterClients = clients;
      break;
    case "employee":
      filterClients = clients.filter((client) => client.empId == user.empId);
      break;
  }

  const statusCounts = clients.reduce((counts, client) => {
    const { status } = client;
    counts[status] = (counts[status] || 0) + 1;
    return counts;
  }, {});

  // Ensure that each status from statusEnum has a corresponding count, set to 0 if not present
  statusEnum.forEach((status) => {
    const count = statusCounts[status];
    if (count === undefined) {
      statusCounts[status] = 0;
    }
  });

  const statusArray = Object.entries(statusCounts)
    .filter(
      ([title, value]) =>
        typeof title === "string" &&
        title.trim() !== "" &&
        title !== "undefined"
    )
    .map(([title, value]) => ({ title, value }));
    const response = statusArray.unshift({
      title: "Clients",
      value: filterClients.length,
    });
  res.json(statusArray);
});

module.exports = {
  getAllClients,
  delteClient,
  updateClient,
  delteMultipleClient,
  uploadClients,
  clientStatus,
};
