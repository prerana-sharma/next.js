import { useLazyQuery, useMutation } from '@apollo/client';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';
import { FETCH_PUT_PRESIGN_URL } from '../../lib/graphql/aws/mutations';
import { FETCH_GET_PRESIGNURL } from '../../lib/graphql/aws/queries';

const useImageUpload = () => {
    const [getAWSUploadURL, { loading }] = useMutation(FETCH_PUT_PRESIGN_URL);
    const [getBucketURL, { loading: awsLoading, data: awsData, refetch }] = useLazyQuery(FETCH_GET_PRESIGNURL, {
        variables: {
            key: 'null'
        }
    });
    const handleUpload = async (file, key, extension) => {
        getAWSUploadURL({
            variables: {
                presignedUrlInput: {
                    key,
                    contentType: file.type,
                    extension: extension
                }
            },
            onCompleted: async (getAWSURL) => {
                // upload to url
                const awsURL = await getAWSURL?.FetchPutPresignedUrl?.url;
                try {
                    await axios
                        .put(awsURL, file, {
                            headers: {
                                'Content-Type': `${file.type}`
                            }
                        })
                        .then(async (res) => {
                            showNotification({
                                message: 'Image uploaded successful!',
                                title: "Success!",
                                color: "green",
                            });
                        })
                        .catch((axiosError) => {
                            showNotification({
                                message: axiosError.message || 'Image uploading failed. Try again...',
                                title: "Error!",
                                color: "red",
                            });
                        });
                } catch (error: any) {
                    showNotification({
                        message: error.message || 'Image uploading failed. Try again...',
                        title: "Error!",
                        color: "red",
                    });
                }
            },
            onError: (awsError) => {
                showNotification({
					message: awsError.message || 'Image uploading failed. Try again...',
					title: "Error!",
					color: "red",
				});
            }
        });
    };

    const getImageFromAWS = async (key, thumb = false) => {
        if (key) {
            if (thumb) {
                const sep_key = key.split('/');
                key = `${sep_key.slice(0, -1).join('/')}/thumb/msmall/${sep_key.slice(-1)}`;
            }
            const { data: refetchData } = await refetch({ key });
            if (refetchData && refetchData?.FetchGetPresignedUrl?.url) {
                return refetchData?.FetchGetPresignedUrl?.url;
            }
        }
        return null;
    };

    return { handleUpload, getImageFromAWS };
};

export default useImageUpload;
