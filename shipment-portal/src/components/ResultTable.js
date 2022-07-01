import React, { useState } from "react";

// Material UI imports
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { search } from "../Api";
import EditForm from "./EditForm";

export default function BasicTable({ data, setData }) {
  // Open Edit Form
  const [editForm, setEditForm] = useState(null);

  const getSearch = (e) => {
    // Calling Search Api
    search(e.target.value, (res) => {
      console.log({ res });
      // putting api response in the react-state
      setData(res);
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.7rem 3vw",
          }}
        >
          <h2 style={{ margin: "0px" }} className="head">
            Shipment
          </h2>

          {/* Search Field */}
          <TextField
            type="search"
            onChange={getSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Search Results | Shipments */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>BL Number</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell align="right">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  <IconButton
                    onClick={() => setEditForm(row)}
                    // onClick={() => setEditForm(true)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <InsertDriveFileIcon />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.blnumber}
                </TableCell>
                <TableCell>{row.status}</TableCell>
                {/* <TableCell align="right">{row.status}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Initialization of Edit Form */}
      <EditForm
        form={editForm}
        setForm={setEditForm}
        data={data}
        setData={setData}
      />
    </>
  );
}
