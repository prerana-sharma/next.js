"use client";
import { useState } from "react";
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
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import SearchForm from "../../components/search/searchForm";
import SearchResults from "../../components/search/searchResults";

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
}));

type ModalVisibility = {
  [key: string]: boolean;
};

const SearchMenu = () => {
  const { classes } = useStyles();
  const [modalVisibility, setModalVisibility] = useState<ModalVisibility>({});

  // Function to open a modal by ID
  const openModal = (modalId: string) => {
    setModalVisibility({ ...modalVisibility, [modalId]: true });
  };

  // Function to close a modal by ID
  const closeModal = (modalId: string) => {
    setModalVisibility({ ...modalVisibility, [modalId]: false });
  };

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
            <Title size="32px" color="#fff" mb="24px">
              Start your search
            </Title>

            <Box>
              <Tabs defaultValue="first">
                <Box className={classes.searchTab}>
                  <Tabs.List>
                    <Tabs.Tab value="first">Pets</Tabs.Tab>
                    <Tabs.Tab value="second">Livestock</Tabs.Tab>
                    <Tabs.Tab value="third">Breeders </Tabs.Tab>
                  </Tabs.List>

                  <Box className={classes.searchFilterWrap}>
                    <form>
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
                      />
                    </form>

                    <ul className="search-filter">
                      <li>
                        <a href="#">
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
                      Pure bred content goes here...
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
                      Location content goes here...
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
                      Price content goes here...
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
                      Age content goes here...
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

                <Tabs.Panel value="first">
                  <SearchForm />
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
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
                <Tabs.Panel value="third">Third panel</Tabs.Panel>
              </Tabs>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SearchMenu;
