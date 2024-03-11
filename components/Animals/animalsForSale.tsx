import { Box, Grid, Select, Input, Button } from "@mantine/core";
import Image from "next/image";
import AnimalSaleItem from "./animalSaleItem";

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

const AnimalsForSale = () => {
  return (
    <Box className="animals-for-sale">
      <Box className="animal-filter">
        <Grid>
          <Grid.Col span={12} sm={3}>
            <Box>
              <Select
                placeholder="Filter"
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                icon={
                  <Image
                    src="./icon-option.svg"
                    width={24}
                    height={24}
                    alt="setting"
                  />
                }
                // rightSection={
                //   <Image
                //     src="/arrow_drop_down.svg"
                //     width={24}
                //     height={24}
                //     alt="dropdown"
                //   />
                // }
                mb="24px"
                className=""
              />
            </Box>
          </Grid.Col>

          <Grid.Col span={12} sm={9}>
            <Box
              sx={(theme) => ({
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              })}
            >
              {/* <Button className="btn-outline" size="md">
                Edit order
              </Button> */}
              <Button
                component="a"
                href="/add-sales"
                leftIcon={
                  <Image
                    src="/icon-plus.svg"
                    width={24}
                    height={24}
                    alt="add"
                  />
                }
                size="md"
                mx="16px"
              >
                Add New
              </Button>
              <Input
                icon={
                  <Image
                    src="./icon-search.svg"
                    width={20}
                    height={25}
                    alt="search"
                  />
                }
                placeholder="Search      "
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Box>

      <Grid>
        {animals.map((animal, index) => {
          return (
            <Grid.Col key={index} span={12} sm={6} md={4} mb="38px">
              <AnimalSaleItem animal={animal} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AnimalsForSale;
