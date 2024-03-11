"use client";
import {
  createStyles,
  Container,
  Box,
  Title,
  Radio,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { setLocalStorageKey } from "../../utils/localstorageHelper";
import { useRouter } from "next/navigation";

const useStyles = createStyles((theme) => ({
  imgPosition: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const SearchHome = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
    setLocalStorageKey("interest",value);
    router.push("/user-profile");
  };
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

          <Box
            sx={(theme) => ({
              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                maxWidth: "926px",
              })}
            >
              <Title size="h2" mb="20px" color="#45110B">
                You choose.....
              </Title>

              <Radio.Group
                value={value}
                onChange={(e)=>handleChange(e)}
              >
                <Box
                  sx={(theme) => ({
                    height: "343px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    padding: "40px",
                  })}
                  className="box-with-overlay"
                >
                  <Image
                    src="/img-home1.jpg"
                    width={926}
                    height={343}
                    alt="img1"
                    className={classes.imgPosition}
                  />
                  <Radio value="pets" />
                  <Box
                    sx={(theme) => ({
                      position: "relative",
                      zIndex: 1,
                      color: "#fff",
                      padding: "20px",
                      maxWidth: "365px",
                    })}
                  >
                    <Title size="h3" style={{ fontSize: "32px" }}>
                      Pets
                    </Title>
                    <p>
                      Search all pets listed for sale
                    </p>
                  </Box>
                </Box>
                <Box
                  sx={(theme) => ({
                    height: "343px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    padding: "40px",
                  })}
                  className="box-with-overlay"
                >
                  <Image
                    src="/img-home2.jpg"
                    width={926}
                    height={343}
                    alt="img1"
                    className={classes.imgPosition}
                  />
                  <Radio value="livestock" />
                  <Box
                    sx={(theme) => ({
                      position: "relative",
                      zIndex: 1,
                      color: "#fff",
                      padding: "20px",
                      maxWidth: "365px",
                    })}
                  >
                    <Title size="h3" style={{ fontSize: "32px" }}>
                      Livestock
                    </Title>
                    <p>
                      Search Livestock for sale
                    </p>
                  </Box>
                </Box>
                <Box
                  sx={(theme) => ({
                    height: "343px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    padding: "40px",
                  })}
                  className="box-with-overlay"
                >
                  <Image
                    src="/img-home3.jpg"
                    width={926}
                    height={343}
                    alt="img1"
                    className={classes.imgPosition}
                  />
                  <Radio value="breeders" />
                  <Box
                    sx={(theme) => ({
                      position: "relative",
                      zIndex: 1,
                      color: "#fff",
                      padding: "20px",
                      maxWidth: "365px",
                    })}
                  >
                    <Title size="h3" style={{ fontSize: "32px" }}>
                      Breeders
                    </Title>
                    <p>
                      Find specific breeders
                    </p>
                  </Box>
                </Box>
              </Radio.Group>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchHome;
