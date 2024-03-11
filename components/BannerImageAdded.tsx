import { createStyles, Box, Button, Checkbox } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  mediaCard: {
    marginBottom: "16px",
  },

  imageWrap: {
    overflow: "hidden",
    position: "relative",
  },

  image: {
    width: "100%",
  },

  close: {
    padding: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: "7px",
    right: "8px",
    height: "24px",
    width: "24px",
    border: "none",

    "&:hover": {
      backgroundColor: "rgba(203, 62, 25, 0.50)",
    },
  },
}));
const BannerImageAdded = (props) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.mediaCard}>
      <Box className={classes.imageWrap}>
        <Button className={classes.close} onClick={props.clearFile}>
          <Image
            src="icon-close-transparent.svg"
            width={18}
            height={18}
            alt="close"
          />
        </Button>
        <Image
          src={props.imageFile ? props.imageFile : "/img-father.jpg"}
          width={569}
          height={240}
          alt="image description"
          className={classes.image}
        />
      </Box>
    </Box>
  );
};

export default BannerImageAdded;
