import { createStyles, Box, Button } from "@mantine/core";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const useStyles = createStyles((theme) => ({
  slideWrap: {
    // marginBottom: "6px",
  },
  imgWrap: {
    marginBottom: "6px",
  },
  imageCaption: {
    fontSize: "12px",
    lineHeight: 1.4166667,
    color: "#45110B",
  },
}));

const MediaSlider = () => {
  const { classes } = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="animal-media-slider">
      <div>
        <Box className={classes.slideWrap}>
          <Box className={classes.imgWrap}>
            <Image
              src="/img-animal-detail1.jpg"
              alt="image description"
              width={572}
              height={572}
            />
          </Box>
          <Box className={`image-caption ${classes.imageCaption}`}>
            <Box component="p">02/01/21</Box>
            <Box component="p">What a view. Looking over my wonderful farm</Box>
          </Box>
        </Box>
      </div>
      <div>
        <Box className={classes.slideWrap}>
          <Box className={classes.imgWrap}>
            <Image
              src="/img-animal-detail1.jpg"
              alt="image description"
              width={572}
              height={572}
            />
          </Box>
          <Box className={`image-caption ${classes.imageCaption}`}>
            <Box component="p">02/01/21</Box>
            <Box component="p">What a view. Looking over my wonderful farm</Box>
          </Box>
        </Box>
      </div>
      <div>
        <Box className={classes.slideWrap}>
          <Box className={classes.imgWrap}>
            <Image
              src="/img-animal-detail1.jpg"
              alt="image description"
              width={572}
              height={572}
            />
          </Box>
          <Box className={`image-caption ${classes.imageCaption}`}>
            <Box component="p">02/01/21</Box>
            <Box component="p">What a view. Looking over my wonderful farm</Box>
          </Box>
        </Box>
      </div>
    </Slider>
  );
};

export default MediaSlider;
