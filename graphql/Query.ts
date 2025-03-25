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

// Permissisons

export const GetAllPermissions = gql`
  query Modules {
    permissionGroup {
      modules {
        groups {
          name
          permissions {
            action
            appName
            description
            groupName
            id
            module
            slug
          }
        }
        name
      }
    }
  }
`;

export const GetAllProjects = gql`
  query PaginatedProjects($listInputDto: ListInputDTO!) {
    paginatedProjects(ListInputDTO: $listInputDto) {
      data {
        id
        name
        description
        status
        organizationId
      }
    }
  }
`;
