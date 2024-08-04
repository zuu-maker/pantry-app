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
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/firebase";

function EditCategoryForm({ setOpen, open, current, getItems }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (current) {
      console.log(current);
      setName(current.label);
    }
  }, [current]);

  const handleSubmit = async () => {
    if (
      !window.confirm(
        "the item changes will not refelect on places the previous category was used, do you still wish to continue?"
      )
    )
      return;
    setLoading(true);
    try {
      const itemRef = doc(db, "categories", current.id);

      await updateDoc(itemRef, {
        label: name,
        value: name.toLowerCase(),
      });
      setLoading(false);
      toast.success("Item added successfully");
      setOpen(false);
      setName("");
      getItems();
    } catch (e) {
      setLoading(false);
      toast.error("Failed to add item");
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Edit Item</DialogTitle>
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
            {loading ? "Processing..." : "Edit"}
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
}

export default EditCategoryForm;
