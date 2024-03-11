import { gql } from '@apollo/client';

export const GET_ANIMAL_TYPE = gql`
  query ListNewAnimalType {
    ListNewAnimalType {
			newAnimalTypes {
				pricing {
					price
					month
				}
				name
				hasCategory
				_id
			}
			message
		}
	}
`;
  
export const GET_ANIMAL_CATEGORIES_BREEDS = gql`
query ListCategoriesAndBreeds($input: ListAllCategoriesAndBreedsInput!) {
  ListCategoriesAndBreeds(input: $input) {
    message
    categoriesAndBreeds {
      name
      hasCategory
      breeds
      animalTypeId
      _id
      categories {
        name
        value
        isRequired
        hideOn
        dataType
      }
    }
  }
}`;
