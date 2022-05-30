const { gql } = require("apollo-server");
const axios = require("axios");
// const {
//   GraphQLUpload,
//   graphqlUploadExpress,
//   Upload, // A Koa implementation is also exported.
// } = require("graphql-upload");
// const { finished } = require("stream/promises");

const urlUser = "http://localhost:3000";
const urlHouse = "http://localhost:3001";

const typeDefs = gql`
  # scalar Upload

  # type File {
  #   imgTest: String
  # }

  type Midtrans {
    token: String
    redirect_url: String
  }

  type outputLogin {
    access_token: String
    id: ID
    role: String
    name: String
    isPremium: Boolean
    profilePict: String
  }

  type User {
    id: ID
    username: String
    email: String
    password: String
    phoneNumber: String
    profilePict: String
    role: String
    isPremium: Boolean
    Houses: [House]
  }

  input loginInput {
    email: String
    password: String
  }

  # type File {
  #   filename: String
  # }
  type Query {
    getUsers: [User]
    getOneUser(id: ID): User
  }

  type Mutation {
    login(loginUser: loginInput): outputLogin
    removeUser(id: ID): User
    midtrans: Midtrans
    # singleUpload(imgTest: String): File
  }
`;

const resolvers = {
  // Upload: GraphQLUpload,
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios.get(`${urlUser}/users`);
        // console.log(data.data, "====");

        return data.data;
      } catch (error) {
        console.log(error);
      }
    },

    getOneUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.get(`${urlUser}/users/${id}`);
        console.log(data, "====");

        const user = data.data;
        const { data: house } = await axios.get(
          `${urlHouse}/houses?userId=${id}`
        );
        //! BAKAL ERROR JIKA TESTING

        user.Houses = house;

        return user;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    login: async (_, args) => {
      try {
        console.log(args.loginUser, "=======");
        const { email, password } = args.loginUser;
        const { data } = await axios.post(`${urlUser}/users/login`, {
          email,
          password,
        });

        // console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    // midtrans: async (_, args) => {
    //   try {
    //     const { data } = await axios.post(`${urlUser}/payment`, {
    //       headers: {
    //         "X-Requested-With": "XMLHttpRequest",
    //         "content-type": "application/x-www-form-urlencoded",
    //       },
    //     });

    //     console.log(data, "<<<<<<");
    //     return data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    removeUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios.delete(`${urlUser}/users/${id}`);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
