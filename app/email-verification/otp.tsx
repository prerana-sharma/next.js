import OtpInput from "react-otp-input";

export default function OTP({ otp, onOTPChange }) {
  return (
    <OtpInput
      value={otp}
      onChange={onOTPChange}
      numInputs={4}
      containerStyle="otp-wrapper"
      renderInput={(props) => <input {...props} />}
    />
  );
}
