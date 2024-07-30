"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import Link from "next/link";

function Sidebar({ drawerWidth }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {[
            { title: "Home", link: "/" },
            { title: "Categories", link: "/categories" },
          ].map((item, index) => (
            <ListItem key={item.title} disablePadding>
              <Link href={item.link}>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <HomeIcon /> : <CategoryIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[{ title: "Shopping List", link: "shopping-list" }].map(
            (item, index) => (
              <ListItem key={item.title} disablePadding>
                <Link href={item.link}>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <ShoppingBasketIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
