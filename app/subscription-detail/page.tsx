"use client";
import Back from "../../components/btnBack";
import { createStyles, Box, Button, Container, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  detailBox: {
    borderRadius: "16px",
    padding: "20px 15px",
    background: "#E9E1D5",
    marginBottom: "25px",

    [theme.fn.largerThan("md")]: {
      padding: "28px 30px",
    },
  },
  subscribePrice: {
    borderTop: "1px solid #BCB1A1",
    padding: "10px 0 22px",
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "#6A5757",
    fontSize: "14px",
    lineHeight: 1.42857,
    marginBottom: "8px",
  },
  per: {
    fontSize: "14px",
    lineHeight: 1.42857,
    paddingLeft: "8px",
  },
  subscribeFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#fff",
    borderColor: "#BCB1A1",

    "&:hover": {
      borderColor: "rgba(241, 134, 13, 1)",
    },
  },
}));

const SubscriptionDetail = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="subscription-detail-block"
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
          <Box sx={() => ({ maxWidth: "926px" })}>
            <Title order={1} size="h2" color="#45110B" mb="50px">
              Subscription details
            </Title>

            <Box className={classes.detailBox}>
              <Title order={2} size="h2">
                Basic
              </Title>
              <Box component="p">A basic account</Box>
              <ul className="plan-lists">
                <li>
                  <strong>$30</strong> of classified credit
                </li>
                <li>Events</li>
                <li>
                  Up to <strong>5</strong> VLA
                </li>
              </ul>
              <Box className={classes.subscribePrice}>
                <Title order={3} size="h3" fw={600}>
                  $ 25
                </Title>
                <Box component="span" className={classes.per}>
                  per month
                </Box>
              </Box>
              <Button className={classes.btn} size="lg" fullWidth>
                Next payment due 01/01/21
              </Button>
            </Box>
            <Box className={classes.subscribeFooter}>
              <Button className="btn-link" size="lg">
                Change Plan
              </Button>
              <Button className="btn-link with-underline text-gray" size="lg">
                Cancel Plan
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SubscriptionDetail;
