"use client";
import Back from "../../components/btnBack";
import { Box, Container, Switch, Title } from "@mantine/core";

const PushNotification = () => {
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
              Notification settings
            </Title>
            <Switch label="New search listings" mb="32px" />
            <Switch label="Followers" mb="32px" />
            <Switch label="New posts" mb="32px" />
            <Switch label="Events" mb="32px" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PushNotification;
