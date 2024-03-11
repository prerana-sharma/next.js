"use client";
import {
  createStyles,
  Button,
  Container,
  TextInput,
  Box,
  Title,
  Text,
  Grid,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import OTP from "./otp";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { OTP_VERIFICATION_MUTATION, RESEND_FORGOTPASSWORD_OTP, RESEND_OTP, VERIFY_RESETPASSWORD_OTP } from "../../lib/graphql/auth/mutations";
import { showNotification } from "@mantine/notifications";
import { setAccessToken, setRefreshToken, setUserInfo } from "../../utils/localstorageHelper";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import ChangeEmailModal from "./changeEmailModal";

const useStyles = createStyles((theme) => ({}));

const EmailVerification = () => {
	const router = useRouter();
  const { classes } = useStyles();
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
  const resetPasswordEmail= useRef("");
  const passwordEmail= useRef("");
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("user-info"))
    resetPasswordEmail.current = localStorage.getItem("reset-password-email");
    const pass = localStorage.getItem("q");
    passwordEmail.current = atob(pass);
    if(resetPasswordEmail?.current){
      setEmail(resetPasswordEmail?.current);
    }else{
      setEmail(userDetails?.email);
    }
  }, [])

  const handleOTPChange = (newOTP) => {
    setOTP(newOTP);
  };

  // Effect to update the timer every second
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable the button when the timer reaches 0
    }

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleSubmit = async (event) => {
    setShowLoader(true);
    event.preventDefault();
    resetPasswordEmail?.current ? await otpForgotVerification(): await otpEmailVerification()
  };

  const [otpEmailVerification, { data, loading, error }] = useMutation(
    OTP_VERIFICATION_MUTATION,
    {
      variables: {
        body: {
          verificationCode: otp,
          email: email,
        },
      },
      onCompleted: async(data) => {
				showNotification({
					message: data.verifyEmail.message,
					title: "Success!",
					color: "green",
				});
				setAccessToken(data.verifyEmail?.token?.accessToken);
        setRefreshToken(data?.verifyEmail?.token?.refreshToken);
        setUserInfo(data.verifyEmail?.user);
        const response = await signIn("credentials", {
          email: email,
          password: passwordEmail.current,
          redirect: false,
          token :""
        });
        if (response?.ok) {
          localStorage.removeItem("q");
        }
        router.push("/create-account");
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

  const [otpForgotVerification] = useMutation(
    VERIFY_RESETPASSWORD_OTP,
    {
      variables: {
        body: {
          verificationCode: otp,
          email: email,
        },
      },
      onCompleted: (data) => {
				showNotification({
					message: "Code verified successfully",
					title: "Success!",
					color: "green",
				});
          const payload = {
            email : resetPasswordEmail?.current,
            code: data.verifyResetPasswordOTP.code
          }
          const queryVal = btoa(JSON.stringify(payload));
          localStorage.removeItem("reset-password-email");
          router.push(`/change-password?val=${queryVal}`);
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
  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleResendCode = async () => {
    resetPasswordEmail?.current ? await resendForgotPasswordOTP(): await resendOTP()
  };

  const [ resendOTP ] = useMutation(RESEND_OTP, {
    variables: {
      body: {
        deviceId: "1234web",
        email: email,
      },
    },
    onCompleted: (data) => {
      showNotification({
        message: data.resendLoginOTP.message,
        title: "Success!",
        color: "green",
      });

      setIsResendDisabled(true);

      setTimer(120);
    },
    onError: (data) => {
      showNotification({
        message: data.message,
        title: "Error!",
        color: "red",
      });
    },
  });
  const [ resendForgotPasswordOTP ] = useMutation(RESEND_FORGOTPASSWORD_OTP, {
    variables: {
      body: {
        deviceId: "1234web",
        email: email,
      },
    },
    onCompleted: (data) => {
      showNotification({
        message: data.resendOtpForgotPassword.message,
        title: "Success!",
        color: "green",
      });

      setIsResendDisabled(true);

      setTimer(120);
    },
    onError: (data) => {
      showNotification({
        message: data.message,
        title: "Error!",
        color: "red",
      });
    },
  });
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const updateEmail = (newEmail) => {
    setEmail(newEmail);
    setTimer(120);
  };
  return (
    <Box
      className="mobile-verification-page"
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
      <Container size="xl" style={{ width: "100%" }}>
        <Box
          sx={(theme) => ({
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "40px 20px",
            maxWidth: "508px",
            margin: "0 auto",

            [theme.fn.largerThan("md")]: {
              padding: "40px 75px",
            },
          })}
        >
          <Title size="h1" mb="20px" color="#45110B">
            Email Verification
          </Title>
          <Text maw={259} color="#6A5757">
            <p>We have sent you a mail with a code to the email</p>
          </Text>
          <Title size="h2" mb="20px" color="#45110B">
            {email}
          </Title>
          {!resetPasswordEmail?.current && (
            <Box fw="500" mb="20px">
            <Link href="#" className="link-underline" onClick={openModal}>
              Change email
            </Link>
          </Box>
          )}
          <form onSubmit={handleSubmit}>
            
          <OTP otp={otp} onOTPChange={handleOTPChange} />
            <Box fw="500" mb="20px">
              <Link href="#" className={isResendDisabled ? 'link-underline disabled-link' : 'link-underline'} onClick={handleResendCode}>
                {isResendDisabled ? formatTimer(timer) : "Send a new code"}
              </Link>
            </Box>

            <Button type="submit" fullWidth size="lg" disabled={(showLoader || !otp)}>
              {!showLoader && "Submit"}
              {showLoader && <Loader color="orange" />}
            </Button>
          </form>
        </Box>
      </Container>
      {showModal && (
        <ChangeEmailModal
          isOpen={showModal}
          oldEmail={email}
          closeModal={closeModal}
          updateEmail={updateEmail}
        />
      )}
    </Box>
  );
};

export default EmailVerification;
