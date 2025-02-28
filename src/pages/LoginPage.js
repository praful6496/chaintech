import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email && password && role) {
      const userData = { email, role };

      localStorage.setItem("user", JSON.stringify(userData));

      login(userData);

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      alert("Please enter valid credentials and select a role");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      pt="64px" 
    >
      <Box width="300px" textAlign="center">
        <Typography variant="h5" fontWeight={700}>Login</Typography>

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          type="password"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={e => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "black" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
