'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
        {
        categoryId: 1,
        name: "Apple iPhone 7 32GB Black",
        brand: "Apple",
        color: "black",
        priceRegular: 400,
        image: "img/phones/apple-iphone-7/black/00.webp",
        capacity: "32GB",
        description: JSON.stringify([
          {
            title: "And then there was Pro",
            text: [
              "A transformative triple-camera system that adds tons of capability without complexity.",
              "An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
            ]
          },
          {
            title: "Camera",
            text: [
              "Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it."
            ]
          },
          {
            title: "Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.",
            text: [
              "iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with."
            ]
          }
        ]),
        screen: "4.7' IPS",
        resolution: "1334x750",
        processor: "Apple A10",
        ram: "2GB",
        camera: "12 Mp + 7 Mp",
        zoom: "Digital, 5x",
        year: 2016,
      },
      {
        categoryId: 2,
        brand: 'Apple',
        name: "Apple iPad Pro 11 (2021) 128GB Space Gray",
        capacity: "128GB",
        image: "img/tablets/apple-ipad-pro-11-2021/spacegray/00.webp",
        priceRegular: 799,
        color: "spacegray",
        description: JSON.stringify([
          {
            title: "Powerful Performance",
            text: [
              "Experience incredible power and performance with the Apple iPad Pro 11. With the M1 chip, it delivers a new level of performance, making it faster and more efficient than ever before.",
              "Whether you're editing photos, designing artwork, or multitasking with demanding apps, the iPad Pro 11 handles it all with ease."
            ]
          },
          {
            title: "Stunning Liquid Retina Display",
            text: [
              "Enjoy a vibrant and immersive visual experience on the iPad Pro 11's Liquid Retina display. With ProMotion technology and True Tone, the display adapts to your environment, providing smooth scrolling, precise color accuracy, and incredible detail.",
              "From watching movies to editing videos, the iPad Pro 11's display brings your content to life with stunning clarity."
            ]
          },
          {
            title: "Versatile Camera System",
            text: [
              "Capture stunning photos and videos with the iPad Pro 11's advanced camera system. Featuring a 12MP Ultra Wide front camera and a 12MP Wide rear camera with LiDAR scanner, you can take high-quality shots and enjoy augmented reality experiences.",
              "Whether you're video calling, scanning documents, or recording 4K videos, the iPad Pro 11's camera system delivers exceptional performance."
            ]
          }
        ]),
        screen: "11' Liquid Retina",
        resolution: "2388x1668",
        processor: "Apple M1",
        ram: "8GB",
        camera: "12MP + 12MP",
        zoom: "Digital zoom up to 5x",
        year: 2021
      },
      {
        categoryId: 3,
        brand: 'Apple',
        name: "Apple Watch Series 3 38mm Space Gray",
        capacity: "38mm",
        image: "img/accessories/apple-watch-series-3/space-gray/00.webp",
        priceRegular: 199,
        color: "space gray",
        description: JSON.stringify([
          {
            title: "Monitor your health",
            text: [
              "The Apple Watch Series 3 is equipped with sensors to track your heart rate, calories burned, and other fitness metrics throughout the day. It can even track your workouts and suggest personalized fitness goals."
            ]
          },
          {
            title: "Stay connected on the go",
            text: [
              "With cellular connectivity, you can make calls and send texts from your wrist even without your iPhone nearby. And with Siri, you can get directions, send messages, and set reminders hands-free."
            ]
          },
          {
            title: "Stream your favorite music",
            text: [
              "With Apple Music and Siri, you can stream over 75 million songs on your Apple Watch Series 3. Or listen to your favorite podcasts, audiobooks, and radio stations."
            ]
          }
        ]),
        screen: "1.3' OLED",
        resolution: "272x340",
        processor: "Apple S3",
        ram: "768MB",
        year: 2017
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await ProductModel.destroy({ where: {} });
  },
};
