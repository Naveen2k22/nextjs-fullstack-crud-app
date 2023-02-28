import { ObjectId } from "mongodb";
import {
  connectDatabase,
  deleteDocument,
  getSingleDocument,
  updateDocument,
} from "../../../utils/mongoDB";

export default async (req, res) => {
  const { employeeId } = req.query;
  const _id = new ObjectId(employeeId)

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
  }

  if (req.method === "PUT") {
    const updatedData = { ...req.body, updatedAt: new Date().toISOString() };
    let result;

    try {
      result = await updateDocument(client, "employee",{ $set: updatedData }, {
        _id ,
      });
    } catch (error) {
      console.log("error", error)
      res.status(500).json({ message: "Updating Employee details failed!" });
    }

    res
      .status(201)
      .json({
        ...result,
        message: "Updated the employee details successfuly!",
      });
  } else if (req.method === "GET") {
    let employee;

    try {
      employee = await getSingleDocument(client, "employee", {
        _id ,
      });
    } catch (error) {
      res.status(500).json({ message: "Fetching Data is failed!" });
    }

    if (employee) {
      res.status(201).json({ employee });
    } else {
      res
        .status(404)
        .json({ message: "Requested employee detail is not found!" });
    }
  } else if (req.method === "DELETE") {
    let result;

    try {
      result = await deleteDocument(client, "employee", { _id });
    } catch (error) {
      res.status(500).json({ message: "Deleting Employee details failed!" });
    }

    res.status(201).json({ message: "Successfuly deleted the employee data!" });
  }else {
    res.status(405).json({ message: "Requested method is not available" });
  }

  await client.close()
};
