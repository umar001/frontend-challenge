import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import EditIcon from "@mui/icons-material/Edit";

import { ModalStyle } from "../style";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewsDataSource,
  addPersonalizeFeed,
  userData,
} from "../../app/slice/userSlice";
import { memo, useEffect, useState } from "react";
import { FilledInput, Grid, InputLabel, TextField } from "@mui/material";
import { NEWS_DATA_SOURCE, SERVER_API } from "../../utils/constants";
import { store } from "../../utils/httpUtil";
import { useAuth } from "../../hooks/useAuth";
import { toaster } from "../../utils/helper";

function PersonalizeModal({
  resetState,
  setCategory,
  setAuthor,
  category,
  author,
  newsId,
  setNewsId,
  callApi,
  setLoad,
}) {
  const { user } = useAuth();
  const userInfo = useSelector(userData);
  const { newsDataSource, personalizeFeed } = userInfo;
  const dispatch = useDispatch();
  const [newsSource, setNewsSource] = useState(newsId);
  const [modalState, setModalState] = useState(false);
  // const [category, setCategory] = useState("Test");
  // const [author, setAuthor] = useState("Test");

  const openModalHandler = () => setModalState(!modalState);
  const closeModalHandler = () => setModalState(!modalState);

  const newsDataSourceHandler = (e) => {
    const id = e.target.value;
    setNewsSource(id);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setNewsId(newsSource);
    const source = NEWS_DATA_SOURCE.find((el) => el.id === newsSource);
    const { data } = await store(
      SERVER_API,
      "/store-news-feed",
      { news_source: newsSource, category, author },
      user
    );
    if (data.status === 200) {
      dispatch(
        addNewsDataSource({ id: newsSource, txt: source.txt, category, author })
      );
      resetState();
      toaster("success", "Feed successfully stored");
    } else {
      toaster("success", "Something went wrong please refresh your page");
    }
    closeModalHandler();
    callApi(newsSource);
  };
  useEffect(() => {
    setNewsSource(newsId);
    // setLoad(true);
    const timer = setTimeout(() => {
      setLoad(true);
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [newsId]);
  return (
    <>
      <Button
        variant="contained"
        onClick={openModalHandler}
        sx={{
          mb: 3,
        }}
      >
        <EditIcon fontSize="10px" /> Personalize News Feed
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState}
        onClose={closeModalHandler}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalState}>
          <Box sx={ModalStyle}>
            <Grid container>
              <Grid item md={12} textAlign="center">
                <Typography variant="h6">Personalize Your News Feed</Typography>
              </Grid>
              <Grid item md={12} py={5}>
                <form onSubmit={submitHandler}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Data Source
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={newsSource}
                      name="radio-buttons-group"
                      onChange={newsDataSourceHandler}
                    >
                      <FormControlLabel
                        value="openNewsAPI"
                        control={<Radio />}
                        label="Open News API"
                      />
                      <FormControlLabel
                        value="guardianAPI"
                        control={<Radio />}
                        label="Guardian API"
                      />
                      <FormControlLabel
                        value="newyorkAPI"
                        control={<Radio />}
                        label="New York API"
                      />
                      {/* <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  /> */}
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    id="outlined-multiline-flexible"
                    variant="filled"
                    fullWidth
                    sx={{
                      my: 2,
                    }}
                    label="Category"
                    placeholder="business"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  <TextField
                    variant="filled"
                    fullWidth
                    label="Author"
                    placeholder="Emily Dugan"
                    sx={{
                      my: 2,
                    }}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  <Box textAlign="center" pt={5}>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Box>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default memo(PersonalizeModal);
