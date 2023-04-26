import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#001e3c",
    },
    secondary: {
      main: "#007fff",
    },
    background: {
      default: "red",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        disableElevation: true,
        color: "secondary",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 0,
          ":hover": {
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },

    MuiButtonGroup: {
      defaultProps: {
        variant: "contained",
        size: "small",
        disableElevation: true,
        color: "secondary",
      },
    },
  },
});
