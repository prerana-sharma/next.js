import { FunctionComponent, useState } from "react";
import { createStyles, Box, Button, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SIGNED_URL } from "../lib/graphql/saved/queries";
import { SAVE_UNSAVE } from "../lib/graphql/saved/mutation";
import { showNotification } from "@mantine/notifications";

type breederCard = {
  _id?:string,
  image: string;
  firstName: string;
  lastName: string;
  address: any;
  isLiked: boolean;
  profileImage:string;
};

const useStyles = createStyles({
  animalImage: {
    borderRadius: "8px",
    marginBottom: "5px",
    maxWidth: "100%",
    height: "316",
    width: "100%",
  },
  imgWrap: {
    position: "relative",
  },
  textWrap: {
    padding: "0 6px 10px",
  },
  locationList: {
    display: "flex",
  },
});

const BreedersList: FunctionComponent<{ breeder: breederCard, refetchSavedBreeders?:() => Promise<any> }> = ({
    breeder,
    refetchSavedBreeders
}) => {
  const { firstName, lastName, isLiked, address, profileImage, _id:breederId } = breeder;
  const [image, setImage] = useState(breeder.image);
  useQuery(GET_SIGNED_URL, {
    variables: { 
      key:profileImage ? profileImage :"" 
    },
    onCompleted: (data) => {
      if (data?.FetchGetPresignedUrl) {
        setImage(data?.FetchGetPresignedUrl?.url);
      }
    },
  });
  const handleRemoveSaved = async() =>{
    await removeSavedBreeders()
  }

  const [removeSavedBreeders, { data, loading, error }] = useMutation(
    SAVE_UNSAVE,
    {
      variables: {
        payload: {
          _id: breederId,
          item:"breeders",
          saveAction: "UNSAVE"
        }
      },
      onCompleted: (data) => {
        showNotification({
          message: "Breeder removed successfully.",
          title: "Success!",
          color: "green",
        });
        refetchSavedBreeders();
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
              alt="Breeder"
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
        {firstName && (
          <Title order={3} size="h3" color="#45110B" mb="4px">
            <Link href="/animal-sale-detail">{`${firstName} ${lastName}`}</Link>
          </Title>
        )}
				{address && (
					<Box className={classes.locationList}>
					<Image
					src="./icon-about-location.svg"
					width={24}
					height={24}
					alt="info"
					/>
					<Box className="location">
					<Box component="p">
						{`${address?.fullAddress ? address?.fullAddress :''}, 
						${address?.state ? address?.state : ''} 
						${address?.postCode ? address?.postCode :''}`}</Box>
					</Box>
        </Box>
				)}
      </Box>
    </Box>
  );
};

export default BreedersList;
