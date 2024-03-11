import { Carousel } from "@mantine/carousel";
import { createStyles, rem, Title } from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  slideTitle: {
    maxWidth: rem(320),
    margin: "0 auto",
  },

  slideImage: {
    borderRadius: rem(16),
    marginBottom: rem(30),
    objectFit: "contain",
    width: "100%",
    height: "auto",

    [theme.fn.largerThan("md")]: {
      // marginBottom: "88px",
      marginBottom: "80px",
    },
  },
}));

const SignInSlider = () => {
  const { classes } = useStyles();
  return (
    <Carousel
      maw={458}
      mx="auto"
      withIndicators
      withControls={false}
      // height={200}
      className="sign-slider"
      styles={{
        indicators: {
          position: "static",
          marginTop: "40px",
        },
        indicator: {
          position: "static",
          width: rem(18),
          height: rem(3),
          transition: "width 250ms ease",
          backgroundColor: "#D9D9D9",

          "&[data-active]": {
            width: rem(40),
            backgroundColor: "#FE8D0E",
          },
        },
      }}
    >
      <Carousel.Slide>
        <Image
          src="/img1.jpg"
          alt="image description"
          width="458"
          height="549"
          className={classes.slideImage}
        />
        <Title order={2} size="h1" className={classes.slideTitle}>
          You choose your quality pet.
        </Title>
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          src="/img1.jpg"
          alt="image description"
          width="458"
          height="549"
          className={classes.slideImage}
        />
        <Title order={2} size="h1" className={classes.slideTitle}>
          You choose your quality pet.
        </Title>
      </Carousel.Slide>
      <Carousel.Slide>
        <Image
          src="/img1.jpg"
          alt="image description"
          width="458"
          height="549"
          className={classes.slideImage}
        />
        <Title order={2} size="h1" className={classes.slideTitle}>
          You choose your quality pet.
        </Title>
      </Carousel.Slide>
    </Carousel>
  );
};

export default SignInSlider;
