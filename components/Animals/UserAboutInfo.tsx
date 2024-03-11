import { createStyles, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GoogleMap from "../googleMap";

interface LocationProps {
  lng: number;
  lat: number;
  title: string;
}

const useStyles = createStyles((theme) => ({
  locationList: {
    display: "flex",
  },
}));

const defaultProps = {
  center: {
    lat: -33.865143,
    lng: 151.2099,
  },
  zoom: 11,
};

const locations: LocationProps[] = [
  { lat: -33.865143, lng: 151.2099, title: "" },
  { lat: -20.917574, lng: 142.702789, title: "" },
];

const UserAboutInfo = () => {
  const { classes } = useStyles();
  return (
    <Box className="user-about-info">
      <Box className={classes.locationList}>
        <Image src="./icon-about-info.svg" width={20} height={20} alt="info" />
        <Box component="p" style={{ fontSize: "14px" }}>
          Are you feeling warm and fuzzy? Like you want to cuddle with a cat? I
          have many of those with my lovely healthy bengal cats. Been giving
          wonderful spotted felines loving homes for 10years!!
        </Box>
      </Box>
      <Box className={classes.locationList}>
        <Image src="./icon-about-call.svg" width={20} height={20} alt="info" />
        <Box component="p">
          <Link href="tel:0412334455">04 12 33 44 55</Link>
        </Box>
      </Box>
      <Box className={classes.locationList}>
        <Image src="./icon-about-mail.svg" width={20} height={20} alt="info" />
        <Box component="p">
          <Link href="mailto:mail@mail.com.au">mail@mail.com.au</Link>
        </Box>
      </Box>
      <Box className={classes.locationList}>
        <Image
          src="./icon-about-location.svg"
          width={24}
          height={24}
          alt="info"
        />
        <Box className="location">
          <Box component="p">Sydney, NSW 2000</Box>
          {/* <Image src="/img-map.jpg" width={314} height={152} alt="map" /> */}

          <GoogleMap locations={locations} defaultProps={defaultProps} />
        </Box>
      </Box>
    </Box>
  );
};

export default UserAboutInfo;
