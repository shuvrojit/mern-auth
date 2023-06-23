import supertest from "supertest";
import app from "../server";

describe("GET /", () => {
  it("should send some data", async () => {
    const res = await supertest(app).get("/");

    expect(res.status).toBe(200);
  });
});
