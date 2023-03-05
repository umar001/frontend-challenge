import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FilledInput,
  Grid,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { memo, useState } from "react";
import dayjs from "dayjs";
import PersonalizeModal from "./PersonalizeModal";
import { useSelector } from "react-redux";
import { userData } from "../../app/slice/userSlice";
const categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];
function PageTopBar({
  setDate,
  date,
  search,
  category,
  author,
  setCategory,
  setAuthor,
  setSearch,
  fetchData,
  searchSubmitHandler,
}) {
  const { newsDataSource } = useSelector(userData);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={12} sm={12} mb={6}>
          <Typography variant="h5">Data Source {newsDataSource.txt}</Typography>
        </Grid>
        <Grid item md={12} sm={12}>
          <form onSubmit={searchSubmitHandler}>
            <FormControl variant="filled" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">
                Search
              </InputLabel>
              <FilledInput
                id="outlined-adornment-password"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      type="submit"
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                }
                label="Search"
              />
            </FormControl>
          </form>
        </Grid>
        <Grid item md={12} sm={12} py={3}>
          <Typography py={2}>Filter Results</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection={{ md: "row", sm: "column", xs: "column" }}
            sx={{
              margin: "auto",
            }}
          >
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={(e) => setDate(e)}
              renderInput={(params) => <TextField {...params} fullWidth />}
              maxDate={new Date()}
            />
            <TextField
              variant="filled"
              fullWidth
              label="Source"
              placeholder="cbc-news"
              sx={{
                mx: { md: 5, sm: 0, xs: 0 },
                my: { md: 0, sm: 2, xs: 2 },
              }}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              variant="filled"
              fullWidth
              label="Category"
              placeholder="business"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
        <Grid item md={12} py={2} textAlign="center">
          <Button variant="contained" onClick={fetchData}>
            Filter
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default memo(PageTopBar);
