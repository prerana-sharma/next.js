"use client";
import { Box, Button, Container, FileButton, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import Back from "../../components/btnBack";
import MediaAdded from "../../components/Animals/mediaAdded";
import { Message_data } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const AddMedia = () => {
  const router = useRouter();
  const [media, setMedia] = useState([]);
  const { message, setMessage } = useContext(Message_data);

  const clearFile = (ind) => {
    let newMedia = [...media];
    newMedia.splice(ind, 1);
    setMedia(newMedia);
  };

  const handleAddMedia = (files) =>{
     setMedia([...media,...files])
  }

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
          <Back href="/add-sales" />

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
                Add media
              </Title>
              {media?.length > 0 && (
                <MediaAdded mediaArray={media} clearFile={clearFile}/>
              )}
              <FileButton onChange={(payload)=> handleAddMedia(payload)} accept="image/png,image/jpeg" multiple >
              {(props) =>
                <Button {...props} className="btn-outline" size="lg" fullWidth mb="30px">
                  Add more media
                </Button>
              }
              </FileButton>
              <Button size="lg" fullWidth onClick={() => {setMessage(media); router.push('/add-sales')}}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddMedia;
