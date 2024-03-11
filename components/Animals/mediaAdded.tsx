import { createStyles, Box, Button, Checkbox, TextInput } from "@mantine/core";
import Image from "next/image";
import VideoPlayer from "../videoplayer";
import { useState } from "react";

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
const MediaAdded = (props) => {
  console.log("props",props);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const toggleVideoModal = () => {
    setIsVideoOpen(!isVideoOpen);
  };
  const { classes } = useStyles();
  return (
    props?.mediaArray?.map((media, index) =>{
      return (
      <Box className={classes.mediaCard} key={index} >
      <Box className={classes.imageWrap}>
        <Button className={classes.close} onClick={() => props.clearFile(index)}>
          <Image
            src="icon-close-transparent.svg"
            width={18}
            height={18}
            alt="close"
          />
        </Button>
        {media && media.type === "video/mp4" && (
          <Box className="img-wrap">
            <div className="img">
              <video
                src={URL.createObjectURL(media?.file)}
                width={341}
                height={224}
              />
            </div>
            <Button className="btn-play" onClick={toggleVideoModal}>
              <Image
                src="/icon-play.svg"
                width={22}
                height={24}
                alt="icon play"
              />
            </Button>
            <VideoPlayer
              videoSrc={URL.createObjectURL(media?.file)}
              isVideoOpen={isVideoOpen}
              toggleVideoModal={toggleVideoModal}
            />
          </Box>
        )}
        <Image
          src={URL.createObjectURL(media.file)}
          width={341}
          height={224}
          alt="father animal"
          className={classes.image}
        />
      </Box>
      <Box component="span">
          <TextInput
            placeholder="Caption(Optional)"
            label="Caption(Optional)"
            mb="18px"
            onChange={(e) => media.caption = e.target.value}
          />
      </Box>
      <Checkbox 
        checked={media.isCover}
        label="Make cover image" 
        onChange={(event) => {
            media.isCover = event.currentTarget.checked;
            const newimages = [...props?.mediaArray];
            newimages?.map((mdia, i) =>{
              if (index === i) newimages[i].isCover = true;
              else newimages[i].isCover = false;
            })
            props.setMediaFiles(newimages);
          }
        }
      />
      </Box>
      );
    })
  )
};

export default MediaAdded;
