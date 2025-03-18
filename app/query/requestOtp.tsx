import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation RequestOtp($otpRequestData: OtpRequestDto!) {
  requestOtp(otpRequestData: $otpRequestData) {
    otpGeneratedSuccessfully
    otp
  }
}
`;
