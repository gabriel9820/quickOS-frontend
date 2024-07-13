import {
  Children,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  isValidElement,
  useState,
} from "react";
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { UserRole } from "../../enums/user-role.enum";
import { useAppSelector } from "../../store/hooks";
import { isInRole } from "../../utils/auth";

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
        icon={<MoreHoriz sx={{ borderRadius: "50%", border: "1.5px solid" }} />}
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
  permission?: UserRole[];
  onClick: () => void;
  handleCloseMenuClick?: () => void;
}

function ActionItem({
  text,
  icon,
  permission,
  onClick,
  handleCloseMenuClick,
}: ActionItemProps) {
  const { user } = useAppSelector((state) => state.auth);

  const hasPermission = isInRole(permission, user!);

  function handleOnClick() {
    onClick();
    handleCloseMenuClick && handleCloseMenuClick();
  }

  return (
    <Tooltip placement="left" title={hasPermission ? "" : "Sem permissão"}>
      <span>
        <MenuItem disabled={!hasPermission} onClick={handleOnClick}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText>{text}</ListItemText>
        </MenuItem>
      </span>
    </Tooltip>
  );
}

export { MoreActions, ActionItem };
