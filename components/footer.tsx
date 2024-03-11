import { createStyles, Container, Grid, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const useStyles = createStyles((theme) => ({
  footerLogo: {
    marginBottom: "30px",

    [theme.fn.largerThan("md")]: {
      marginBottom: 0,
    },
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  return (
    <footer id="footer">
      <div className="footer-top">
        <Container size="xl">
          <Box
            sx={(theme) => ({
              borderTop: "1px solid #EDEDED",
              padding: "28px 0",
            })}
          >
            <Grid justify="space-between">
              <Grid.Col span={12} md={8}>
                <Grid>
                  <Grid.Col span={12} md={4} lg={3} pt={0}>
                    <div className={`footer-logo ${classes.footerLogo}`}>
                      <Link href="/">
                        <Image
                          src="./logo.svg"
                          width={170}
                          height={41}
                          alt="YCP"
                        />
                      </Link>
                    </div>
                  </Grid.Col>
                  <Grid.Col span={12} md={8} lg={9} pt={0}>
                    <Grid>
                      <Grid.Col span={12} md={3} pt={0}>
                        <div className="col-wrap">
                          <ul className="footer-menu">
                            <li>
                              <Link href="#">Search</Link>
                            </li>
                            <li>
                              <Link href="#">Enquires</Link>
                            </li>

                            <li>
                              <Link href="/saved">Saved</Link>
                            </li>
                          </ul>
                        </div>
                      </Grid.Col>
                      <Grid.Col span={12} md={3} pt={0}>
                        <div className="col-wrap">
                          <ul className="footer-menu">
                            <li>
                              <Link href="/user-profile">My profile</Link>
                            </li>
                          </ul>
                        </div>
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Grid>
              </Grid.Col>

              <Grid.Col span={12} md={4}>
                <ul className="social-networks">
                  <li>
                    <Link href="#" rel="noopener">
                      <Image
                        src="./facebook.svg"
                        width={16}
                        height={16}
                        alt="Facebook"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" rel="noopener">
                      <Image
                        src="./instagram.svg"
                        width={16}
                        height={16}
                        alt="Instagram"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" rel="noopener">
                      <Image
                        src="./envelope.svg"
                        width={16}
                        height={16}
                        alt="Envelope"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="#" rel="noopener">
                      <Image
                        src="./at-regular.svg"
                        width={16}
                        height={16}
                        alt="At"
                      />
                    </Link>
                  </li>
                </ul>
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
      </div>

      <div className="footer-bottom">
        <Container size="xl">
          <Box
            sx={(theme) => ({
              borderTop: "1px solid #EDEDED",
              padding: "11px 0 15px",

              [theme.fn.largerThan("sm")]: {
                display: "flex",
                justifyContent: "space-between",
              },
            })}
          >
            <p
              style={{
                margin: 0,
                color: "#BCB1A1",
                fontSize: "12px",
                lineHeight: 1.416667,
              }}
            >
              &copy; 2021 Funaki. All right reserved.
            </p>

            <ul className="footer-bottom-menu">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="terms">Terms of Service</Link>
              </li>
            </ul>
          </Box>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
