import { MouseEvent, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Logout,
  ManageAccounts,
  Menu as MenuIcon,
  Store,
} from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logoutUser } from "../../store/auth/actions";
import { UserRole } from "../../enums/user-role.enum";

interface Props {
  isMenuOpen: boolean;
  onMenuButtonClick: () => void;
}

export function CustomAppBar({ isMenuOpen, onMenuButtonClick }: Props) {
  const { tenant, user } = useAppSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const isSmallDevice = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );

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
        marginLeft: isMenuOpen ? "300px" : 0,
        width: isMenuOpen ? "calc(100% - 300px)" : "100%",
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

        {!isSmallDevice && (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {tenant?.name || ""}
          </Typography>
        )}

        <Box>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              sx={{ width: 32, height: 32, backgroundColor: "text.primary" }}
            />
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
            {user?.role === UserRole.Admin && (
              <MenuItem disabled>
                <ListItemIcon>
                  <Store />
                </ListItemIcon>
                <ListItemText>Meu Estabelecimento</ListItemText>
              </MenuItem>
            )}

            <MenuItem disabled>
              <ListItemIcon>
                <ManageAccounts />
              </ListItemIcon>
              <ListItemText>Minha Conta</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Sair</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
