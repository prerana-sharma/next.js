import { Box, Button, Grid } from "@mantine/core";
import Link from "next/link";
import AnimalSaleItem from "../Animals/animalSaleItem";

const animals = [
  {
    image: "/img-animal1.jpg",
    listingName: "Marge",
    gender: "Female",
    breed: "Bengal",
    animalType: "cat",
    isLiked: true,
  },
  {
    image: "/img-animal2.jpg",
    listingName: "Talan",
    gender: "Male",
    breed: "Bengal",
    animalType: "cat",
    isLiked: false,
  },
  {
    image: "/img-animal3.jpg",
    listingName: "Alena",
    gender: "Female",
    breed: "Bengal",
    animalType: "cat",
    isLiked: false,
  },
  {
    image: "/img-animal3.jpg",
    listingName: "Lydia",
    gender: "Female",
    breed: "Bengal",
    animalType: "cat",
    isLiked: false,
  },
  {
    image: "/img-animal4.jpg",
    listingName: "Emerson",
    gender: "Female",
    breed: "Bengal",
    animalType: "cat",
    isLiked: false,
  },
  {
    image: "/img-animal5.jpg",
    listingName: "Greg",
    gender: "Female",
    breed: "Bengal",
    animalType: "cat",
    isLiked: false,
  },
];

const SearchResults = () => {
  return (
    <Box
      sx={(theme) => ({
        maxWidth: "923px",
        margin: "0 auto",
        paddingTop: "16px",
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "26px",
        })}
      >
        <Box component="span">1000 results</Box>
        <Box>
          <Link href="#" className="btn-link with-underline">
            Save search
          </Link>
        </Box>
      </Box>

      {animals && (
        <Grid>
          {animals.map((animal, index) => {
            return (
              <Grid.Col key={index} span={12} sm={6} mb="30px">
                <AnimalSaleItem animal={animal} />
              </Grid.Col>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default SearchResults;
