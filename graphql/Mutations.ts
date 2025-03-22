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

export const AddOrganization = gql`
  mutation CreateOrganization(
    $createOrganizationInput: CreateOrganizationDto!
  ) {
    createOrganization(createOrganizationInput: $createOrganizationInput) {
      description
      id
      name
      status
    }
  }
`;

export const UpdateOrganization = gql`
  mutation CreateOrganization(
    $updateOrganizationInput: UpdateOrganizationDto!
  ) {
    updateOrganization(updateOrganizationInput: $updateOrganizationInput) {
      status
      name
      id
      description
    }
  }
`;

export const DeleteOrgaization = gql`
  mutation DeleteOrganization($deleteOrganizationId: Int!) {
    deleteOrganization(id: $deleteOrganizationId)
  }
`;
