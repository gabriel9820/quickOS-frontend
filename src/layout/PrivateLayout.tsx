import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { SidebarMenu } from "../components/SidebarMenu";
import { CustomAppBar } from "../components/Appbar";

export function PrivateLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  function toggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  return (
    <>
      <CustomAppBar isMenuOpen={isMenuOpen} onMenuButtonClick={toggleMenu} />

      <SidebarMenu isOpen={isMenuOpen} />

      <Box
        sx={{
          marginLeft: isMenuOpen ? "250px" : 0,
          transition: "ease 225ms",
          padding: 5,
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
