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

function AddItemForm({ open, setOpen, getItems, categories }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [checkedItem, setCheckedItem] = useState("Pieces");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    console.table(name, category, date, quantity, checkedItem);

    let _date = date.toISOString();

    try {
      await setDoc(doc(db, "items", name.toLowerCase()), {
        name: name.toLowerCase(),
        category,
        date: _date,
        quantity,
        checkedItem,
        timestamp: Timestamp.now(),
      });
      setLoading(false);
      toast.success("Item added successfully");
      setOpen(false);
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
      <DialogTitle>Add Item</DialogTitle>
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
              {categories.map((option) => (
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
            {loading ? "Processing..." : "Add"}
          </Button>
        </Stack>
      </Container>
      {/* <List sx={{ pt: 0 }}>
      {emails.map((email) => (
        <ListItem disableGutters key={email}>
          <ListItemButton onClick={() => handleListItemClick(email)}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItemButton>
        </ListItem>
      ))}
      <ListItem disableGutters>
        <ListItemButton
          autoFocus
          onClick={() => handleListItemClick('addAccount')}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItemButton>
      </ListItem>
    </List> */}
    </Dialog>
  );
}

export default AddItemForm;
