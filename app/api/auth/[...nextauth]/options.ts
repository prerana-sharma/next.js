import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import client from "../../../../apolloConfig";
import { LOGIN_QUERY, LOGIN_WITH_APPLE, REFRESH_QUERY } from "../../../../lib/graphql/auth/mutations";
import AppleProvider from 'next-auth/providers/apple';

type LoginCast = {
	email: string;
	password: string;
	token: string
};

interface UserDataType {
	id: string;
	email?: string;
}

async function refreshAccessToken(tokenObject) {
  try {
    const tokenResponse = await client.mutate({
      mutation: REFRESH_QUERY,
      variables: {
        refreshToken: tokenObject.refresh_token,
      },
    });

    return {
      expires_at: tokenResponse?.data?.refresh?.accessTokenExpiresIn,
      refresh_token: tokenResponse?.data?.refresh?.refreshToken,
      access_token: tokenResponse?.data?.refresh?.accessToken,
    };
  } catch (error) {
    throw new Error("RefreshTokenError");
  }
}

export const options: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			type: "credentials",
			credentials: {},
			authorize: async (credentials, req) => {
				const { email, password, token } = credentials as LoginCast;
				try {
					const response = await client.mutate({
						mutation: LOGIN_QUERY,
						variables: {
							body:{
								email,
								password,
								deviceId: "1234web",
								deviceType: "browser",
								token
							}
						},
					});
					if (response?.errors) {
						throw new Error(response?.errors[0].message);
					}
					if (response?.data) {
						const returnData = response?.data?.loginUser;
						if (returnData) {
							return {
								...returnData.user,
								expires_at: returnData.token?.accessTokenExpiresIn,
								refresh_token: returnData.token?.refreshToken,
								access_token: returnData.token?.accessToken,
							};
						}

						return null;
					}
				} catch (e: any) {
					throw new Error(e);
				}
			},
		}),
		AppleProvider({
			clientId: process.env.APPLE_CLIENT_ID,
			clientSecret: process.env.APPLE_SECRET,
			profile: async (profile, tokens) => {
			  try {
				const { id_token } = tokens;
				const { data } = await client.mutate({
				  mutation: LOGIN_WITH_APPLE,
				  variables: {
					idToken: id_token,
					deviceId: "",
					deviceType: "",
					token: "",
					userType:"SELLER"
				  },
				});
				if (data?.loginWithApple) {
				  const responseData = data.loginWithApple;
	  
				  return {
					...data.loginWithApple.user,
					access_token: responseData.token.accessToken,
					expires_at: responseData.token.accessTokenExpiresIn,
					refresh_token: responseData.token.refreshToken,
					id: profile.sub,
				  };
				}
	  
				return null;
			  } catch (error) {
					console.log('error', error);
			  }
			},
		}),
	],
	  
	cookies: {
		pkceCodeVerifier: {
			name: 'next-auth.pkce.code_verifier',
			options: {
				httpOnly: true,
				sameSite: 'none',
				path: '/',
				secure: true,
			},
		},
		callbackUrl: {
			name: `__Secure-next-auth.callback-url`,
			options: {
				httpOnly: false,
				sameSite: 'none',
				path: '/',
				secure: true,
			},
		},
		sessionToken: {
			name: `__Secure-next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: true
			}
		},
		state: {
			name: `next-auth.state`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				secure: true,
				maxAge: 900
			},
		},
	},

	pages: {
		signIn: "/login",
		signOut: "/login",
		// error: "",
		newUser: "/",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			const currentToken: any = token;
			if (user && account) {
				// Save the access token and refresh token in the JWT on the initial login
				const userDetail: any = { ...user };
				return {
					access_token: account.access_token,
					expires_at: userDetail?.expires_at,
					refresh_token: userDetail?.refresh_token,
					sub: JSON.stringify(userDetail),
				};
			} else if (Date.now() < new Date(currentToken?.expires_at).getTime()) {
				// If the access token has not expired yet, return it
				return token;
			} else {
				// If the access token has expired, try to refresh it
				try {
					const tokens = await refreshAccessToken(token);
					if (!tokens) throw tokens;

					return {
						...token, // Keep the previous token properties
						access_token: tokens.access_token,
						expires_at: tokens.expires_at,
						// Fall back to old refresh token, but note that
						// many providers may only allow using a refresh token once.
						refresh_token: tokens.refresh_token ?? token.refresh_token,
					};
				} catch (error) {
					console.error("Error refreshing access token", error);
					// The error property will be used client-side to handle the refresh token error
					return { ...token, error: "RefreshAccessTokenError" as const };
				}
			}
		},
		async session({ session, token }) {
			session.expires = token.sub || "";
			const user = JSON.parse(token.sub || "");
			const userData: UserDataType = {
				id: user?._id,
				email: user?.email,
			};
			session.user = userData;
			const userSession: any = { ...session };
			userSession.error = token.error;

			return userSession;
		},
	},
}