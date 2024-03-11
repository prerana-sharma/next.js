import { gql } from '@apollo/client';

export const GET_SAVED_ANIMALS = gql`
	query SavedAnimalListing($body: PaginationInput!){
		SavedAnimalListing(paginate:$body){
			message
			animals{
				_id
				animalType
				media{
					file
					caption
					isCover
				}
				breed
				listingName
				gender
			}
			pagination{
				total
				hasNextPage
			}
		}
	}
`;

export const GET_SIGNED_URL = gql`
	query FetchGetPresignedUrl($key: String!){
		FetchGetPresignedUrl(key:$key){
			url
		}
  }
`;
export const GET_SAVED_BREEDERS = gql`
	query SavedBreedersListing($body: PaginationInput!){
		SavedBreedersListing(paginate:$body){
			message
			savedBreeders{
				_id
				firstName
				lastName
				address{
					fullAddress
					state
					postCode
				}
				username
				profileImage
			}
			pagination{
				total
				hasNextPage
			}
		}
	}
`;