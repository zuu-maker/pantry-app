"use client";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AddItemForm from "@/components/AddItemForm";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  return (
    <main className="flex min-h-screen p-24">
      <div className="flex justify-center space-x-4">
        <Fab onClick={() => setOpen(true)} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <Fab color="primary" aria-label="add">
          <AddAPhotoIcon />
        </Fab>
        <AddItemForm open={open} setOpen={setOpen} />
      </div>
    </main>
  );
}
