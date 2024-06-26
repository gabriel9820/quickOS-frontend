import { Fragment, useState } from "react";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { MenuItem, menuItems } from "./constants";
import { useAppSelector } from "../../store/hooks";

interface Props {
  isOpen: boolean;
}

export function SidebarMenu({ isOpen }: Props) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("/dashboard");
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  function toggleCollapse(label: string) {
    if (openItems.includes(label)) {
      setOpenItems((old) => old.filter((item) => item !== label));
    } else {
      setOpenItems((old) => [...old, label]);
    }
  }

  function handleItemClick(menuItem: MenuItem) {
    if (menuItem.to) {
      setSelectedItem(menuItem.to);
      navigate(menuItem.to);
    } else if (menuItem.items) {
      toggleCollapse(menuItem.label);
    }
  }

  function renderMenuItems(items: MenuItem[]) {
    return (
      <List>
        {items.map((menuItem, index) => {
          const isSelected = menuItem.to === selectedItem;

          if (
            !user?.role ||
            (menuItem.roles?.length && !menuItem.roles.includes(user.role))
          ) {
            return null;
          }

          return (
            <Fragment key={index}>
              <ListItem sx={{ paddingY: 0, marginBottom: 0.3 }}>
                <ListItemButton
                  onClick={() => handleItemClick(menuItem)}
                  sx={{
                    borderRadius: 1,
                    color: isSelected ? "#5BE49B" : "text.secondary",
                    backgroundColor: isSelected ? "#123230" : "transparent",
                  }}
                >
                  <ListItemIcon
                    sx={{ color: isSelected ? "#5BE49B" : "text.secondary" }}
                  >
                    {menuItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.label}
                    primaryTypographyProps={{
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  />
                  {menuItem.items &&
                    (openItems.includes(menuItem.label) ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </ListItemButton>
              </ListItem>
              {menuItem.items && (
                <Collapse
                  in={openItems.includes(menuItem.label)}
                  timeout="auto"
                  unmountOnExit
                >
                  {renderMenuItems(menuItem.items)}
                </Collapse>
              )}
            </Fragment>
          );
        })}
      </List>
    );
  }

  return (
    <Drawer
      open={isOpen}
      variant="persistent"
      PaperProps={{ sx: { backgroundColor: "background.default" } }}
    >
      <Box sx={{ width: 300 }} role="presentation">
        <Box
          sx={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            quickOS
          </Typography>
        </Box>

        {renderMenuItems(menuItems)}
      </Box>
    </Drawer>
  );
}
