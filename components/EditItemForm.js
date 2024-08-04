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
  updateDoc,
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

function EditItemForm({ open, setOpen, current, getItems }) {
  const [date, setDate] = useState(null);
  const [showDate, setShowDate] = useState("");
  const [checkedItem, setCheckedItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    console.log("current", current);
    if (current) {
      let _date = new Date(current.date);
      setCheckedItem(current.checkedItem);
      setShowDate(_date.toLocaleDateString());
      setName(current.name);
      setCategory(current.category);
      setQuantity(current.quantity);
    }
  }, [current]);

  const handleSubmit = async () => {
    setLoading(true);
    console.table(name, category, date, quantity, checkedItem);

    let _date = "";

    if (date) {
      _date = date.toISOString();
    } else {
      _date = current.date;
    }

    console.log({
      name,
      category,
      date: _date,
      checkedItem: checkedItem,
      quantity,
    });

    try {
      const itemRef = doc(db, "items", current.id);

      await updateDoc(itemRef, {
        name: name.toLowerCase(),
        category,
        date: _date,
        checkedItem: checkedItem,
        quantity,
      });
      setOpen(false);
      setLoading(false);
      toast.success("Item added successfully");
      setName("");
      setCategory("");
      setQuantity("");
      setCheckedItem("");
      setDate(null);
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
            label="Item Name"
          />
          <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              id="demo-simple-select"
              labelId="demo-simple-select-label"
              value={category}
              label="Age"
              required
              defaultValue="fruits"
              onChange={(e) => setCategory(e.target.value)}
            >
              {currencies.map((option) => (
                <MenuItem
                  onChange={(e) => setCategory(e.target.value)}
                  defaultValue="fruits"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker value={date} onChange={(_date) => setDate(_date)} />
          {showDate && (
            <p className="pl-1 text-sm">{"Expiration Date: " + showDate}</p>
          )}
          <TextField
            fullWidth
            required
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <FormGroup>
            <InputLabel>Unit</InputLabel>
            <FormControlLabel
              control={<Checkbox checked={checkedItem === "Pieces"} />}
              onChange={(e) => setCheckedItem("Pieces")}
              label="Pieces"
            />
            <FormControlLabel
              control={<Checkbox checked={checkedItem === "Kilograms"} />}
              onChange={(e) => setCheckedItem("Kilograms")}
              label="Kilograms"
            />
            <FormControlLabel
              control={<Checkbox checked={checkedItem === "litres"} />}
              onChange={(e) => setCheckedItem("litres")}
              label="litres"
            />
          </FormGroup>
          <Button onClick={handleSubmit} fullWidth variant="contained">
            {loading ? "Processing..." : "Edit"}
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
}

export default EditItemForm;
