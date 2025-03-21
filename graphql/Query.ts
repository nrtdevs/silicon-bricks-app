import { gql } from "@apollo/client";

export const GetAllOrganisations = gql`
  query PaginatedOrganization($listInputDto: ListInputDTO!) {
    paginatedOrganization(ListInputDTO: $listInputDto) {
      meta {
        totalItems
        totalPages
        currentPage
        limit
      }
      data {
        id
        name
        description
        status
      }
    }
  }
`;
