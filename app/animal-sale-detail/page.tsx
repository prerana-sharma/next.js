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
      "& img": {
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

  user: {
    display: "flex",
    alignItems: "center",
    color: "#6A5757",
    fontSize: "14px",
    lineHeight: 1.428571,
    marginBottom: "26px",

    "& img": {
      width: "39px",
      height: "39px",
      borderRadius: "50%",
      marginRight: "5px",
    },
  },

  animalParent: {
    "& .img-wrap": {
      position: "relative",
      paddingTop: "96%",
      borderRadius: "8px",
      marginBottom: "3px",
      overflow: "hidden",
    },

    "& img": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    "& .text-wrap": {
      "& p": {
        fontSize: "14px",
        lineHeight: 1.428571,
        color: "#6A5757",
        margin: 0,
      },
    },
  },

  animalLocation: {
    "& .location": {
      display: "flex",
      alignItems: "center",
      color: "#6A5757",
      fontSize: "14px",
      lineHeight: 1.428571,
      marginBottom: "12px",
    },

    "& img": {
      maxWidth: "100%",
    },
  },
}));

const AnimalSaleDetail = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [isLiked, setIsLiked] = useState(false);
  const [nav1, setNav1] = useState<Slider>();
  const [nav2, setNav2] = useState<Slider>();
  const slider1 = useRef<any>();
  const slider2 = useRef<any>();

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
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
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
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: false,
                    },
                  }}
                >
                  <Slider {...slider1Settings} className="animal-detail-slider">
                    <div>
                      <Box className={classes.slideWrap}>
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
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <Box className={classes.slideWrap}>
                        <Image
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <Box className={classes.slideWrap}>
                        <Image
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <Box className={classes.slideWrap}>
                        <Image
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <Box className={classes.slideWrap}>
                        <Image
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <Box className={classes.slideWrap}>
                        <Image
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                    <div>
                      <Box className={classes.slideWrap}>
                        <Image
                          src="/img-animal-detail1.jpg"
                          alt="image description"
                          width={690}
                          height={607}
                          data-fancybox="gallery"
                        />
                        <Box component="span" className={classes.imageCaption}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Commodo a habitant libero, sed scelerisque
                          commodo a.
                        </Box>
                      </Box>
                    </div>
                  </Slider>
                </Fancybox>
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
                  <div>
                    <Box className="img-wrap">
                      <Image
                        src="/img-sub-animal1.jpg"
                        width={217}
                        height={211}
                        alt="sub animal"
                      />
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
                  <div>
                    <Box className="img-wrap">
                      <Image
                        src="/img-sub-animal1.jpg"
                        width={217}
                        height={211}
                        alt="sub animal"
                      />
                    </Box>
                  </div>
                </Slider>
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
              <Title order={2} size="h2" fw={500} color="#CB3E19" mb="25px">
                $1234
              </Title>
              <Box className={classes.user}>
                <Image src="/img-user2.jpg" width={39} height={39} alt="user" />
                <Box>Nolan Phillips</Box>
              </Box>

              <Box className="about-animal" sx={{ marginBottom: "15px" }}>
                <Title order={3} size="h4" color="#45110B" mb="6px">
                  About
                </Title>
                <Box component="p" sx={{ margin: "0" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tellus tortor enim malesuada ultrices semper blandit cum
                  elementum. Eget justo maecenas nisi accumsan, enim magna massa
                  cum tortor. In nisl dignissim leo in nulla proin nibh.
                </Box>
              </Box>

              <Title order={3} size="h4" color="#45110B" mb="6px">
                Parents
              </Title>
              <Grid sx={{ marginBottom: "23px !important" }}>
                <Grid.Col span={12} md={6} mb="23px">
                  <Box className={classes.animalParent}>
                    <Box className="img-wrap">
                      <Image
                        src="/img-animal2.jpg"
                        width={190}
                        height={173}
                        alt="Sire(Father)"
                      />
                    </Box>
                    <Box className="text-wrap">
                      <Title order={4} size="h6" color="#45110B" mb="1px">
                        Talan
                      </Title>
                      <Box component="p">Sire (Father)</Box>
                    </Box>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12} md={6}>
                  <Box className={classes.animalParent}>
                    <Box className="img-wrap">
                      <Image
                        src="/img-animal1.jpg"
                        width={190}
                        height={173}
                        alt="Sire(Father)"
                      />
                    </Box>
                    <Box className="text-wrap">
                      <Title order={4} size="h6" color="#45110B" mb="1px">
                        Marge
                      </Title>
                      <Box component="p">Dam (Mother)</Box>
                    </Box>
                  </Box>
                </Grid.Col>
              </Grid>

              <Box
                className={classes.animalLocation}
                sx={{ marginBottom: "15px" }}
              >
                <Title order={3} size="h4" color="#45110B" mb="6px">
                  Location
                </Title>
                <Box className="location">
                  <Image
                    src="/Location.svg"
                    width={16}
                    height={16}
                    alt="pin"
                    style={{ marginRight: "4px" }}
                  />
                  Sydney NSW, Australia
                </Box>
                <Image
                  src="/img-map.jpg"
                  width={401}
                  height={211}
                  alt="location map"
                />
              </Box>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default AnimalSaleDetail;
