const {
  shipProduct,
} = require("./shipItApi");
const shipItApi = require("./shipItApi");

shipItApi.shipProduct = jest.fn();


test("shipProduct", async function () {
  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(expect.any(Number));
});