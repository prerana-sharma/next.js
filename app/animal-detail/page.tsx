"use client";
import { useState, useEffect, useRef } from "react";
import {
  createStyles,
  Box,
  Container,
  Grid,
  Tabs,
  Title,
  Modal,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import Back from "../../components/btnBack";
import Fancybox from "../../components/fancybox";
import VideoPlayer from "../../components/videoplayer";

const useStyles = createStyles((theme) => ({
  colSlider: {
    [theme.fn.largerThan("md")]: {
      paddingRight: "2 0px",
    },
    [theme.fn.largerThan("lg")]: {
      paddingRight: "78px",
    },

    "& .img-wrap": {
      position: "relative",
      borderRadius: "8px",
      overflow: "hidden",
      paddingTop: "94%",
      "& > img": {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100% !important",
        objectFit: "cover",
      },
    },
  },

  slideWrap: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    paddingTop: "94%",

    "& .btn-liked": {
      "& img": {
        position: "static",
        width: "auto",
        height: "auto !important",
      },
    },

    "& img": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100% !important",
      objectFit: "cover",
    },
  },

  imageCaption: {
    backgroundColor: "#E9E1D5",
    position: "absolute",
    left: 0,
    bottom: 0,
    color: "#45110B",
    padding: "11px 17px",
    fontSize: "14px",
    lineHeight: 1.42857,
    maxHeight: "55px",
    lineClamp: 2,

    [theme.fn.largerThan("sm")]: {
      maxHeight: "62px",
    },
  },

  vlaImageWrap: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
    paddingTop: "94%",

    "& img": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },

  vlaImageCaption: {
    backgroundColor: "#E9E1D5",
    position: "absolute",
    left: 0,
    bottom: 0,
    color: "#45110B",
    padding: "2px 8px",
    fontSize: "14px",
    lineHeight: 1.21428,
    borderTopRightRadius: "8px",
  },

  colDetail: {
    [theme.fn.largerThan("lg")]: {
      marginLeft: "-26px",
    },
  },

  editButton: {
    border: "1px solid #E9E1D5",
    borderRadius: "8px",
    padding: "5px",
    marginLeft: "10px",

    "&:hover": {
      backgroundColor: "#FE8D0E",
      borderColor: "#FE8D0E",
    },
  },
}));

const images = [
  {
    image: "/img-animal-detail1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo a habitant libero, sed scelerisque commodo a.",
  },
  {
    image: "/img-animal2.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo a habitant libero, sed scelerisque commodo a.",
  },
  {
    image: "/img-animal3.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo a habitant libero, sed scelerisque commodo a.",
  },
];

