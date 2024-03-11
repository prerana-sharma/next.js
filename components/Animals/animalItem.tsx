import { FunctionComponent } from "react";
import { createStyles, Box, Button, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

type animalCard = {
  image: string;
  name: string;
  gender: string;
  breed: string;
  type: string;
};

const useStyles = createStyles({
  animalImage: {
    borderRadius: "8px",
    marginBottom: "5px",
    maxWidth: "100%",
    height: "auto",
  },
});

const AnimalItem: FunctionComponent<{ animal: animalCard }> = ({ animal }) => {
  const { image, name, gender, breed, type } = animal;

  const { classes } = useStyles();
  return (
    <Box>
      {image && (
        <Link href="/animal-detail">
          <Image
            src={image}
            width={373}
            height={316}
            alt="Animal"
            className={classes.animalImage}
          />
        </Link>
      )}

      <Box>
        {name && (
          <Title order={3} size="h3" color="#45110B" mb="4px">
            <Link href="/animal-detail">{name}</Link>
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

export default AnimalItem;
