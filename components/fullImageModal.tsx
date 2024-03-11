import { createStyles, Box, Button, Text, Title } from "@mantine/core";
import Image from "next/image";
import { FC, useState } from "react";

interface CustomModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const useStyles = createStyles((theme) => ({
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: 999,
  },
  modalOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(9,9,9,0.8)",
    opacity: 1,
    transition: "opacity 200ms ease",
  },
  modalInner: {
    position: "fixed",
    width: "100%",
    top: "0",
    bottom: "0",
    padding: "70px 20px",
    textAlign: "center",
    maxHeight: "100%",
  },
  modalContent: {
    maxHeight: "calc(100vh - 140px)",
    flex: "0 0 27.5rem",
    maxWidth: "100%",
    overflowY: "auto",
    display: "inline-block",
    // transformOrigin: "center center",
    // opacity: 1,
    // transform: "scale(1)",
  },
  modalImage: {
    // maxWidth: "100%",
    // height: "auto",
    maxHeight: "calc(100vh - 140px)",
    width: "100%",
    height: "100%",
  },
  modalActions: {
    position: "absolute",
    top: "8px",
    right: "20px",
  },
  infoDetail: {
    position: "absolute",
    top: "48px",
    right: "0",
    padding: "20px",
    borderRadius: "16px",
    background: "#fff",
    width: "320px",
    textAlign: "left",
    [theme.fn.largerThan("sm")]: {
      width: "383px",
    },
  },
  listText: {
    padding: "16px 0",
    display: "flex",
  },
  img: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    marginRight: "16px",
  },
}));

const FullImageModal: FC<CustomModalProps> = ({
  isOpen,
  onClose,
  //   children,
  ...rest
}) => {
  const { classes } = useStyles();
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };
  const closeModal = () => {
    setOpenDropdown(false);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className={`${classes.modal} modal`} {...rest}>
      <Box></Box>
      <div
        className={`${classes.modalOverlay} modal-overlay`}
        // onClick={onClose}
      >
        <div className={`${classes.modalInner} modal-inner`}>
          <div className={`modal-actions ${classes.modalActions}`}>
            <ul className="user-action-lists">
              <li>
                {openDropdown ? (
                  <Button
                    className={`btn-icon`}
                    onClick={toggleDropdown}
                    leftIcon={
                      <Image
                        src="/icon-about-info.svg"
                        width={24}
                        height={24}
                        alt="info"
                      />
                    }
                  >
                    Info
                  </Button>
                ) : (
                  <Button
                    className={`btn-icon`}
                    onClick={toggleDropdown}
                    leftIcon={
                      <Image
                        src="/icon-Info.svg"
                        width={24}
                        height={24}
                        alt="info"
                      />
                    }
                  >
                    Info
                  </Button>
                )}

                {openDropdown && (
                  <div className={`info-detail ${classes.infoDetail}`}>
                    <ul className="user-info-detail-lists">
                      <li>
                        <Text fz="sm" color="#6A5757">
                          Uploaded by
                        </Text>
                        <Box className={classes.listText}>
                          <Image
                            src="/img-user2.jpg"
                            width={46}
                            height={46}
                            alt="user image"
                            className={classes.img}
                          />
                          <Box>
                            <Title order={5} size="h5" color="#45110B" mb="8px">
                              Nolan Philips
                            </Title>
                            <ul className="date-list">
                              <li>01/01/22 </li>
                              <li>12:01pm</li>
                            </ul>
                          </Box>
                        </Box>
                      </li>
                      <li>
                        <Text fz="sm" color="#6A5757">
                          Details
                        </Text>
                        <Box className={classes.listText}>
                          <Box mr="16px">
                            <Image
                              src="/img.svg"
                              width={24}
                              height={24}
                              alt="image"
                            />
                          </Box>
                          <Box>
                            <Title
                              order={6}
                              size="h6"
                              color="#45110B"
                              mb="8px"
                              mt="5px"
                            >
                              Image name_kittycat.jpeg
                            </Title>
                            <Text className="#6A5757" fz="xs">
                              1000x1500
                            </Text>
                          </Box>
                        </Box>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Button
                  className="btn-icon"
                  leftIcon={
                    <Image
                      src="/Share.svg"
                      width={24}
                      height={24}
                      alt="share"
                    />
                  }
                >
                  Share
                </Button>
              </li>
              <li>
                <Button
                  className="btn-icon"
                  onClick={closeModal}
                  leftIcon={
                    <Image
                      src="/icon-close.svg"
                      width={24}
                      height={24}
                      alt="close"
                    />
                  }
                >
                  Close
                </Button>
              </li>
            </ul>
          </div>
          <div
            className={`${classes.modalContent} modal-content`}
            style={{
              transitionProperty: "transform, opacity",
              transitionDuration: "200ms",
              transitionTimingFunction: "ease",
              transformOrigin: "center center",
              opacity: 1,
              transform: "scale(1)",
            }}
          >
            {/* {children} */}
            <Image
              src="/img-chat.png"
              width={535}
              height={1024}
              alt="image description"
              className={classes.modalImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullImageModal;
