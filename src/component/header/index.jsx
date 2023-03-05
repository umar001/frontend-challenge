import { useContext, useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeModeContext } from "../../theme";
import { Link } from "react-router-dom";
// import { Link } from "@mui/material";
import { navLinkStyle } from "../style";
import ProfileIcon from "./ProfileIcon";
import { useAuth } from "../../hooks/useAuth";

const drawerWidth = 240;
const navItems = ["Home"];
const toolBarStyle = {
  width: "100%",
  maxWidth: "xl",
  mx: "auto",
};
export default function Header(props) {
  const { isAuthenticated } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ThemeModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, textTransform: "uppercase" }}>
        Mega News
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              href={`${item === "Home" ? "/" : "#" + item.toLowerCase()}`}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        // maxWidth: 600,
      }}
    >
      <AppBar
        component="nav"
        sx={{
          width: "100%",
        }}
      >
        <Toolbar sx={toolBarStyle}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
              display: { xs: "block", sm: "block" },
              color: "#fff",
              textTransform: "uppercase",
            }}
          >
            Mega News
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link
                to={`${item === "Home" ? "/" : item.toLowerCase()}`}
                key={item}
                style={navLinkStyle}
              >
                {item}
              </Link>
            ))}
          </Box>
          {isAuthenticated() ? (
            <Link>
              <ProfileIcon />
            </Link>
          ) : (
            <Link to="/login" style={navLinkStyle}>
              Login
            </Link>
          )}
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          {mobileOpen ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 0, pr: 0, display: { sm: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 0, pr: 0, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          backgroundColor: "red",
        }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.default,
            },
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            zIndex: 122222,
            backgroundColor: "#F0EBE3",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ display: "flex" }}></Box>
    </Box>
  );
}
