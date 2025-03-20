import { gql } from "@apollo/client";

export const RegisterUser = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [Launch]!
  }
`;
