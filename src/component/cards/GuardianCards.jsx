import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Grid, Pagination } from "@mui/material";
import { DEFAULT_CARD_IMAGE } from "../../utils/constants";
import Loader from "../loader";
import Skeleton from "react-loading-skeleton";
import { useEffect } from "react";

export default function GuardianCards({ articles, setPage, page }) {
  const onImageBroken = (error) => {
    error.target.src = DEFAULT_CARD_IMAGE;
  };
  const pageHandler = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    // console.log(articles);
  }, [articles]);
  if (!articles) {
    return <Loader />;
  }
  if (!articles?.results?.length) {
    return <Typography>No data found</Typography>;
  }

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
          count={articles.pages}
          onChange={pageHandler}
          page={page}
          fullWidth
        />
      </Grid>
      {articles?.results?.map((val, index) => {
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
                  val?.fields?.thumbnail === null
                    ? DEFAULT_CARD_IMAGE
                    : val?.fields?.thumbnail || <Skeleton />
                }
                title="green iguana"
                component="img"
                onError={onImageBroken}
              />
              <CardContent>
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {val.webTitle || <Skeleton />}
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
                    <Typography>{val.author || <Skeleton />}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {val?.fields?.trailText || <Skeleton />}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={val.webUrl} target="_blank">
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
          count={articles.pages}
          onChange={pageHandler}
          page={page}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
