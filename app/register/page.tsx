"use client";
import {
  createStyles,
  Button,
  Container,
  Grid,
  TextInput,
  PasswordInput,
  Box,
  Title,
  Text,
  rem,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import SignInSlider from "../../components/signInSlider";
import PhoneInput from "react-phone-input-2";
import Link from "next/link";
import { validatePassword } from "../../utils/passwordHelper";
import lang from "../../constants/language";
import { replaceString } from "../../utils/commonHelper";
import { useMutation } from "@apollo/client";
import { REGISTER_MUTATION } from "../../lib/graphql/auth/mutations";
import { setAccessToken, setLocalStorageKey, setRefreshToken, setUserInfo } from "../../utils/localstorageHelper";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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
}));

const Register = () => {
  const router = useRouter();
  const { classes } = useStyles();
  const [alert, setAlert] = useState<{
    message: string;
    title: any;
    color: string;
  } | null>(null);

  const form = useForm({
    initialValues: {
      mobile: "",
      email: "",
      password: "",
      repeatPassword: "",
      userType: "SELLER",
      deviceId: "1234web"
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : lang.INVALID_EMAIL),
      password: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, '{field}', "Password")
          : value.length < 8
          ? lang.PASSWORD_VALIDATION
          : !validatePassword(value)
          ? lang.PASSWORD_VALIDATION
          : null,
        repeatPassword: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, '{field}', "Repeate password")
          : value === form.values.password
          ? null
          : lang.REPEATE_PASSWORD,
    },
  });

  const [userRegister,{loading: registerLoader}] = useMutation(REGISTER_MUTATION, {
    variables: {
      body: {
        deviceId: form.values.deviceId,
        email: form.values.email,
        password: form.values.password,
        mobile: form.values.mobile,
        userType: "SELLER"
      },
    },
    onCompleted: (data) => {
      showNotification({
        message: data.registerUser.message,
        title: "Success!",
        color: "green",
      });

      setUserInfo({
        email: form.values.email,
      });
      setLocalStorageKey("q", btoa(form.values.password));

      setAccessToken(data?.registerUser?.token?.accessToken);
      setRefreshToken(data?.registerUser?.token?.refreshToken);
      router.push("/email-verification");
    },
    onError: (error) => {
      showNotification({
        message: error?.message || "",
        title: "Error!",
        color: "red",
      });
    },
  });

  const handleSubmit = async (values) => {
    form.setValues(values);
    await userRegister();
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
                    onSubmit={form.onSubmit((values) => handleSubmit(values))}
                  >
                    <Box className="tel-input" mb="20px">
                      <label htmlFor="tel">Mobile (option)</label>
                      <PhoneInput
                        country={"au"}
                        placeholder="Mobile (option)"
                        inputProps={{
                          name: "mobile",
                          autoFocus: true,
                          placeholder: "Mobile (option)",
                        }}
                        {...form.getInputProps("mobile")}
                      />
                    </Box>
                    <TextInput
                      type="email"
                      placeholder="Email"
                      label="Email"
                      mb="20px"
                      {...form.getInputProps("email")}
                    />

                    <PasswordInput
                      placeholder="Password"
                      label="New password"
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

                    <PasswordInput
                      placeholder="Repeat Password"
                      label="Repeat password"
                      {...form.getInputProps("repeatPassword")}
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

                    <Button type="submit" fullWidth size="lg" disabled={registerLoader}>
                      {!registerLoader && "Submit"}
                      {registerLoader && <Loader color="orange" />}
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
                      Already have an account
                    </Title>
                    <Button
                      component="a"
                      href="/login"
                      variant="outline"
                      size="lg"
                      className="btn-outline"
                      fullWidth
                    >
                      Login
                    </Button>

                    <Text mt="20px">
                      <p style={{ margin: 0 }}>
                        By pressing next you are agreeing to our <br />
                        <Link href="/terms" style={{ color: "#000" }}>
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy-policy" style={{ color: "#000" }}>
                          Privacy Policy
                        </Link>
                      </p>
                    </Text>
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

export default Register;
