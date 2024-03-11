import { Box, Button, Grid } from "@mantine/core";
import Link from "next/link";
import AnimalSaleItem from "../../components/Animals/animalSaleItem";
import { useQuery } from "@apollo/client";
import { GET_SAVED_ANIMALS, GET_SAVED_BREEDERS } from "../../lib/graphql/saved/queries";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import UserNoAnimals from "../../components/userNoAnimals";
import BreedersList from "../../components/breedersList";
import UserNoSavedBreeders from "../../components/userNoSavedBreeders";

const SavedBreeders = () => {
  const [breeders, setBreeders] = useState([]);
  const {refetch: refetchSavedBreeders, data} = useQuery(GET_SAVED_BREEDERS, {
    variables: { 
      body: {
      page: 1,
      limit: 10
    } },
    onCompleted: (data) => {
      if (data?.SavedBreedersListing) {
        const breederArray = [];
        data?.SavedBreedersListing?.savedBreeders?.map((breeder)=>{
          let breederObj = {...breeder, isLiked: true}
          breederArray.push(breederObj);
        })
        setBreeders(breederArray);
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
    if (data?.SavedBreedersListing) {
      const breederArray = [];
      data?.SavedBreedersListing?.savedBreeders?.map((breeder)=>{
        let breederObj = {...breeder, isLiked: true}
        breederArray.push(breederObj);
      })
      setBreeders(breederArray);
    }
  },[refetchSavedBreeders, data]);

  return (
    <Box
      sx={(theme) => ({
        margin: "0 auto",
      })}
    >

      {breeders.length ? (
        <Grid>
          {breeders.map((breeder, index) => {
            return (
              <Grid.Col key={index} span={12} sm={4} mb="30px">
                <BreedersList breeder={breeder} refetchSavedBreeders={refetchSavedBreeders}/>
              </Grid.Col>
            );
          })}
        </Grid>
      ): (
        <Grid>
          <UserNoSavedBreeders />
        </Grid>
      )}
    </Box>
  );
};

export default SavedBreeders;
