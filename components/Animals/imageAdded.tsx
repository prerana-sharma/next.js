import {
  createStyles,
  Box,
  Button,
  Checkbox,
  Input,
  TextInput,
} from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  mediaCard: {
    marginBottom: "24px",
  },

  imageWrap: {
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "8px",
    position: "relative",
  },

  image: {
    width: "100%",
    height: "auto",
  },

  imageCaption: {
    backgroundColor: "#F6F4EF",
    border: "1px solid #BCB1A1",
    padding: "20px 14px",
    zIndex: 1,
    fontSize: "16px",
    fontWeight: 500,
    color: "#090909",
    display: "block",
    borderRadius: "16px",
    marginBottom: "8px",
  },

  imageCaptionInner: {
    maxWidth: "250px",

    [theme.fn.largerThan("md")]: {
      maxWidth: "80%",
    },
  },

  close: {
    padding: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: "9px",
    right: "11px",
    height: "24px",
    width: "24px",
    border: "none",

    "&:hover": {
      backgroundColor: "rgba(203, 62, 25, 0.50)",
    },
  },
}));
const ImageAdded = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.mediaCard}>
      <Box className={classes.imageWrap}>
        <Button className={classes.close}>
          <Image
            src="icon-close-transparent.svg"
            width={18}
            height={18}
            alt="close"
          />
        </Button>
        <Image
          src="/img-father.jpg"
          width={341}
          height={224}
          alt="father animal"
          className={classes.image}
        />
      </Box>
      <TextInput placeholder="Caption" mb="24px" />
      {/* <Box component="span" className={classes.imageCaption}>
        <Box
          className={classes.imageCaptionInner}
          sx={(theme) => ({ maxWidth: "250px" })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, vestibulum
          rutrum velit gravida.
        </Box>
      </Box> */}
    </Box>
  );
};

export default ImageAdded;
