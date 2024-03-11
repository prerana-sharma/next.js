"use client";
import { useEffect, useState } from "react";
import {
  createStyles,
  Container,
  Box,
  Title,
  Tabs,
  Grid,
  Input,
  Button,
  Modal,
  ScrollArea,
  Checkbox,
  Radio,
  Group,
  Select,
  Accordion,
} from "@mantine/core";
import Image from "next/image";
import SearchResults from "../components/search/searchResults";
import Link from "next/link";
import Animals from "../components/Animals/animals";
import AnimalsForSale from "../components/Animals/animalsForSale";
import { useSession } from "next-auth/react";
import { setAccessToken } from "../utils/localstorageHelper";
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

type ModalVisibility = {
  [key: string]: boolean;
};

const Home = () => {
  const { classes } = useStyles();
  const [modalVisibility, setModalVisibility] = useState<ModalVisibility>({});
  const [searchFocus, setSearchFocus] = useState(false);
  const [dropdownFocus, setDropdownFocus] = useState(false);
  const [activeTab, setActiveTab] = useState("pets");

  const { data: session, status } = useSession();

  useEffect(()=>{
    const selectedInterest = localStorage.getItem("interest")
    selectedInterest && setActiveTab(selectedInterest);
    if(status === "authenticated" && session){
      if (session?.expires) {
        const jsonSessionData = JSON.parse(session.expires);
        if (jsonSessionData?.access_token) {
          setAccessToken(jsonSessionData.access_token);
        }
      }
    }
  }, [status, session])

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

  // Function to open a modal by ID
  const openModal = (modalId: string) => {
    setModalVisibility({ ...modalVisibility, [modalId]: true });
  };

  // Function to close a modal by ID
  const closeModal = (modalId: string) => {
    setModalVisibility({ ...modalVisibility, [modalId]: false });
  };
  const handleTabChange = (val) =>{
    setActiveTab(val)
  }

  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="search-home-page"
    >
      <Box className="has-overlay">
        <Image
          src="/search-banner.jpg"
          width={1440}
          height={410}
          alt="search banner image"
          className={classes.bannerImage}
        />
      </Box>
      <Box
        sx={(theme) => ({
          marginTop: "-192px",
        })}
      >
        <Container size="xl">
          <Box
            sx={(theme) => ({
              maxWidth: "1164px",
              margin: "0 auto",
            })}
          >
            <Title
              size="32px"
              color="#fff"
              mb="24px"
              style={{ position: "relative", zIndex: "1" }}
            >
              Start your search
            </Title>

            <Box>
              <Tabs defaultValue={activeTab} value={activeTab} onTabChange={(e) => handleTabChange(e)}>
                <Box className={classes.searchTab}>
                  <Tabs.List >
                    <Tabs.Tab value="pets">Pets</Tabs.Tab>
                    <Tabs.Tab value="livestock">Livestock</Tabs.Tab>
                    <Tabs.Tab value="breeders">Breeders </Tabs.Tab>
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

                    <ul className="search-filter">
                      <li>
                        <a href="/search">
                          <Image
                            src="./icon-option.svg"
                            width={24}
                            height={24}
                            alt="setting"
                          />
                        </a>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-type")}>
                          Animal
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-breed")}>
                          Breed
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("pure-bred")}>
                          Pure Bred
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-location")}>
                          Location
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-price")}>
                          Price
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-age")}>
                          Age
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-gender")}>
                          Gender
                        </button>
                      </li>
                      <li>
                        <button onClick={() => openModal("animal-desexed")}>
                          Desexed
                        </button>
                      </li>
                    </ul>

                    <Modal
                      title="Animal type"
                      opened={modalVisibility["animal-type"]}
                      onClose={() => closeModal("animal-type")}
                      className="modal-large search-filter-modal"
                    >
                      <Box>
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
                          mb="24px"
                        />
                        <ScrollArea h={250}>
                          <Checkbox.Group defaultValue={["cat"]}>
                            <Checkbox value="dog" label="Dog" />
                            <Checkbox value="cat" label="Cat" />
                            <Checkbox value="fish" label="Fish" />
                            <Checkbox value="bird" label="Bird" />
                            <Checkbox value="guinipig" label="Guinipig" />
                            <Checkbox value="lizard" label="Lizard" />
                            <Checkbox value="porcupine" label="Porcupine" />
                            <Checkbox value="pig" label="Pig" />
                          </Checkbox.Group>
                        </ScrollArea>
                        <Box
                          style={{ padding: "16px 0 0", textAlign: "right" }}
                        >
                          <Button className="btn-link" size="lg">
                            Done
                          </Button>
                        </Box>
                      </Box>
                    </Modal>

                    <Modal
                      title="Animal Breed"
                      opened={modalVisibility["animal-breed"]}
                      onClose={() => closeModal("animal-breed")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <ScrollArea h={250}>
                        <Checkbox.Group defaultValue={["bengal"]}>
                          <Checkbox value="bengal" label="Bengal" />
                          <Checkbox value="ragdoll" label="Ragdoll" />
                          <Checkbox value="bulldog" label="Bulldog" />
                        </Checkbox.Group>
                      </ScrollArea>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      title="Pure Bred"
                      opened={modalVisibility["pure-bred"]}
                      onClose={() => closeModal("pure-bred")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <ScrollArea h={250}>
                        <Checkbox.Group defaultValue={[]}>
                          <Checkbox value="any" label="Any" />
                          <Checkbox value="purbred" label="Purebred" />
                          <Checkbox value="crossbred" label="Crossbred" />
                        </Checkbox.Group>
                      </ScrollArea>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      title="Animal Location"
                      opened={modalVisibility["animal-location"]}
                      onClose={() => closeModal("animal-location")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <Box
                        className={classes.fieldBox}
                        style={{ padding: 0, border: "none" }}
                      >
                        <Accordion defaultValue="new-south-wales">
                          <Accordion.Item value="new-south-wales">
                            <Accordion.Control>
                              <Checkbox value="nsw" label="New South Wales" />
                            </Accordion.Control>
                            <Accordion.Panel>
                              <ScrollArea h={224}>
                                <Checkbox.Group defaultValue={[]}>
                                  <Checkbox
                                    value="armidale"
                                    label="Armidale region"
                                  />
                                  <Checkbox
                                    value="bathurst-orange"
                                    label="Bathurst-Orange region"
                                  />
                                  <Checkbox
                                    value="central-coast"
                                    label="Centeral Coast region"
                                  />
                                  <Checkbox
                                    value="coffs-harbor"
                                    label="Coffs Harbor region"
                                  />
                                  <Checkbox
                                    value="australian-capital"
                                    label="Australian Capital Territory"
                                  />
                                  <Checkbox
                                    value="cooma"
                                    label="Cooma region"
                                  />
                                </Checkbox.Group>
                              </ScrollArea>
                            </Accordion.Panel>
                          </Accordion.Item>
                          <Accordion.Item value="victoria">
                            <Accordion.Control>
                              <Checkbox value="viv" label="Victoria" />
                            </Accordion.Control>
                            <Accordion.Panel>
                              <ScrollArea h={224}>
                                <Checkbox.Group defaultValue={[]}>
                                  <Checkbox
                                    value="armidale"
                                    label="Armidale region"
                                  />
                                  <Checkbox
                                    value="bathurst-orange"
                                    label="Bathurst-Orange region"
                                  />
                                  <Checkbox
                                    value="central-coast"
                                    label="Centeral Coast region"
                                  />
                                  <Checkbox
                                    value="coffs-harbor"
                                    label="Coffs Harbor region"
                                  />
                                  <Checkbox
                                    value="australian-capital"
                                    label="Australian Capital Territory"
                                  />
                                  <Checkbox
                                    value="cooma"
                                    label="Cooma region"
                                  />
                                </Checkbox.Group>
                              </ScrollArea>
                            </Accordion.Panel>
                          </Accordion.Item>
                          <Accordion.Item value="queensland">
                            <Accordion.Control>
                              <Checkbox value="ql" label="Queensland" />
                            </Accordion.Control>
                            <Accordion.Panel>
                              <ScrollArea h={224}>
                                <Checkbox.Group defaultValue={[]}>
                                  <Checkbox
                                    value="armidale"
                                    label="Armidale region"
                                  />
                                  <Checkbox
                                    value="bathurst-orange"
                                    label="Bathurst-Orange region"
                                  />
                                  <Checkbox
                                    value="central-coast"
                                    label="Centeral Coast region"
                                  />
                                  <Checkbox
                                    value="coffs-harbor"
                                    label="Coffs Harbor region"
                                  />
                                  <Checkbox
                                    value="australian-capital"
                                    label="Australian Capital Territory"
                                  />
                                  <Checkbox
                                    value="cooma"
                                    label="Cooma region"
                                  />
                                </Checkbox.Group>
                              </ScrollArea>
                            </Accordion.Panel>
                          </Accordion.Item>
                        </Accordion>
                      </Box>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      title="Animal Price"
                      opened={modalVisibility["animal-price"]}
                      onClose={() => closeModal("animal-price")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <Box>
                        <Select
                          label="Price"
                          placeholder="Select"
                          data={[
                            { value: "2500", label: "2500" },
                            { value: "3000", label: "3000" },
                          ]}
                          rightSection={
                            <Image
                              src="/arrow_drop_down.svg"
                              width={24}
                              height={24}
                              alt="dropdown"
                            />
                          }
                        />
                      </Box>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      title="Animal Age"
                      opened={modalVisibility["animal-age"]}
                      onClose={() => closeModal("animal-age")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <Box>
                        <Select
                          label="Age"
                          placeholder="Select"
                          data={[
                            { value: "1year", label: "1 Year" },
                            { value: "2year", label: "2 Years" },
                          ]}
                          rightSection={
                            <Image
                              src="/arrow_drop_down.svg"
                              width={24}
                              height={24}
                              alt="dropdown"
                            />
                          }
                        />
                      </Box>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      title="Animal Gender"
                      opened={modalVisibility["animal-gender"]}
                      onClose={() => closeModal("animal-gender")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <Radio.Group>
                        <Group>
                          <Radio value="any" label="Any" />
                          <Radio value="male" label="Male" />
                          <Radio value="female" label="Female" />
                        </Group>
                      </Radio.Group>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                    <Modal
                      title="Animal Desexed"
                      opened={modalVisibility["animal-desexed"]}
                      onClose={() => closeModal("animal-desexed")}
                      className="modal-large search-filter-modal"
                    >
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
                        mb="24px"
                      />
                      <Radio.Group>
                        <Radio value="any" label="Any" />
                        <Radio value="yes" label="Yes" />
                        <Radio value="no" label="No" />
                      </Radio.Group>
                      <Box style={{ padding: "16px 0 0", textAlign: "right" }}>
                        <Button className="btn-link" size="lg">
                          Done
                        </Button>
                      </Box>
                    </Modal>
                  </Box>
                </Box>

                <Tabs.Panel value="pets">
                  <SearchResults />
                  <Box>
                    <Title size="h2" mb="24px" color="#45110B">
                      Recent saved searches
                    </Title>
                  </Box>

                  <Grid>
                    <Grid.Col
                      className={`search-grid ${classes.searchGrid}`}
                      mb="24px"
                      span={12}
                      sm={6}
                    >
                      <Box className={classes.searchGridWrap}>
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                            marginBottom: "6px",
                          })}
                        >
                          <Title size="h4" mb="8" color="#45110B">
                            Bengal, Ragdoll
                          </Title>
                          <Box
                            component="span"
                            sx={(theme) => ({
                              margin: "0 5px",
                              color: "#BCB1A1",
                            })}
                          >
                            |
                          </Box>
                          <Title size="h4" mb="8" color="#45110B">
                            Cat
                          </Title>
                        </Box>
                        <ul>
                          <li>Purebred</li>
                          <li>Desexed</li>
                          <li>3mo - 1yr</li>
                          <li>$1000 - 2000</li>
                        </ul>
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                          })}
                        >
                          <Image
                            src="./Location.svg"
                            width={16}
                            height={16}
                            alt="location"
                            style={{ margin: "3px 5px  0 0 " }}
                          />
                          <p style={{ marginBottom: 0 }}>NSW 100km Distance</p>
                        </Box>
                      </Box>
                    </Grid.Col>
                    <Grid.Col
                      className={`search-grid ${classes.searchGrid}`}
                      mb="24px"
                      span={12}
                      sm={6}
                    >
                      <Box className={classes.searchGridWrap}>
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                            marginBottom: "6px",
                          })}
                        >
                          <Title size="h4" mb="8" color="#45110B">
                            Bengal, Ragdoll
                          </Title>
                          <Box
                            component="span"
                            sx={(theme) => ({
                              margin: "0 5px",
                              color: "#BCB1A1",
                            })}
                          >
                            |
                          </Box>
                          <Title size="h4" mb="8" color="#45110B">
                            Cat
                          </Title>
                        </Box>
                        <ul>
                          <li>Purebred</li>
                          <li>Desexed</li>
                          <li>3mo - 1yr</li>
                          <li>$1000 - 2000</li>
                        </ul>
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                          })}
                        >
                          <Image
                            src="./Location.svg"
                            width={16}
                            height={16}
                            alt="location"
                            style={{ margin: "3px 5px  0 0 " }}
                          />
                          <p style={{ marginBottom: 0 }}>NSW 100km Distance</p>
                        </Box>
                      </Box>
                    </Grid.Col>
                    <Grid.Col
                      className={`search-grid ${classes.searchGrid}`}
                      mb="24px"
                      span={12}
                      sm={6}
                    >
                      <Box className={classes.searchGridWrap}>
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                            marginBottom: "6px",
                          })}
                        >
                          <Title size="h4" mb="8" color="#45110B">
                            Bengal, Ragdoll
                          </Title>
                          <Box
                            component="span"
                            sx={(theme) => ({
                              margin: "0 5px",
                              color: "#BCB1A1",
                            })}
                          >
                            |
                          </Box>
                          <Title size="h4" mb="8" color="#45110B">
                            Cat
                          </Title>
                        </Box>
                        <ul>
                          <li>Purebred</li>
                          <li>Desexed</li>
                          <li>3mo - 1yr</li>
                          <li>$1000 - 2000</li>
                        </ul>
                        <Box
                          sx={(theme) => ({
                            display: "flex",
                          })}
                        >
                          <Image
                            src="./Location.svg"
                            width={16}
                            height={16}
                            alt="location"
                            style={{ margin: "3px 5px  0 0 " }}
                          />
                          <p style={{ marginBottom: 0 }}>NSW 100km Distance</p>
                        </Box>
                      </Box>
                    </Grid.Col>
                  </Grid>
                </Tabs.Panel>
                <Tabs.Panel value="livestock">
                  <AnimalsForSale />
                </Tabs.Panel>
                <Tabs.Panel value="breeders">
                  <Animals />
                </Tabs.Panel>
              </Tabs>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
