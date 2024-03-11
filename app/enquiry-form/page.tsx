"use client";
import Back from "../../components/btnBack";
import {
  createStyles,
  Box,
  Container,
  TextInput,
  Title,
  Select,
  Button,
  Textarea,
} from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  enquiryHeader: {
    padding: "16px 0",
    borderBottom: "1px solid #E9E1D5",
    marginBottom: "20px",
    display: "flex",
  },
  img: {
    borderRadius: "4px",
    marginRight: "16px",
  },
}));

const EnquiryForm = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="enquiry-forms-block"
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
              position: "relative",

              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <Box sx={() => ({ maxWidth: "571px" })}>
              <Title order={1} size="h2" color="#45110B" mb="15px">
                Enquiry Form - Cat
              </Title>

              <Box className={classes.enquiryHeader}>
                <Image
                  src="/img-enquiry.png"
                  width={46}
                  height={46}
                  alt="image description"
                  className={classes.img}
                />
                <Box>
                  <Title order={3} size="h6" fw={600} color="#45110B">
                    Kittens 3 litter
                  </Title>
                  <ul className="enquiry-category-lists">
                    <li>Norwegian Forrest cat</li>
                    <li>Cat</li>
                    <li>Desexed</li>
                  </ul>
                </Box>
              </Box>
              <Box>
                <TextInput
                  placeholder="First name"
                  label="First name"
                  mb="20px"
                />
                <TextInput
                  placeholder="Last name"
                  label="Last name"
                  mb="20px"
                />
                <TextInput
                  type="email"
                  placeholder="Email"
                  label="Email"
                  mb="20px"
                />
                <TextInput
                  placeholder="Preffered contact number"
                  label="Preffered contact number"
                  mb="20px"
                />
                <Select
                  label="State"
                  placeholder="State"
                  data={[
                    { value: "melborne", label: "Melborne" },
                    { value: "sydney", label: "Sydney" },
                  ]}
                  rightSection={
                    <Image
                      src="/arrow_drop_down.svg"
                      width={24}
                      height={24}
                      alt="dropdown"
                    />
                  }
                  mb="20px"
                />
                <TextInput placeholder="Suburb" label="Suburb" mb="20px" />
                <TextInput
                  placeholder="Living situation – tell us a about your home and how your pet will fit in?"
                  label="Living situation – tell us a about your home and how your pet will fit in?"
                  mb="20px"
                />
                <Textarea
                  placeholder="Are you fully aware of the life expectancy, ongoing cost expectations and dietary, housing,exercise, health, training needs of a kitten?"
                  label="Are you fully aware of the life expectancy, ongoing cost expectations and dietary, housing,exercise, health, training needs of a kitten?"
                  mb="20px"
                />
                <Button size="lg" fullWidth>
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EnquiryForm;
