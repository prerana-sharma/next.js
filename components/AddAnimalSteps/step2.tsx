import { useDisclosure } from "@mantine/hooks";
import { Modal, Box, Button, Title, Select } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import AnimalAdded from "../Animals/animalAdded";

const Step2 = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <Title order={3} size="h4" mb="8px" color="#45110B">
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
            mb="20px"
          />
        </Box>
        <Box component="span">or</Box>
        <Box>
          <Select
            label="Offspring recording certific...."
            placeholder="Send request form"
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
            my="20px"
          />
        </Box>

        <Button size="lg" fullWidth>
          Continue
        </Button>
      </Modal>

      <Button className="btn-outline" mb={24} fullWidth size="lg">
        Add Dam/Mother
      </Button>

      <Box mt="24px">
        <Link href="#">
          Skip step
          <Image
            src="/arrow-right-red.svg"
            width={16}
            height={12}
            alt="right arrow"
            style={{ marginLeft: "5px" }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Step2;
