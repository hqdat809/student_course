import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ICourse } from "../../interfaces/student-interface";
import { Button } from "@mui/material";

export const studentColumn: GridColDef[] = [
  { field: "name", headerName: "Name", minWidth: 150 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    minWidth: 80,
  },
  { field: "address", headerName: "Address", minWidth: 200 },
  { field: "email", headerName: "Email", minWidth: 250 },
  {
    field: "course",
    headerName: "Course",
    minWidth: 300,
    valueGetter: (params: GridValueGetterParams) => {
      let str = "";
      params.row.courses.map((data: ICourse, index: number) => {
        if (!index) {
          str = data.name;
        } else {
          str = str.concat(", ", data.name);
        }
      });
      return str;
    },
  },
];

export const courseColumn: GridColDef[] = [
  { field: "id", headerName: "ID", minWidth: 100 },
  { field: "name", headerName: "Course's Name", minWidth: 500 },
  {
    field: "students",
    headerName: "Students",
    minWidth: 200,
    valueGetter: (params: GridValueGetterParams) => {
      return `${params.row.students.length} students enrolled`;
    },
  },
];
