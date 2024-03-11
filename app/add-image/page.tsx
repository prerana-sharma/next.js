"use client";
import { Box, Button, Container, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import Back from "../../components/btnBack";
import ImageAdded from "../../components/Animals/imageAdded";

const AddImage = () => {
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="add-animal-block"
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          <Back href="/user-profile" />

          <Box
            sx={(theme) => ({
              position: "relative",

              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                maxWidth: "571px",
              })}
            >
              <Title order={2} size="h2" mb="14px" color="#45110B">
                Add New
              </Title>
              <ImageAdded />
              <Button className="btn-outline" size="lg" fullWidth mb="30px">
                Add new Image
              </Button>
              <Button size="lg" fullWidth>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddImage;
