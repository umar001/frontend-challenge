import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_API } from "../../utils/constants";
import { toaster } from "../../utils/helper";
import { store } from "../../utils/httpUtil";
import { isAuthenticated } from "../../utils/jwtUtil";
import { setLocalStorage } from "../../utils/storageUtils";

export default function RegisterPage() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    if (password !== confirmPassword) {
      toaster("error", "Your Confirm Password not match");
      return;
    }
    const { data } = await store(SERVER_API, "register", {
      name,
      email,
      password,
    });
    if (data.status === 200) {
      navigate("/login");
      toaster("success", "Successfully register, please login");
    } else if (data.status === 400) {
      toaster("error", "The email has already been taken.");
      return;
    } else {
      toaster("error", "Something went wrong please refresh your page");
    }
  };
  return (
    <Box component="div">
      <Container maxWidth="xl">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item md={12}>
            <Card fullWidth>
              <CardContent>
                <Typography textAlign="center">Please Login</Typography>
                <form onSubmit={submitHandler}>
                  <TextField
                    variant="filled"
                    label="Name"
                    type="text"
                    fullWidth
                    placeholder="John Doe"
                    sx={{
                      my: { md: 2, sm: 2, xs: 2 },
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    variant="filled"
                    label="Email"
                    type="email"
                    fullWidth
                    placeholder="john@gmail.com"
                    sx={{
                      my: { md: 2, sm: 2, xs: 2 },
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    variant="filled"
                    label="Password"
                    fullWidth
                    placeholder="password"
                    type="password"
                    sx={{
                      my: { md: 2, sm: 2, xs: 2 },
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    variant="filled"
                    label="Password"
                    fullWidth
                    placeholder="Confirm password"
                    type="password"
                    sx={{
                      my: { md: 2, sm: 2, xs: 2 },
                    }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Box textAlign={"center"} pt={3}>
                    <Button variant="contained" type="submit">
                      Register
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
