import { useState } from "react"
import { Button } from "react-bootstrap"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

import useTable from '../../hooks/useTable'
import ButtonLink from "../ButtonLink"
import classes from './employeeList.module.css'
import TableFooter from "./tableFooter"
import Table from "react-bootstrap/Table"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EmployeeList = (props) => {
  const { employeeList, handleDelete, rowsPerPage } = props
  const [page, setPage] = useState(1);

  const { slice, range } = useTable(employeeList, page, rowsPerPage);
    return (
      <>
        <Table bordered className={classes.listTable}>
          <thead>
            <tr>
              <th>Employee Code</th>
              <th>Employee Name</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Qualification</th>
              <th>Phone No</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.employeeCode}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.age}</td>
                <td>{employee.DOB}</td>
                <td>{employee.qualification}</td>
                <td>{employee.phoneNo}</td>
                <td>{employee.emailId}</td>
                <td>
                  <div className={classes.actionWrapper}>
                    <ButtonLink link={`/form/${employee._id}`} variant="primary" type="button">
                      <FontAwesomeIcon icon={faPenToSquare}/>
                    </ButtonLink>
                    <Button onClick={handleDelete.bind(null,employee._id)} type="button" variant="danger">
                      <FontAwesomeIcon icon={faTrashCan}/>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <TableFooter
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
        />
      </>
    );
}

export default EmployeeList