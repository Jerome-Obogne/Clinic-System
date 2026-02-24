import { ListItemIcon, ListItemText,  MenuItem } from '@mui/material';
import React from 'react'


type MenuItemProps = {
    label: string,
    icon?: React.ReactNode,
    onAction?: () => void

}


const CustomeMenuItem = ({onAction,label,icon}:MenuItemProps) => {
  return (
    <>
      <MenuItem onClick={onAction}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </MenuItem>
    </>
  );
}

export default CustomeMenuItem