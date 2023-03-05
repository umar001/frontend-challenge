import React, { useState } from "react";
import { IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { navLinkStyle } from "../style";

const ProfileIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem sx={{}}>
          <Link
            to="/profile"
            style={{
              ...navLinkStyle,
              padding: 0,
              color: theme.palette.mode === "light" ? "#424040" : "#fff",
            }}
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileIcon;
