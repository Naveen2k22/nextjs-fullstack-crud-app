import { diff_years } from "./getDateDiff";

export const validateForm = (
    employee,
    errors,
    employeeList
  ) => {
    let errorsObj = { ...errors}
    const {
      employeeCode,
      employeeName,
      age,
      DOB,
      qualification,
      sex,
      phoneNo,
      emailId,
      addressOne,
      pincode,
    } = employee;

    // for validating the employee code
    if(employeeCode === '')
      errorsObj.employeeCode = 'Please enter employee code'
    else if(employeeList.some(employee => employee.employeeCode === employeeCode))
      errorsObj.employeeCode = 'Try a different Employee code'
    else
      errorsObj.employeeCode = null
    
    // for validating the name of the employee
    if(employeeName === '')
      errorsObj.employeeName = 'Please enter name'
    else
      errorsObj.employeeName = null
  
    // for validating the age 
    if(age === '')
      errorsObj.age = 'Please enter the age'
    else if(isNaN(Number(age)) || Number(age) <= 25)
      errorsObj.age = 'Age should be valid'
    else
      errorsObj.age = null
  
    
    // for validating the DOB
    if(DOB === '')
      errorsObj.DOB = 'Please select the Date of Birth'
    else if(diff_years(new Date(DOB), new Date) < 25 || age != diff_years(new Date(DOB), new Date))
      errorsObj.DOB = 'Date of Birth should be valid'
    else
      errorsObj.DOB = null
  
    // for validating the sex 
    if(sex === '')
      errorsObj.sex = 'Select Male of Female'
    else
      errorsObj.sex = null

    // for validating the address
    if(addressOne === '')
      errorsObj.addressOne = 'Please enter the address'
    else
      errorsObj.addressOne = null
  
    // for validating the pincode 
    if(pincode === '')
      errorsObj.pincode = 'Please enter the pincode'
    else if(pincode.length !== 6 || isNaN(Number(pincode)))
      errorsObj.pincode = 'Pincode should be valid'
    else
      errorsObj.pincode = null
  
    // for validating the email
    if(emailId === '')
      errorsObj.emailId = 'Please enter the Email'
    else if(!emailId.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      errorsObj.emailId = 'Email is invalid'
    else
      errorsObj.emailId = null

    // for validating the phone number
    if(phoneNo === '')
      errorsObj.phoneNo = 'Please enter the Email'
    else if( isNaN(Number(phoneNo)) || phoneNo.length !== 10 ) 
      errorsObj.phoneNo = 'Phone Number is invalid'
    else
      errorsObj.phoneNo = null

    // for validating the qualification
    if(qualification === '')
      errorsObj.qualification = 'Please select the qualification'
    else
      errorsObj.qualification = null

    
    return errorsObj
  };