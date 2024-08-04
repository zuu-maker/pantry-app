import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Stack, TextField, Button, FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/firebase";

const currencies = [
  {
    value: "fruits",
    label: "Fruits",
  },
  {
    value: "grains",
    label: "Grains",
  },
];

function AddCategoryForm({ open, setOpen, items, setItems, getItems }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "categories", name.toLowerCase()), {
        label: name,
        value: name.toLowerCase(),
        timestamp: Timestamp.now(),
      });
      setLoading(false);
      toast.success("Item added successfully");
      setOpen(false);
      setName("");
      let _items = items;
      _items.push({
        label: name,
        value: name.toLowerCase(),
      });
      setItems(_items);
      getItems();
    } catch (e) {
      setLoading(false);
      toast.error("Failed to add item");
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Add Item</DialogTitle>
      <Container className="w-96">
        <Stack className="p-4" spacing={4}>
          <TextField
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Category Name"
          />
          <Button onClick={handleSubmit} fullWidth variant="contained">
            {loading ? "Processing..." : "Add"}
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
}

export default AddCategoryForm;
