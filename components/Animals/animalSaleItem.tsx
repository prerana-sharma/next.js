import { FunctionComponent, useEffect, useState } from "react";
import { createStyles, Box, Button, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { GET_SIGNED_URL } from "../../lib/graphql/saved/queries";
import { useMutation, useQuery } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { SAVE_UNSAVE } from "../../lib/graphql/saved/mutation";

type animalCard = {
  _id?:string,
  image: string;
  listingName: string;
  gender: string;
  breed: string;
  animalType: string;
  isLiked: boolean;
  media?:any;
  refetchSavedAnimals?:() => Promise<any>;
};

const useStyles = createStyles({
  animalImage: {
    borderRadius: "8px",
    marginBottom: "5px",
    maxWidth: "100%",
    height: "316px",
    width: "100%",
  },
  imgWrap: {
    position: "relative",
  },
  textWrap: {
    padding: "0 6px 10px",
  },
});

const AnimalSaleItem: FunctionComponent<{ animal: animalCard, refetchSavedAnimals?:() => Promise<any> }> = ({
  animal,
  refetchSavedAnimals
}) => {
  const { listingName:name, gender, breed, animalType:type, isLiked, _id:animalId } = animal;
  const [image, setImage] = useState(animal.image);
  const { data: dataUrl } = useQuery(GET_SIGNED_URL, {
    variables: { 
      key:animal?.media?.[0]?.file ? animal?.media?.[0]?.file :"" 
    },
    onCompleted: (data) => {
      if (data?.FetchGetPresignedUrl) {
        setImage(data?.FetchGetPresignedUrl?.url);
      }
    },
  });

  useEffect(()=>{
    if (dataUrl?.FetchGetPresignedUrl) {
      setImage(dataUrl?.FetchGetPresignedUrl?.url);
    }
  },[dataUrl])

  const handleRemoveSaved = async() =>{
    await removeSavedAnimal()
  }

  const [removeSavedAnimal, { data, loading, error }] = useMutation(
    SAVE_UNSAVE,
    {
      variables: {
        payload: {
          _id: animalId,
          item:"animals",
          saveAction: "UNSAVE"
        }
      },
      onCompleted: (data) => {
        showNotification({
          message: "Animal removed successfully.",
          title: "Success!",
          color: "green",
        });
        refetchSavedAnimals();
      },
      onError: (error) => {
        showNotification({
					message: error.message,
					title: "Error!",
					color: "red",
				});
      },
    }
  );

  const { classes } = useStyles();
  return (
    <Box className="animal-sale-item">
      {image && (
        <Box className={classes.imgWrap}>
          <Link href="/animal-sale-detail">
            <Image
              src={image}
              width={373}
              height={316}
              alt="Animal"
              className={classes.animalImage}
            />
          </Link>
          <Button className="btn-liked bg-transparent" onClick={handleRemoveSaved}>
            <Image
              src={`${
                isLiked
                  ? "/icon-heart-filled-without-space.svg"
                  : "/icon-heart-without-space.svg"
              }`}
              width={24}
              height={24}
              alt="heart"
            />
          </Button>
        </Box>
      )}

      <Box className={classes.textWrap}>
        {name && (
          <Title order={3} size="h3" color="#45110B" mb="4px">
            <Link href="/animal-sale-detail">{name}</Link>
          </Title>
        )}
        <Box
          component="span"
          sx={(theme) => ({
            display: "block",
          })}
        >
          {breed} | {type}
        </Box>
        {gender && <Box component="span">{gender}</Box>}
      </Box>
    </Box>
  );
};

export default AnimalSaleItem;
