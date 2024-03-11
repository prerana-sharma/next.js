"use client";
import { createStyles, Box, Title } from "@mantine/core";
import Image from "next/image";
import { FunctionComponent } from "react";

type chatCard = {
  image: string;
  name: string;
  desc: string;
  breed: string;
  type: string;
  desexed: string;
};

const useStyles = createStyles((theme) => ({
  sideListBox: {
    padding: "16px 0",
    borderBottom: "1px solid #E9E1D5",
    display: "flex",
  },
  descText: {
    fontSize: "12px",
    color: "#6A5757",
    lineHeight: 1.41666,
    marginBottom: "8px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  img: {
    marginRight: "16px",
    borderRadius: "50%",
  },
  type: {
    fontSize: "12px",
    lineHeight: 1.41666,
    color: "#45110B",
  },
}));

const ChatListBox: FunctionComponent<{ chat: chatCard }> = ({ chat }) => {
  //   console.log(chat);
  const { image, name, desc, breed, type, desexed } = chat;

  const { classes } = useStyles();
  return (
    <Box className={classes.sideListBox}>
      <Image
        className={classes.img}
        src={image}
        width="46"
        height="46"
        alt="image description"
      />
      <Box>
        <Title order={3} size="h5" mb="8px" color="#45110B" fw="600">
          {name}
        </Title>
        <Box className={classes.descText}>{desc}</Box>
        <Box className={classes.type}>
          {breed} | {type} | {desexed}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatListBox;
