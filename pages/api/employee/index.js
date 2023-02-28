import {
  connectDatabase,
  getSingleDocument,
  insertDocument,
} from "../../../utils/mongoDB";

export default async (req, res) => {
  const { employeeCode } = req.body;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
  }

  let employee;

  try {
    employee = await getSingleDocument(client, "employee", { employeeCode });
  } catch (error) {
    res.status(500).json({ message: "Data fetching failed!" });
  }

  // if there is a employee with same employeeCode ,don't allow them
  if (employee) {
    res.status(400).json({ message: "Try a Different employee code!" });
  }

  let result;
  // Actual adding of the data
  try {
    result = await insertDocument(client, "employee", {
      ...req.body,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Adding employee details failed!" });
  }

  client.close()
  // finally
  res.status(201).json({
    ...result,
    message: "Employee details created successfuly!",
  });
};
