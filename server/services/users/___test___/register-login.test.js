const request = require("supertest");
const app = require("../app");
const { User } = require("../models");

beforeAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });

});


let access_token = null;

describe("failed test for get users feature", () => {
  test("should error message User not found when there is no user data", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message","User not found")
  });
});

describe("acceptance test for register feature", () => {
  test("should return id,email,username, and role with status code 201 for new user that registered as Admin", async () => {
    const payload = {
      username: "testAdmin",
      password: "123456",
      email: "testAdmin@gmail.com",
    };

    const res = await request(app).post("/users/registerAdmin").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Code", expect.any(Number));
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", expect.any(Number));
    expect(res.body.data).toHaveProperty(
      "email",
      expect.stringContaining(payload.email)
    );
    expect(res.body.data).toHaveProperty(
      "username",
      expect.stringContaining(payload.username)
    );
    expect(res.body.data).toHaveProperty(
      "role",
      expect.stringContaining("Admin")
    );
  });

  test("should return id,email,username, and role with status code 201 for new user that registered as Admin with profilePict ", async () => {
    const payload = {
      username: "testAdmin1",
      password: "123456",
      email: "testAdmin1@gmail.com",
    };

    const res = await request(app)
      .post("/users/registerAdmin")
      .field("username", payload.username)
      .field("password", payload.password)
      .field("email", payload.email)
      .attach("profilePict", "./Capture.PNG")
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Code", expect.any(Number));
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", expect.any(Number));
    expect(res.body.data).toHaveProperty(
      "email",
      expect.stringContaining(payload.email)
    );
    expect(res.body.data).toHaveProperty(
      "username",
      expect.stringContaining(payload.username)
    );
  
  });

  test("should return id,email,username, and role with status code 201 for new user that registered as Agen", async () => {
    const payload = {
      username: "testAgen",
      password: "123456",
      email: "testAgen@gmail.com",
    };

    const res = await request(app).post("/users/registerAgen").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Code", expect.any(Number));
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", expect.any(Number));
    expect(res.body.data).toHaveProperty(
      "email",
      expect.stringContaining(payload.email)
    );
    expect(res.body.data).toHaveProperty(
      "username",
      expect.stringContaining(payload.username)
    );
    expect(res.body.data).toHaveProperty(
      "role",
      expect.stringContaining("Agen")
    );
  });

  test("should return id,email,username, and role with status code 201 for new user that registered as Agen with profilePict ", async () => {
    const payload = {
      username: "testAgen1",
      password: "123456",
      email: "testAgen1@gmail.com",
    };

    const res = await request(app)
      .post("/users/registerAgen")
      .field("username", payload.username)
      .field("password", payload.password)
      .field("email", payload.email)
      .attach("profilePict", "./Capture.PNG")
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Code", expect.any(Number));
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", expect.any(Number));
    expect(res.body.data).toHaveProperty(
      "email",
      expect.stringContaining(payload.email)
    );
    expect(res.body.data).toHaveProperty(
      "username",
      expect.stringContaining(payload.username)
    );
  
  });

  test("should return id,email,username, and role with status code 201 for new user that registered as User", async () => {
    const payload = {
      username: "testUser",
      password: "123456",
      email: "testUser@gmail.com",
    };

    const res = await request(app).post("/users/registerUser").send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Code", expect.any(Number));
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", expect.any(Number));
    expect(res.body.data).toHaveProperty(
      "email",
      expect.stringContaining(payload.email)
    );
    expect(res.body.data).toHaveProperty(
      "username",
      expect.stringContaining(payload.username)
    );
    expect(res.body.data).toHaveProperty(
      "role",
      expect.stringContaining("User")
    );
  });

  test("should return id,email,username, and role with status code 201 for new user that registered as User with profilePict ", async () => {
    const payload = {
      username: "testUser1",
      password: "123456",
      email: "testUser1@gmail.com",
    };

    const res = await request(app)
      .post("/users/registerUser")
      .field("username", payload.username)
      .field("password", payload.password)
      .field("email", payload.email)
      .attach("profilePict", "./Capture.PNG")
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("Code", expect.any(Number));
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("id", expect.any(Number));
    expect(res.body.data).toHaveProperty(
      "email",
      expect.stringContaining(payload.email)
    );
    expect(res.body.data).toHaveProperty(
      "username",
      expect.stringContaining(payload.username)
    );
  
  });
});

