import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import { validateForm } from "../../utils/validateForm";
import EmployeeForm from "../../components/EmployeeForm";
import { toast, ToastContainer } from "react-toastify";

const Form = () => {
  const router = useRouter();

  const [employeeList, setEmployeeList] = useState([])
  const [employee, setEmployee] = useState({
    employeeCode: "",
    employeeName: "",
    age: "",
    DOB: "",
    qualification: "",
    sex: "",
    addressOne: "",
    addressTwo: "",
    pincode: "",
    phoneNo: "",
    emailId: "",
  });

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

  useEffect(() => {
    axios('api/employeeList')
      .then(response => setEmployeeList(response.data.employeeList))
      .catch(error => console.log("error", error))
  },[])

  useEffect(() => {
    console.log("employee", employeeList)
  })

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

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
        ...employee,
      };

      axios
        .post(`/api/employee`, data)
        .then((response) => {
          if (response.status === 201) {
            toast.success('Successfully Created the Employee')
            setTimeout(() => {
              router.replace("/");
            },1000)
          }
        })
        .catch((error) => toast.error('Something went wrong!'));
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Employee Form</title>
        <meta
          name="description"
          content="An Employee form for adding new employee details"
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
        isReadOnly={false}
        type="Create"
      />
    </Fragment>
  );
};

export default Form;
