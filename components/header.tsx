import { useMutation } from "@apollo/client";
import {
  createStyles,
  Container,
  Title,
  Box,
  Button,
  ScrollArea,
} from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { LOGOUT } from "../lib/graphql/auth/mutations";
import { clearAll, setAccessToken } from "../utils/localstorageHelper";
import { usePathname, useRouter } from "next/navigation";
const useStyles = createStyles((theme) => ({
  header: {
    position: "absolute",
    width: "100%",
    zIndex: 99,
    padding: "10px 0",
  },
  notificationCount: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    position: "absolute",
    top: "-5px",
    right: "-8px",
    background: "#fe8d0e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "12px",
    fontWeight: 500,
  },

  notificationDropdown: {
    position: "absolute",
    top: "100%",
    right: "0",
    width: "260px",
    borderRadius: "8px",
    boxShadow: "0 0 5px rgba(0,0,0,0.3)",
    padding: "10px",
    zIndex: 2,
    background: "#fff",
    marginTop: "10px",

    "& .title": {
      textAlign: "center",
      borderBottom: "1px solid #E0E0E0",
      paddingBottom: "5px",
    },
    // "& .notification-lists": {
    //   maxHeight: "224px",
    //   height: "100% !important",
    // },

    "& ul": {
      listStyle: "none",
      padding: "10px 0",
      margin: 0,
      "& li": {
        marginBottom: "10px",
        display: "flex",

        "& .img-wrap": {
          width: "46px",
          marginRight: "10px",
        },

        "& .text-wrap": {
          width: "calc(100% - 46px - 10px)",
        },
      },
    },

    "& .notification-footer": {
      textAlign: "center",
      borderTop: "1px solid #E0E0E0",
      paddingTop: "5px",
      fontSize: "14px",
    },
  },
}));

const notificationsData = [
  {
    image: "/img-chat1.png",
    title: "Submitted a report",
    desc: "lorem ipsum",
    created: "4 hours ago",
  },
  {
    image: "/img-chat2.png",
    title: "Submitted a report",
    desc: "lorem ipsum",
    created: "9 days ago",
  },
  {
    image: "/img-chat3.png",
    title: "Submitted a report",
    desc: "lorem ipsum",
    created: "13 days ago",
  },
  {
    image: "/img-chat4.png",
    title: "Submitted a report",
    desc: "lorem ipsum",
    created: "13 days ago",
  },
];

