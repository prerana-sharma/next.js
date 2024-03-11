"use client";
import { useState, useEffect, useRef } from "react";
import {
  createStyles,
  Box,
  Container,
  Grid,
  Title,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Back from "../../components/btnBack";

const useStyles = createStyles((theme) => ({
  banner: {
    position: "relative",
    paddingTop: "400px",
    marginBottom: "18px",

    [theme.fn.smallerThan("md")]: {
      margin: "0 -16px 20px",
    },

    "& .banner-img": {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
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
    fontSize: "12px",
    lineHeight: 1.42857,
    maxHeight: "55px",
    lineClamp: 2,

    [theme.fn.largerThan("sm")]: {
      maxHeight: "62px",
    },
  },

  previewDetail: {},

  editButton: {
    border: "1px solid #E9E1D5",
    background: "#fff",
    borderRadius: "8px",
    padding: "5px",
    // marginLeft: "10px",

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

const AddAnimalPreview = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="add-animal-preview"
    >
      <Container size="lg">
        <Box className={classes.banner}>
          <Box>
            <Image
              src="/img-animal1.jpg"
              width={1280}
              height={400}
              alt="image description"
              className="banner-img"
            />
            <Box component="span" className={classes.imageCaption}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo a
              habitant libero, sed scelerisque commodo a.
            </Box>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              left: "0",
              padding: "49px 18px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="a"
              href="#"
              onClick={open}
              className={classes.editButton}
            >
              <Image
                src="/arrow-back-red.svg"
                width={24}
                height={24}
                alt="edit"
                style={{ width: "auto" }}
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
            <Button className="btn-outline" size="lg" fullWidth onClick={close}>
              Cancel
            </Button>
          </Box>
        </Modal>
        <Box className={classes.previewDetail}>
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            })}
          >
            <Title order={1} size="h1" color="#45110B">
              5 Bengal Kittens
            </Title>
            <Title order={2} size="h2" fw={500} color="#CB3E19" pt="5px">
              $1234
            </Title>
          </Box>
          <Box>
            <ul className="detail-category-lists">
              <li>Bengal</li>
              <li>Cat</li>
              <li>Female</li>
            </ul>
          </Box>

          <Box className={classes.user}>
            <Image src="/img-user2.jpg" width={39} height={39} alt="user" />
            <Box>Nolan Phillips</Box>
          </Box>

          <Button
            component="a"
            href="/livestock-payment"
            fullWidth
            size="lg"
            mb="18px"
          >
            Confirm and pay for listing
          </Button>

          <Box className="about-animal" sx={{ marginBottom: "15px" }}>
            <Title order={3} size="h4" color="#45110B" mb="6px">
              About
            </Title>
            <Box component="p" sx={{ margin: "0 0 25px" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus
              tortor enim malesuada ultrices semper blandit cum elementum. Eget
              justo maecenas nisi accumsan, enim magna massa cum tortor. In nisl
              dignissim leo in nulla proin nibh.
            </Box>

            <Title order={3} size="h4" color="#45110B" mb="6px">
              Enquiry Preference
            </Title>
            <Box component="p" sx={{ margin: "0" }}>
              Email :
              <Link
                href="mailto:enquiry1234@gmail.com"
                style={{ color: "#000" }}
              >
                enquiry1234@gmail.com
              </Link>
            </Box>
          </Box>

          <ul className="lists">
            <li>
              <span className="title">Animal ID</span>
              <span className="desc">
                <Link href="#">#5164161461</Link>
              </span>
            </li>
            <li>
              <span className="title">Age</span>
              <span className="desc">01/01/22(1 Year)</span>
            </li>
            <li>
              <span className="title">Gender</span>
              <span className="desc">Female</span>
            </li>
            <li>
              <span className="title">Microchip</span>
              <span className="desc">12223884</span>
            </li>
          </ul>

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

          <Box className={classes.animalLocation} sx={{ marginBottom: "15px" }}>
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
      </Container>
    </Box>
  );
};

export default AddAnimalPreview;
