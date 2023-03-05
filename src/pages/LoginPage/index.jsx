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
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { SERVER_API } from "../../utils/constants";
import { toaster } from "../../utils/helper";
import { store } from "../../utils/httpUtil";
import { isAuthenticated } from "../../utils/jwtUtil";
import { setLocalStorage } from "../../utils/storageUtils";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    const { data } = await store(SERVER_API, "login", { email, password });
    if (data.status === 200) {
      setLocalStorage("authorization", data.data);
      // navigate("/", { replace: true });
      login(data.data);
      toaster("success", "Successfully Login");
    } else {
      toaster("error", "Credentials Not Match");
    }
  };
  // useEffect(() => {
  //   setLocalStorage("authorization", authToken);
  // }, [authToken]);
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
                    label="Email"
                    type="email"
                    fullWidth
                    placeholder="test@gmail.com"
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
                  <Box textAlign={"center"} pt={3}>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Box>
                </form>
              </CardContent>
              <Box
                sx={{
                  py: 4,
                  textAlign: "center",
                }}
              >
                <Typography>
                  Don't have an account yet? <Link to="/register">Sign Up</Link>{" "}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
