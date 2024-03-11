import { MantineTheme } from "@mantine/core";

const ThemeStyle: Partial<MantineTheme> = {
  /** Put your mantine theme override here */
  // colorScheme: "dark",
  fontFamily: "Plus Jakarta Sans, sans-serif",
  lineHeight: 1.5,
  // dir: "ltr", // Add dir property
  // primaryShade: 1, // Add primaryShade property
  // focusRing: "auto", // Add focusRing property
  // defaultRadius: "sm", // Add defaultRadius property
  // colors: {
  //   red: ["#CB3E19"],
  //   brown: ["#45110B"],
  //   orange: ["#FE8D0E"],
  //   cream: ["#E9E1D5"],
  //   grey: ["#EAF0F6", "#57606A", "#0F1C2A"],

  //   success: ["#b9f6ca", "#69f0ae", "#00c853"],
  //   danger: ["#fbe9e7", "#ffab91", "#d84315"],
  //   warning: ["#b9f6ca", "#ffe57f", "#FFC107"],
  // },
  // primaryColor: "brown",
  // breakpoints: {
  //   xs: "30em",
  //   sm: "48em",
  //   md: "64em",
  //   lg: "74em",
  //   xl: "90em",
  // },
  headings: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    fontWeight: "bold",

    sizes: {
      h1: {
        fontSize: "28px",
        lineHeight: 1.25,
        fontWeight: "semi-bold",
      },
      h2: {
        fontSize: "24px",
        lineHeight: 1.25,
        fontWeight: "semi-bold",
      },
      h3: {
        fontSize: "20px",
        lineHeight: 1.25,
        fontWeight: "semi-bold",
      },
      h4: {
        fontSize: "18px",
        lineHeight: 1.25,
        fontWeight: "semi-bold",
      },
      h5: {
        fontSize: "16px",
        lineHeight: 1.25,
        fontWeight: "semi-bold",
      },
      h6: {
        fontSize: "16px",
        lineHeight: 1.25,
        fontWeight: "normal",
      },
    },
  },
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 768,
          md: 1024,
          lg: 1196,
          xl: 1392,
        },
      },
    },

    Modal: {
      styles: (theme) => ({
        root: {
          zIndex: 1005,
        },
        content: {
          zIndex: 1000,
        },
        // inner: {
        //   background: " rgba(0, 76, 143, 0.6)",
        // },
        header: {
          //   position: "absolute",
          //   right: "0",
          padding: "24px",
        },
        title: {
          fontSize: "20px;",
          fontWeight: 600,
          lineHeight: 1.25,
          color: "#45110B",
        },
        close: {},
        body: {
          padding: "0 24px 24px",
        },
      }),
    },

    Button: {
      // defaultProps: {
      //   size: "lg",
      //   color: "brown",
      // },

      styles: (theme) => ({
        root: {
          backgroundColor: "orange",
          color: "#45110B",
          fontSize: "14px",
          lineHeight: 1.428571,
          fontWeight: 500,
          "&:hover": {
            backgroundColor: "rgba(241, 134, 13, 1)",
          },
        },
      }),
    },

    Select: {
      styles: (theme) => ({
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          fontSize: "16px",
          padding: "5px 45px 5px 16px",
          border: "1px solid #BCB1A1",
          background: "#F6F4EF",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontWeight: 500,
            fontSize: "16px",
            color: "#6A5757",
          },

          label: {
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: 1.2142857,
            marginBottom: 0,
            color: "#090909",
          },
        },
        rightSection: {
          width: "24px",
          right: "14px",
        },
      }),
    },

    Input: {
      styles: (theme) => ({
        input: {
          height: 60,
          borderRadius: "8px",
          color: "#6A5757",
          padding: "5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#fff",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        label: {
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.2142857,
          marginBottom: 0,
          color: "#090909",
        },
      }),
    },

    TextInput: {
      // Use raw styles object if you do not need theme dependency
      styles: (theme) => ({
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#F6F4EF",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        label: {
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.2142857,
          marginBottom: 0,
          color: "#090909",
        },
      }),
    },

    NumberInput: {
      // Use raw styles object if you do not need theme dependency
      styles: (theme) => ({
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#F6F4EF",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        label: {
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.2142857,
          marginBottom: 0,
          color: "#090909",
        },
      }),
    },

    Textarea: {
      // Use raw styles object if you do not need theme dependency
      styles: (theme) => ({
        input: {
          height: 113,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "20px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#F6F4EF",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        label: {
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.2142857,
          marginBottom: 0,
          color: "#090909",
        },
      }),
    },

    PasswordInput: {
      styles: (theme) => ({
        root: {
          marginBottom: "16px",
        },
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "5px 45px 5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#F6F4EF",
          // width: "calc(100% - 3rem)",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        innerInput: {
          height: "100%",
          width: "calc(100% - 3rem)",
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        label: {
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.2142857,
          marginBottom: 0,
          color: "#090909",
        },

        rightSection: {
          right: "10px",
        },

        visibilityToggle: {},
      }),
    },

    DateInput: {
      styles: (theme) => ({
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#F6F4EF",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
        label: {
          fontWeight: 500,
          fontSize: "14px",
          lineHeight: 1.2142857,
          marginBottom: 0,
          color: "#090909",
        },
      }),
    },

    DatePickerInput: {
      styles: (theme) => ({
        root: {},
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          background: "#F6F4EF",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
      }),
    },

    Radio: {
      styles: (theme) => ({
        radio: {
          width: "24px",
          height: "24px",
          background: "#F6F4EF",
          border: "1px solid #BCB1A1",
          "&:checked": {
            background: "#F6F4EF",
            borderColor: "#CB3E19",
            "+ svg": {
              color: "#CB3E19",
              height: "12px",
              width: "12px",
              top: "calc(50% - 6px)",
              left: "calc(50% - 6px)",
            },
          },
        },
        labelWrapper: {
          lineHeight: 1.5,
        },

        label: {
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: 1.5,
          marginBottom: 0,
          color: "#45110B",
        },
      }),
    },

    Checkbox: {
      styles: (theme) => ({
        input: {
          backgroundColor: "#F6F4EF",
          borderColor: "#BCB1A1",
          borderRadius: "6px",
          width: "25.5px",
          height: "25px",
          "&:checked": {
            backgroundColor: "#F6F4EF",
            borderColor: "#CB3E19",
          },
        },

        inner: {
          width: "25.5px",
          height: "25px",
          "& svg": {
            color: "#CB3E19 !important",
            width: "45%",
          },
        },

        label: {
          fontSize: "16px",
          lineHeight: 1.5,
          minHeight: "25px",
          paddingTop: "2px",
        },
      }),
    },

    Tabs: {
      styles: (theme) => ({
        tab: {
          color: "#6A5757",
          fontSize: "14px",
          fontWeight: 500,
          padding: "15px",
          marginBottom: "-1px",
          "&[data-active]": {
            borderColor: "#CB3E19",
            color: "#CB3E19",
          },
          "&:hover": {
            borderColor: "#CB3E19",
            color: "#CB3E19",
          },
        },
        tabsList: {
          marginBottom: "20px",
          borderBottom: "1px solid #E0E0E0",
        },
        tabLabel: {},
        panel: {
          position: "relative",
          minHeight: "500px",
        },
      }),
    },

    Slider: {
      styles: (theme) => ({
        root: {},
        bar: { backgroundColor: "#CB3E19" },
        thumb: {
          border: "1px solid #E9E1D5",
          width: "32px",
          height: "32px",
          backgroundColor: "#CB3E19",
        },
        dragging: {},
        label: {},
      }),
    },

    Stepper: {
      styles: (theme) => ({
        root: {},
        content: {
          padding: "0",
        },
        steps: {
          alignItems: "flex-start",
          backgroundColor: "#F4F0EC",
          padding: "1rem",
          "& button": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
          "& .mantine-Stepper-stepBody": {
            marginLeft: 0,
          },
        },
        stepLabel: {
          color: "#97A1A9",
          fontSize: "12px",
          lineHeight: "21.5px",
        },
        stepDescription: {
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "24px",
          color: "#000000",
          margin: 0,
        },
        separator: {
          height: 0,
          border: "2px dashed #DED3C9",
          maxWidth: "113px",
          marginTop: "20px",
        },
        separatorActive: {
          height: 0,
          backgroundColor: "transparent",
          border: "2px dashed #004990",
        },
        stepIcon: {
          border: 0,
          backgroundColor: "white",
          "&[data-completed]": {
            backgroundColor: "rgba(0, 73, 144, 0.2)",
          },
          "&[data-progress]": {
            backgroundColor: "rgba(0, 73, 144, 0.2)",
          },
        },
      }),
    },

    Switch: {
      styles: (theme) => ({
        root: {},
        track: {
          borderColor: "#BCB1A1",
        },
        trackLabel: {
          margin: "0",
          height: "20px",
          width: "36px",
          backgroundColor: "#F6F4EF",
        },
        thumb: {
          backgroundColor: "#FE8D0E",
          borderColor: "#FE8D0E",
        },
        label: {
          fontSize: "16px",
        },
      }),
    },

    Autocomplete: {
      styles: (theme) => ({
        root: {},
        input: {
          height: 60,
          borderRadius: "16px",
          color: "#6A5757",
          padding: "5px 45px 5px 16px",
          border: "1px solid #BCB1A1",
          fontSize: "16px",
          backgroundColor: "#F6F4EF",
          backgroundImage: 'url("./arrow_drop_down.svg")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right 15px",
          "&:focus": {
            border: "1px solid #BCB1A1",
          },
          "&::placeholder": {
            fontSize: "16px",
            color: "#6A5757",
          },
        },
      }),
    },
  },

  globalStyles: (theme: MantineTheme) => ({
    "h1,h2,h3,h4,h5,h6": {
      margin: "0 0 1.2em",
    },

    p: {
      margin: "0 0 1.2em",
    },

    a: {
      transition: "0.3s ease",
    },

    'a:not([type="button"])': {
      color: theme.colors.red,
      textDecoration: "none",
      transition: "0.3s ease",

      "&:hover": {
        // color: theme.fn.darken(theme.colors.red, 0.05),
        color: theme.fn.darken("#CB3E19", 0.05),
        textDecoration: "underline",
      },
    },

    button: {
      fontFamily: "Plus Jakarta Sans, sans-serif",
      transition: "0.3s ease",
    },

    label: {
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },

    ".link-underline": {
      textDecoration: "underline",

      "&:hover": {
        textDecoration: "none",
      },
    },

    // ".mantine-Button-root": {
    //   backgroundColor: theme.colors.orange,
    //   fontSize: "14px",
    //   lineHeight: 1.428,
    //   fontWeight: 500,
    //   color: theme.colors.brown,

    //   "&:hover": {
    //     backgroundColor: theme.fn.darken(theme.colors.orange, 0.1),
    //   },
    // },

    ".mantine-InputWrapper-error": {
      color: "#CB3E19",
    },

    ".tel-input": {
      ".react-tel-input": {
        fontFamily: "Plus Jakarta Sans, sans-serif",
      },
    },
  }),
};

export default ThemeStyle;
