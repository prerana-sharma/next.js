"use client";
import { useState } from "react";
import ChatListBox from "../../components/chat/chatListBox";
import {
  createStyles,
  Box,
  Button,
  Container,
  Grid,
  Title,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
import FullImageModal from "../../components/fullImageModal";

const chatLists = [
  {
    image: "/img-chat1.png",
    name: "Davis Davidson",
    desc: "Hey are the kittens still available...",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
  {
    image: "/img-chat2.png",
    name: "Madelyn Gouse",
    desc: "Let me send the form over",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
  {
    image: "/img-chat3.png",
    name: "Martin Carder",
    desc: "Hey",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
  {
    image: "/img-chat4.png",
    name: "Jocelyn Geidt",
    desc: "Hey are the kittens still available...",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
  {
    image: "/img-chat5.png",
    name: "Brandon Carder",
    desc: "Hey are the kittens still available...",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
  {
    image: "/img-chat6.png",
    name: "Marcus Dorwart",
    desc: "Any change I can meet you in personal lorem ipsum",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
  {
    image: "/img-chat1.png",
    name: "Paityn Vetrovs",
    desc: "How does the 21st sound?",
    breed: "Kittens 3 litter",
    type: "cat",
    desexed: "Desexed",
  },
];
const useStyles = createStyles((theme) => ({
  sideBar: {
    backgroundColor: "#F6F4EF",
    padding: "23px 12px",
  },
  chatContent: {
    backgroundColor: "#F6F4EF",
    padding: "16px",
    borderRadius: "4px",
    height: "100%",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #E9E1D5",
    paddingBottom: "16px",
  },
  action: {
    position: "relative",
  },
  btnForm: {
    padding: "0",
    borderRadius: "0",
    background: "transparent",
  },
  chatBox: {
    display: "flex",
  },
  img: {
    borderRadius: "50%",
    marginRight: "8px",
  },
  lastSeen: {
    color: "#6A5757",
    fontSize: "12px",
    lineHeight: 1.66667,
    display: "block",
  },
  status: {
    width: "8px",
    height: "8px",
    border: "2px solid #00c853",
    borderRadius: "50%",
  },
  active: {
    border: "2px solid #00c853",
  },
  away: {
    // border: "2px solid #FE8D0E",
    background: "#FE8D0E",
  },
}));

const Chat = () => {
  const { classes } = useStyles();
  const [isModalFormVisible, setModalFormVisible] = useState<boolean>(false);
  const [isModalMoreVisible, setModalMoreVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [showAction, setShowAction] = useState<boolean>(false);

  const closeFormModal = () => {
    setModalFormVisible(false);
  };

  const closeMoreModal = () => {
    setModalMoreVisible(false);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <Box
        sx={(theme) => ({
          padding: "80px 0 60px",

          [theme.fn.largerThan("md")]: {
            padding: "127px 0",
          },
        })}
        className="chat-block"
      >
        <Container size="lg">
          <Box>
            <Title order={1} size="32px" color="#45110B" mb="18px">
              Enquiries
            </Title>
            <Grid>
              <Grid.Col span={12} sm={4}>
                {chatLists && (
                  <Box className={classes.sideBar}>
                    {chatLists.map((chat, index) => {
                      return <ChatListBox chat={chat} key={index} />;
                    })}
                  </Box>
                )}
              </Grid.Col>

              <Grid.Col span={12} sm={8}>
                <Box className={classes.chatContent}>
                  <Box className={classes.chatHeader}>
                    <Box className={classes.chatBox}>
                      <Image
                        src="/img-chat1.png"
                        width={46}
                        height={46}
                        alt="image description"
                        className={classes.img}
                      />
                      <Box>
                        <Title
                          order={2}
                          size="h6"
                          fw={700}
                          color="#45110B"
                          mb="4px"
                          style={{ display: "flex" }}
                        >
                          Davis
                          <Box
                            style={{ margin: "4px 0 0 8px" }}
                            className={classes.status}
                          ></Box>
                        </Title>

                        <Box className={classes.lastSeen} component="span">
                          Last seen 2h ago
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.action}>
                      <Button
                        onClick={() => setModalFormVisible(true)}
                        className="btn-icon"
                        leftIcon={
                          <Image
                            src="/Form-Multiple.svg"
                            width={24}
                            height={24}
                            alt="Form"
                          />
                        }
                        mr="12px"
                      >
                        Form
                      </Button>
                      <Button
                        className="btn-icon"
                        leftIcon={
                          <Image
                            src="/More.svg"
                            width={24}
                            height={24}
                            alt="More"
                          />
                        }
                        onClick={() => setShowAction((prev) => !prev)}
                      >
                        Action
                      </Button>

                      {showAction && (
                        <Box className="more-box">
                          <ul>
                            <li>
                              <Button
                                size="lg"
                                onClick={() => setModalMoreVisible(true)}
                              >
                                <Image
                                  src="/Important.svg"
                                  width={24}
                                  height={24}
                                  alt="report"
                                />
                                Report problem
                              </Button>
                            </li>
                          </ul>
                        </Box>
                      )}
                    </Box>

                    <Modal
                      title="Select form"
                      opened={isModalFormVisible}
                      onClose={closeFormModal}
                      className="modal-large"
                    >
                      <Box>
                        <Select
                          label="Form"
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
                        <Button size="lg" fullWidth>
                          Send
                        </Button>
                      </Box>
                    </Modal>

                    <Modal
                      title="Report user"
                      opened={isModalMoreVisible}
                      onClose={closeMoreModal}
                      className="modal-large"
                    >
                      <Box>
                        <Select
                          label="Select reason"
                          placeholder="Select reason"
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
                          mb="20px"
                        />
                        <Textarea
                          placeholder="Message"
                          label="Message"
                          mb="24px"
                        />
                        <Button size="lg" fullWidth>
                          Send
                        </Button>
                      </Box>
                    </Modal>
                  </Box>

                  <Box onClick={openModal} mt="30px">
                    <Image
                      src="/img1.jpg"
                      width={375}
                      height={278}
                      alt="image description"
                      style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* <Modal
        className="image-modal"
        opened={opened}
        onClose={close}
        title="Focus demo"
      >
        <Button>test</Button>
        <Image
          src="/img-chat.png"
          width={535}
          height={1024}
          alt="image description"
        />
      </Modal> */}
      <FullImageModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default Chat;
