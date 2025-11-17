
import { memo, useContext } from "react";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from '@mui/material/styles';
import { IconButton, MenuItem, Select, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "@/utils/mockdata";
import { AuthContext } from "@/services/state/context/authContext";
import ProfileAvatar from "../ui/ProfileAvatar";


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface NavBarProp {
  open: boolean;
  handleDrawer: () => void;
  handleLogout? : () => void
};


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));


const NavBar = ({open,handleDrawer,handleLogout}: NavBarProp) => {
  const auth = useContext(AuthContext)
  
  return (
    <>
      {
        <AppBar
          className="sticky top-0 right-0 left-0"
          open={open}
          sx={{ backgroundColor: "var(--color-quarternary)" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={[
                {
                  marginRight: 5,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>

            <div className="flex justify-between items-center w-full">
              <div className="">
                <Typography variant="h6" noWrap component="div">
                  Sanchez Pediatric Care
                </Typography>
              </div>
              <div className="mr-52">
                <Tooltip title={auth?.first_name}>
                  <IconButton sx={{ p: "5px 10px", m: 1,}}>
                   <ProfileAvatar first_name={auth?.first_name} />
                  </IconButton>
                </Tooltip>

                <Select
                  labelId="navbar-select"
                  id="navigation-select"
                  className="max-w-full w-35 !font-normal"
                  onChange={() => {}}
                  value={'None'}
                >
                    <MenuItem value='None'>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Notif"}>SMS Notif</MenuItem>
                    <MenuItem onClick={handleLogout} value={"Logout"}>Logout</MenuItem>
                </Select>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      }
    </>
  );
}

export default memo(NavBar);