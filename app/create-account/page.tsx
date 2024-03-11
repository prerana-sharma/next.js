"use client";
import {
  createStyles,
  Button,
  Container,
  Textarea,
  Box,
  Title,
  TextInput,
  rem,
  Text,
  Loader,
  FileInput,
  FileButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import Image from "next/image";
import Back from "../../components/btnBack";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { EMAIL_VALIDATION, replaceString } from "../../utils/commonHelper";
import lang from "../../constants/language";
import { showNotification } from "@mantine/notifications";
import { CREATE_USER_ACCOUNT } from "../../lib/graphql/auth/mutations";
import { useMutation } from "@apollo/client";
import GoogleAutoComplete from "../../components/googleAutoComplete";
import { v4 as uuidv4 } from "uuid";
import useImageUpload from "../../hooks/common/useImageUpload";
import BannerImageAdded from "../../components/BannerImageAdded";
import ImageCropperDialog from "../../hooks/common/useImageCropperDialog";

const useStyles = createStyles((theme) => ({
  setImage: {
    border: "2px solid #CB3E19",
    backgroundColor: "#F6F4EF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "16px",
    width: "87px",
    height: "87px",
    borderRadius: "50%",
  },
  addBannerImage: {
    border: "1px solid #FE8D0E",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#45110B",
    maxWidth: "343px",

    "&:hover": {
      textDecoration: "none",
    },
  },
  userImage: {
    borderRadius: "50%",
    width: "86px",
    height: "86px",
    marginRight: "16px",
  },
}));

const CreateAccount = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showLoader, setShowLoader] = useState(false);
  const [openCropper, setOpenCropper] = useState(false);
  const [openBannerCropper, setOpenBannerCropper] = useState(false);

  const [fileName, setFileName] = useState<string>("");
  const [file, setFile] = useState<File>();

  const [bannerFile, setBannerFile] = useState<File>();
  const [bannerFileName, setBannerFileName] = useState<string>(""); // Store the file name separately

  const { handleUpload, getImageFromAWS } = useImageUpload();
  const resetRef = useRef<() => void>(null);

  const userId = useRef("");
  const form = useForm({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      location: null,
      about: "",
      profileImage: "",
      bannerImage: "",
    },

    validate: {
      username: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Profile name"),
      firstName: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "First name"),
      lastName: (value) =>
        value
          ? null
          : replaceString(lang.REQUIRED_VALIDATION, "{field}", "Last name"),
      email: (value) =>
        !value
          ? replaceString(lang.REQUIRED_VALIDATION, "{field}", "Email")
          : EMAIL_VALIDATION.test(value)
          ? null
          : lang.INVALID_EMAIL,
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session) {
      const userDetails = JSON.parse(localStorage.getItem("user-info"));
      if (session?.user) {
        const jsonSessionData = session?.user;
        form.setValues({
          ...form,
          email: jsonSessionData.email,
        });
        userId.current = userDetails?._id;
      }
    }
  }, [session, status]);

  const [createAccount] = useMutation(CREATE_USER_ACCOUNT, {
    onCompleted: async (data) => {
      showNotification({
        message: data?.CreateUserAccount?.message,
        title: "Success!",
        color: "green",
      });
      router.push("/search-home");
    },
    onError: (error) => {
      showNotification({
        message: error.message,
        title: "Error!",
        color: "red",
      });
      setShowLoader(false);
    },
  });

  const submitHandler = async (values) => {
    setShowLoader(true);
    let profileKey = "";
    let bannerKey = "";
    if (file?.size > 0) {
      const uuid = uuidv4();
      // Split the file name by the dot character to get an array of parts
      const fileParts = fileName?.split(".");
      // Get the last part of the array, which is typically the file extension
      const fileExtension = fileParts[fileParts.length - 1];
      await handleUpload(
        file,
        `${userId.current}/images/profileImage/img_${uuid}.${fileExtension}`,
        fileExtension
      );
      profileKey = `${userId.current}/images/profileImage/img_${uuid}.${fileExtension}`;
    }
    if (bannerFile?.size) {
      const uuid = uuidv4();
      // Split the file name by the dot character to get an array of parts
      const fileParts = bannerFileName.split(".");
      // Get the last part of the array, which is typically the file extension
      const fileExtension = fileParts[fileParts.length - 1];
      await handleUpload(
        bannerFile,
        `${userId.current}/images/bannerImage/img_${uuid}.${fileExtension}`,
        fileExtension
      );
      bannerKey = `${userId.current}/images/bannerImage/img_${uuid}.${fileExtension}`;
    }
    await createAccount({
      variables: {
        body: {
          username: values?.username,
          firstName: values?.firstName,
          lastName: values?.lastName,
          location: values?.location,
          about: values?.about,
          deviceType: "",
          deviceId: "",
          token: "",
          profileImage: profileKey,
          bannerImage: bannerKey ? bannerKey : undefined,
        },
      },
    });
  };

  const clearFile = () => {
    form.setValues({
      ...form,
      bannerImage: "",
    });
    setBannerFileName("");
    setBannerFile(null);
    resetRef.current?.();
  };

  const handleCroppedData = async (cropDataBlob) => {
    const fileData = new File([cropDataBlob], `${uuidv4()}-cropped_image.png`, {
      type: "image/png",
    });
    form.setFieldValue("profileImage", URL.createObjectURL(fileData));
    setFile(fileData);
  };

  const handleCropperClose = () => {
    setOpenCropper(false);
    setOpenBannerCropper(false);
  };

  const handleBannerCroppedData = async (cropDataBlob) => {
    const fileData = new File([cropDataBlob], `${uuidv4()}-cropped_image.png`, {
      type: "image/png",
    });
    form.setFieldValue("bannerImage", URL.createObjectURL(fileData));
    setBannerFile(fileData);
  };

  return (
    <Box
      sx={(theme) => ({
        padding: "80px 0 60px",

        [theme.fn.largerThan("md")]: {
          padding: "81px 0",
        },
      })}
    >
      <Container size="xl">
        <Box
          sx={(theme) => ({
            maxWidth: "1164px",
            margin: "0 auto",
          })}
        >
          {/* <Back href="#" /> */}

          <Box
            sx={(theme) => ({
              [theme.fn.largerThan("md")]: {
                paddingLeft: "86px",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                maxWidth: "571px",
              })}
            >
              <Title size="h2" mb="20px" color="#45110B">
                Create your account
              </Title>
              <Text color="#6A5757" mb={23}>
                <p>Please fill out all required fields</p>
              </Text>
              <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
                <Box
                  sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #E9E1D5",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                    [theme.fn.smallerThan("md")]: {
                      flexWrap: "wrap",
                    },
                  })}
                >
                  <FileButton
                    accept="image/png,image/jpeg"
                    onChange={(file: any) => {
                      if (file) {
                        const uploadFile = file;
                        form.setFieldValue(
                          "profileImage",
                          URL.createObjectURL(uploadFile)
                        );
                        setFile(uploadFile);
                        setFileName(uploadFile.name);
                        setOpenCropper(true);
                      }
                    }}
                  >
                    {(props) =>
                      !fileName && (
                        <>
                          <a {...props} className={classes.setImage}>
                            <Image
                              src="./Add.svg"
                              width={28}
                              height={28}
                              alt="add"
                            />
                          </a>
                          <Box
                            sx={(theme) => ({
                              [theme.fn.smallerThan("md")]: {
                                width: "calc(100% - 87px - 16px)",
                              },
                            })}
                          >
                            <Title size="h6" fw={500} color="#CB3E19" mb={4}>
                              Set profile image
                            </Title>
                            <Title
                              size="p"
                              order={6}
                              fw={400}
                              color="#6A5757"
                              style={{ fontSize: "12px" }}
                            >
                              We reccomend something that describes your
                              business
                            </Title>
                          </Box>
                        </>
                      )
                    }
                  </FileButton>
                  {fileName && (
                    <>
                      <a href="#">
                        <Image
                          src={form?.values?.profileImage}
                          width={86}
                          height={86}
                          alt="User Image"
                          className={classes.userImage}
                        />
                      </a>
                      <Box
                        sx={(theme) => ({
                          [theme.fn.smallerThan("md")]: {
                            width: "calc(100% - 87px - 16px)",
                          },
                        })}
                      >
                        <FileButton
                          accept="image/png,image/jpeg"
                          onChange={(file: any) => {
                            if (file) {
                              const uploadFile = file;
                              form.setFieldValue(
                                "profileImage",
                                URL.createObjectURL(uploadFile)
                              );
                              setFile(uploadFile);
                              setFileName(uploadFile.name);
                              setOpenCropper(true);
                            }
                          }}
                        >
                          {(props) => (
                            <Title
                              {...props}
                              size="h6"
                              fw={500}
                              color="#CB3E19"
                              mb={4}
                            >
                              Change profile image
                            </Title>
                          )}
                        </FileButton>
                        <Title
                          size="p"
                          order={6}
                          fw={400}
                          color="#6A5757"
                          style={{ fontSize: "12px" }}
                        >
                          We reccomend something that describes your business
                        </Title>
                      </Box>
                    </>
                  )}
                </Box>

                <Box
                  sx={(theme) => ({
                    borderBottom: "1px solid #E9E1D5",
                    paddingBottom: "20px",
                    marginBottom: "20px",
                  })}
                >
                  <Title size="h5" mb={12}>
                    Add banner image
                  </Title>
                  <Title size="p" fw={400} mb={16}>
                    {`Add a banner image which will illuminate your home page and show people what you're about`}
                  </Title>
                  <FileButton
                    accept="image/png,image/jpeg"
                    onChange={(file: any) => {
                      if (file) {
                        const uploadFile = file;
                        form.setFieldValue(
                          "bannerImage",
                          URL.createObjectURL(uploadFile)
                        );
                        setBannerFile(uploadFile);
                        setBannerFileName(uploadFile.name);
                        setOpenBannerCropper(true);
                      }
                    }}
                  >
                    {(props) =>
                      !bannerFileName && (
                        <a {...props} className={classes.addBannerImage}>
                          <Image
                            src="./plus-black.svg"
                            width={24}
                            height={24}
                            alt="plus"
                            className="change-image"
                          />
                          Add banner image
                        </a>
                      )
                    }
                  </FileButton>
                  {bannerFileName && (
                    <>
                      <BannerImageAdded
                        imageFile={form?.values?.bannerImage}
                        clearFile={clearFile}
                      />
                      <FileButton
                        accept="image/png,image/jpeg"
                        onChange={(file: any) => {
                          if (file) {
                            const uploadFile = file;
                            form.setFieldValue(
                              "bannerImage",
                              URL.createObjectURL(uploadFile)
                            );
                            setBannerFile(uploadFile);
                            setBannerFileName(uploadFile.name);
                            setOpenBannerCropper(true);
                          }
                        }}
                      >
                        {(props) => (
                          <Button {...props} className="btn-link" size="lg">
                            Change banner image
                          </Button>
                        )}
                      </FileButton>
                    </>
                  )}
                </Box>
                <TextInput
                  placeholder="Profile name"
                  label="Profile name"
                  mb="20px"
                  {...form.getInputProps("username")}
                />

                <TextInput
                  placeholder="First name"
                  label="First name"
                  mb="20px"
                  {...form.getInputProps("firstName")}
                />

                <TextInput
                  placeholder="Last name"
                  label="Last name"
                  mb="20px"
                  {...form.getInputProps("lastName")}
                />

                <TextInput
                  disabled
                  type="email"
                  placeholder="Email"
                  label="Email"
                  mb="20px"
                  {...form.getInputProps("email")}
                />
                <Box mb={20}>
                  <Text size="sm">Location (optional)</Text>
                  <GoogleAutoComplete
                    name="location"
                    oldValue={form?.values?.location}
                    setFieldValue={form.setFieldValue}
                    error={form?.errors}
                    placeholder={"Location (optional)"}
                  />
                  {form.errors?.location && (
                    <Text c="red" size="xs">
                      {replaceString(
                        lang.REQUIRED_VALIDATION,
                        "{field}",
                        "Location"
                      )}
                    </Text>
                  )}
                </Box>

                <Textarea
                  placeholder="About(optional)"
                  label="About (optional)"
                  mb="20px"
                  {...form.getInputProps("about")}
                />

                <TextInput
                  type="tel"
                  placeholder="Phone (optional)"
                  label="Phone (optional)"
                  mb="20px"
                />

                <Button type="submit" fullWidth size="lg" disabled={showLoader}>
                  {!showLoader && "Next"}
                  {showLoader && <Loader color="orange" />}
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
        {openCropper && (
          <ImageCropperDialog
            openDialog={openCropper}
            imageUrl={form?.values?.profileImage}
            handleCroppedData={handleCroppedData}
            handleDialogClose={() => {
              handleCropperClose();
            }}
          />
        )}
        {openBannerCropper && (
          <ImageCropperDialog
            openDialog={openBannerCropper}
            imageUrl={form?.values?.bannerImage}
            handleCroppedData={handleBannerCroppedData}
            handleDialogClose={() => {
              handleCropperClose();
            }}
          />
        )}
      </Container>
    </Box>
  );
};

export default CreateAccount;
