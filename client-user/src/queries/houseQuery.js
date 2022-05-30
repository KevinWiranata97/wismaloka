import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
      phoneNumber
      profilePict
      role
      isPremium
    }
  }
`;

export const GET_USERS_BY_ID = gql`
  query GetOneUser($getOneUserId: ID) {
    getOneUser(id: $getOneUserId) {
      id
      username
      email
      phoneNumber
      profilePict
      role
      isPremium
      Houses {
        id
        title
        price
        description
        location
        instalment
        latitude
        longitude
        userId
        Specification {
          id
          houseId
          luasTanah
          luasBangunan
          certificate
          dayaListrik
          totalBedroom
          totalBathroom
        }
        Images {
          houseId
          image
        }
      }
    }
  }
`;

export const GET_HOUSE_BY_ID = gql`
  query GetOneHouse($getOneHouseId: ID) {
    getOneHouse(id: $getOneHouseId) {
      id
      title
      price
      description
      location
      instalment
      latitude
      longitude
      userId
      User {
        id
        username
        email
        role
      }
      Specification {
        id
        houseId
        luasTanah
        luasBangunan
        certificate
        dayaListrik
        totalBedroom
        totalBathroom
      }
      Images {
        houseId
        image
      }
    }
  }
`;

export const GET_HOUSE = gql`
  query GetHouse {
    getHouse {
      id
      title
      price
      description
      location
      instalment
      latitude
      longitude
      userId
      User {
        id
        username
        email
        role
      }
      Specification {
        id
        houseId
        luasTanah
        luasBangunan
        certificate
        dayaListrik
        totalBedroom
        totalBathroom
      }
      Images {
        houseId
        image
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($loginUser: loginInput) {
    login(loginUser: $loginUser) {
      access_token
      id
      role
      name
      isPremium
      profilePict
    }
  }
`;
