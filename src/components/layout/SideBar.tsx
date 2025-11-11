import React, { memo, useCallback } from 'react'
import { styled, useTheme, type CSSObject, type Theme, } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from 'react-router';
import type { SideBarModel } from '@/model/Sidebar.model';
import NavBar from './NavBar';
import { DRAWER_WIDTH } from '@/utils/mockdata';


const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 10px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 10px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 0),
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: DRAWER_WIDTH,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const SideBar = ({ sideBarList ,userType ,children }: SideBarModel) => {

  const theme = useTheme();
  const {pathname} = useLocation()
 
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = useCallback(() => {setOpen(true)},[]);
  const handleDrawerClose = () => { setOpen(false)};

  const sideBarData = sideBarList[userType]

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {
          <NavBar open = {open} handleDrawer={handleDrawerOpen}/>
        }
        <Drawer variant="permanent" open={open}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>

          <div className="h-20 my-4 py-4  mx-auto">
            <div className="w-52">
              <Link to="/">
                <img
                  src="../logo/sample22.png"
                  alt="nav logo"
                  className="max-w-full w-[700px] h-auto"
                />
              </Link>
            </div>
          </div>

          <Divider />
            <List sx={{}}>
              {sideBarData.map((data: any) => (
                <ListItem
                  disablePadding
                  key={data.id}
                  sx={{ display: "block", mt: "20px" }}
                >
                  <Link to={data.routes}>
                    <ListItemButton
                      sx={[
                        {
                          minHeight: 48,
                          px: 2.5,
                          backgroundColor: `${
                            pathname == data.routes
                              ? "var(--color-quarternary)"
                              : "transparent"
                          }`,
                        },
                        open
                          ? { justifyContent: "initial" }
                          : { justifyContent: "center" },
                      ]}
                    >
                      <ListItemIcon
                        sx={[
                          { minWidth: 0, justifyContent: "center" },
                          open ? { mr: 3 } : { mr: "auto" },
                        ]}
                      >
                        {data.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={data.title}
                        style={{
                          opacity: `${open ? "1" : "0"} `,
                          fontWeight: "600",
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          <Divider />
        </Drawer>
          <div className="mt-20 p-8">{children}</div>
      </Box>
    </>
  );
};

export default memo(SideBar)