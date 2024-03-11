import { Box } from '@mantine/core';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

const GoogleAutoComplete = (props: any) => {
    const { placeholder } = props;
    return (
        <>
            <GooglePlacesAutocomplete
                selectProps={{
                    //@ts-ignore
                    // value:
                    //     props?.value?.displayLocation?.length > 0
                    //         ? {
                    //               label: props?.value?.displayLocation,
                    //               value: {
                    //                   description: props?.value?.displayLocation
                    //               }
                    //           }
                    //         : '',
                    onChange: async (object) => {
                        props.setFieldValue(props.name, await getLatLngByPlaceId(object?.value.place_id));
                    },
                    placeholder: placeholder,
                    className: 'react-select-container',
                    classNamePrefix: 'react-select',
                    styles: {
                        container: () => ({
                            width: '100%'
                            
                        }),
                        input: (provided) => ({
                            ...provided,
                            height: 50,
                            position: 'relative',
                            left: 8
                        }),
                        indicatorSeparator: () => ({
                            display: 'none'
                        }),
                        indicatorsContainer: () => ({
                            display: 'none'
                        }),
                        control: () => ({
                            border: `${(props?.error && props?.error.location) ?'1px solid #fa5252':'1px solid #9e9e9e'}`,
                            borderRadius: 12,
                            background:"#F6F4EF",
                            paddingLeft:5
                        }),
                        singleValue: (styles) => ({
                            ...styles,
                            fontFamily: 'Plus Jakarta Sans,sans-serif',
                            fontSize: 16,
                            lineHeight: '23px',
                            position: 'relative',
                            left: 8,
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color:`${(props?.error && props?.error.location) ?'#fa5252':'#6A5757'}`,
                        }),
                    },
                    isClearable: true
                }}
                autocompletionRequest={{
                    componentRestrictions: { country: 'au' },
                    types: ['establishment']
                }}
                apiKey={process.env.NEXT_APP_GOOGLE_API_KEY}
            />
        </>
    );
};

export const getLatLngByPlaceId = async (placeId: string) => {
    try {
        const placeDetail = (await geocodeByPlaceId(placeId)) as any;

        if (placeDetail?.length) {
            const placeDetailFromArray = placeDetail[0];
            const lat = placeDetailFromArray?.geometry?.location?.lat();
            const lng = placeDetailFromArray?.geometry?.location?.lng();
            let city = '';
            let state = '';
            let type = 'Point';
            let coordinates = [lng, lat ];
            let country = 'Australia';
            let displayLocation: '';
            let postalCode = '';
            let street = '';
            placeDetailFromArray?.address_components.map((addressComponent, i) => {
                if (addressComponent?.types.includes('postal_code')) {
                    postalCode = placeDetailFromArray?.address_components[i].long_name;
                }
                if (addressComponent?.types.includes('locality')) {
                    city = placeDetailFromArray?.address_components[i].long_name;
                }
                if (addressComponent?.types.includes('administrative_area_level_1')) {
                    state = placeDetailFromArray?.address_components[i].long_name;
                }
                if (addressComponent?.types.includes('route')) {
                    street = placeDetailFromArray?.address_components[i].long_name;
                }
            });
            displayLocation = placeDetailFromArray?.formatted_address;

            return {
                coordinates,
            };
        }
        return;
    } catch (error) {
        return error;
    }
};

export default GoogleAutoComplete;
