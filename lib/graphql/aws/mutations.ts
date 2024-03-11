import { gql } from '@apollo/client';

export const FETCH_PUT_PRESIGN_URL = gql`
    mutation ($presignedUrlInput: PresignedUrlInput!) {
        FetchPutPresignedUrl(presignedUrlInput: $presignedUrlInput) {
            key
            url
        }
    }
`;
