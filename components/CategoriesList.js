import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlipMove from "react-flip-move";
import { SettingsBackupRestoreRounded } from "@mui/icons-material";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

function CategoriesList({ items, setOpen, setCurrent, getItems }) {
  const handleDelete = async (item) => {
    let toastId = toast.loading("deleting...");
    let id = item.id;
    try {
      await deleteDoc(doc(db, "categories", id));
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
    <FlipMove
      style={{
        marginTop: 16,
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {items.map((item) => (
        <ListItem
          key={item.value}
          disableGutters
          secondaryAction={
            <div className="flex items-center space-x-2">
              <IconButton
                onClick={() => {
                  setCurrent(item);
                  setOpen(true);
                }}
                aria-label="comment"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(item)}
                aria-label="comment"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          }
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </FlipMove>
  );
}

export default CategoriesList;
