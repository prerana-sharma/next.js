import { gql } from "@apollo/client";

export const GET_SEARCH_ANIMAL = gql`
  mutation SearchAnimal($searchAnimalInput: SearchAnimalInput!) {
    SearchAnimal(searchAnimalInput: $searchAnimalInput) {
    message
      animals {
        listingName
        _id
        animalId
      }
    }
  }
`;