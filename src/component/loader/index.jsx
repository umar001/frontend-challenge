import { Box } from "@mui/material";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: 0,
        right: 0,
        zIndex: 999999999,
        backgroundColor: "transparent",
      }}
    >
      <Box component="img" src="loader.svg" width={100} />
    </Box>
  );
}
