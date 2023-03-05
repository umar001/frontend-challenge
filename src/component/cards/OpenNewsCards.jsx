import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Pagination } from "@mui/material";
import { DEFAULT_CARD_IMAGE } from "../../utils/constants";
import Loader from "../loader";
import { Skeleton } from "@mui/material";
import { useEffect } from "react";

function OpenNewsCards({ data, setPage, page }) {
  // console.log(data);
  const onImageBroken = (error) => {
    error.target.src = DEFAULT_CARD_IMAGE;
  };
  const pageHandler = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    // console.log(data);
  }, [data]);
  return (
    <Grid container>
      <Grid
        item
        md={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        py={4}
      >
        <Pagination
          count={data?.totalResults % 10}
          page={page}
          onChange={pageHandler}
        />
      </Grid>
      {data?.articles?.map((val, index) => {
        return (
          <Grid item md={4} key={index}>
            <Card
              sx={{
                mx: 2,
                my: 2,
              }}
            >
              <CardMedia
                sx={{ height: 300 }}
                image={
                  val.urlToImage === null
                    ? DEFAULT_CARD_IMAGE
                    : val.urlToImage || <Skeleton />
                }
                title="green iguana"
                component="img"
                onError={onImageBroken}
              />
              <CardContent>
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {val.title === null ? "" : val.title || <Skeleton />}
                  </Typography>
                  <Box display="none">
                    <Typography
                      variant="span"
                      sx={{
                        fontWeight: "700",
                      }}
                    >
                      Author:{" "}
                    </Typography>
                    <Typography>
                      {val.author ? "" : val.author || <Skeleton />}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {val.description === null
                    ? ""
                    : val.description || <Skeleton />}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={val.url} target="_blank">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
      <Grid
        item
        md={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        mx="auto"
        py={4}
      >
        <Pagination
          count={data?.totalResults % 10}
          page={page}
          onChange={pageHandler}
        />
      </Grid>
    </Grid>
  );
}

export default OpenNewsCards;
