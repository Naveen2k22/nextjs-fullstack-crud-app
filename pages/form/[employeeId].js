import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";
import axios from "axios";

import EmployeeForm from "../../components/EmployeeForm";
import { validateForm } from "../../utils/validateForm";
import { getAllDocuments, connectDatabase, getSingleDocument } from "../../utils/mongoDB";
import { ToastContainer, toast } from "react-toastify";

const EditForm = ({ employeeData }) => {
  const router = useRouter();

  const [employee, setEmployee] = useState({ ...employeeData });
  const [employeeList, setEmployeeList] = useState([])

  const [errors, setErrors] = useState({
    employeeCode: null,
    employeeName: null,
    age: null,
    DOB: null,
    qualification: null,
    sex: null,
    addressOne: null,
    pincode: null,
    phoneNo: null,
    emailId: null,
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios('api/employeeList')
      .then(response => setEmployeeList(response.data.employeeList))
      .catch(error => console.log("error", error))
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate the form
    const errorsObj = validateForm(employee, errors, employeeList);
    // save the errors object
    setErrors({
      ...errorsObj,
    });

    if (Object.keys(errorsObj).every((key) => !errorsObj[key])) {
      const data = {
        addressOne: employee.addressOne,
        addressTwo: employee.addressTwo,
        pincode: employee.pincode,
        phoneNo: employee.phoneNo,
        emailId: employee.emailId
      };
      const { employeeId } = router.query;
      axios.put(`/api/employee/${employeeId}`, data)
        .then((response) => {
          if(response.status === 201){
            toast.success('Successfully updated the Employee')
            setTimeout(() => {
              router.replace("/");
            },1000)
          }
        })
        .catch((error) => toast.error('Something went wrong!'))
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Employee Form</title>
        <meta
          name="description"
          content="An Employee form for editing employee details"
        />
      </Head>
      <ToastContainer />
      <div className="header">
        <h1>Employee Form</h1>
      </div>
      <hr></hr>
      <EmployeeForm
        employee={employee}
        handleChange={handleChange}
        errors={errors}
        handleSubmit={handleSubmit}
        isReadOnly={true}
        type="Update"
      />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  let client
  try {
    client = await connectDatabase()
  } catch(error) {
    return {
      paths: [],
      fallback: "blocking"
    }
  }

  let employeeList

  try {
    employeeList = await getAllDocuments(client, "employee", {}, {} )
    console.log("employee list", employeeList)
  }catch(error) {
    console.log("error", error)
    return {
      paths: [],
      fallback: "blocking"
    }
  }

  // closing the mongoDB connection
  await client.close()
  
  const paths = employeeList.map((employee) => ({
    params: {
      employeeId: employee._id.toString(),
    },
  }));

  console.log("paths", paths)

  return {
    paths,
    fallback: true,
  };

};


export const getStaticProps = async (context) => {
  const { employeeId } = context.params;
  console.log("employeeID", employeeId)

  let client
  try {
    client = await connectDatabase()
  } catch(error) {
    return {
      props: {
        employeeData: {},
        serverError: {
          message: "Connecting to database failed!"
        }
      }
    }
  }

  let employeeData

  try {
    employeeData = await getSingleDocument(client, "employee", { _id: new ObjectId(employeeId) })
  } catch(error) {
    return {
      props: {
        employeeData: {},
        serverError: {
          message: "Data fetching failed!"
        }
      }
    }
  }

  // closing the mongoDB connection
  await client.close()
  
  if (employeeData) {
    return {
      props: {
        employeeData: {
          ...employeeData, _id: employeeData._id.toString()
        },
      },
    };
  } else {
    return {
      notFound: true,
    };
  }

};

export default EditForm;
