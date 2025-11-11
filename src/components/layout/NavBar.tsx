
import { memo } from "react";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from '@mui/material/styles';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "@/utils/mockdata";


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface NavBarProp {
  open: boolean;
  handleDrawer: () => void;
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


const NavBar = ({open,handleDrawer}: NavBarProp) => {
  
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
            <Typography variant="h6" noWrap component="div">
              Sanchez Pediatric Care
            </Typography>
          </Toolbar>
        </AppBar>
      }
    </>
  );
}

export default memo(NavBar);