import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import UserService from '../services/userService';
import LuggageIcon from '@mui/icons-material/Luggage';

const pages = [
  { name: "My lodges", link: "/my-lodges", roles: ["ROLE_HOST"] },
  { name: "New lodging", link: "/new-lodge", roles: ["ROLE_HOST"] },
  { name: "Lodge search", link: "/lodge-search", roles: ["ANY"] },
  { name: "My Bookings", link: "/my-bookings", roles: ["ROLE_GUEST", "ROLE_HOST"] },
  { name: "My Booking Requests", link: "/my-requests", roles: ["ROLE_GUEST", "ROLE_HOST"] },
];
const settings = [
  {name: "Profile", link: "/profile", function: () => {}},
  {name: "Logout", link: "/", function: () => {UserService.logout()}}
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    var link = event.target.getAttribute("nav-link");
    navigate(link);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setUser(JSON.parse(localStorage.getItem("currentUser")))
    }
  }, []);

  return (
    <AppBar position="static" color="warning">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LuggageIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Starbook
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.filter(p => p.roles.includes(user.role) || p.roles.includes("ANY")).map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Link href={page.link} color="inherit" underline="none">
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.filter(p => p.roles.includes(user.role) || p.roles.includes("ANY")).map((page) => (
              // <Link href={page.link} color="inherit" underline="none">
              <Button
                key={page.link}
                nav-link={page.link}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
              // </Link>
            ))}
          </Box>

          {localStorage.getItem("currentUser") &&
          localStorage.getItem("token") ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/static/images/avatar/broken-image.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Link href={setting.link} color="inherit" underline="none" onClick={setting.function}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <MenuItem>
              <Link href="/login" color="inherit" underline="none">
                Login
              </Link>
            </MenuItem>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