const AnimalDetail = () => {
  const videoSrc = "/media/test-video.mp4";
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLiked, setIsLiked] = useState(false);
  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();
  const slider1 = useRef<any>();
  const slider2 = useRef<any>();
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  const toggleVideoModal = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const slider1Settings = {
    asNavFor: nav2,
    ref: slider1,
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slider2Settings = {
    asNavFor: nav1,
    ref: slider2,
    // infinite: false,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  const openLightbox = (index: number) => {
    // console.log(index);

    setCurrentIndex(index);
    setLightboxIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentIndex(0);
    setLightboxIsOpen(false);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="animal-detail"
    >
      <Container size="lg">
        <Back href="/user-profile" />

        <Grid>
          <Grid.Col span={12} md={7} lg={8}>
            <Box className={classes.colSlider}>
              <Box mb="32px">
                {images && (
                  <Fancybox
                    options={{
                      Carousel: {
                        infinite: false,
                      },
                    }}
                  >
                    <Slider
                      {...slider1Settings}
                      className="animal-detail-slider"
                    >
                      {images?.map((img, index) => {
                        const { image, description } = img;
                        return (
                          <div key={index}>
                            <Box
                              className={classes.slideWrap}
                              // onClick={() => openLightbox(index)}
                            >
                              <Button className="btn-liked">
                                <Image
                                  src={`${
                                    isLiked
                                      ? "icon-heart-filled.svg"
                                      : "icon-heart.svg"
                                  }`}
                                  width={24}
                                  height={24}
                                  alt="heart"
                                />
                              </Button>
                              <Image
                                src={image}
                                alt="image description"
                                width={690}
                                height={607}
                                data-fancybox="gallery"
                              />
                              {description && (
                                <Box
                                  component="span"
                                  className={classes.imageCaption}
                                >
                                  {description}
                                </Box>
                              )}
                            </Box>
                          </div>
                        );
                      })}
                    </Slider>
                  </Fancybox>
                )}

                {/* <Modal opened={lightboxIsOpen} onClose={closeLightbox}>
                  <Image
                    src={images[currentIndex].image}
                    alt="image description"
                    width={690}
                    height={607}
                    style={{
                      maxHeight: "calc(100vh - 140px)",
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  {images && (
                    <Slider
                      {...slider1Settings}
                      className="animal-detail-slider"
                    >
                      {images?.map((img, index) => {
                        const { image } = img;
                        return (
                          <div key={index}>
                            <Box className={classes.slideWrap}>
                              <Image
                                src={image}
                                alt="image description"
                                width={690}
                                height={607}
                              />
                            </Box>
                          </div>
                        );
                      })}
                    </Slider>
                  )}
                </Modal> */}
                <Slider
                  infinite={false}
                  {...slider2Settings}
                  className="animal-detail-slider-nav"
                >
                  <div>
                    <Box className="img-wrap">
                      <Image
                        src="/img-sub-animal1.jpg"
                        width={217}
                        height={211}
                        alt="sub animal"
                      />

                      <Button className="btn-play" onClick={toggleVideoModal}>
                        <Image
                          src="/icon-play.svg"
                          width={22}
                          height={24}
                          alt="icon play"
                        />
                      </Button>
                    </Box>
                  </div>
                  <div>
                    <Box className="img-wrap">
                      <Image
                        src="/img-sub-animal2.jpg"
                        width={217}
                        height={211}
                        alt="sub animal"
                      />
                    </Box>
                  </div>
                  <div>
                    <Box className="img-wrap">
                      <Image
                        src="/img-sub-animal3.jpg"
                        width={217}
                        height={211}
                        alt="sub animal"
                      />
                    </Box>
                  </div>
                </Slider>

                <VideoPlayer
                  videoSrc={videoSrc}
                  isVideoOpen={isVideoOpen}
                  toggleVideoModal={toggleVideoModal}
                />
              </Box>
            </Box>
          </Grid.Col>

          <Grid.Col span={12} md={5} lg={4}>
            <Box className={classes.colDetail}>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "12px",
                })}
              >
                <Title order={1} size="h1" color="#45110B">
                  Marge
                </Title>

                <Box sx={{ display: "flex" }}>
                  <Box component="a" href="#" className={classes.editButton}>
                    <Image
                      src="/icon-share.svg"
                      width={24}
                      height={24}
                      alt="Share"
                    />
                  </Box>
                  <Box component="a" href="#" className={classes.editButton}>
                    <Image
                      src="/icon-heart.svg"
                      width={24}
                      height={24}
                      alt="heart"
                    />
                  </Box>

                  <Box
                    component="a"
                    href="#"
                    onClick={open}
                    className={classes.editButton}
                  >
                    <Image
                      src="/Edit.svg"
                      width={24}
                      height={24}
                      alt="edit"
                      style={{ width: "auto" }}
                    />
                  </Box>
                </Box>

                <Modal
                  opened={opened}
                  onClose={close}
                  title="Making Changes"
                  className="modal-large"
                >
                  <Box>
                    <Box component="p">
                      Warning ipsum dolor sit amet, consectetur adipiscing elit.
                    </Box>

                    <Button size="lg" mb="24px" fullWidth>
                      Make private
                    </Button>
                    <Button
                      className="btn-outline"
                      size="lg"
                      fullWidth
                      onClick={close}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Modal>
              </Box>
              <Box>
                <ul className="detail-category-lists">
                  <li>Bengal</li>
                  <li>Cat</li>
                  <li>Female</li>
                </ul>
              </Box>

              <Tabs defaultValue="about">
                <Tabs.List>
                  <Tabs.Tab value="about">About</Tabs.Tab>
                  <Tabs.Tab value="vla">VLA (visual linage)</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="about">
                  <Box>
                    <Box component="p">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Tellus tortor enim malesuada ultrices semper blandit cum
                      elementum. Eget justo maecenas nisi accumsan, enim magna
                      massa cum tortor. In nisl dignissim leo in nulla proin
                      nibh.
                    </Box>

                    <ul className="lists">
                      <li>
                        <span className="title">Age</span>
                        <span className="desc">01/01/22(3 Months)</span>
                      </li>
                      <li>
                        <span className="title">Gender</span>
                        <span className="desc">Female</span>
                      </li>
                      <li>
                        <span className="title">Microchip</span>
                        <span className="desc">12223884</span>
                      </li>
                      <li>
                        <span className="title">Genetic reports</span>
                        <span className="desc">
                          <ul>
                            <li>
                              <Link href="#">Genetic 2022</Link>
                            </li>
                            <li>
                              <Link href="#">Genetic 2023</Link>
                            </li>
                          </ul>
                        </span>
                      </li>
                      <li>
                        <span className="title">Awards/ Achievements</span>
                        <span className="desc">
                          <ul>
                            <li>
                              <Link href="#">Grand Champion 2022</Link>
                            </li>
                            <li>
                              <Link href="#">Distinguished Merit 2021</Link>
                            </li>
                            <li>
                              <Link href="#">Distinguished Merit 2020</Link>
                            </li>
                          </ul>
                        </span>
                      </li>
                      <li>
                        <span className="title">Special mention</span>
                        <span className="desc">
                          <ul>
                            <li>
                              <Link href="#">Exaple award one</Link>
                            </li>
                          </ul>
                        </span>
                      </li>
                    </ul>
                  </Box>
                </Tabs.Panel>
                <Tabs.Panel value="vla">
                  <Box>
                    <Title order={4} size="h4" color="#45110B" mb="24px">
                      VLA (visual linage)
                    </Title>

                    <Box>
                      <Grid className="family-grid1">
                        <Grid.Col span={12}>
                          <Box className={classes.vlaImageWrap}>
                            <Link href="#">
                              <Image
                                src="/img-vla1.jpg"
                                width={403}
                                height={202}
                                alt="animal"
                              />
                              <Box
                                component="strong"
                                className={classes.vlaImageCaption}
                              >
                                Talan-Current
                              </Box>
                            </Link>
                          </Box>
                        </Grid.Col>
                      </Grid>
                      <Grid className="family-tree family-grid2">
                        <Grid.Col span={6}>
                          <Box className={classes.vlaImageWrap}>
                            <Link href="#">
                              <Image
                                src="/img-vla2.jpg"
                                width={195}
                                height={202}
                                alt="sire"
                              />
                              <Box
                                component="strong"
                                className={classes.vlaImageCaption}
                              >
                                Fred-Sire <span>(Father)</span>
                              </Box>
                            </Link>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Box className={classes.vlaImageWrap}>
                            <Link href="#">
                              <Image
                                src="/img-vla3.jpg"
                                width={195}
                                height={202}
                                alt="dam"
                              />
                              <Box
                                component="strong"
                                className={classes.vlaImageCaption}
                              >
                                Daphne-Dam <span>(Mother)</span>
                              </Box>
                            </Link>
                          </Box>
                        </Grid.Col>
                      </Grid>
                      <Grid className="family-grid3">
                        <Grid.Col span={6}>
                          <Box>
                            <Grid className="family-tree">
                              <Grid.Col span={6}>
                                <Box className={classes.vlaImageWrap}>
                                  <Link href="#">
                                    <Image
                                      src="/img-vla4.jpg"
                                      width={92}
                                      height={127}
                                      alt="Grand sire"
                                    />
                                    <Box
                                      component="strong"
                                      className={classes.vlaImageCaption}
                                    >
                                      Grand Sire
                                    </Box>
                                  </Link>
                                </Box>
                              </Grid.Col>
                              <Grid.Col span={6}>
                                <Box className={classes.vlaImageWrap}>
                                  <Link href="#">
                                    <Image
                                      src="/img-vla5.jpg"
                                      width={92}
                                      height={127}
                                      alt="Grand dam"
                                    />
                                    <Box
                                      component="strong"
                                      className={classes.vlaImageCaption}
                                    >
                                      Grand Dam
                                    </Box>
                                  </Link>
                                </Box>
                              </Grid.Col>
                            </Grid>
                          </Box>
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Box>
                            <Grid className="family-tree">
                              <Grid.Col span={6}>
                                <Box className={classes.vlaImageWrap}>
                                  <Link href="#">
                                    <Image
                                      src="/img-vla6.jpg"
                                      width={92}
                                      height={127}
                                      alt="Grand sire"
                                    />
                                    <Box
                                      component="strong"
                                      className={classes.vlaImageCaption}
                                    >
                                      Grand Sire
                                    </Box>
                                  </Link>
                                </Box>
                              </Grid.Col>
                              <Grid.Col span={6}>
                                <Box className={classes.vlaImageWrap}>
                                  <Link href="#">
                                    <Image
                                      src="/img-vla7.jpg"
                                      width={92}
                                      height={127}
                                      alt="Grand dam"
                                    />
                                    <Box
                                      component="strong"
                                      className={classes.vlaImageCaption}
                                    >
                                      Grand Dam
                                    </Box>
                                  </Link>
                                </Box>
                              </Grid.Col>
                            </Grid>
                          </Box>
                        </Grid.Col>
                      </Grid>
                    </Box>
                  </Box>
                </Tabs.Panel>
              </Tabs>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default AnimalDetail;
