"use client";
import {
  Button,
  Container,
  PasswordInput,
  Box,
  Title,
  rem,
  Text,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";
import { validatePassword } from "../../utils/passwordHelper";
import { replaceString } from "../../utils/commonHelper";
import lang from "../../constants/language";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/localstorageHelper";
import { CHANGE_PASSWORD } from "../../lib/graphql/auth/mutations";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'

const ChangePassword = () => {
  const params = useSearchParams();
  const val = params.get('val')?? "";
  const [initial, setInitial] = useState<any>({});
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const form = useForm({
    initialValues: {
      password: "",
      new_password: "",
    },

    validate: {
      password: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, '{field}', "Password")
          : value.length < 8
          ? lang.PASSWORD_VALIDATION
          : !validatePassword(value)
          ? lang.PASSWORD_VALIDATION
          : null,
      new_password: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, '{field}', "Repeat password")
          : value === form.values.password
          ? null
          : lang.REPEATE_PASSWORD,
    },
  });
  useEffect(() => {
    let queryVal= {};
    if(val){
      queryVal = JSON.parse(atob(val));
    }
    setInitial(queryVal);
  }, [])

  const [changePassword, { data, loading, error }] = useMutation(
    CHANGE_PASSWORD,
    {
      variables: {
        body: {
          email: initial?.email,
          password: form.values.password,
          verificationCode: initial?.code,
        }
      },
      onCompleted: (data) => {
        showNotification({
          message: data?.ChangeForgotPassword?.message,
          title: "Success!",
          color: "green",
        });
        router.push("/login");
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
    await changePassword();
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
            Change your password?
          </Title>
          <Text maw={259} color="#6A5757">
            <p>
              You will receive an email that will help you create a new password
              for your account.
            </p>
          </Text>
          <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
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
              {...form.getInputProps("new_password")}
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

export default ChangePassword;
