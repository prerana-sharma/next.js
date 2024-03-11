import { createStyles, Box, Button } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles({
  imageCaption: {
    backgroundColor: "rgba(233, 225, 213, 0.90)",
    padding: "4px 8px",
    borderRadius: "0 8px 0 0",
    position: "absolute",
    bottom: "0",
    left: 0,
    zIndex: 1,
    fontSize: "14px",
    fontWeight: 600,
    color: "#45110B",
  },

  imageWrap: {
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "20px",
    position: "relative",
  },

  close: {
    padding: 0,
    backgroundColor: "transparent",
    position: "absolute",
    top: "9px",
    right: "11px",
    height: "18px",
    width: "18px",
    border: "none",
  },
});
const AnimalAdded = (props) => {
  const { classes } = useStyles();
  return (
    props?.file && (
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
          src={URL.createObjectURL(props.file)}
          width={572}
          height={218}
          alt="father animal"
        />
        <Box component="span" className={classes.imageCaption}>
          {`Fred - ${props.type === "Sire" ? 'Sire/Father' : 'Dam/Mother'}`}
        </Box>
      </Box>
    )
  );
};

export default AnimalAdded;
