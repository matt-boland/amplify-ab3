/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideos = /* GraphQL */ `
  query GetVideos($id: ID!) {
    getVideos(id: $id) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`;
export const listVideos = /* GraphQL */ `
  query ListVideos(
    $filter: ModelVideosFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
