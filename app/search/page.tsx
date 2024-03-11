"use client";
import SearchForm from "../..//components/search/searchForm";
import SearchResults from "../../components/search/searchResults";
import {
  Box,
  Container,
  Input,
  Tabs,
  Title,
  createStyles,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  bannerImage: {
    width: "100%",
    objectFit: "cover",
  },

  searchTab: {
    background: "#F6F4EF",
    borderRadius: "8px",
    marginBottom: "34px",
    position: "relative",
  },

  searchFilterWrap: {
    maxWidth: "996px",
    margin: "0 auto",
    padding: "0 15px 20px",
  },

  searchGridWrap: {
    padding: "16px",
    backgroundColor: "#F6F4EF",
    borderRadius: "2px",
    color: "#6A5757",
  },

  searchGrid: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  fieldBox: {
    borderBottom: "1px solid #E9E1D5",
    padding: "24px 0",

    "& .mantine-Accordion-control": {
      paddingLeft: "0",
    },
  },

  popularSearchLists: {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    padding: "16px",
    borderRadius: "8px",
    background: "#fff",
    boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.15)",
    zIndex: 10,
    marginTop: "16px",

    "& ul": {
      margin: "0",
      listStyle: "none",
      padding: "0",
      "& li": {
        borderBottom: "1px solid #E9E1D5",
        padding: "10px 0",
        "& a": {},
      },
    },
  },
}));
const Search = () => {
  const { classes } = useStyles();
  const [searchFocus, setSearchFocus] = useState(false);
  const [dropdownFocus, setDropdownFocus] = useState(false);

  const handleSearchFocus = () => {
    setSearchFocus(true);
    setDropdownFocus(true);
  };

  const handleSearchBlur = () => {
    setSearchFocus(false);
  };

  const handleDropdownBlur = () => {
    setDropdownFocus(false);
  };
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="search-home-page search-filter-page"
    >
      <Container size="lg">
        <Box>
          <Tabs defaultValue="first">
            <Box className={classes.searchTab}>
              <Tabs.List>
                <Tabs.Tab value="first">Pets</Tabs.Tab>
                <Tabs.Tab value="second">Livestock</Tabs.Tab>
                <Tabs.Tab value="third">Breeders </Tabs.Tab>
              </Tabs.List>

              <Box className={classes.searchFilterWrap}>
                <form style={{ position: "relative" }}>
                  <Input
                    icon={
                      <Image
                        src="./Search-orange.svg"
                        width={20}
                        height={25}
                        alt="search"
                      />
                    }
                    placeholder="You choose...."
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                  />

                  {searchFocus && (
                    <div
                      className={`${classes.popularSearchLists} popular-search-lists`}
                      onBlur={handleDropdownBlur}
                    >
                      <Title
                        order={5}
                        size="h5"
                        color="#45110B"
                        fw="600"
                        mb="8px"
                      >
                        Popular searches
                      </Title>

                      <ul>
                        <li>
                          <Link href="#">
                            <Title order={6} size="h6" fw="400">
                              Dog
                            </Title>
                            <Box
                              component="p"
                              sx={{
                                color: "#BCB1A1",
                                fontSize: "14px",
                                lineHeight: "1.428571",
                                margin: "0",
                              }}
                            >
                              10,000 posts
                            </Box>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <Title order={6} size="h6" fw="400">
                              Dog
                            </Title>
                            <Box
                              component="p"
                              sx={{
                                color: "#BCB1A1",
                                fontSize: "14px",
                                lineHeight: "1.428571",
                                margin: "0",
                              }}
                            >
                              10,000 posts
                            </Box>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <Title order={6} size="h6" fw="400">
                              Dog
                            </Title>
                            <Box
                              component="p"
                              sx={{
                                color: "#BCB1A1",
                                fontSize: "14px",
                                lineHeight: "1.428571",
                                margin: "0",
                              }}
                            >
                              10,000 posts
                            </Box>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </form>
              </Box>
            </Box>

            <SearchForm />

            <Tabs.Panel value="first">{/* <SearchResults /> */}</Tabs.Panel>
            <Tabs.Panel value="second">Second panel</Tabs.Panel>
            <Tabs.Panel value="third">Third panel</Tabs.Panel>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default Search;
