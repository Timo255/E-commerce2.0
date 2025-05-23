'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // await queryInterface.bulkInsert(
    //   "products",
    //   [
    //     {
    //       id: 1,
    //       uuid: "fb2f8309-3f48-43d4-8dbc-90bfc40df881",
    //       nameShop: "White leather sofa",
    //       nameProduct: "white leather sofa",
    //       category: "Chair",
    //       price: 229,
    //       img: "Product 1seater white-sofa.png",
    //       imgLg439: "sleeper-sofa-desktop.png",
    //       imgMd309: "sleeper-sofa-Tablet.png",
    //       imgMd360: "sleeper-sofa-mobile.png",
    //       isSlider: "slider",
    //       imgProductCard: "1seater white-sofa.png",
    //       variationTitle: "Seater",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 2,
    //       uuid: "018f6c77-8d59-4a30-814d-aad101911684",
    //       nameShop: "Red wing chair",
    //       nameProduct: "wing chair",
    //       category: "Chair",
    //       price: 150,
    //       img: "product red wing chair.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "red wing chair.png",
    //       variationTitle: "Color",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 3,
    //       uuid: "87d89f12-1fc3-4693-ae49-2e01ceb5ff66",
    //       nameShop: "Brown sofa",
    //       nameProduct: "brown sofa",
    //       category: "Chair",
    //       price: 200,
    //       img: "product 2seater brown sofa.png",
    //       imgLg439: "slide desktop sofa1.png",
    //       imgMd309: "slide tablet sofa1.png",
    //       imgMd360: "slide mobile sofa1.png",
    //       isSlider: "slider",
    //       imgProductCard: "2seater brown sofa.png",
    //       variationTitle: "Seater",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 4,
    //       uuid: "8b2f3c9e-b29d-49a9-abed-6d6ccec396cd",
    //       nameShop: "Black cushion",
    //       nameProduct: "cushion",
    //       category: "Cushion",
    //       price: 50,
    //       img: "product black cushion.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "black cushion.png",
    //       variationTitle: "Color",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 5,
    //       uuid: "2d8ddb1c-2807-47c3-b2ee-cfc5ca7183b9",
    //       nameShop: "Purple Sofa 3seater",
    //       nameProduct: "Purple Sofa",
    //       category: "Chair",
    //       price: 300,
    //       img: "product 3seater purple  sofa.png",
    //       imgLg439: "slide desktop sofa2.png",
    //       imgMd309: "slide tablet sofa2.png",
    //       imgMd360: "slide mobile sofa2.png",
    //       isSlider: "slider",
    //       imgProductCard: "3seater purple sofa.png",
    //       variationTitle: "Seater",
    //       isOffer: "no",
    //       relatedProduct: "related",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: "newPrd"
    //     },
    //     {
    //       id: 6,
    //       uuid: "dd09882c-ea8a-406b-98ff-ee74f29d539e",
    //       nameShop: "Circle wooden table",
    //       nameProduct: "wooden table",
    //       category: "Table",
    //       price: 150,
    //       img: "product Circle wooden table.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "Circle wooden table.png",
    //       variationTitle: "Shapes",
    //       isOffer: "no",
    //       relatedProduct: "related",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: "newPrd"
    //     },
    //     {
    //       id: 7,
    //       uuid: "5f40d9c7-e9d8-4b21-9002-7cf5d0a0ad4d",
    //       nameShop: "Oval Glass table",
    //       nameProduct: "Glass table",
    //       category: "Table",
    //       price: 180,
    //       img: "product Oval Glass table.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "Oval Glass table.png",
    //       variationTitle: "Shapes",
    //       isOffer: "no",
    //       relatedProduct: "related",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: "newPrd"
    //     },
    //     {
    //       id: 8,
    //       uuid: "c4b87fe8-e334-4ec0-9fbf-9f3000417a6a",
    //       nameShop: "Bed",
    //       nameProduct: "bed",
    //       category: "Bed",
    //       price: 180,
    //       img: "product bed.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "(30X40) bed.png",
    //       variationTitle: "Dimensions",
    //       isOffer: "no",
    //       relatedProduct: "related",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: "newPrd"
    //     },
    //     {
    //       id: 9,
    //       uuid: "fa807235-3612-4115-8068-4dfe5ad178fa",
    //       nameShop: "black futon",
    //       nameProduct: "black futon",
    //       category: "Bed",
    //       price: 500,
    //       img: "product black futon.png",
    //       imgLg439: "desktop black futon.png",
    //       imgMd309: "",
    //       imgMd360: "mobile black futon.png",
    //       isSlider: "no",
    //       imgProductCard: "black futon.png",
    //       variationTitle: "Color",
    //       isOffer: "yes",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 10,
    //       uuid: "85276b67-98be-42c3-97f1-0df90b6d8198",
    //       nameShop: "White leather sofa 3seater",
    //       nameProduct: "white leather sofa",
    //       category: "Chair",
    //       price: 399,
    //       img: "Product 3seater white-sofa.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "3seater white-sofa.png",
    //       variationTitle: "Seater",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 11,
    //       uuid: "0e51e1a1-0146-4edc-ac26-ed7426b91f3d",
    //       nameShop: "yellow wing chair",
    //       nameProduct: "yellow wing chair",
    //       category: "Chair",
    //       price: 150,
    //       img: "product yellow wing chair.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "yellow wing chair.png",
    //       variationTitle: "Color",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 12,
    //       uuid: "17217cd3-5a3b-4e0d-bcc0-6597517eeca9",
    //       nameShop: "blue wing chair",
    //       nameProduct: "blue wing chair",
    //       category: "Chair",
    //       price: 150,
    //       img: "product blue wing chair.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "blue wing chair.png",
    //       variationTitle: "Color",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 13,
    //       uuid: "f0881cd2-f0c1-421e-b6a8-484a5da13727",
    //       nameShop: "1seater brown sofa",
    //       nameProduct: "1seater brown sofa",
    //       category: "Chair",
    //       price: 300,
    //       img: "product 1seater brown sofa.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "1seater brown sofa.png",
    //       variationTitle: "Seater",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 14,
    //       uuid: "885b4532-290e-4138-9237-cec1fd6c281e",
    //       nameShop: "green cushion",
    //       nameProduct: "cushion",
    //       category: "Cushion",
    //       price: 50,
    //       img: "product green cushion.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "green cushion.png",
    //       variationTitle: "Color",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 15,
    //       uuid: "ce83240b-87d4-4e94-a717-e033603fe294",
    //       nameShop: "gray cushion",
    //       nameProduct: "cushion",
    //       category: "Cushion",
    //       price: 50,
    //       img: "product gray cushion.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "gray cushion.png",
    //       variationTitle: "Color",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 16,
    //       uuid: "7bc07a0a-715c-44ce-9039-f4ce96c188b8",
    //       nameShop: "Purple Sofa 1seater",
    //       nameProduct: "Purple Sofa",
    //       category: "Chair",
    //       price: 300,
    //       img: "product 1seater purple  sofa.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "1seater purple sofa.png",
    //       variationTitle: "Seater",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 17,
    //       uuid: "88561f4e-e133-44e1-89e4-b6a3a084bf23",
    //       nameShop: "rectangle wooden table",
    //       nameProduct: "wooden table",
    //       category: "Table",
    //       price: 250,
    //       img: "product rectangle wooden table.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "rectangle wooden table.png",
    //       variationTitle: "Shapes",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 18,
    //       uuid: "c0fa84ff-5075-46de-bcdb-9e8077670468",
    //       nameShop: "Oval wooden table",
    //       nameProduct: "wooden table",
    //       category: "Table",
    //       price: 350,
    //       img: "product Oval wooden table.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "Oval wooden table.png",
    //       variationTitle: "Shapes",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 19,
    //       uuid: "d8795760-8a65-490d-b5a8-4e96d05c7f31",
    //       nameShop: "Square Glass table",
    //       nameProduct: "Glass table",
    //       category: "Table",
    //       price: 180,
    //       img: "product Square Glass table.png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "Square Glass table.png",
    //       variationTitle: "Shapes",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 20,
    //       uuid: "d4d02cc8-bc29-4260-856c-6329776ec437",
    //       nameShop: "bed (50x40)",
    //       nameProduct: "bed",
    //       category: "Bed",
    //       price: 180,
    //       img: "product bed (50x40).png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "(50X40) bed.png",
    //       variationTitle: "Dimensions",
    //       isOffer: "no",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //     {
    //       id: 21,
    //       uuid: "2d326362-f188-4108-beb9-bb999df906e2",
    //       nameShop: "red futon",
    //       nameProduct: "red futon",
    //       category: "Bed",
    //       price: 500,
    //       img: "product bed (50x40).png",
    //       imgLg439: "",
    //       imgMd309: "",
    //       imgMd360: "",
    //       isSlider: "no",
    //       imgProductCard: "red futon.png",
    //       variationTitle: "Color",
    //       isOffer: "yes",
    //       relatedProduct: "no",
    //       quantity: 1,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       newProduct: null
    //     },
    //   ],
    //   {}
    // );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // await queryInterface.bulkDelete('products', null, {});
  }
};
