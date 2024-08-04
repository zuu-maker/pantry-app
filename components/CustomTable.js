import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/firebase";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

function createData(name, category, unit, quantity, date) {
  return { name, category, unit, quantity, date };
}

const columns = [
  { id: "name", label: "Item", minWidth: 170 },
  { id: "category", label: "Category", minWidth: 100 },
  {
    id: "unit",
    label: "Unit",
    minWidth: 170,
    align: "right",
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 170,
    align: "right",
  },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

export default function CustomTable({
  items,
  open,
  setOpen,
  setCurrent,
  getItems,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let _rows = [];
    items.forEach((item) => {
      let { name, category, checkedItem, quantity, date } = item;
      console.table(checkedItem, quantity);
      let _date = new Date(date);
      console.log(
        createData(
          name,
          category,
          checkedItem,
          quantity,
          _date.toLocaleDateString()
        )
      );
      _rows.push(
        createData(
          name,
          category,
          checkedItem,
          quantity,
          _date.toLocaleDateString()
        )
      );
    });
    setRows(_rows);
  }, [items]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openEdit = (index) => {
    setCurrent(items[index]);
    setOpen(true);
  };

  const handleDelete = async (index) => {
    let toastId = toast.loading("deleting...");
    let id = items[index].id;
    try {
      await deleteDoc(doc(db, "items", id));
      toast.dismiss(toastId);
      toast.success("Deleted successfully");
      getItems();
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Failed to delete");
    }
  };

  return (
    <Paper sx={{ marginToop: 16, width: "100%", overflow: "hidden" }}>
      <TableContainer className="capitalize" sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  // className="flex items-center space-x-2"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <div className="flex items-center justify-center space-x-2">
                        <EditIcon
                          className="cursor-pointer hover:text-green-500"
                          onClick={() => openEdit(index)}
                        />
                        <DeleteIcon
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
