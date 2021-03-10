import { gql } from "@apollo/client";

export const TODO_DETAIL = gql`
  fragment TodoDetail on Todo {
    id
    description
  }
`;
