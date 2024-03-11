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

const UserNoAnimalsPhoto = () => {
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
          src="/Person.svg"
          width={28}
          height={28}
          alt="animal"
          style={{ marginBottom: "16px" }}
        />
        <Title order={3} size="h3" fw="600" color="#6A5757" mb="8px">
          No photos found
        </Title>
        <p style={{ marginBottom: "8px", color: "#BCB1A1" }}>
          Add your first post
        </p>
        <Button
          component="a"
          href="/add-image"
          variant="outline"
          size="lg"
          styles={(theme) => ({
            root: {
              backgroundColor: "transparent",
              border: `1px solid #FE8D0E`,
              color: "#45110B",
              width: "100%",
              "&:not([data-disabled])": theme.fn.hover({
                backgroundColor: theme.fn.darken("#FE8D0E", 0.05),
                color: "white",
                textDecoration: "none",
              }),
            },
          })}
        >
          Add your Images
        </Button>
      </Box>
    </Box>
  );
};

export default UserNoAnimalsPhoto;
