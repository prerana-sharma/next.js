"use client";
import {
  createStyles,
  Container,
  Box,
  Title,
  Tabs,
  Button,
  Grid,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import UserNoAnimals from "../../components/userNoAnimals";
import Animals from "../../components/Animals/animals";
import UserAboutInfo from "../../components/Animals/UserAboutInfo";
import MediaSlider from "../../components/Animals/mediaSlider";
import AnimalsForSale from "../../components/Animals/animalsForSale";
import UserNoAnimalsPhoto from "../../components/userNoAnimalsPhoto";

const useStyles = createStyles((theme) => ({
  bannerImage: {
    width: "100%",
    objectFit: "cover",

    [theme.fn.smallerThan("sm")]: {
      height: "200px",
    },
  },

  userImage: {
    borderRadius: "50%",
    marginRight: "20px",

    [theme.fn.smallerThan("sm")]: {
      width: "110px",
      height: "110px",
      marginBottom: "15px",
    },
  },

  userLogo: {
    position: "absolute",
    top: "60px",
    left: "50%",
    transform: "translatX(-50%)",

    [theme.fn.smallerThan("sm")]: {},
  },
}));

const UserProfile = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="user-profile-page"
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          <Box>
            <Image
              src="/user-banner.jpg"
              width={1164}
              height={403}
              alt="search banner image"
              className={classes.bannerImage}
            />
          </Box>

          <Box
            sx={(theme) => ({
              margin: "-40px 0 20px 15px",

              [theme.fn.largerThan("md")]: {
                display: "flex",
                margin: "-40px 0 20px 34px",
              },
            })}
          >
            <Image
              src="/img-user.jpg"
              width={144}
              height={144}
              alt="user profile"
              className={classes.userImage}
            />

            <Box
              sx={(theme) => ({
                [theme.fn.largerThan("md")]: {
                  marginTop: "45px",
                },
              })}
            >
              <Title order={1} size="32" color="#45110B" mb="5px">
                Nolan
              </Title>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  marginBottom: "5px",
                })}
              >
                <Image
                  src="./Location.svg"
                  width={16}
                  height={16}
                  alt="location"
                  style={{ margin: "3px 5px  0 0 " }}
                />
                <p style={{ marginBottom: 0 }}>Sydney NSW, Australia</p>
              </Box>
              <Box component="a" href="/edit-user">
                <Image
                  src="/icon-edit.svg"
                  width={24}
                  height={24}
                  alt="Edit Profile"
                />
                Edit Profile
              </Box>
            </Box>
          </Box>

          <Box className="user-profile-tabs">
            <Tabs defaultValue="animals">
              <Tabs.List>
                <Tabs.Tab value="animals">Pets</Tabs.Tab>
                <Tabs.Tab value="about">About</Tabs.Tab>
                <Tabs.Tab value="for-sale">For sale</Tabs.Tab>
                <Tabs.Tab value="photos">Photos </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="animals">
                <Animals />
              </Tabs.Panel>
              <Tabs.Panel value="about">
                <UserAboutInfo />
              </Tabs.Panel>
              <Tabs.Panel value="for-sale">
                <UserNoAnimals />
                <AnimalsForSale />
              </Tabs.Panel>
              <Tabs.Panel value="photos">
                <UserNoAnimalsPhoto />
                <Grid>
                  <Grid.Col span={12} md={6} mb="20px">
                    <MediaSlider />
                  </Grid.Col>
                  <Grid.Col span={12} md={6} mb="20px">
                    <MediaSlider />
                  </Grid.Col>
                  <Grid.Col span={12} md={6} mb="20px">
                    <MediaSlider />
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