describe("failed test for register feature", () => {
  describe("email validation test for register user", () => {
    test("should return message of email cant empty when not provided with email when registering new user as Admin;", async () => {
      const payload = {
        username: "testAdmin",
        password: "123456",
        email: null,
      };

      const res = await request(app).post("/users/registerAdmin").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Email cant empty")
      );
    });

    test("should return message of must be format email when not provided with email with correct email format when registering new user as Admin;", async () => {
      const payload = {
        username: "testAdmin",
        password: "123456",
        email: "testAdmin",
      };

      const res = await request(app).post("/users/registerAdmin").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Must be format email")
      );
    });

    test("should return message of email cant empty when not provided with email when registering new user as Agen;", async () => {
      const payload = {
        username: "testAgen",
        password: "123456",
        email: null,
      };

      const res = await request(app).post("/users/registerAgen").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Email cant empty")
      );
    });

    test("should return message of must be format email when not provided with email with correct email format when registering new user as Agen;", async () => {
      const payload = {
        username: "testAgen",
        password: "123456",
        email: "testAgen",
      };

      const res = await request(app).post("/users/registerAgen").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Must be format email")
      );
    });

    test("should return message of email cant empty when not provided with email when registering new user as User;", async () => {
      const payload = {
        username: "testUser",
        password: "123456",
        email: null,
      };

      const res = await request(app).post("/users/registerUser").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Email cant empty")
      );
    });

    test("should return message of must be format email when not provided with email with correct email format when registering new user as User;", async () => {
      const payload = {
        username: "testUser",
        password: "123456",
        email: "testUser",
      };

      const res = await request(app).post("/users/registerUser").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Must be format email")
      );
    });

    test("should return message of email must be unique when provided with duplicate email when registering new user as Admin;", async () => {
      const payload = {
        username: "testAdmin",
        password: "123456",
        email: "testAdmin@gmail.com",
      };

      const res = await request(app).post("/users/registerAdmin").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("email must be unique")
      );
    });

    test("should return message of email must be unique when provided with duplicate email when registering new user as Agen;", async () => {
      const payload = {
        username: "testAgen",
        password: "123456",
        email: "testAgen@gmail.com",
      };

      const res = await request(app).post("/users/registerAgen").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("email must be unique")
      );
    });

    test("should return message of email must be unique when provided with duplicate email when registering new user as User;", async () => {
      const payload = {
        username: "testUser",
        password: "123456",
        email: "testUser@gmail.com",
      };

      const res = await request(app).post("/users/registerUser").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("email must be unique")
      );
    });
  });

  describe("password validation test for register user", () => {
    test("should return message of password is required when not provided with password when registering new user as Admin;", async () => {
      const payload = {
        username: "testAdmin",
        password: null,
        email: "testAdmin@gmail.com",
      };

      const res = await request(app).post("/users/registerAdmin").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Password cant empty")
      );
    });

    test("should return message of password is required when not provided with password when registering new user as Agen;", async () => {
      const payload = {
        username: "testAgen",
        password: null,
        email: "testAgen@gmail.com",
      };

      const res = await request(app).post("/users/registerAgen").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Password cant empty")
      );
    });

    test("should return message of password is required when not provided with password when registering new user as User;", async () => {
      const payload = {
        username: "testUser",
        password: null,
        email: "testUser@gmail.com",
      };

      const res = await request(app).post("/users/registerUser").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Password cant empty")
      );
    });

    test("should return message of minimal input password is 6 when not provided with minimal input when registering new user as Admin;", async () => {
      const payload = {
        username: "testAdmin",
        password: "12345",
        email: "testAdmin@gmail.com",
      };

      const res = await request(app).post("/users/registerAdmin").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Minimal input password 6")
      );
    });

    test("should return message of minimal input password is 6 when not provided with minimal input when registering new user as Agen;", async () => {
      const payload = {
        username: "testAgen",
        password: "12345",
        email: "testAgen@gmail.com",
      };

      const res = await request(app).post("/users/registerAgen").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Minimal input password 6")
      );
    });

    test("should return message of minimal input password is 6 when not provided with minimal input when registering new user as User;", async () => {
      const payload = {
        username: "testUser",
        password: "12345",
        email: "testUser@gmail.com",
      };

      const res = await request(app).post("/users/registerUser").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        expect.stringContaining("Minimal input password 6")
      );
    });
  });
});

describe("acceptance test for login feature", () => {
  test("login as Admin should return property of access_token, id,name, and role as Admin", async () => {
    const payload = {
      email: "testAdmin@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/users/login").send(payload);
    access_token = res.body.access_token;
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("role", expect.stringContaining("Admin"));
  });

  test("login as Agen should return property of access_token, id,name, and role as Agen", async () => {
    const payload = {
      email: "testAgen@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/users/login").send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("role", expect.stringContaining("Agen"));
  });

  test("login as User should return property of access_token, id,name, and role as User", async () => {
    const payload = {
      email: "testUser@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/users/login").send(payload);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("role", expect.stringContaining("User"));
  });
});

