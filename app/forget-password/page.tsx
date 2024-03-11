"use client";
import {
  Button,
  Container,
  TextInput,
  Box,
  Title,
  Text,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { EMAIL_VALIDATION, replaceString } from "../../utils/commonHelper";
import lang from "../../constants/language";
import {
  startNavigationProgress,
  completeNavigationProgress,
} from "@mantine/nprogress";
import { FORGOT_PASSWORD } from "../../lib/graphql/auth/mutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";
import { setLocalStorageKey } from "../../utils/localstorageHelper";
import { useState } from "react";

const ForgetPassword = () => {
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      deviceId: "1234web"
    },

    validate: {
      email: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, '{field}', "Email")
          : EMAIL_VALIDATION.test(value)
          ? null
          : lang.INVALID_EMAIL,
    },
  });

  const [forgotPassword] = useMutation(
    FORGOT_PASSWORD,
    {
      variables: {
        body: form.values,
      },
      onCompleted: (data) => {
        showNotification({
          message: data.forgotPassword.message,
          title: "Success!",
          color: "green",
        });
        setLocalStorageKey("reset-password-email", form?.values?.email)
        router.push("/email-verification");
      },
      onError: (error) => {
        showNotification({
					message: error.message,
					title: "Error!",
					color: "red",
				});
        setShowLoader(false);
      },
    }
  );

  const submitHandler = async (values) => {
    setShowLoader(true);
    form.setValues(values);
    startNavigationProgress();
    await forgotPassword();
    completeNavigationProgress();
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: "#E9E1D5",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "90px 0",
        },
      })}
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px 20px",

            [theme.fn.largerThan("md")]: {
              padding: "40px 75px",
            },
          })}
        >
          <Title size="h1" mb="20px" color="#45110B">
            Forgot your password?
          </Title>
          <Text maw={259} color="#6A5757">
            <p>
              You will receive an email that will help you create a new password
              for your account.
            </p>
          </Text>
          <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
            <TextInput
              type="email"
              placeholder="Email"
              label="Email"
              mb="20px"
              {...form.getInputProps("email")}
            />

            <Box fw="500" mb="20px">
              <Link href="/login" className="link-underline">
                Remembered your password?
              </Link>
            </Box>

            <Button type="submit" fullWidth size="lg" disabled={showLoader}>
              {!showLoader && "Submit"}
              {showLoader && <Loader color="orange" />}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgetPassword;
