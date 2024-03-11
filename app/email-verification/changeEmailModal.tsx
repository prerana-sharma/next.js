import { useState } from "react";
import { useForm } from "@mantine/form";
import { useMutation } from "@apollo/client";
import { showNotification } from "@mantine/notifications";
import { Box, Button, Checkbox, Container, Input, Loader, Modal, ScrollArea, Text, TextInput, Title } from "@mantine/core";
import { EMAIL_VALIDATION, replaceString } from "../../utils/commonHelper";
import lang from "../../constants/language";
import { CHANGE_EMAIL } from "../../lib/graphql/auth/mutations";

type ChangeEmailModalPropsType = {
  isOpen: boolean;
  oldEmail: string;
  closeModal: () => void;
  updateEmail: (email: string) => void;
};

const ChangeEmailModal: React.FC<ChangeEmailModalPropsType> = ({
  isOpen,
  oldEmail,
  closeModal,
  updateEmail,
}) => {
	const [showLoader, setShowLoader] = useState(false);
  const form = useForm({
    initialValues: {
      oldEmail,
			email: oldEmail,
			deviceId:'1234web'
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

  const [changeEmail] = useMutation(CHANGE_EMAIL, {
    onCompleted: (data) => {
      updateEmail(form?.values?.email);
      showNotification({
        message: data?.changeEmail?.message,
        title: "Success!",
        color: "green",
      });
      closeModal();
			setShowLoader(false);
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
    form.setValues(values);
		setShowLoader(true);
    changeEmail({
      variables: {
        body: {
          ...values
        },
      },
    });
  };

  return (
    <Modal
			title="Change Email"
			opened={isOpen}
			onClose={closeModal}
			className="modal-large search-filter-modal"
		>
			<form onSubmit={form.onSubmit((values) => submitHandler(values))}>
			<Text color="#6A5757">
				<p>
					{`We will send you an OTP with code to email ${form?.values?.oldEmail}.`}
				</p>
			</Text>
				<TextInput
					type="email"
					placeholder="Email"
					label="Email"
					mb="20px"
					{...form.getInputProps("email")}
				/>

				<Button type="submit" fullWidth size="lg" disabled={showLoader}>
					{!showLoader && "Submit"}
					{showLoader && <Loader color="orange" />}
				</Button>
			</form>
		</Modal>
  );
};

export default ChangeEmailModal;
