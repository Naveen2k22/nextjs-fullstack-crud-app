import { useState , Fragment } from "react";
import Head from "next/head";

import ButtonLink from "../components/ButtonLink";
import EmployeeList from "../components/table/employeeList";
import DeleteModal from "../components/modals/DeleteModal";
import { connectDatabase, getAllDocuments } from "../utils/mongoDB";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Home(props) {
  
  const [employeeList , setEmployeeList] = useState(props.employeeList)
  const [deleteModal, setDeleteModal] = useState(false)
  const [employeeId, setEmployeeId] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)
  
  const deleteEmployee = async () => {
    axios.delete(`api/employee/${employeeId}`)
      .then(async response => {
        if(response.status === 201){
          await fetchEmployeeList()
          handleCloseModal()
          toast.success('Successfully deleted the employee')
        }
      })
      .catch(error => {
        handleCloseModal()
        toast.error('Something went wrong!')
      })
  }

  const handleDelete = (id) => {
    setEmployeeId(id)
    setDeleteModal(true)
  }

  const fetchEmployeeList = async () => {
    axios('api/employeeList')
      .then(response => setEmployeeList(response.data.employeeList))
      .catch(error => toast.error('Something went wrong!'))
  }
  
  const handleCloseModal = () => {
    setDeleteModal(false)
  }

  return (
    <Fragment>
      <Head>
        <title>
          Employee List
        </title>
        <meta name="description" content="A list of Employees with actions" />
      </Head>
      <ToastContainer />
      <div className="header">
        <h1>Employee List</h1>
      </div>

      <hr></hr>
      <div className="list-container">
        
        <div className="wrapper">
        {/* row selector */}
        <div className="inputWrapper">
          <label htmlFor="rows"> Rows </label>
          <select
            id="rows"
            value={rowsPerPage}
            onChange={e => setRowsPerPage(e.target.value)}
          >
            <option>5</option>
            <option>10</option>
            <option>20</option>
          </select>
        </div>
        

        {/* for adding new employee details */}
        <ButtonLink link={`/form`} variant="success" type="button">New</ButtonLink>
        </div>
        
        {/* rendering the  EmployeeList */}
        <EmployeeList employeeList={employeeList} handleDelete={handleDelete} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
      </div>

      {/* For Delete Dialog */}
      <DeleteModal
        deleteEmployee={deleteEmployee}
        deleteModal={deleteModal}
        handleCloseModal={handleCloseModal}
      />
    </Fragment>
  );
}

export const getServerSideProps = async () => {
  
  let client
  try {
    client = await connectDatabase()
  } catch(error) {
    return {
      props: {
        employeeList: [],
        serverError: {
          message: "Connecting to database failed!"
        }
      }
    }
  }
  let employeeList
  try {
    employeeList = await getAllDocuments(client, "employee", {}, { _id: 1})
  }catch(error) {
    return {
      props: {
        employeeList: [],
        serverError: {
          message: "Data fetching failed!"
        }
      }
    }
  }

  const parsedEmployeeList = employeeList.map(employee => ({
    ...employee, _id: employee._id.toString()
  }))

  // closing the mongoDB connection
  await client.close()
  
  return {
    props: {
      employeeList: parsedEmployeeList,
    }
  }
  
};
