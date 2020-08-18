const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("Invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId : 900,
	    name : "shweta", 
	    zip : 6785
    });

    expect(resp.body).toEqual({ "error": {
    "message": [
      "instance.productId must have a minimum value of 1000",
      "instance.zip is not of a type(s) string",
      "instance requires property \"addr\""
    ],
    "status": 400
  }  });
  });

  test("Invalid productId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId : 900,
	    name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ "error": {
      "message": [
        "instance.productId must have a minimum value of 1000"
      ],
      "status": 400
    } });
  });

  test("No inputs", async function () {
    const resp = await request(app).post("/shipments").send({});

    expect(resp.body.error.message).toEqual(
      [
        "instance requires property \"productId\"",
        "instance requires property \"name\"",
        "instance requires property \"addr\"",
        "instance requires property \"zip\""
      ]
     );
  });

});
