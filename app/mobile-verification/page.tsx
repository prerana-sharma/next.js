"use client";
import {
  createStyles,
  Button,
  Container,
  TextInput,
  Box,
  Title,
  Text,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";

const useStyles = createStyles((theme) => ({}));

const MobileVerification = () => {
  const { classes } = useStyles();
  return (
    <Box
      className="mobile-verification-page"
      sx={(theme) => ({
        backgroundColor: "#E9E1D5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "90px 0",
        },
      })}
    >
      <Container size="xl" style={{ width: "100%" }}>
        <Box
          sx={(theme) => ({
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px 20px",
            maxWidth: "508px",
            margin: "0 auto",

            [theme.fn.largerThan("md")]: {
              padding: "40px 75px",
            },
          })}
        >
          <Title size="h1" mb="20px" color="#45110B">
            Mobile Verification
          </Title>
          <Text maw={259} color="#6A5757">
            <p>We have sent you a SMS with a code to the number</p>
          </Text>
          <Title size="h2" mb="20px" color="#45110B">
            04 123 456 78
          </Title>
          <Box fw="500" mb="20px">
            <Link href="#" className="link-underline">
              Change number
            </Link>
          </Box>
          <form onSubmit={(values) => console.log(values)}>
            <Grid gutter={10} mb={20} maw="279px">
              <Grid.Col span={3}>
                <TextInput placeholder="0" />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput placeholder="0" />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput placeholder="0" />
              </Grid.Col>
              <Grid.Col span={3}>
                <TextInput placeholder="0" />
              </Grid.Col>
            </Grid>

            <Box fw="500" mb="20px">
              <Link href="#" className="link-underline">
                Send a new code
              </Link>
            </Box>

            <Button type="submit" fullWidth size="xl">
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default MobileVerification;
