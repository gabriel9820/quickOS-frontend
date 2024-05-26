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
    <Box>
      <CustomAppBar isMenuOpen={isMenuOpen} onMenuButtonClick={toggleMenu} />

      <SidebarMenu isOpen={isMenuOpen} />

      <Box
        sx={{
          transition: "ease 225ms",
          marginY: 5,
          marginX: { sm: 5, xl: 25 },
          marginLeft: isMenuOpen ? { sm: 36, xl: 56 } : { sm: 5, xl: 25 },
          padding: 5,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
