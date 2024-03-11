"use client";

import {
  createStyles,
  Box,
  Container,
  Title,
  Button,
  Checkbox,
} from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  paymentBox: {
    backgroundColor: "#F6F4EF",
    padding: "8px 16px",
    marginBottom: "16px",
    position: "relative",
  },
  text: {
    fontSize: "12px",
    marginBottom: "8px",
    lineHeight: 1.416666,
    color: "#45110B",
  },
  editBtn: {
    position: "absolute",
    top: "8px",
    right: "16px",

    "&:hover": {
      opacity: 0.7,
    },
  },
}));

const PaymentDetail = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="payment-detail-block"
    >
      <Container size="lg">
        <Box
          sx={(theme) => ({
            maxWidth: "926px",
            margin: "0 auto",
          })}
        >
          <Title order={1} size="h2" color="#45110B" mb="35px">
            Payment details
          </Title>
          <Box className={classes.paymentBox}>
            <Button
              leftIcon={
                <Image src="/Edit.svg" width={24} height={24} alt="edit" />
              }
              className={`btn-icon ${classes.editBtn}`}
            >
              Edit
            </Button>
            <Title order={2} size="h5" fw={600} color="#45110B" mb="10px">
              Nolan Phillips
            </Title>
            <Box component="p" className={classes.text}>
              Ackno: 164161424846166
            </Box>
            <Box component="p" className={classes.text}>
              BSB: 123456
            </Box>
            <Checkbox label="Default" mb="8px" defaultChecked />
            <Button className="btn-link">Delete</Button>
          </Box>

          <Button
            leftIcon={
              <Image src="/icon-plus.svg" width={24} height={24} alt="edit" />
            }
            className="btn-outline"
            size="lg"
            fullWidth
          >
            Add new payment method
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PaymentDetail;
