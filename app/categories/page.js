"use client";
import React, { useEffect, useState } from "react";
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
import AddCategoryForm from "@/components/AddCategoryForm";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CategoriesList from "@/components/CategoriesList";
import { db } from "@/firebase";
import EditCategoryForm from "@/components/EditCategoryForm";
import CircularProgress from "@mui/material/CircularProgress";

function CategoriesHome() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState(null);
  const [loader, setLoader] = useState(true);

  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
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

  useEffect(() => {
    getItems();
  }, []);

  return (
    <main className="flex min-h-screen p-24">
      {loader ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="w-full">
          <Box>
            <Typography variant="h5">Category Page</Typography>
          </Box>
          <div className="flex my-5 items-center justify-between">
            <Box className="flex items-center space-x-4">
              <Fab
                onClick={() => setOpen(true)}
                color="primary"
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </Box>
          </div>
          <AddCategoryForm
            open={open}
            setOpen={setOpen}
            items={items}
            setItems={setItems}
            getItems={getItems}
          />
          <EditCategoryForm
            open={openEdit}
            setOpen={setOpenEdit}
            current={current}
            getItems={getItems}
          />

          <Box>
            <Typography variant="h6">Categories</Typography>
          </Box>

          <CategoriesList
            items={items}
            setOpen={setOpenEdit}
            setCurrent={setCurrent}
            getItems={getItems}
          />
        </div>
      )}
    </main>
  );
}

export default CategoriesHome;
