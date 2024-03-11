import { Box, Button, Grid } from "@mantine/core";
import Link from "next/link";
import AnimalSaleItem from "../../components/Animals/animalSaleItem";
import { useQuery } from "@apollo/client";
import { GET_SAVED_ANIMALS } from "../../lib/graphql/saved/queries";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import UserNoSavedAnimals from "../../components/userNoSavedAnimals";

const SavedAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const {refetch: refetchSavedAnimals, data} = useQuery(GET_SAVED_ANIMALS, {
    variables: { 
      body: {
      page: 1,
      limit: 10
    } },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data?.SavedAnimalListing) {
        const animalArray = [];
        data?.SavedAnimalListing?.animals?.map((animal)=>{
          let animalObj = {...animal, isLiked: true}
          animalArray.push(animalObj);
        })
        setAnimals(animalArray);
      }
    },
    onError: (error) => {
      showNotification({
        message: error.message,
        title: "Error!",
        color: "red",
        autoClose: 3000,
      });
    },
  });
  useEffect(()=>{
    if (data?.SavedAnimalListing) {
      const animalArray = [];
      data?.SavedAnimalListing?.animals?.map((animal)=>{
        let animalObj = {...animal, isLiked: true}
        animalArray.push(animalObj);
      })
      setAnimals(animalArray);
    }
  },[refetchSavedAnimals, data]);
  
  return (
    <Box
      sx={(theme) => ({
        margin: "0 auto",
      })}
    >

      {animals.length ? (
        <Grid>
          {animals.map((animal, index) => {
            return (
              <Grid.Col key={index} span={12} sm={4} mb="30px">
                <AnimalSaleItem animal={animal} refetchSavedAnimals={refetchSavedAnimals}/>
              </Grid.Col>
            );
          })}
        </Grid>
      ): (
        <Grid>
          <UserNoSavedAnimals />
        </Grid>
      )}
    </Box>
  );
};

export default SavedAnimals;
