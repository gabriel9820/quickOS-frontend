import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";

import { useAppSelector } from "../../store/hooks";

interface Props {
  isMenuOpen: boolean;
  onMenuButtonClick: () => void;
}

export function CustomAppBar({ isMenuOpen, onMenuButtonClick }: Props) {
  const { tenant } = useAppSelector((state) => state.auth);

  return (
    <AppBar
      position="fixed"
      sx={{
        marginLeft: isMenuOpen ? "250px" : 0,
        width: isMenuOpen ? "calc(100% - 250px)" : "100%",
        transition: "ease 225ms",
        backdropFilter: "blur(5px)",
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={onMenuButtonClick}
        >
          <Menu />
        </IconButton>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {tenant?.name || ""}
        </Typography>

        <Box></Box>
      </Toolbar>
    </AppBar>
  );
}
