import { connectDatabase, getAllDocuments } from "../../utils/mongoDB";

export default async (req, res) => {
  let client

  try {
    client = await connectDatabase()
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" })
  }

  let employeeList
  
  try {
    employeeList = await getAllDocuments(client, "employee", {}, { _id: 1 })
  } catch (error) {
    res.status(500).json({ message: "Data fetching failed!"})
  }

  res.status(400)
  
  await client.close()
  res.status(201).json({ employeeList })
}