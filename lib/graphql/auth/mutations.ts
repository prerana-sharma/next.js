import { gql } from "@apollo/client";
import exp from "constants";

export const REGISTER_MUTATION = gql`
  mutation registerUser($body: RegisterUserInput!){
    registerUser(body:$body){
      message
      user{
        _id
        email
        userType
      }
      token{
				accessToken
				accessTokenExpiresIn
				refreshToken
				refreshTokenExpiresIn
			}
    }
  }
`;

export const OTP_VERIFICATION_MUTATION = gql`
	mutation verifyEmail($body: VerifyEmailInput!){
		verifyEmail(body: $body){
			message
			user{
				_id
				email
			}
			token{
				accessToken
				accessTokenExpiresIn
				refreshToken
				refreshTokenExpiresIn
			}
		}
	}
`;

export const RESEND_OTP = gql`
  mutation resendLoginOTP($body:RequestLoginOTPInput!){
		resendLoginOTP(body: $body){
			message
			expiry{
				expiresBy
			}
		}
	}
`;
export const LOGIN_QUERY = gql`
	mutation loginUser($body: LoginEmailPasswordInput!){
		loginUser(body: $body){
			message
			token{
			accessToken
			refreshToken
			accessTokenExpiresIn
			refreshTokenExpiresIn
			}
			user{
			_id
			email
			}
		}
  }
`;
export const REFRESH_QUERY = gql`
	mutation refresh($refreshToken: String!){
		refresh(refreshToken: $refreshToken){
			accessToken
			refreshToken
			accessTokenExpiresIn
			refreshTokenExpiresIn
		}
	}
`;
export const FORGOT_PASSWORD = gql`
	mutation forgotPassword($body: ForgotPasswordInput!){
		forgotPassword(body: $body){
			message
			expiry{
			expiresBy
			expiresAt
			}
		} 
  }
`;
export const CHANGE_PASSWORD = gql`
	mutation ChangeForgotPassword($body: ChangeResetPasswordInput!){
		ChangeForgotPassword(body: $body){
			message
		}
	}
`;

export const VERIFY_RESETPASSWORD_OTP = gql`
	mutation verifyResetPasswordOTP($body: VerifyResetPasswordOtpInput!){
		verifyResetPasswordOTP(body: $body){
			message
			code
		}
	}
`;
export const LOGIN_WITH_APPLE = gql`
  mutation loginWithApple($idToken: String!, $deviceId: String!, $deviceType: String!, $token: String!, $userType:userType!) {
    loginWithApple(idToken: $idToken, deviceId: $deviceId, deviceType: $deviceType, token:$token, userType: $userType) {
      message
      user {
        _id
        email
      }
      token {
        accessToken
        accessTokenExpiresIn
        refreshToken
        refreshTokenExpiresIn
      }
    }
  }
`;
export const LOGOUT = gql`
	mutation logout($deviceId: String!){
		logout(deviceId: $deviceId){
			message
		}
  }
`;
export const RESEND_FORGOTPASSWORD_OTP = gql`
	mutation resendOtpForgotPassword($body:ForgotPasswordInput!){
		resendOtpForgotPassword(body: $body){
			message
			expiry{
				expiresBy
			}
		}
  }
`;

export const CHANGE_EMAIL = gql`
	mutation ChangeEmail($body: ChangeEmailInput!) {
		changeEmail(body: $body) {
			message
			expiry {
				expiresBy
				expiresAt
			}
		}
  }
`;

export const CREATE_USER_ACCOUNT = gql`
	mutation CreateUserAccount($body: CreateSellerAccountInput!) {
		CreateUserAccount(body: $body) {
			referralLink
			referralCode
			message
			cometAuthToken
		}
	}
`;