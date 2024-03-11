/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  createStyles,
  Button,
  Container,
  Grid,
  TextInput,
  Box,
  Title,
  rem,
  PasswordInput,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import Link from "next/link";
import SignInSlider from "../../components/signInSlider";
import {
  completeNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { signIn } from "next-auth/react";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import lang from "../../constants/language";
import { EMAIL_VALIDATION, replaceString } from "../../utils/commonHelper";

const useStyles = createStyles((theme) => ({
  loginPage: {
    overflow: "hidden",
  },
  grid: {
    marginTop: 0,
    marginBottom: 0,
    [theme.fn.largerThan("md")]: {
      minHeight: "100vh",
      alignItems: "center",
    },
  },
  buttonApple: {
    backgroundColor: "black",
    color: "white",
  },
  colLogin: {
    zIndex: 0,
    position: "relative",
    paddingTop: "90px",
    paddingBottom: "60px",

    [theme.fn.largerThan("md")]: {
      padding: "90px 80px",
    },

    "&:before": {
      content: '""',
      position: "absolute",
      width: "100vw",
      top: "-33px",
      right: "-8px",
      bottom: 0,
      zIndex: -1,
      backgroundColor: "#E9E1D5",
      // display: "none",

      [theme.fn.largerThan("md")]: {
        display: "block",
        height: "auto",
        right: 0,
        top: "-9999px",
        width: "50vw",
        bottom: "-9999px",
      },
    },
  },
  colWrap: {
    backgroundColor: "white",
    borderRadius: "16px",
  },
  or: {
    display: "block",
    position: "relative",
    marginBottom: "20px",

    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: 0,
      width: "33%",
      height: "1px",
      background: "#EDE7F6",
    },

    "&:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: 0,
      width: "33%",
      height: "1px",
      background: "#EDE7F6",
    },
  },

  formWrap: {
    padding: "40px 20px",
    [theme.fn.largerThan("md")]: {
      padding: "40px",
      paddingBottom: "60px",
    },
    [theme.fn.largerThan("lg")]: {
      paddingBottom: "111px",
    },
  },

  colSlider: {
    padding: "40px 0",

    [theme.fn.largerThan("md")]: {
      padding: "90px 80px",
    },
  },

  slideTitle: {
    maxWidth: rem(320),
    margin: "0 auto",
  },

  slideImage: {
    borderRadius: rem(16),
    marginBottom: rem(30),
    objectFit: "contain",
    width: "100%",
    height: "auto",

    [theme.fn.largerThan("md")]: {
      // marginBottom: "88px",
      marginBottom: "80px",
    },
  },
}));

const Login = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const [token, setToken] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, '{field}', "Email")
          : EMAIL_VALIDATION.test(value)
          ? null
          : lang.INVALID_EMAIL,
      password: (value) => (value ? null : replaceString(lang.REQUIRED_VALIDATION, '{field}', "Password")),
    },
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    setToken(accessToken);
  }, [])

  const handleSubmit = async () => {
    setShowLoader(true);
    startNavigationProgress();
    const response = await signIn("credentials", {
      ...form.values,
      redirect: false,
      token :""
    });
    if (response?.ok) {
      router.push("/");
    }else{
      showNotification({
        message: lang.LOGIN_ERROR_MESSAGE || "",
        title: "Error!",
        color: "red",
      });
      setShowLoader(false);
    }
    
    completeNavigationProgress();
  };
  const handleAppleLogin = async (e)=>{
    e.preventDefault();
    await signIn("apple", { callbackUrl: '/create-account' });
  }
  
  return (
    <div className={classes.loginPage}>
      <Container size="xl">
        <Grid className={classes.grid}>
          <Grid.Col span={12} md={6} className={classes.colLogin}>
            <div className={classes.colWrap}>
              <div className={classes.formWrap}>
                <Box maw={358} mx="auto">
                  <Box
                    className="form-heading"
                    sx={(theme) => ({
                      textAlign: "center",
                    })}
                  >
                    <Title size="h1" align="center" mb="20px" color="#45110B">
                      Sign In
                    </Title>

                    <Button
                      className={classes.buttonApple}
                      leftIcon={
                        <Image
                          src="./appleLogo.svg"
                          alt="Apple icon"
                          width="24"
                          height="24"
                        />
                      }
                      styles={(theme) => ({
                        root: {
                          display: "block",
                          width: "100%",
                          borderRadius: "8px",
                          padding: "15px 8px",
                          height: "auto",
                          lineHeight: 1.25,
                          fontSize: "16px",
                          marginBottom: "20px",
                          color: "#F6F4EF",
                          backgroundColor: "black",

                          "&:hover": {
                            background: "rgba(0,0,0,0.7)",
                          },
                        },
                      })}
                      onClick={handleAppleLogin}
                    >
                      Sign in with Apple
                    </Button>
                    <span className={classes.or}>or</span>
                    <p>Sign in with Email Address</p>
                  </Box>
                  <form
                    onSubmit={form.onSubmit(() => handleSubmit())}
                  >
                    <TextInput
                      type="email"
                      placeholder="Email"
                      mb="20px"
                      {...form.getInputProps("email")}
                    />

                    <PasswordInput
                      placeholder="Password"
                      {...form.getInputProps("password")}
                      visibilityToggleIcon={({ reveal, size }) =>
                        reveal ? (
                          <Image
                            src="./visibilityOn.svg"
                            width="24"
                            height="24"
                            alt=""
                          />
                        ) : (
                          <Image
                            src="./visibilityOff.svg"
                            width="24"
                            height="24"
                            alt=""
                          />
                        )
                      }
                    />

                    <Box
                      sx={(theme) => ({
                        textAlign: "right",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      })}
                    >
                      <Link href="/forget-password" className="link">
                        Forgot password
                      </Link>
                    </Box>

                    <Button type="submit" fullWidth size="lg" disabled={showLoader}>
                      {!showLoader && "Sign in"}
                      {showLoader && <Loader color="orange" />}
                    </Button>
                  </form>

                  <Box
                    sx={(theme) => ({
                      textAlign: "center",
                      marginTop: "44px",
                    })}
                  >
                    <Title
                      size="p"
                      style={{ fontSize: "16px", fontWeight: "400" }}
                      mb={12}
                    >
                      Don't have a account
                    </Title>
                    <Button
                      component="a"
                      href="/register"
                      variant="outline"
                      size="lg"
                      className="btn-outline"
                      fullWidth
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <Box className={classes.colSlider} ta="center">
              <SignInSlider />
            </Box>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
