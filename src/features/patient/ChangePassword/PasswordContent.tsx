import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FcCheckmark } from 'react-icons/fc';

type PasswordProps = {
    title:string,
}

const PasswordContent = ( {title}:PasswordProps) => {
  return (
    <>
        <ListItem className="p-1!">
          <ListItemIcon className="min-w-[24px]!">
            <FcCheckmark color="green" />
          </ListItemIcon>
          <ListItemText secondary={title} />
        </ListItem>
    </>
  );
}

export default PasswordContent;