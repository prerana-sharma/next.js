import { createStyles, Box, Title, Button } from "@mantine/core";
// import Link from "next/link";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  userLogo: {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",

    [theme.fn.smallerThan("sm")]: {},
  },
}));

const UserNoSavedBreeders = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        textAlign: "center",
        maxWidth: "240px",
        minHeight: "300px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
      })}
    >
      <Image
        src="/user-logo.png"
        width={240}
        height={300}
        alt="animal"
        className={classes.userLogo}
      />
      <Box
        sx={(theme) => ({
          textAlign: "center",
          maxWidth: "162px",
          margin: "0 auto",
        })}
      >
        <Image
          src="/AnimalCat.svg"
          width={28}
          height={28}
          alt="animal"
          style={{ marginBottom: "16px" }}
        />
        <Title order={3} size="h3" fw="600" color="#6A5757" mb="8px">
          No saved breeders
        </Title>
        <p style={{ marginBottom: "8px", color: "#BCB1A1" }}>
          Save your favourite breeders
        </p>
      </Box>
    </Box>
  );
};

export default UserNoSavedBreeders;
