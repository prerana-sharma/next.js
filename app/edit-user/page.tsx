"use client";
import {
  createStyles,
  Button,
  Container,
  Textarea,
  Box,
  Title,
  TextInput,
  rem,
  Text,
  Autocomplete,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import Image from "next/image";
import BannerImageAdded from "../../components/BannerImageAdded";
import Back from "../../components/btnBack";
import PhoneInput from "react-phone-input-2";

const useStyles = createStyles((theme) => ({
  setImage: {
    border: "2px solid #CB3E19",
    backgroundColor: "#F6F4EF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    width: "87px",
    height: "87px",
    borderRadius: "50%",
  },
  addBannerImage: {
    border: "1px solid #FE8D0E",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#45110B",
    maxWidth: "343px",

    "&:hover": {
      textDecoration: "none",
    },
  },
  userImage: {
    borderRadius: "50%",
    width: "86px",
    height: "86px",
    marginRight: "16px",
  },
}));

const EditUser = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      location: "",
    },

    validate: {
      fname: (value) => (value ? null : "First name not empty"),
      lname: (value) => (value ? null : "Last name not empty"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      location: (value) => (value ? null : "Location not empty"),
    },
  });
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          <Back href="#" />

          <Box
            sx={(theme) => ({
              paddingLeft: "86px",
            })}
          >
            <Box
              sx={(theme) => ({
                maxWidth: "571px",
              })}
            >
              <Title size="h2" mb="8px" color="#45110B">
                Edit profile details
              </Title>

              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #E9E1D5",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                  })}
                >
                  <a href="#" className={classes.setImage}>
                    <Image src="./Add.svg" width={28} height={28} alt="add" />
                  </a>
                  <Box>
                    <Title size="h6" fw={500} color="#CB3E19" mb={4}>
                      Set profile image
                    </Title>
                    <Title
                      size="p"
                      order={6}
                      fw={400}
                      color="#6A5757"
                      style={{ fontSize: "12px" }}
                    >
                      We reccomend something that describes your business
                    </Title>
                  </Box>
                </Box>
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #E9E1D5",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                  })}
                >
                  <a href="#">
                    <Image
                      src="/img-user2.jpg"
                      width={86}
                      height={86}
                      alt="User Image"
                      className={classes.userImage}
                    />
                  </a>
                  <Box>
                    <Title size="h6" fw={500} color="#CB3E19" mb={4}>
                      Change profile image
                    </Title>
                    <Title
                      size="p"
                      order={6}
                      fw={400}
                      color="#6A5757"
                      style={{ fontSize: "12px" }}
                    >
                      We reccomend something that describes your business
                    </Title>
                  </Box>
                </Box>

                <Box
                  sx={(theme) => ({
                    borderBottom: "1px solid #E9E1D5",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                  })}
                >
                  <Title size="h5" mb={12}>
                    Add banner image
                  </Title>
                  <Title size="p" fw={400} mb={16}>
                    Lorem ipsum dolor sit amet, consectetur
                  </Title>
                  <a href="#" className={classes.addBannerImage}>
                    <Image
                      src="./plus-black.svg"
                      width={24}
                      height={24}
                      alt="plus"
                    />
                    Add banner image
                  </a>
                </Box>

                <Box
                  sx={(theme) => ({
                    borderBottom: "1px solid #E9E1D5",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                  })}
                >
                  <Title size="h4" mb={4} color="#45110B">
                    Banner image
                  </Title>
                  <Title size="p" fw={400} mb={16}>
                    Lorem ipsum mentioning of image size 345 x 240px
                  </Title>
                  {/* <a href="#" className={classes.addBannerImage}>
                    <Image
                      src="./plus-black.svg"
                      width={24}
                      height={24}
                      alt="plus"
                    />
                    Add banner image
                  </a> */}
                  <BannerImageAdded />
                  <Button className="btn-link" size="lg">
                    Change banner image
                  </Button>
                </Box>
                <TextInput placeholder="UserName" label="UserName" mb="18px" />
                <TextInput
                  placeholder="First name"
                  label="First name"
                  mb="18px"
                  {...form.getInputProps("fname")}
                />

                <TextInput
                  placeholder="Last name"
                  label="Last name"
                  mb="18px"
                  {...form.getInputProps("lname")}
                />

                <Autocomplete
                  label="Location"
                  placeholder="Location"
                  data={[
                    { value: "Sydney, NSW", label: "Sydney, NSW" },
                    { value: "Victoria", label: "Victoria" },
                    { value: "Queensland", label: "Queensland" },
                    { value: "Tasmania", label: "Tasmania" },
                  ]}
                  mb="18px"
                />

                <Textarea placeholder="About" label="About" mb="18px" />

                <Box className="tel-input" mb="18px">
                  <label htmlFor="tel">Mobile (option)</label>
                  <PhoneInput
                    country={"au"}
                    inputProps={{
                      name: "phone",
                      autoFocus: true,
                      placeholder: "Mobile (option)",
                    }}
                  />
                </Box>

                <TextInput
                  type="email"
                  placeholder="Email"
                  label="Email"
                  mb="18px"
                  {...form.getInputProps("email")}
                />

                <TextInput
                  type="url"
                  placeholder="http://"
                  label="Facebook (option)"
                  mb="18px"
                />

                <TextInput
                  type="url"
                  placeholder="http://"
                  label="Instagram (option)"
                  mb="18px"
                />

                <TextInput
                  type="url"
                  placeholder="http://"
                  label="Website (option)"
                  mb="18px"
                />

                <Button type="submit" fullWidth size="lg">
                  Save changes
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditUser;
