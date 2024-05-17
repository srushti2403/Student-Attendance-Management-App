import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  styled,
  alpha,
} from "@mui/material";
import boyAvatar from "../boy.jpg"; // Import the image
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: "blur(8px)", // Add a blur effect to the background
  backgroundColor: alpha(theme.palette.background.paper, 0.75), // Set a transparent background with some opacity
  position: "fixed", // Fixed position to keep the navbar at the top
  top: 0,
  left: 0,
  right: 0,
}));

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <StyledAppBar>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: "#0088FE" }}
        >
          School Management System
        </Typography>

        <Avatar sx={{ ml: 2, mr: 2 }} alt="User Avatar" src={boyAvatar}>
          <img
            src={boyAvatar}
            alt="User Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Avatar>

        <IconButton
          color="inherit"
          edge="end"
          aria-label="logout"
          onClick={handleLogout}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
