import { gql } from "@apollo/client";

export const SAVE_UNSAVE = gql`
	mutation SaveAnimal($payload: SaveAnimalInput!){
		SaveAnimal(payload: $payload){
			message
		}
	}
`;