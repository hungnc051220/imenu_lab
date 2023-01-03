import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#252525",
    },
  },
  typography: {
    fontFamily: "'Product Sans', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          variant: "contained",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: 700,
        },
      },
    },
  },
});
