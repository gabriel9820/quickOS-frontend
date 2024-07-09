import {
  Children,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from "react";
import { Box, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";

export interface MoreActionsProps extends PropsWithChildren {}

function MoreActions({ children }: MoreActionsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function handleOpenMenuClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenuClick() {
    setAnchorEl(null);
  }

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement<any>(child, { handleCloseMenuClick });
    }

    return child;
  });

  return (
    <Box>
      <GridActionsCellItem
        icon={<MoreVert />}
        label="Mais ações"
        onClick={handleOpenMenuClick}
        color="inherit"
      />

      <Menu
        id="more-actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenuClick}
      >
        {childrenWithProps}
      </Menu>
    </Box>
  );
}

export interface ActionItemProps {
  text: string;
  icon?: ReactNode;
  onClick: () => void;
  handleCloseMenuClick?: () => void;
}

function ActionItem({
  text,
  icon,
  onClick,
  handleCloseMenuClick,
}: ActionItemProps) {
  function handleOnClick() {
    onClick();
    handleCloseMenuClick && handleCloseMenuClick();
  }

  return (
    <MenuItem onClick={handleOnClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText>{text}</ListItemText>
    </MenuItem>
  );
}

export { MoreActions, ActionItem };
