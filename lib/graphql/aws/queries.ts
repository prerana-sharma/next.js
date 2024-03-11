import { gql } from '@apollo/client';

export const FETCH_GET_PRESIGNURL = gql`
    query ($key: String!) {
        FetchGetPresignedUrl(key: $key) {
            url
        }
    }
`;
