import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, userData } from "../../app/slice/userSlice";
import { useAuth } from "../../hooks/useAuth";
import { SERVER_API } from "../../utils/constants";
import { fetchUserDetails, toaster } from "../../utils/helper";
import { store } from "../../utils/httpUtil";

function ProfilePage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { userDetails } = useSelector(userData);
  const [name, setName] = useState(userDetails?.name);
  const [email, setEmail] = useState(userDetails?.email);
  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await store(SERVER_API, "update-profile", { name }, user);
    if (data.status === 200) {
      toaster("success", "User Detail Successfully updated");
      dispatch(addUserDetails({ name, email }));
    } else {
      toaster("error", "Something went wrong please refresh your page");
    }
  };
  useEffect(() => {
    if (!email) {
      dispatch(fetchUserDetails(user));
    }
  }, []);
  useEffect(() => {
    console.log(userDetails);
    if (userDetails) {
      setName(userDetails?.name);
      setEmail(userDetails?.email);
    }
  }, [userDetails]);

  return (
    <Box
      component="div"
      sx={{
        pt: 15,
        height: "90vh",
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item md={6}>
            <form onSubmit={submitHandler}>
              <TextField
                variant="filled"
                label="Name"
                fullWidth
                placeholder="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                sx={{
                  my: { md: 2, sm: 2, xs: 2 },
                }}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                variant="filled"
                label="Email"
                fullWidth
                placeholder="admin@gmail.com"
                sx={{
                  my: { md: 2, sm: 2, xs: 2 },
                }}
                value={email}
                disabled
                InputLabelProps={{ shrink: true }}
              />
              <Box textAlign={"center"} py={5}>
                <Button variant="contained" type="submit">
                  Update
                </Button>
              </Box>
            </form>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default memo(ProfilePage);
