"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  Modal,
  Select,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import Back from "../../components/btnBack";

const AddForms = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
      className="add-forms-block"
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
              className="add-edit-form"
            >
              <Title order={2} size="h2" mb="8px" color="#45110B">
                Add form
              </Title>
              <TextInput placeholder="Form name" label="Form name" mb="20px" />

              <Title order={3} size="h4" mb="18px" color="#45110B">
                Form Details
              </Title>
              <Box className="field-with-delete">
                <TextInput placeholder="First name" />
                <Button className="btn-delete">Delete</Button>
              </Box>
              <Box className="field-with-delete">
                <TextInput placeholder="Last name" />
                <Button className="btn-delete">Delete</Button>
              </Box>
              <Box className="field-with-delete">
                <TextInput type="email" placeholder="email" />
                <Button className="btn-delete">Delete</Button>
              </Box>
              <Box className="field-with-delete">
                <Checkbox.Group defaultValue={["cat"]} label="Select">
                  <Checkbox value="cat" label="Cat" />
                  <Checkbox value="dog" label="Dog" />
                </Checkbox.Group>
                <Button className="btn-delete">Delete</Button>
              </Box>
              <Button
                onClick={open}
                className="btn-outline"
                fullWidth
                size="lg"
                mb="24px"
              >
                Add new field
              </Button>
              <Button fullWidth size="lg">
                Add new
              </Button>

              <Modal
                className="add-edit-modal modal-large"
                opened={opened}
                onClose={close}
                title="Add new field"
              >
                <Box>
                  <Select
                    label="Type"
                    placeholder="Select"
                    data={[
                      { value: "input", label: "Basic input" },
                      { value: "lInput", label: "Large input" },
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
                <Textarea
                  placeholder="Field text"
                  label="Field text"
                  mb="20px"
                />

                <Title order={4} size="h4" color="#45110B" mb="20px">
                  Dropdown items
                </Title>
                <Box className="field-with-delete">
                  <TextInput
                    label="Checkbox item one"
                    placeholder="Checkbox text"
                  />
                  <Button className="btn-delete">Delete</Button>
                </Box>
                <Button
                  className="btn-outline"
                  size="lg"
                  fullWidth
                  leftIcon={
                    <Image
                      src="./icon-plus.svg"
                      width={24}
                      height={24}
                      alt="add Icon"
                    />
                  }
                  color="#45110B"
                  mb="24px"
                >
                  Add new
                </Button>

                <Button size="lg" fullWidth>
                  Save
                </Button>
              </Modal>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AddForms;
