import { MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/auth/actions";
import { Role } from "../../enums/role.enum";

interface Props {
  isMenuOpen: boolean;
  onMenuButtonClick: () => void;
}

export function CustomAppBar({ isMenuOpen, onMenuButtonClick }: Props) {
  const { tenant, user } = useAppSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  function handleOpenUserMenu(event: MouseEvent<HTMLElement>) {
    setAnchorElUser(event.currentTarget);
  }

  function handleCloseUserMenu() {
    setAnchorElUser(null);
  }

  function handleLogoutClick() {
    dispatch(logoutUser());
  }

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
          <MenuIcon />
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

        <Box>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar />
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={anchorElUser}
            keepMounted
            disableScrollLock
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: "45px" }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {user?.role === Role.Admin && (
              <MenuItem disabled>
                <Typography textAlign="center">Meu Estabelecimento</Typography>
              </MenuItem>
            )}
            <MenuItem disabled>
              <Typography textAlign="center">Minha Conta</Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography textAlign="center">Alterar Senha</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <Typography textAlign="center">Sair</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
