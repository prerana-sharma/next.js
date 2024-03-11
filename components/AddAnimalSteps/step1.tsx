import {
  Box,
  Button,
  Modal,
  Select,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import Image from "next/image";
import Link from "next/link";
import AnimalAdded from "../Animals/animalAdded";

const Step1 = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
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

      <Title order={3} size="h4" mb="8px" color="#45110B">
        Additional information
      </Title>
      <Box>
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
          <Box>or</Box>
          <Title order={4} size="h4" color="#45110B" mt="24px">
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

          <Button className="btn-outline" size="lg" fullWidth mb="24px ">
            Add Image
          </Button>

          <Button size="lg" fullWidth>
            Continue
          </Button>
        </Modal>

        <Button className="btn-outline" mb={24} fullWidth size="lg">
          Add Dam/Mother
        </Button>

        <Title order={4} size="h4" color="#45110B" mb="18px">
          Add custom field
        </Title>
        <TextInput placeholder="title" label="Field title" mb="18px" />
        <TextInput placeholder="details" label="Field details" mb="18px" />

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
  );
};

export default Step1;
