const request = require("supertest");
const app = require("../app");
const appUser = require("../../users/app")
const { House} = require("../models");


beforeAll(async () => {
  await House.destroy({ truncate: true, cascade: true, restartIdentity: true });

});


let access_token = null;

describe("failed test for get houses feature", () => {
  test("should return data not found when there is no houses data", async () => {

    const res = await request(app).get("/houses");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Not Found");
  });
});




describe("acceptance test for create house feature", () => {
  test("should return res status of 201 and new house data with access_token", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "Jual Rumah1",
      price: "10000000001",
      description: "dijual rumah1",
      location: "jakarta",
      instalment: "10000",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("title");

  });
});

describe("failed test for create house feature", () => {
  test("should return res status of 401 when creating house without access_token", async () => {
    const payload = {
      title: "Jual Rumah1",
      price: "10000000001",
      description: "dijual rumah1",
      location: "jakarta",
      instalment: "10000",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses")
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "JsonWebTokenError")
 
  });
  test("should return error message of Title is required when not provided with title", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "",
      price: "10000000001",
      description: "dijual rumah1",
      location: "jakarta",
      instalment: "10000",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Title is required")

  });

  test("should return error message of Price is required when not provided with Price", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "test",
      price: "",
      description: "dijual rumah1",
      location: "jakarta",
      instalment: "10000",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Price is required")

  });

  test("should return error message of Description is required when not provided with Description", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "test",
      price: "1000000",
      description: "",
      location: "jakarta",
      instalment: "10000",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Description is required")

  });

  test("should return error message of Location is required when not provided with Location", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "test",
      price: "1000000",
      description: "desc",
      location: "",
      instalment: "10000",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Location is required")

  });

  test("should return error message of Instalment is required when not provided with Instalment", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "test",
      price: "1000000",
      description: "desc",
      location: "Jakarta",
      instalment: "",
      coordinate: ["124145", "12414"],
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Instalment is required")

  });

  test("should return error message of Coordinate is required when not provided with Coordinate", async () => {
    const payloadLogin = {
      password: "123456",
      email: "testAdmin@gmail.com",
    };
  
    const loginAdmin = await request(appUser).post("/users/login").send(payloadLogin);
    expect(loginAdmin.status).toBe(200)
  
    access_token = loginAdmin.body.access_token
    const payload = {
      title: "test",
      price: "1000000",
      description: "desc",
      location: "jakarta",
      instalment: "10000",
      coordinate: "",
      userId: 1,
      houseId: 1,
      luasTanah: 100,
      luasBangunan: 80,
      certificate: "SHM",
      dayaListrik: 300,
      totalBedroom: 3,
      totalBathroom: 2
    };
    const res = await request(app).post("/houses").set("access_token", access_token)
    .field("title", payload.title)
    .field("price", payload.price)
    .field("description", payload.description)
    .field("location",payload.location)
    .field("instalment", payload.instalment)
    .field("coordinate", payload.coordinate)
    .field("userId", payload.userId)
    .field("Specifications[luasTanah]", payload.luasTanah)
    .field("Specifications[luasBangunan]", payload.luasBangunan)
    .field("Specifications[certificate]", payload.certificate)
    .field("Specifications[dayaListrik]", payload.dayaListrik)
    .field("Specifications[totalBedroom]", payload.totalBedroom)
    .field("Specifications[totalBathroom]", payload.totalBathroom)
    .attach("Images", "./Capture.PNG")

  
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Coordinate is required")

  });
});

describe("acceptance test for get houses feature", () => {
  test("should return houses table without access_token", async () => {
    const res = await request(app).get("/houses");
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("price");
    expect(res.body[0]).toHaveProperty("description");
    expect(res.body[0]).toHaveProperty("location");
    expect(res.body[0]).toHaveProperty("instalment");
    expect(res.body[0]).toHaveProperty("coordinate");
    expect(res.body[0]).toHaveProperty("userId");

  });
});


describe("acceptance test for get houses by id feature", () => {
  test("should return spesific house data without access_token", async () => {
    const res = await request(app).get("/houses/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("price");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("location");
    expect(res.body).toHaveProperty("instalment");
    expect(res.body).toHaveProperty("coordinate");
    expect(res.body).toHaveProperty("userId");

  });
});

describe("failed test for get house by id feature", () => {
  test("should return data not found when there is no spesific house data", async () => {
    const res = await request(app).get("/houses/3");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Not Found");
  });
});


