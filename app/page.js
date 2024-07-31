"use client";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddItemForm from "@/components/AddItemForm";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import CustomTable from "@/components/CustomTable";
import EditItemForm from "@/components/EditItemForm";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState(null);

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
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log("items--> ", items);

  return (
    <main className="flex min-h-screen p-24">
      <div className="w-full">
        <div className="flex items-center space-x-4">
          <Fab onClick={() => setOpen(true)} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
          <Fab color="primary" aria-label="add">
            <AddAPhotoIcon />
          </Fab>
        </div>

        <AddItemForm open={open} setOpen={setOpen} getItems={getItems} />
        <EditItemForm
          open={openEdit}
          setOpen={setOpenEdit}
          current={current}
          getItems={getItems}
        />
        <CustomTable
          items={items}
          open={openEdit}
          setOpen={setOpenEdit}
          setCurrent={setCurrent}
          getItems={getItems}
        />
      </div>
    </main>
  );
}
