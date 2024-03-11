import {
  createStyles,
  Accordion,
  Box,
  Button,
  Checkbox,
  Grid,
  Group,
  Input,
  Radio,
  RangeSlider,
  ScrollArea,
  Select,
  Slider,
  Title,
} from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  clearFilter: {
    position: "absolute",
    right: 0,
    top: "2px",
  },

  boxWrap: {
    maxWidth: "572px",
  },

  fieldBox: {
    borderBottom: "1px solid #E9E1D5",
    padding: "24px 0",
  },
}));

const SearchForm = () => {
  const { classes } = useStyles();
  return (
    <Box
      sx={(theme) => ({
        maxWidth: "923px",
        margin: "0 auto",
      })}
      className="search-form-block"
    >
      <Box
        sx={(theme) => ({
          position: "relative",
          paddingTop: 0,
        })}
        className={classes.fieldBox}
      >
        <Button
          className={`btn-link with-underline ${classes.clearFilter}`}
          size="md"
        >
          Clear all filters
        </Button>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Animal Type
        </Title>
        <Box className={classes.boxWrap}>
          <Select
            placeholder="Select"
            data={[
              { value: "cat", label: "Cat" },
              { value: "dog", label: "Dog" },
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
      </Box>
      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Breed
        </Title>
        <Box className={classes.boxWrap}>
          <Select
            placeholder="Select"
            data={[
              { value: "bengal", label: "Bengal" },
              { value: "ragdoll", label: "Ragdoll" },
            ]}
            rightSection={
              <Image
                src="/arrow_drop_down.svg"
                width={24}
                height={24}
                alt="dropdown"
              />
            }
            mb="16px"
          />
          <ul className="badge-with-close-lists">
            <li>
              <Button>
                <Image
                  src="/icon-close.svg"
                  width={24}
                  height={24}
                  alt="close"
                />
              </Button>
              Bengal
            </li>
            <li>
              <Button>
                <Image
                  src="/icon-close.svg"
                  width={24}
                  height={24}
                  alt="close"
                />
              </Button>
              Ragdoll
            </li>
          </ul>
        </Box>
      </Box>
      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Pure breed
        </Title>
        <Box className={classes.boxWrap}>
          <Checkbox.Group defaultValue={["any"]} withAsterisk>
            <Group mt="xs">
              <Checkbox value="any" label="Any" />
              <Checkbox value="purebred" label="Purebred" />
              <Checkbox value="crossbred" label="Crossbred" />
            </Group>
          </Checkbox.Group>
        </Box>
      </Box>

      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Location
        </Title>

        <Box className={classes.boxWrap}>
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
          <Box style={{ marginTop: "20px", marginBottom: "-15px" }}>
            <Image
              src="/icon-my-location.svg"
              width={24}
              height={24}
              alt="my location"
            />
            Use my location
          </Box>
        </Box>
      </Box>
      <Box className={classes.fieldBox} style={{ padding: 0, border: "none" }}>
        <Accordion
          defaultValue="new-south-wales"
          className="accordion-with-check"
        >
          <Accordion.Item value="new-south-wales">
            <Accordion.Control>
              {/* <Checkbox value="nsw" label="New South Wales" /> */}
              New South Wales
            </Accordion.Control>
            <Accordion.Panel>
              <ScrollArea h={224}>
                <Checkbox.Group defaultValue={[]}>
                  <Checkbox value="armidale" label="Armidale region" />
                  <Checkbox
                    value="bathurst-orange"
                    label="Bathurst-Orange region"
                  />
                  <Checkbox
                    value="central-coast"
                    label="Centeral Coast region"
                  />
                  <Checkbox value="coffs-harbor" label="Coffs Harbor region" />
                  <Checkbox
                    value="australian-capital"
                    label="Australian Capital Territory"
                  />
                  <Checkbox value="cooma" label="Cooma region" />
                </Checkbox.Group>
              </ScrollArea>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="victoria">
            <Accordion.Control>Victoria</Accordion.Control>
            <Accordion.Panel>
              <ScrollArea h={224}>
                <Checkbox.Group defaultValue={[]}>
                  <Checkbox value="armidale" label="Armidale region" />
                  <Checkbox
                    value="bathurst-orange"
                    label="Bathurst-Orange region"
                  />
                  <Checkbox
                    value="central-coast"
                    label="Centeral Coast region"
                  />
                  <Checkbox value="coffs-harbor" label="Coffs Harbor region" />
                  <Checkbox
                    value="australian-capital"
                    label="Australian Capital Territory"
                  />
                  <Checkbox value="cooma" label="Cooma region" />
                </Checkbox.Group>
              </ScrollArea>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="queensland">
            <Accordion.Control>Queensland</Accordion.Control>
            <Accordion.Panel>
              <ScrollArea h={224}>
                <Checkbox.Group defaultValue={[]}>
                  <Checkbox value="armidale" label="Armidale region" />
                  <Checkbox
                    value="bathurst-orange"
                    label="Bathurst-Orange region"
                  />
                  <Checkbox
                    value="central-coast"
                    label="Centeral Coast region"
                  />
                  <Checkbox value="coffs-harbor" label="Coffs Harbor region" />
                  <Checkbox
                    value="australian-capital"
                    label="Australian Capital Territory"
                  />
                  <Checkbox value="cooma" label="Cooma region" />
                </Checkbox.Group>
              </ScrollArea>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Box>
      <Box className={`range ${classes.fieldBox}`}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Range
        </Title>

        <Checkbox.Group defaultValue={["any"]}>
          <Checkbox value="any" label="Any" />
          <Checkbox value="5" label="5KM" />
          <Checkbox value="20" label="20KM" />
          <Checkbox value="50" label="50KM" />
          <Checkbox value="100" label="100KM" />
          <Checkbox value="250" label="250KM" />
          <Checkbox value="500" label="500KM" />
        </Checkbox.Group>
      </Box>
      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Price range
        </Title>

        <Box className={classes.boxWrap}>
          <RangeSlider
            defaultValue={[20, 80]}
            marks={[]}
            style={{ marginBottom: "24px" }}
          />
          <Grid>
            <Grid.Col span={12} sm={6}>
              <Box>
                <Select
                  label="Min"
                  placeholder="Select"
                  data={[
                    { value: "any", label: "Any" },
                    { value: "3months", label: "3 Months" },
                    { value: "6months", label: "6 Months" },
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
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <Box>
                <Select
                  label="Max"
                  placeholder="Select"
                  data={[
                    { value: "2500", label: "$2,500" },
                    { value: "3000", label: "$3,000" },
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
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Age range
        </Title>
        <Box className={classes.boxWrap}>
          <Grid>
            <Grid.Col span={12} sm={6}>
              <Box>
                <Select
                  label="Min"
                  placeholder="Select"
                  data={[
                    { value: "3months", label: "3 Months" },
                    { value: "6months", label: "6 Months" },
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
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <Box>
                <Select
                  label="Max"
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
            </Grid.Col>
          </Grid>
        </Box>
      </Box>
      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Gender
        </Title>
        <Box className={classes.boxWrap}>
          <Radio.Group name="gender">
            <Group mt="xs">
              <Radio value="any" label="Any" />
              <Radio value="male" label="Male" />
              <Radio value="female" label="Female" />
            </Group>
          </Radio.Group>
        </Box>
      </Box>
      <Box className={classes.fieldBox}>
        <Title order={4} size="h4" color="#45110B" mb="20px">
          Desexed
        </Title>
        <Box className={classes.boxWrap}>
          <Radio.Group name="desexed">
            <Group mt="xs">
              <Radio value="any" label="Any" />
              <Radio value="yes" label="Yes" />
              <Radio value="no" label="No" />
            </Group>
          </Radio.Group>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchForm;
