"use client";
import {
  createStyles,
  Box,
  Button,
  Container,
  TextInput,
  Title,
  Grid,
  Radio,
  Group,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

const useStyles = createStyles((theme) => ({
  liveStock: {
    "& .lists": {
      margin: "0",
      padding: "0",
      listStyle: "none",
      "& li": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#45110B",
        padding: "16px 0",
        borderBottom: "1px solid #E9E1D5",

        "&:last-child": {
          borderBottom: "none",
        },

        "& strong": {
          fontWeight: 600,
        },

        "& .title": {},
        "& .price": {},

        "& .total": {},
      },
    },

    "& .livestock-payment-info": {
      transition: "0.3s linear",
      paddingTop: "20px",
      overflow: "hidden",
    },

    "& .mantine-Radio-root": {
      borderBottom: "1px solid #E9E1D5",
      padding: "8px 0",
      marginBottom: "20px",
    },
  },
}));

const LiveStockPayment = () => {
  const { classes } = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<any>();
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className={`livestock-payment-block ${classes.liveStock}`}
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          <Box
            sx={(theme) => ({
              position: "relative",

              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                maxWidth: "571px",
              })}
            >
              <Title order={2} size="h2" mb="8px" color="#45110B">
                Add new animal
              </Title>
              <Title order={3} size="h4" mb="8px" color="#45110B">
                Pay for listing
              </Title>

              <ul className="lists">
                <li>
                  <span className="title">Listing price</span>
                  <strong className="price">$25</strong>
                </li>
                <li>
                  <span className="title">Credit amount</span>
                  <strong className="pricec">$25</strong>
                </li>
                <li>
                  <strong className="total">Total</strong>
                  <strong className="pricec">$50</strong>
                </li>
              </ul>
              <Box
                sx={{
                  borderTop: "1px solid #E9E1D5",
                  paddingTop: "20px",
                  marginTop: "18px",
                }}
              >
                <Button
                  onClick={handleToggle}
                  className={`btn-outline  ${isOpen ? " active" : ""}`}
                  fullWidth
                  size="lg"
                >
                  Purchase more credits
                </Button>
              </Box>

              <Box
                className="livestock-payment-info"
                ref={contentRef}
                style={{
                  height: isOpen ? `${contentRef.current.scrollHeight}px` : "0",
                }}
              >
                <Radio.Group name="paymentDetail" label="Payment details">
                  <Radio
                    value="nolan1"
                    label="Nolan Phillips Card number: 164161424846166"
                  />
                  <Radio
                    value="nolan2"
                    label="Nolan Phillips Card number: 164161424846166"
                  />
                </Radio.Group>

                <Title order={4} size="16px" fw="600" color="#45110B" mb="18px">
                  Or add new payment
                </Title>
                <TextInput
                  placeholder="Card number"
                  label="Card number"
                  mb="24px"
                />
                <TextInput placeholder="#" label="Card holder name" mb="18px" />
                <Grid>
                  <Grid.Col span={6}>
                    <DatePickerInput
                      label="Expiry"
                      placeholder="DD/MM/YYYY"
                      valueFormat="DD/MM/YYYY"
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput placeholder="CVC" label="CVC" mb="18px" />
                  </Grid.Col>
                </Grid>
              </Box>

              <Button type="submit" fullWidth size="lg">
                Pay now
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LiveStockPayment;
