import React, { useEffect, useState } from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

import Pagination from "@mui/material/Pagination"

// api
import { useQuery, useLazyQuery, useMutation } from "@apollo/client"
import { createTest } from "apollo/mutation"
import { tests, testsCount } from "apollo/query"

const columns = [
  { id: "id", label: "id", minWidth: 170 },
  { id: "test1", label: "test1", minWidth: 100 },
]

export default function StickyHeadTable() {
  const [rows, setrows] = useState([])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [totalCount, settotalCount] = useState(0)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    Tests({
      variables: {
        limit: rowsPerPage,
        start: (newPage - 1) * rowsPerPage,
      },
    })
  }
  const TestsCount = useQuery(testsCount, {
    fetchPolicy: "no-cache",
    onError(err) {
      console.log({ err })
    },
    onCompleted: (data) => {
      settotalCount(data.testsCount)
    },
  })
  const [Tests] = useLazyQuery(tests, {
    fetchPolicy: "no-cache",
    onError(err) {
      console.log({ err })
    },
    onCompleted: (data) => {
      setrows(data.tests)
    },
  })
  const [CreateTest] = useMutation(createTest, {
    fetchPolicy: "no-cache",
    onError(err) {
      console.log({ err })
    },
    onCompleted: (data) => {
      console.log(data)
    },
  })
  useEffect(() => {
    // for (let index = 0; index < 50; index++) {
    //   CreateTest({
    //     variables: {
    //       test1: String(index),
    //     },
    //   })
    // }
    Tests({
      variables: {
        limit: rowsPerPage,
        start: (page - 1) * rowsPerPage,
      },
    })
  }, [])
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.test1}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        style={{
          justifyContent: "center",
          display: "flex",
        }}
        component="div"
        count={Math.ceil(totalCount / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Paper>
  )
}
