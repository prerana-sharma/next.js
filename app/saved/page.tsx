"use client";
import { useState } from "react";
import {
  createStyles,
  Box,
  Container,
  Title,
	Tabs,
} from "@mantine/core";
import SavedAnimals from "./savedAnimals";
import SavedBreeders from "./savedBreeders";

const useStyles = createStyles((theme) => ({
	searchTab: {
    borderRadius: "8px",
    marginBottom: "34px",
    position: "relative",
  },
}));

const Saved = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState("animals");

  const handleTabChange = (val) =>{
    setActiveTab(val)
  }

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "80px 0 60px",

          [theme.fn.largerThan("md")]: {
            padding: "127px 0",
          },
        })}
				className="saved-page"
      >
        <Container size="lg">
          <Box>
            <Title order={1} size="32px" color="#45110B" mb="18px">
              Saved
            </Title>
						<Box>
              <Tabs defaultValue="animals" value={activeTab} onTabChange={(e) => handleTabChange(e)}>
                <Box className={classes.searchTab}>
                  <Tabs.List>
                    <Tabs.Tab value="animals">Animals</Tabs.Tab>
                    <Tabs.Tab value="breeders">Breeders</Tabs.Tab>
                  </Tabs.List>
                </Box>

                <Tabs.Panel value="animals">
                  <SavedAnimals />
                </Tabs.Panel>
                <Tabs.Panel value="breeders">
                  <SavedBreeders />
                </Tabs.Panel>
              </Tabs>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Saved;
