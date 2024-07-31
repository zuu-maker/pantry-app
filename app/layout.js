"use client";
import SearchAppBar from "@/components/SearchAppBar";
import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Pantry App",
//   description: "The pantry app",
// };

const drawerWidth = 240;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <SearchAppBar />
        <Sidebar drawerWidth={drawerWidth} />
        <div className="ml-[240px]">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </div>
      </body>
    </html>
  );
}