describe("failed test for login feature", () => {
  test("should return error message of Invalid email or password when provided with correct email but wrong password", async () => {
    const payload = {
      email: "testUser@gmail.com",
      password: "12345656666",
    };

    const res = await request(app).post("/users/login").send(payload);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid email/password")
    );
  });

  test("should return error message of Invalid email or password when provided with wrong email and password", async () => {
    const payload = {
      email: "emailsalah@gmail.com",
      password: "12345656666",
    };

    const res = await request(app).post("/users/login").send(payload);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid email/password")
    );
  });

  test("should return error message of email is required when not provided with email", async () => {
    const payload = {
      email: null,
      password: "12345656666",
    };

    const res = await request(app).post("/users/login").send(payload);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Email is required")
    );
  });

  test("should return error message of email is required when not provided with password", async () => {
    const payload = {
      email: "testAdmin@gmail.com",
      password: null,
    };

    const res = await request(app).post("/users/login").send(payload);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Password is required")
    );
  });
});

describe("acceptance test for get users feature", () => {
  test("should return Users table without access_token", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body.data[0]).toHaveProperty("id");
    expect(res.body.data[0]).toHaveProperty("username");
    expect(res.body.data[0]).toHaveProperty("email");
    expect(res.body.data[0]).toHaveProperty("phoneNumber");
    expect(res.body.data[0]).toHaveProperty("profilePict");
    expect(res.body.data[0]).toHaveProperty("role");
    expect(res.body.data[0]).toHaveProperty("isPremium");
  });
});

describe("acceptance test for get users by id feature", () => {
  test("should return users with specific id without access_token", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data).toHaveProperty("username");
    expect(res.body.data).toHaveProperty("email");
    expect(res.body.data).toHaveProperty("phoneNumber");
    expect(res.body.data).toHaveProperty("profilePict");
    expect(res.body.data).toHaveProperty("role");
    expect(res.body.data).toHaveProperty("isPremium");
  });
});

describe("failed test for get users by id feature", () => {
  test("should return message of User not found when there is no user with valid id", async () => {
    const res = await request(app).get("/users/50");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("User not found")
    );
  });
});

describe("succes test for delete users by id feature with access_token", () => {
  test("should delete user by id with admin access_token", async () => {
    const res = await request(app)
      .delete("/users/1")
      .set("access_token", access_token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty(
      "msg",
      expect.stringContaining("delete user with id 1 success")
    );
  });

  test("should delete user by id with same userId access_token", async () => {
    const payload = {
      email: "testAgen@gmail.com",
      password: "123456",
    };

    const login = await request(app).post("/users/login").send(payload);
    access_token = login.body.access_token;
    expect(login.status).toBe(200);
    const res = await request(app)
      .delete("/users/3")
      .set("access_token", access_token);
    expect(res.status).toBe(200);
  });

  
});



describe("failed test for delete users by id feature without access_token", () => {
  test("should return message invalid token when not provided with access_token", async () => {
    const res = await request(app).delete("/users/1");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Invalid token")
    );
  });

  test("should return message invalid token when  provided with wrong access_token", async () => {
    const res = await request(app)
      .delete("/users/1")
      .set(
        "access_token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjUyOTU1MDEwfQ.Sy2aOphUSh7Fb7xzIZ-n5I-5cxWrRltsk_7MhvI6FBM"
      );
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("You are not authorized")
    );
  });

  test("should return message forbidden access when userId not same as deleted user", async () => {
    const payloadAgen = {
      username: "testAgen2",
      password: "123456",
      email: "testAgen2@gmail.com",
    };
    const registerSecondAgen = await request(app)
      .post("/users/registerAgen")
      .send(payloadAgen);
    expect(registerSecondAgen.status).toBe(201);

    const login = await request(app).post("/users/login").send({
      email: payloadAgen.email,
      password: payloadAgen.password,
    });
    access_token = login.body.access_token;
    expect(login.status).toBe(200);

    const res = await request(app)
      .delete("/users/6")
      .set("access_token", access_token);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Forbidden Access")
    );
  });


  test("should return message forbidden access when userId not found in database", async () => {
    const payload = {
      password: "123456",
      email: "testAdmin1@gmail.com",
    };
    const login = await request(app).post("/users/login").send({
      email: payload.email,
      password: payload.password,
    });
    access_token = login.body.access_token;
    expect(login.status).toBe(200);

    const res = await request(app)
      .delete("/users/500")
      .set("access_token", access_token);
    expect(res.status).toBe(404);
  });
});

describe("calling endpoint with wrong access point", () => {
  test("should return internal server error", async () => {
    const res = await request(app).get("/users/register");
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty(
      "message",
      expect.stringContaining("Internal Server Error")
    );
  });
});

