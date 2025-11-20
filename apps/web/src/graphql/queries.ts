import { gql } from "@apollo/client";

export const GET_ANNOUNCEMENT = gql`
  query GetAnnouncement($id: String!) {
    announcement(id: $id) {
      id
      title
      content
      category
      publicationDate
      updatedAt
    }
  }
`;

export const GET_ANNOUNCEMENTS = gql`
  query {
    announcements {
      id
      title
      content
      category
      publicationDate
      updatedAt
    }
  }
`;
