import { Box, createStyles, Modal } from "@mantine/core";
import { useEffect, useRef } from "react";

interface videoPlayerProps {
  videoSrc: string;
  isVideoOpen: boolean;
  toggleVideoModal: () => void;
}

const useStyles = createStyles((theme) => ({
  videoPlayer: {
    "& .mantine-Modal-content": {
      [theme.fn.largerThan("lg")]: {
        minWidth: "800px",
      },
    },

    "& .video-wrap": {
      position: "relative",
      paddingTop: "56.25%",

      "& video": {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
  },
}));

const VideoPlayer: React.FC<videoPlayerProps> = ({
  videoSrc,
  isVideoOpen,
  toggleVideoModal,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { classes } = useStyles();

  useEffect(() => {
    if (isVideoOpen) {
      // Start playing the video when the modal is opened
      if (videoRef.current) {
        videoRef.current.play();
      }
    } else {
      // Pause the video when the modal is closed
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isVideoOpen]);

  return (
    <Modal
      opened={isVideoOpen}
      onClose={toggleVideoModal}
      className={`video-player ${classes.videoPlayer}`}
    >
      <Box className="video-wrap">
        <video ref={videoRef} controls autoPlay width="400" src={videoSrc} />
      </Box>
    </Modal>
  );
};

export default VideoPlayer;
