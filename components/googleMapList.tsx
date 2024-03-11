import { Box } from "@mantine/core";
import Image from "next/image";
import React from "react";

const GoogleMapList = ({ text, lat, lng }) => {
  return (
    <Box>
      {text}
      <Image src="/icon-pin.svg" width={25} height={28} alt="pin" />
    </Box>
  );
};

export default GoogleMapList;
