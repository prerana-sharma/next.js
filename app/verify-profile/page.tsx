"use client";
import Back from "../../components/btnBack";
import {
  Box,
  Button,
  Container,
  Select,
  TextInput,
  Title,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Image from "next/image";
import React from "react";

const VerifyProfile = () => {
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="subscription-block"
    >
      <Container size="lg">
        <Back href="/" />

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
            <Title order={1} size="h1" color="#45110B" mb="20px">
              Please verify your account
            </Title>

            <Select
              label="Verification type"
              placeholder="Verification type"
              data={[
                { value: "citizenship", label: "Citizenship" },
                { value: "driving-license", label: "Driving License" },
              ]}
              rightSection={
                <Image
                  src="/arrow_drop_down.svg"
                  width={24}
                  height={24}
                  alt="dropdown"
                />
              }
              mb="12px"
            />

            <TextInput placeholder="First name" label="First name" mb="12px" />
            <TextInput
              placeholder="Middle name(optional)"
              label="Middle name(optional)"
              mb="12px"
            />
            <TextInput placeholder="Last name" label="Last name" mb="12px" />
            <DateInput
              valueFormat="DD/MM/YY"
              label="Date of birth"
              placeholder="Date of birth"
              icon={
                <Image
                  src="/icon-calendar-orange.svg"
                  width={24}
                  height={24}
                  alt="calendar"
                />
              }
              mb="12px"
            />
            <TextInput
              type="number"
              placeholder="Licence number"
              label="Licence number"
              mb="12px"
            />
            <TextInput
              type="number"
              placeholder="Card number"
              label="Card number"
              mb="12px"
            />
            <Select
              label="Select of issue"
              placeholder="Select"
              data={[{ value: "2021", label: "2021" }]}
              rightSection={
                <Image
                  src="/arrow_drop_down.svg"
                  width={24}
                  height={24}
                  alt="dropdown"
                />
              }
              mb="24px"
            />
            <Button type="submit" fullWidth size="lg">
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default VerifyProfile;
