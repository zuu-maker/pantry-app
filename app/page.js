"use client";
import {
  Box,
  Fab,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddItemForm from "@/components/AddItemForm";
import { useState, useEffect } from "react";
import { getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import CustomTable from "@/components/CustomTable";
import EditItemForm from "@/components/EditItemForm";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import CloseIcon from "@mui/icons-material/Close";

import CircularProgress from "@mui/material/CircularProgress";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const columns = [
  { id: "name", label: "Item" },
  { id: "category", label: "Category" },
  {
    id: "unit",
    label: "Unit",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "date",
    label: "Date",
  },
  {
    id: "action",
    label: "Action",
  },
];

const orderItems = [
  { id: "asc", label: "Ascending" },
  { id: "desc", label: "Descending" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchItems, setSearchedItems] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [loader, setLoader] = useState(true);

  const [orderby, setOrderby] = useState("");
  const [order, setOrder] = useState("");
  // const [showSearch, setShowSearch] = useState(false);

  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "items"));
    let _items = [];
    querySnapshot.forEach((doc) => {
      _items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setItems(_items);
    setLoader(false);
  };

  const getCategories = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    let _items = [];
    querySnapshot.forEach((doc) => {
      _items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    setCategories(_items);
  };

  const fetchData = async () => {
    let q;
    if (searchText) {
      q = query(
        collection(db, "items"),
        where("name", "==", searchText.toLowerCase())
      );
    } else {
      q = query(collection(db, "items"));
    }

    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSearchedItems(items);
  };

  const filter = async () => {
    console.table(orderby, order);
    try {
      let q;

      q = query(collection(db, "items"), orderBy(orderby, order));

      const querySnapshot = await getDocs(q);
      const _items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("here -->", _items);
      setItems(_items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchText]);

  console.log("items--> ", items);

  return (
    <main className="flex min-h-screen p-24">
      {loader ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full">
          <Box>
            <Typography variant="h5">Home</Typography>
          </Box>
          <div className="flex items-center justify-between">
            <Box className="flex items-center space-x-4">
              <Fab
                onClick={() => setOpen(true)}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
              <Fab color="primary" aria-label="add">
                <AddAPhotoIcon />
              </Fab>

              <Search>
                <SearchIconWrapper
                  className="cursor-pointer"
                  onClick={() => {
                    setSearchText("");
                    setShowSearch(false);
                  }}
                >
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
            <Box className="min-w-96 space-y-2">
              <Typography variant="subtitle1" gutterBottom>
                Filter
              </Typography>
              <Box className="flex items-center space-x-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Order By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={orderby}
                    label="Order By"
                    onChange={(e) => setOrderby(e.target.value)}
                  >
                    {columns.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Order</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={order}
                    label="Order"
                    onChange={(e) => setOrder(e.target.value)}
                  >
                    {orderItems.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button
                onClick={filter}
                className="text-right"
                variant="contained"
              >
                Filter
              </Button>
            </Box>
          </div>
          <Box>
            <Typography variant="h6">Pantry Items</Typography>
          </Box>
          <AddItemForm
            open={open}
            setOpen={setOpen}
            getItems={getItems}
            categories={categories}
          />
          <EditItemForm
            categories={categories}
            open={openEdit}
            setOpen={setOpenEdit}
            current={current}
            getItems={getItems}
          />

          {searchText ? (
            <CustomTable
              items={searchItems}
              open={openEdit}
              setOpen={setOpenEdit}
              setCurrent={setCurrent}
              getItems={getItems}
            />
          ) : (
            <CustomTable
              items={items}
              open={openEdit}
              setOpen={setOpenEdit}
              setCurrent={setCurrent}
              getItems={getItems}
            />
          )}
        </div>
      )}
    </main>
  );
}
