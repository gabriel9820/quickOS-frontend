import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { SidebarMenu } from "../components/SidebarMenu";
import { CustomAppBar } from "../components/Appbar";

export function PrivateLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const margin = { sm: "10px", lg: "100px", xl: "200px" };

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
          marginY: "60px",
          marginX: { sm: margin["sm"], lg: margin["lg"], xl: margin["xl"] },
          marginLeft: isMenuOpen
            ? {
                sm: `calc(300px + ${margin["sm"]})`,
                lg: `calc(300px + ${margin["lg"]})`,
                xl: `calc(300px + ${margin["xl"]})`,
              }
            : { sm: margin["sm"], lg: margin["lg"], xl: margin["xl"] },
          padding: "20px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
