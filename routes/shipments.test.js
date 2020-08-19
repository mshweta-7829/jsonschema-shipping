const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");
// const { router, shipment } = require('./shipments')

// const AxiosMockAdapter = require('axios-mock-adapter');
// const axios = require("axios");
// const axiosMock = new AxiosMockAdapter(axios)


/**OPTION 1 IN MOCKING */
// describe("POST /", function () {
  test("shipProduct", async function () {
    const shipId = shipItApi.shipProduct.mockReturnValue(
      123
    )
    // console.log(shipItApi.shipProduct())
    const response = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    })
    expect(response.body).toEqual( {shipped: 123} );
  });

// /**OPTION 2 IN MOCKING */
  test("shipProductAxios", async function () {
    
    const axiosReponse = axiosMock.onPost('http://localhost:3001/ship',
    {
      itemId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    }).reply(200, {
      receipt: {
        itemId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
        shipId: 1,
      }
    });
  
    // console.log(axiosReponse)

    const shipId = await shipItApi.shipProduct({
      productId: 1000,  
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(shipId).toEqual(1);
  });


//   test("valid", async function () {
//     const resp = await request(app).post("/shipments").send({
//       productId: 1000,
//       name: "Test Tester",
//       addr: "100 Test St",
//       zip: "12345-6789",
//     });

//     expect(resp.body).toEqual({ shipped: expect.any(Number) });
//   });

//   test("Invalid", async function () {
//     const resp = await request(app).post("/shipments").send({
//       productId : 900,
// 	    name : "shweta", 
// 	    zip : 6785
//     });

//     expect(resp.body).toEqual({ "error": {
//     "message": [
//       "instance.productId must have a minimum value of 1000",
//       "instance.zip is not of a type(s) string",
//       "instance requires property \"addr\""
//     ],
//     "status": 400
//   }  });
//   });

//   test("Invalid productId", async function () {
//     const resp = await request(app).post("/shipments").send({
//       productId : 900,
// 	    name: "Test Tester",
//       addr: "100 Test St",
//       zip: "12345-6789",
//     });

//     expect(resp.body).toEqual({ "error": {
//       "message": [
//         "instance.productId must have a minimum value of 1000"
//       ],
//       "status": 400
//     } });
//   });

//   test("No inputs", async function () {
//     const resp = await request(app).post("/shipments").send({});

//     expect(resp.body.error.message).toEqual(
//       [
//         "instance requires property \"productId\"",
//         "instance requires property \"name\"",
//         "instance requires property \"addr\"",
//         "instance requires property \"zip\""
//       ]
//      );
//   });

// });

// afterAll(function( ) {
//   axiosMock.reset();
// })

// TODO: can just do 400 because we aren't testing the validators
// TODO: could include an extra input

// expect(resp.body.err.status).toEqual( "status": 400 );
// });