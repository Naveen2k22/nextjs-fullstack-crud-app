import { Button } from 'react-bootstrap';
import ButtonLink from './ButtonLink';
import classes from './employeeForm.module.css'

const EmployeeForm = (props) => {
  const { isReadOnly, errors, employee, handleChange, handleSubmit } = props
  
  const renderErrorText = (text) => <div className={classes.errorText}>{text}</div>
  return (
    <>
      <div className={`${classes.formContainer}`}>
        <form onSubmit={handleSubmit}>
          <div className={classes.inputWrapper}>
            <label htmlFor="employeeCode">Employee Code
            </label>
            <div>
              <input
                  type='text'
                  id="employeeCode"
                  name="employeeCode"
                  value={employee.employeeCode}
                  onChange={handleChange}
                  required
                  readOnly={isReadOnly}
                  minLength={6}
                />
              {errors.employeeCode && renderErrorText(errors.employeeCode)}
            </div>
          </div>

          <div className={classes.inputWrapper} >
            <label htmlFor="employeeName">Employee Name</label>
            <div>
              <input
                type='text'
                id="employeeName"
                name="employeeName"
                value={employee.employeeName}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
              />
              {errors.employeeName && renderErrorText(errors.employeeName)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="age">Age</label>
            <div>
              <input
                type='number'
                id="age"
                name="age"
                value={employee.age}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
                min={25}
              />
              {errors.age && renderErrorText(errors.age)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="DOB">Date of Birth</label>
            <div>
              <input
                type='date'
                id="DOB"
                name="DOB"
                value={employee.DOB}
                onChange={handleChange}
                required
                readOnly={isReadOnly}
                maz={31-12-1997}
              />
              {errors.DOB && renderErrorText(errors.DOB)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="qualification">Qualification</label>
            <div>
              <select
                id="qualification"
                name="qualification"
                value={employee.qualification}
                onChange={handleChange}
                required
              >
                <option value="" >Select Qualification</option>
                <option value="BE" disabled={isReadOnly && employee.qualification !== 'BE'}>BE</option>
                <option value="BCom" disabled={isReadOnly && employee.qualification !== 'BCom'}>BCom</option>
                <option value="BSc" disabled={isReadOnly && employee.qualification !== 'BSc'}>BSc</option>
                <option value="ME" disabled={isReadOnly && employee.qualification !== 'ME'}>ME</option>
                <option value="MSc" disabled={isReadOnly && employee.qualification !== 'MSc'}>MSc</option>
              </select>
              {errors.qualification && renderErrorText(errors.qualification)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label>Sex</label>
            <div>
              <div className={classes.inputWrapper}>
              <label id='male'>
                <input
                  type='radio'
                  id="male"
                  value='Male'
                  name="sex"
                  checked={employee.sex === 'Male'}
                  onChange={handleChange}
                  required
                  disabled={isReadOnly}
                />
                Male
              </label>

              <label id='female'>
                <input
                  type='radio'
                  id="female"
                  value='Female'
                  name="sex"
                  checked={employee.sex === 'Female'}
                  onChange={handleChange}
                  required
                  disabled={isReadOnly}
                />
                Female
              </label>
              </div>
              {errors.sex && renderErrorText(errors.sex)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="AddressOne">Address 1</label>
            <div>
            <input
              type='text'
              id="AddressOne"
              name="addressOne"
              value={employee.addressOne}
              onChange={handleChange}
              required
            />
            {errors.addressOne && renderErrorText(errors.addressOne)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="AddressTwo">Address 2</label>
            <div>
              <input
                type='text'
                id="AddressTwo"
                name="addressTwo"
                value={employee.addressTwo}
                onChange={handleChange}
              />
              {errors.addressTwo && renderErrorText(errors.addressTwo)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="pincode">Pincode</label>
            <div>
              <input
                type='text'
                id="pincode"
                name="pincode"
                value={employee.pincode}
                onChange={handleChange}
                required
                min={6}
                max={6}
              />
              {errors.pincode && renderErrorText(errors.pincode)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="phoneNo">Phone Number</label>
            <div>
              <input
                type='text'
                id="phoneNo"
                name="phoneNo"
                value={employee.phoneNo}
                onChange={handleChange}
                required
                min={10}
                max={10}
              />
              {errors.phoneNo && renderErrorText(errors.phoneNo)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <label htmlFor="email">Email</label>
            <div>
              <input
                type='email'
                id="email"
                name="emailId"
                value={employee.emailId}
                onChange={handleChange}
                required
              />
              {errors.emailId && renderErrorText(errors.emailId)}
            </div>
          </div>

          <div className={classes.inputWrapper}>
            <ButtonLink link={'/'} type="button" variant="secondary">Back</ButtonLink>
            <Button type="submit" variant="success">
              {props.type}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
