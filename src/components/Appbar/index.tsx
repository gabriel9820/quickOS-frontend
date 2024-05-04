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
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: isMenuOpen ? "250px" : 0,
        transition: "ease 225ms",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={onMenuButtonClick}
          >
            <Menu />
          </IconButton>

          <Typography sx={{ flexGrow: 1, textAlign: "center", fontSize: 18 }}>
            {tenant?.name || ""}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
