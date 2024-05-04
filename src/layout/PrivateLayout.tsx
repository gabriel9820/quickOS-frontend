import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Card } from "@mui/material";

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

      <Card
        sx={{
          transition: "ease 225ms",
          margin: 5,
          marginLeft: isMenuOpen ? 36 : 5,
          padding: 5,
          paddingTop: 4,
        }}
      >
        <Outlet />
      </Card>
    </Box>
  );
}
