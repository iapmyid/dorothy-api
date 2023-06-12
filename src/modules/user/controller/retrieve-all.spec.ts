import { isValid } from "date-fns";
import request from "supertest";
import { UserStatusTypes } from "../model/user.entity.js";
import UserFactory from "../model/user.factory.js";
import { createApp } from "@src/app.js";
import { resetDatabase, retrieveAll } from "@src/test/utils.js";

describe("retrieve all users", () => {
  beforeEach(async () => {
    await resetDatabase();
  });
  it("should be able to retrieve all users", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    await userFactory.createMany(3);

    const data = await retrieveAll("users");

    const response = await request(app).get(`/v1/users`);

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.users.length).toStrictEqual(3);
    expect(response.body.users[0]._id).toBeDefined();
    expect(response.body.users[0].name).toStrictEqual(data[0].name);
    expect(response.body.users[0].status).toStrictEqual(UserStatusTypes.Active);
    expect(isValid(new Date(response.body.users[0].createdAt))).toBeTruthy();
    expect(response.body.users[1].name).toStrictEqual(data[1].name);
    expect(response.body.users[2].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in ascending order", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    const data = [
      {
        name: "John Doe",
      },
      {
        name: "Charles",
      },
      {
        name: "Jane",
      },
    ];
    userFactory.sequence(data);
    await userFactory.createMany(3);

    const response = await request(app).get(`/v1/users`).query({
      sort: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.users.length).toStrictEqual(3);
    expect(response.body.users[0].name).toStrictEqual(data[1].name);
    expect(response.body.users[1].name).toStrictEqual(data[2].name);
    expect(response.body.users[2].name).toStrictEqual(data[0].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to sort data in descending order", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    const data = [
      {
        name: "John Doe",
      },
      {
        name: "Charles",
      },
      {
        name: "Jane",
      },
    ];
    userFactory.sequence(data);
    await userFactory.createMany(3);

    const response = await request(app).get(`/v1/users`).query({
      sort: "-name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.users.length).toStrictEqual(3);
    expect(response.body.users[0].name).toStrictEqual(data[0].name);
    expect(response.body.users[1].name).toStrictEqual(data[2].name);
    expect(response.body.users[2].name).toStrictEqual(data[1].name);

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to navigate pagination", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    await userFactory.createMany(3);

    const data = await retrieveAll("users");

    const response = await request(app).get(`/v1/users`).query({
      page: 2,
      pageSize: 2,
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.users.length).toStrictEqual(1);
    expect(response.body.users[0].name).toStrictEqual(data[2].name);

    expect(response.body.pagination.page).toStrictEqual(2);
    expect(response.body.pagination.pageSize).toStrictEqual(2);
    expect(response.body.pagination.pageCount).toStrictEqual(2);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
  it("should be able to choose fields", async () => {
    const app = await createApp();

    const userFactory = new UserFactory();
    await userFactory.createMany(3);

    const data = await retrieveAll("users");

    const response = await request(app).get(`/v1/users`).query({
      fields: "name",
    });

    // expect http response
    expect(response.statusCode).toEqual(200);

    // expect response json
    expect(response.body.users.length).toStrictEqual(3);
    expect(response.body.users[0]._id).toBeDefined();
    expect(response.body.users[1]._id).toBeDefined();
    expect(response.body.users[2]._id).toBeDefined();
    expect(response.body.users[0].name).toStrictEqual(data[0].name);
    expect(response.body.users[1].name).toStrictEqual(data[1].name);
    expect(response.body.users[2].name).toStrictEqual(data[2].name);
    expect(response.body.users[0].status).toBeUndefined();
    expect(response.body.users[1].status).toBeUndefined();
    expect(response.body.users[2].status).toBeUndefined();
    expect(response.body.users[0].createdAt).toBeUndefined();
    expect(response.body.users[1].createdAt).toBeUndefined();
    expect(response.body.users[2].createdAt).toBeUndefined();

    expect(response.body.pagination.page).toStrictEqual(1);
    expect(response.body.pagination.pageSize).toStrictEqual(10);
    expect(response.body.pagination.pageCount).toStrictEqual(1);
    expect(response.body.pagination.totalDocument).toStrictEqual(3);
  });
});
