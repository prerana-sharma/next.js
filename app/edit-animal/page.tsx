"use client";
import { useState, useRef } from "react";
import {
  createStyles,
  Button,
  Container,
  Textarea,
  Box,
  Title,
  TextInput,
  Select,
  Modal,
  Radio,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import Link from "next/link";
import Image from "next/image";
import AnimalAdded from "../..//components/Animals/animalAdded";
import { DateInput } from "@mantine/dates";
import Back from "../../components/btnBack";

const useStyles = createStyles((theme) => ({
  animalLists: {},
}));

const EditAnimal = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<any>();
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="add-animal-block"
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          <Back href="#" />
          <Box
            sx={(theme) => ({
              position: "relative",

              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                maxWidth: "571px",
              })}
            >
              <Title order={2} size="h2" mb="8px" color="#45110B">
                Add new animal
              </Title>

              <Box className={`animal-media-lists ${classes.animalLists}`}>
                <Box className="first-image img-wrap">
                  <Image
                    src="/img-media1.jpg"
                    width={136}
                    height={127}
                    alt="image description"
                  />
                </Box>
                <Box className="sub-images">
                  <Box className="img-wrap">
                    <Image
                      src="/img-media2.jpg"
                      width={64}
                      height={60}
                      alt="image description"
                    />
                  </Box>
                  <Box className="img-wrap">
                    <Image
                      src="/img-media-placeholder.jpg"
                      width={64}
                      height={60}
                      alt="image description"
                    />
                  </Box>
                  <Box className="img-wrap">
                    <Image
                      src="/img-media-placeholder.jpg"
                      width={64}
                      height={60}
                      alt="image description"
                    />
                  </Box>
                  <Box className="img-wrap">
                    <Image
                      src="/img-media2.jpg"
                      width={64}
                      height={60}
                      alt="image description"
                    />
                    <Button className="btn-play">
                      <Image
                        src="/icon-play.svg"
                        width={22}
                        height={24}
                        alt="icon play"
                      />
                    </Button>
                  </Box>
                  <Box className="img-wrap">
                    <Image
                      src="/img-media2.jpg"
                      width={64}
                      height={60}
                      alt="image description"
                    />
                  </Box>
                  <Box className="img-wrap">
                    <Image
                      src="/img-media2.jpg"
                      width={64}
                      height={60}
                      alt="image description"
                    />
                  </Box>
                </Box>
              </Box>

              <Box>
                <Button
                  component="a"
                  href="/add-media"
                  className="btn-outline"
                  size="lg"
                  fullWidth
                  mb="18px"
                >
                  Add media
                </Button>
                <Title order={3} size="h4" mb="8px" color="#45110B">
                  Animal details
                </Title>
                <Select
                  label="Animal listing name (optional)"
                  placeholder="Select"
                  data={[{ value: "bengal", label: "Bengal" }]}
                  rightSection={
                    <Image
                      src="/arrow_drop_down.svg"
                      width={24}
                      height={24}
                      alt="dropdown"
                    />
                  }
                  mb="18px"
                />
                <Textarea
                  placeholder="Description"
                  label="Description (optional)"
                  mb="24px"
                />
                <Box>
                  <Box className="title-with-tooltip">
                    <Title order={4} size="h4" mb="18px">
                      Show on my profile
                    </Title>
                    <Tooltip label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. A, vestibulum rutrum velit gravida.">
                      <Button className="tooltip">
                        <Image
                          src="/Info.svg"
                          width={24}
                          height={24}
                          alt="info icon"
                        />
                      </Button>
                    </Tooltip>
                  </Box>

                  <Radio.Group name="show-profile" className="radio-inline">
                    <Radio value="yes" label="Yes" />
                    <Radio value="no" label="No" />
                  </Radio.Group>
                </Box>

                <Title order={3} size="h4" mb="8px" color="#45110B">
                  Category
                </Title>
                <Select
                  label="Animal type"
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
                  mb="24px"
                />
                <Select
                  label="Suited for"
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
                  mb="24px"
                />
                <Select
                  label="Breed"
                  placeholder="Select"
                  data={[{ value: "bengal", label: "Bengal" }]}
                  rightSection={
                    <Image
                      src="/arrow_drop_down.svg"
                      width={24}
                      height={24}
                      alt="dropdown"
                    />
                  }
                  mb="24px"
                />
                <Select
                  label="Purebred"
                  placeholder="Purebred"
                  data={[{ value: "male", label: "Male" }]}
                  rightSection={
                    <Image
                      src="/arrow_drop_down.svg"
                      width={24}
                      height={24}
                      alt="dropdown"
                    />
                  }
                  mb="24px"
                />

                <Title
                  order={3}
                  size="h4"
                  pb="17px"
                  onClick={handleToggle}
                  color="#45110B"
                  className={`additional-info-opener${isOpen ? " active" : ""}`}
                >
                  Additional information
                </Title>
                <Box
                  className="additional-info"
                  ref={contentRef}
                  style={{
                    height: isOpen
                      ? `${contentRef.current.scrollHeight}px`
                      : "0",
                  }}
                >
                  <TextInput
                    placeholder="12223884"
                    label="Identification Number"
                    mb="24px"
                  />

                  <Select
                    label="Gender (optional)"
                    placeholder="Select"
                    data={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    rightSection={
                      <Image
                        src="/arrow_drop_down.svg"
                        width={24}
                        height={24}
                        alt="dropdown"
                      />
                    }
                    mb="24px"
                  />

                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Age
                  </Title>
                  <DateInput
                    valueFormat="DD/MM/YY"
                    label="DOB"
                    placeholder="03/04/21"
                    icon={
                      <Image
                        src="/icon-calendar-orange.svg"
                        width={24}
                        height={24}
                        alt="calendar"
                      />
                    }
                    mb="24px"
                  />
                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Genetic Reports
                  </Title>
                  <Button className="btn-outline" mb={24} fullWidth size="lg">
                    Add file
                  </Button>

                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Structural reports
                  </Title>
                  <Button className="btn-outline" mb={24} fullWidth size="lg">
                    Add file
                  </Button>

                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Awards achievements
                  </Title>
                  <Button className="btn-outline" mb={24} fullWidth size="lg">
                    Add file
                  </Button>

                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Add lineage details
                  </Title>

                  <AnimalAdded />

                  <Button
                    className="btn-outline"
                    onClick={open}
                    mb={24}
                    fullWidth
                    size="lg"
                  >
                    Add Sire/Father
                  </Button>

                  <Modal opened={opened} onClose={close} title="Add new field">
                    <Box>
                      <Select
                        label="Select animal"
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
                        mb="18px"
                      />
                    </Box>
                    <Box component="span">or</Box>
                    <Title order={4} size="h4" color="#45110B" my="24px">
                      Add basic animal information
                    </Title>
                    <Box>
                      <TextInput
                        placeholder="Name"
                        label="Animal listing name"
                        mb="18px"
                      />
                    </Box>

                    <AnimalAdded />

                    <Button
                      className="btn-outline"
                      size="lg"
                      fullWidth
                      mb="24px "
                    >
                      Add Image
                    </Button>

                    <Button size="lg" fullWidth>
                      Continue
                    </Button>
                  </Modal>

                  <Button
                    onClick={open}
                    className="btn-outline"
                    mb={24}
                    fullWidth
                    size="lg"
                  >
                    Add Dam/Mother
                  </Button>

                  <Title order={4} size="h4" color="#45110B" mb="18px">
                    Add custom field
                  </Title>
                  <TextInput
                    placeholder="title"
                    label="Field title"
                    mb="18px"
                  />
                  <TextInput
                    placeholder="details"
                    label="Field details"
                    mb="18px"
                  />

                  <Box style={{ marginBottom: "24px" }}>
                    <Link href="#" style={{ display: "flex" }}>
                      <Image
                        src="/add_circle_outline.svg"
                        width={24}
                        height={24}
                        alt="add"
                        style={{ marginRight: "5px" }}
                      />
                      Add supporting files
                    </Link>
                  </Box>

                  <Button className="btn-outline" mb={24} fullWidth size="lg">
                    Add new custom field
                  </Button>
                </Box>
              </Box>

              <Button type="submit" fullWidth size="lg">
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default EditAnimal;
