"use client";
import Back from "../../components/btnBack";
import {
  createStyles,
  Box,
  Container,
  Title,
  Button,
  Tabs,
  Grid,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  subscribeBox: {
    borderRadius: "16px",
    padding: "27px 17px 20px",
    background: "#F6F4EF",
    transition: "0.3s ease",

    "&:hover": {
      background: "#E9E1D5",
      padding: "30px 20px",

      [theme.fn.largerThan("md")]: {
        transform: "scale(1.08)",
        padding: "43px 30px",
      },
    },
  },
  subscribePrice: {
    borderTop: "1px solid #BCB1A1",
    padding: "15px 0 19px",
    marginTop: "22px",
  },
  text: {
    color: "#6A5757",
    fontSize: "14px",
    lineHeight: 1.42857,
    marginBottom: "20px",
  },
  per: {
    display: "block",
    fontSize: "14px",
    lineHeight: 1.42857,
    paddingLeft: "16px",
  },
}));

const Subscription = () => {
  const { classes } = useStyles();
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
        <Back href="#" />

        <Box>
          <Title order={1} size="h1" color="#45110B" mb="20px">
            Subscribe now
          </Title>

          <Tabs defaultValue="monthly" className="subscribe-tabs">
            <Tabs.List>
              <Tabs.Tab value="monthly">Monthly</Tabs.Tab>
              <Tabs.Tab value="annual">Annual</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="monthly">
              <Grid>
                <Grid.Col span={12} sm={6} md={3}>
                  <Box className={classes.subscribeBox}>
                    <Title order={2} size="h2">
                      Starter
                    </Title>
                    <Box className={classes.text} component="p">
                      Get started with us
                    </Box>
                    <ul className="plan-lists">
                      <li>Pay per classified</li>
                      <li>
                        <del>Events</del>
                      </li>
                      <li>
                        <del>VLA Access</del>
                      </li>
                    </ul>
                    <Box className={classes.subscribePrice}>
                      <Title order={3} size="h3" fw={600}>
                        $ Free
                      </Title>
                      <Box component="span" className={classes.per}>
                        per month
                      </Box>
                    </Box>
                    <Button className="btn-outline" size="lg" fullWidth>
                      Choose plan
                    </Button>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                  <Box className={classes.subscribeBox}>
                    <Title order={2} size="h2">
                      Basic
                    </Title>
                    <Box className={classes.text} component="p">
                      A basic account
                    </Box>
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
                    <Button className="btn-outline" size="lg" fullWidth>
                      Choose plan
                    </Button>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                  <Box className={classes.subscribeBox}>
                    <Title order={2} size="h2">
                      Pro
                    </Title>
                    <Box className={classes.text} component="p">
                      For the pro breeder
                    </Box>
                    <ul className="plan-lists">
                      <li>
                        <strong>$65</strong> of classified credit
                      </li>
                      <li>Events</li>
                      <li>
                        Up to <strong>10</strong> VLA
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
                    <Button className="btn-outline" size="lg" fullWidth>
                      Choose plan
                    </Button>
                  </Box>
                </Grid.Col>
                <Grid.Col span={12} sm={6} md={3}>
                  <Box className={classes.subscribeBox}>
                    <Title order={2} size="h2">
                      Premium
                    </Title>
                    <Box className={classes.text} component="p">
                      For the corporate breeder
                    </Box>
                    <ul className="plan-lists">
                      <li>
                        <strong>$140</strong> of classified credit
                      </li>
                      <li>Events</li>
                      <li>
                        <strong>Unlimited</strong> VLA
                      </li>
                    </ul>
                    <Box className={classes.subscribePrice}>
                      <Title order={3} size="h3" fw={600}>
                        $ 100
                      </Title>
                      <Box component="span" className={classes.per}>
                        per month
                      </Box>
                    </Box>
                    <Button className="btn-outline" size="lg" fullWidth>
                      Choose plan
                    </Button>
                  </Box>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
            <Tabs.Panel value="annual">Annual</Tabs.Panel>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Subscription;
