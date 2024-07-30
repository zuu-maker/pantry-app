import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Stack, TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

function AddItemForm({ open, setOpen }) {
  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogTitle>Add Item</DialogTitle>
      <Container className="w-96">
        <Stack className="p-4" spacing={4}>
          <TextField fullWidth required label="Item Name" />
          <TextField
            id="outlined-select-currency"
            select
            required
            label="Select"
            helperText="please select pantry item's cayegory"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker />
          <TextField fullWidth required label="Quantity" />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Pieces"
            />
            <FormControlLabel control={<Checkbox />} label="Kilograms" />
            <FormControlLabel control={<Checkbox />} label="litres" />
          </FormGroup>
          <Button fullWidth variant="contained">
            Add
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
