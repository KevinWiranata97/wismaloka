const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

// http://localhost:3000
// http://localhost:3001
const urlHouses = "http://localhost:3001/houses";
const urlSpecs = "http://localhost:3001/specs";
const urlUser = "http://localhost:3000";

const typeDefs = gql`
  type images {
    houseId: ID
    image: String
  }

  type Specification {
    id: ID
    houseId: ID
    luasTanah: Int
    luasBangunan: Int
    certificate: String
    dayaListrik: Int
    totalBedroom: Int
    totalBathroom: Int
  }

  type user {
    id: ID
    username: String
    email: String
    role: String
  }
  type House {
    id: ID
    title: String
    price: String
    description: String
    location: String
    instalment: String
    latitude: Float
    longitude: Float
    userId: String
    User: user
    Specification: Specification
    Images: [images]
  }
  # type Genres {
  #   id: ID
  #   name: String
  # }

  # input HouseInput {
  #   title: String

  #   synopsis: String
  #   trailerUrl: String
  #   imgUrl: String
  #   rating: String
  #   genreId: Int
  #   name: [String]
  #   profilePict: [String]
  # }
  type Query {
    getHouse: [House]
    getOneHouse(id: ID): House
    # getGenre: [Genres]
  }

  type Mutation {
    # addHouse(newHouse: HouseInput): Houses
    # editMovie(id: ID, newHouse: HouseInput): Houses
    removeHouse(id: ID): House
  }
`;

const resolvers = {
  Query: {
    getHouse: async () => {
      try {
        const { data } = await axios.get(`${urlHouses}`);
        const houses = data;

        return houses;
      } catch (error) {
        console.log(error);
      }
    },
    getOneHouse: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.get(`${urlHouses}/${id}`);
        // console.log(data.data, "====");
        const house = data;

        const { data: user } = await axios.get(
          `${urlUser}/users/${house.userId}`
        );
        // console.log(user, "=====");
        house.User = user.data;

        // console.log(house, "==========");
        return house;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    removeHouse: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${urlHouses}/${id}`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
