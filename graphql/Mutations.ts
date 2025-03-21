import { gql } from "@apollo/client";

export const RegisterUser = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Launch]!
  }
`;

export const REQUEST_OTP = gql`
  mutation RequestOtp($otpRequestData: OtpRequestDto!) {
    requestOtp(otpRequestData: $otpRequestData) {
      otpGeneratedSuccessfully
      otp
    }
  }
`;

export const Login = gql`
  mutation Login($loginData: ValidateDto!) {
    login(loginData: $loginData) {
      user {
        id
      }
      accessToken
    }
  }
`;
