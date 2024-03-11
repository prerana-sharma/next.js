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
  Grid,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  enquiryHeader: {
    padding: "16px 0",
    borderBottom: "1px solid #E9E1D5",
    marginBottom: "20px",
  },
  img: {
    borderRadius: "4px",
    marginRight: "16px",
  },
}));

const PaymentDetailForm = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="payment-detail-forms-block"
    >
      <Container size="lg">
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
            <Title order={1} size="h2" color="#45110B" mb="10px">
              Add payment details
            </Title>

            <Select
              label="Account type"
              placeholder="Bank"
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

            <TextInput
              placeholder="Card number"
              label="Card number"
              mb="20px"
            />
            <TextInput
              placeholder="Name on card"
              label="Name on card"
              mb="20px"
            />

            <Grid>
              <Grid.Col span={12} sm={6}>
                <DateInput
                  valueFormat="DD/MM/YY"
                  label="Expiry"
                  placeholder="DD/MM/YY"
                />
              </Grid.Col>
              <Grid.Col span={12} sm={6}>
                <TextInput placeholder="000" label="CVC" mb="20px" />
              </Grid.Col>
            </Grid>
            <Button size="lg" fullWidth>
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentDetailForm;