const Header = () => {
  const { classes } = useStyles();
  const [showNavigation, setShowNavigation] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.expires) {
        const jsonSessionData = JSON.parse(session.expires);
        if (jsonSessionData?.access_token) {
          setAccessToken(jsonSessionData.access_token);
        }
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [status, session]);

  const handleLogout = async () => {
    await logoutMutation();
  };

  const [logoutMutation] = useMutation(LOGOUT, {
    variables:{deviceId: ""},
    onCompleted: () => {
      clearAll();
      signOut({ redirect: false });
      setIsLoggedIn(false);
      router.push("/login");
    },
    onError: () => {},
  });

  const hideNavigation = () => {
    setShowNavigation(false);
    setIsNotificationOpen(false);
  };

  const handleNotification = () => {
    setShowNavigation(false);
    setIsNotificationOpen((prev) => !prev);
  };

  // Function to close the box
  const notificationClose = () => {
    setIsNotificationOpen(false);
  };

  // Event listener for outside clicks
  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef &&
      notificationRef.current &&
      event.target instanceof Node &&
      !notificationRef.current.contains(event.target)
    ) {
      notificationClose();
    }
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", (e) =>
      handleClickOutside(e as unknown as MouseEvent)
    );

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", (e) =>
        handleClickOutside(e as unknown as MouseEvent)
      );
    };
  }, [handleClickOutside]);

  return (
    <header id="header" className={classes.header}>
      <Container
        size="xl"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="logo">
          <Link href="/">
            <Image
              src="./logo.svg"
              width={170}
              height={41}
              alt="YCP"
              priority={true}
            />
          </Link>
        </div>

        <nav id="nav">
          <ul>
          {(path !== '/email-verification') &&
          (
            <>
            <li className="hide-mobile">
              <Link href="/search-home">
                <Image src="./Search.svg" width={24} height={24} alt="search" />
              </Link>
            </li>
            <li className="hide-mobile">
              <Link href="/chat">
                <Image src="./Chat.svg" width={24} height={24} alt="Chat" />
              </Link>
            </li>
            {/* <li className="hide-mobile">
              <Link href="#">
                <Image
                  src="./Calendar.svg"
                  width={24}
                  height={24}
                  alt="Calendar"
                />
              </Link>
            </li> */}
            {/* <li>
              <Link href="#">
                <Image
                  src="./Bookmark.svg"
                  width={24}
                  height={24}
                  alt="Bookmark"
                />
              </Link>
            </li> */}
            <li>
              <Box ref={notificationRef}>
                <Link href="#" onClick={handleNotification}>
                  <Image
                    src="./Alert.svg"
                    width={24}
                    height={24}
                    alt="Notification"
                  />

                  <Box className={classes.notificationCount}>3</Box>
                </Link>

                {isNotificationOpen && (
                  <Box className={classes.notificationDropdown}>
                    <Title
                      className="title"
                      order={2}
                      size="h4"
                      color="#45110B"
                    >
                      All Notification
                    </Title>
                    {notificationsData ? (
                      <ScrollArea className="notification-lists" h={224}>
                        <ul>
                          {notificationsData?.map((notification, index) => {
                            const { image, title, desc, created } =
                              notification;
                            return (
                              <li key={index}>
                                <Box className="img-wrap">
                                  <Image
                                    src={image}
                                    alt=""
                                    width={46}
                                    height={46}
                                  />
                                </Box>
                                <Box className="text-wrap">
                                  {desc && (
                                    <Box
                                      component="p"
                                      sx={{
                                        fontSize: "12px",
                                        marginBottom: "2px",
                                      }}
                                    >
                                      {desc}
                                    </Box>
                                  )}
                                  {title && (
                                    <Title
                                      order={3}
                                      size="14px"
                                      color="#45110B"
                                    >
                                      {title}
                                    </Title>
                                  )}
                                  <Box
                                    component="p"
                                    sx={{ fontSize: "12px", margin: 0 }}
                                  >
                                    {created}
                                  </Box>
                                </Box>
                              </li>
                            );
                          })}
                        </ul>
                      </ScrollArea>
                    ) : (
                      <Box
                        component="p"
                        sx={{
                          margin: 0,
                          padding: "10px 0",
                          textAlign: "center",
                        }}
                      >
                        No Notification Available
                      </Box>
                    )}

                    <Box className="notification-footer">
                      <Link href="/" className="btn-link">
                        View All
                      </Link>
                    </Box>
                  </Box>
                )}
              </Box>
            </li>
            </>
          )
          }
            <li>
              <Link
                href="#"
                onClick={() => setShowNavigation((prev) => !prev)}
                className={showNavigation ? "active" : ""}
              >
                {showNavigation ? (
                  <Image
                    src="./Dismiss.svg"
                    width={24}
                    height={24}
                    alt="navigation"
                  />
                ) : (
                  <Image
                    src="./Navigation.svg"
                    width={24}
                    height={24}
                    alt="navigation"
                  />
                )}
              </Link>

              {showNavigation && (
                <div className="user-dropdown">
                  <Title order={4} mb="14px" color="#45110B" pl="7px">
                    Settings
                  </Title>

                  
                  {(isLoggedIn) && (
                    <>
                      <ul>
                        <li>
                          <Link href="/user-profile" onClick={hideNavigation}>
                            <Image
                              src="./Person.svg"
                              width={24}
                              height={24}
                              alt="Profile"
                            />
                            <span>My profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/subscription" onClick={hideNavigation}>
                            <Image
                              src="./Star.svg"
                              width={24}
                              height={24}
                              alt="Star"
                            />
                            <span>Membership Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="payment-detail" onClick={hideNavigation}>
                            <Image
                              src="./Payment.svg"
                              width={24}
                              height={24}
                              alt="Payment"
                            />
                            <span>Payment details</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/subscription" onClick={hideNavigation}>
                            <Image
                              src="./Star.svg"
                              width={24}
                              height={24}
                              alt="Star"
                            />
                            <span>Notification Settings</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/change-password" onClick={hideNavigation}>
                            <Image
                              src="./Form.svg"
                              width={24}
                              height={24}
                              alt="Change password"
                            />
                            <span>Change Password</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/verify-profile" onClick={hideNavigation}>
                            <Image
                              src="./Star.svg"
                              width={24}
                              height={24}
                              alt="Star"
                            />
                            <span>Verify profile</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="#" onClick={hideNavigation}>
                            <Image
                              src="./Star.svg"
                              width={24}
                              height={24}
                              alt="Star"
                            />
                            <span>Refer a friends</span>
                          </Link>
                        </li>
                      </ul>

                      <Box>
                        <Link href="/login" style={{ color: "#6A5757" }} onClick={handleLogout}>
                          Log Out
                        </Link>
                      </Box>
                    </>
                  )}
                  {!(isLoggedIn) && (
                    <Box>
                      <Link href="/login" style={{ color: "#6A5757" }}>
                        Log in
                      </Link>
                    </Box>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
