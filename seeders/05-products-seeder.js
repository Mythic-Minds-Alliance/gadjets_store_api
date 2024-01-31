/* eslint-disable */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          name: 'Apple iPhone 11',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
              title: 'And then there was Pro',
            },
            {
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
              title: 'Camera',
            },
            {
              text: [
                'iPhone 11 lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
            },
          ]),
          resolution: '1792x828',
          screen: "6.1' IPS",
          processor: 'Apple A13 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital, 5x',
          year: '2019',
        },
        {
          name: 'Apple iPad Pro 11 (2021)',
          brand: 'Apple',
          categoryId: 2,
          description: JSON.stringify([
            {
              title: 'Powerful Performance',
              text: [
                'Experience incredible power and performance with the Apple iPad Pro 11. With the M1 chip, it delivers a new level of performance, making it faster and more efficient than ever before.',
                "Whether you're editing photos, designing artwork, or multitasking with demanding apps, the iPad Pro 11 handles it all with ease.",
              ],
            },
            {
              title: 'Stunning Liquid Retina Display',
              text: [
                "Enjoy a vibrant and immersive visual experience on the iPad Pro 11's Liquid Retina display. With ProMotion technology and True Tone, the display adapts to your environment, providing smooth scrolling, precise color accuracy, and incredible detail.",
                "From watching movies to editing videos, the iPad Pro 11's display brings your content to life with stunning clarity.",
              ],
            },
            {
              title: 'Versatile Camera System',
              text: [
                "Capture stunning photos and videos with the iPad Pro 11's advanced camera system. Featuring a 12MP Ultra Wide front camera and a 12MP Wide rear camera with LiDAR scanner, you can take high-quality shots and enjoy augmented reality experiences.",
                "Whether you're video calling, scanning documents, or recording 4K videos, the iPad Pro 11's camera system delivers exceptional performance.",
              ],
            },
          ]),
          resolution: '2388x1668',
          screen: "11' Liquid Retina",
          processor: 'Apple M1',
          ram: '8GB',
          camera: '12MP + 12MP',
          zoom: 'Digital zoom up to 5x',
          year: '2021',
        },
        {
          name: 'Apple Watch Series 3',
          brand: 'Apple',
          categoryId: 3,
          description: JSON.stringify([
            {
              title: 'Monitor your health',
              text: [
                'The Apple Watch Series 3 is equipped with sensors to track your heart rate, calories burned, and other fitness metrics throughout the day. It can even track your workouts and suggest personalized fitness goals.',
              ],
            },
            {
              title: 'Stay connected on the go',
              text: [
                'With cellular connectivity, you can make calls and send texts from your wrist even without your iPhone nearby. And with Siri, you can get directions, send messages, and set reminders hands-free.',
              ],
            },
            {
              title: 'Stream your favorite music',
              text: [
                'With Apple Music and Siri, you can stream over 75 million songs on your Apple Watch Series 3. Or listen to your favorite podcasts, audiobooks, and radio stations.',
              ],
            },
          ]),
          resolution: '272x340',
          screen: "1.3' OLED",
          processor: 'Apple S3',
          ram: '768MB',
          year: '2021',
        },
        {
          name: 'Apple iPhone 7',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'And then there was Pro',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone 7 lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '1334x750',
          screen: "4.7' IPS",
          processor: 'Apple A10',
          ram: '2GB',
          camera: '12 Mp + 7 Mp',
          zoom: 'Digital, 5x',
          year: '2016',
        },
        {
          name: 'Apple iPhone 7 Plus',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'And then there was Pro',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone 7 Plus lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '1920x1080',
          screen: "5.5' IPS",
          processor: 'Apple A10',
          ram: '3GB',
          camera: '12 Mp + 7 Mp',
          zoom: 'Digital, 10x / Optical, 2x',
          year: '2016',
        },
        {
          name: 'Apple iPhone 8',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'And then there was Pro',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone 8 lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '1334x750',
          screen: "4.7' IPS",
          processor: 'Apple A11 Bionic',
          ram: '2GB',
          camera: '12 Mp + 7 Mp',
          zoom: 'Digital, 10x / Optical, 2x',
          year: '2017',
        },
        {
          name: 'Apple iPhone 11 Pro',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
              title: 'And then there was Pro',
            },
            {
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
              title: 'Camera',
            },
            {
              text: [
                'iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
            },
          ]),
          resolution: '2436х1125',
          screen: "5.8' OLED",
          processor: 'Apple A13 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital, 5x',
          year: '2019',
        },
        {
          name: 'Apple iPhone 11 Pro Max',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
              title: 'And then there was Pro',
            },
            {
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
              title: 'Camera',
            },
            {
              text: [
                'iPhone 11 Max Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
            },
          ]),
          resolution: '2688х1242',
          screen: "6.5' OLED",
          processor: 'Apple A13 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital, 10x / Optical, 2x',
          year: '2019',
        },
        {
          name: 'Apple iPhone 12',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'Blast past fast.',
              text: [
                '5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.',
              ],
            },
            {
              title:
                'A14 Bionic chip. The only thing even close was our last chip.',
              text: [
                'A14 Bionic is the first 5-nanometer chip in the industry, with advanced components literally atoms wide. Forty percent more transistors rev up speeds while increasing efficiency for great battery life. And a new ISP powers Dolby Vision recording — something no pro movie camera, let alone any other phone, can do.',
              ],
            },
            {
              title: 'Night mode comes to all your cameras.',
              text: [
                'Low light is now a highlight. From dimly lit restaurants to moonlit beaches, the new Night mode delivers natural low-light shots — automatically.',
              ],
            },
          ]),
          resolution: '2532x1170',
          screen: "6.1' OLED",
          processor: 'Apple A14 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp',
          zoom: 'Optical, 2x; Digital, 5x',
          year: '2020',
        },
        {
          name: 'Apple iPhone 13 Mini',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'Your new superpower.',
              text: [
                'A15 Bionic, the fastest chip ever in a smartphone. Super Retina XDR display with ProMotion. Durable Ceramic Shield with 4x better drop performance. New Night mode on all cameras. It’s the ultimate iPhone, powered by the ultimate chip.',
              ],
            },
            {
              title: 'A15 Bionic chip. Super power. Mini sized.',
              text: [
                'The A15 Bionic chip is the fastest chip ever in a smartphone. It powers everything from photography to gaming. And the incredible Machine Learning accelerators allow you to experience augmented reality like never before.',
              ],
            },
            {
              title: 'Amazing Camera. No Pro Required.',
              text: [
                'iPhone 13 Mini takes stunning photos and videos with its advanced dual-camera system, with a new Night mode on all cameras. And Photographic Styles personalizes your photos in the moment for a beautiful look.',
              ],
            },
          ]),
          resolution: '2532x1170',
          screen: "5.4' Super Retina XDR",
          processor: 'Apple A15 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp',
          zoom: 'Optical, 2x; Digital, 5x',
          year: '2021',
        },
        {
          name: 'Apple iPhone 14',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'Wonderfull',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone 14 lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '2532x1170',
          screen: "6.1' OLED (Super Retina XDR)",
          processor: 'Apple A15 Bionic',
          ram: '6GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital 5x, Optical 2x',
          year: '2022',
        },
        {
          name: 'Apple iPhone 14 Pro',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'Wonderfull',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone 14 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '2556x1179',
          screen: "6.1' OLED (Super Retina XDR)",
          processor: 'Apple A16 Bionic',
          ram: '6GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital 5x, Optical 2x',
          year: '2022',
        },
        {
          name: 'Apple iPhone 13 Pro Max',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'The Ultimate Pro Camera System',
              text: [
                "Introducing the first pro camera system that's also an iPhone — delivering 3x optical zoom, macro photography, Night mode portraits, and a new ProRes format for the highest-quality video ever in a smartphone. Get ready to shoot like a pro.",
              ],
            },
            {
              title: 'Cinematic Mode',
              text: [
                'Film like a pro with exclusive access to the depth-of-field effect of Cinema mode, now on both the Wide and Telephoto cameras. Add focus transitions for a creative look, and easily switch between cameras to capture more of the moment.',
              ],
            },
            {
              title: 'A15 Bionic',
              text: [
                'A15 Bionic is the fastest chip ever in a smartphone. It powers incredible experiences in photography, video, gaming, and more — all while delivering great battery life. And it enables the most advanced machine learning capabilities in any smartphone for next-level experiences.',
              ],
            },
            {
              title: 'ProMotion',
              text: [
                'ProMotion technology automatically adjusts the display to the movement on your screen, for more fluid scrolling, greater responsiveness, and smoother motion — and a battery that lasts all day.',
              ],
            },
          ]),
          resolution: '2778x1284',
          screen: "6.7' Super Retina XDR display",
          processor: 'Apple A15 Bionic',
          ram: '6GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Optical, 3x; Digital, up to 15x',
          year: '2021',
        },

        {
          name: 'Apple iPhone XS',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'And then there was Pro',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone XS lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '2436х1125',
          screen: "5.8' OLED",
          processor: 'Apple A12 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital, 10x / Optical, 2x',
          year: '2018',
        },
        {
          name: 'Apple iPhone XS Max',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'And then there was Pro',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone XS Max lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '2688х1242',
          screen: "6.5' OLED (Super Retina HD)",
          processor: 'Apple A12 Bionic',
          ram: '4GB',
          camera: '12 Mp + 12 Mp + 12MP',
          zoom: 'Digital, 10x / Optical, 2x',
          year: '2018',
        },
        {
          name: 'Apple iPhone XR',
          brand: 'Apple',
          categoryId: 1,
          description: JSON.stringify([
            {
              title: 'And then there was Pro',
              text: [
                'A transformative triple-camera system that adds tons of capability without complexity.',
                'An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.',
              ],
            },
            {
              title: 'Camera',
              text: [
                'Meet the first triple-camera system to combine cutting-edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest-quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.',
              ],
            },
            {
              title:
                'Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.',
              text: [
                'iPhone XR lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.',
              ],
            },
          ]),
          resolution: '1792х828',
          screen: "6.1' IPS",
          processor: 'Apple A12 Bionic',
          ram: '43B',
          camera: '12 Mp + 7 MP',
          zoom: 'Digital, 5x',
          year: '2018',
        },
        {
          name: 'Apple iPad Air (4th Gen)',
          brand: 'Apple',
          categoryId: 2,
          description: JSON.stringify([
            {
              title: 'Thin, Light, and Powerful',
              text: [
                "The Apple iPad Air (4th Gen) combines sleek design with powerful performance. With its thin and light form factor, it's incredibly portable and easy to carry wherever you go.",
                'Featuring the A14 Bionic chip with Neural Engine, the iPad Air delivers fast and efficient performance, making it ideal for multitasking, gaming, and creative tasks.',
              ],
            },
            {
              title: 'Stunning Liquid Retina Display',
              text: [
                "Immerse yourself in vivid visuals on the iPad Air's Liquid Retina display. With True Tone and P3 wide color gamut, it offers true-to-life colors and incredible detail.",
                "Whether you're watching movies, editing photos, or browsing the web, the iPad Air's display provides an immersive and enjoyable viewing experience.",
              ],
            },
            {
              title: 'Versatile Features and Apple Pencil Support',
              text: [
                "Unlock new possibilities with the iPad Air's versatile features. It supports Apple Pencil (2nd generation), allowing you to take notes, sketch, and annotate documents with precision.",
                'With Touch ID built into the top button, you can securely unlock your iPad, make secure purchases, and authenticate apps with a simple touch.',
              ],
            },
          ]),
          resolution: '2360x1640',
          screen: "10.9' Liquid Retina",
          processor: 'Apple A14 Bionic',
          ram: '4GB',
          camera: '12MP',
          zoom: 'Digital zoom up to 5x',
          year: '2022',
        },
        {
          name: 'Apple iPad Mini (6th Gen)',
          brand: 'Apple',
          categoryId: 2,
          description: JSON.stringify([
            {
              title: 'Compact and Portable',
              text: [
                "Experience the power of an iPad in a compact size with the Apple iPad Mini (6th Gen). With its 8.3-inch Liquid Retina display and slim design, it's perfect for on-the-go productivity and entertainment.",
                "Whether you're reading, gaming, or watching videos, the iPad Mini delivers a stunning visual experience in a portable package.",
              ],
            },
            {
              title: 'A15 Bionic Chip and Neural Engine',
              text: [
                'The iPad Mini (6th Gen) is equipped with the powerful A15 Bionic chip and Neural Engine, delivering fast and efficient performance. It can handle demanding tasks and graphics-intensive apps with ease, making it suitable for both work and play.',
                'Experience smooth multitasking, immersive gaming, and seamless app usage on the iPad Mini.',
              ],
            },
            {
              title: 'Advanced Cameras and Center Stage',
              text: [
                "Capture stunning photos and videos with the iPad Mini's advanced cameras. With a 12MP front camera and a 12MP rear camera, you can take high-quality shots and record impressive videos.",
                'The iPad Mini also features Center Stage, a feature that automatically keeps you in frame during video calls, making your conversations more engaging and dynamic.',
              ],
            },
          ]),
          resolution: '2266x1488',
          screen: "8.3' Liquid Retina",
          processor: 'Apple A15 Bionic',
          ram: '4GB',
          camera: '12MP',
          zoom: 'Digital zoom up to 5x',
          year: '2021',
        },
        {
          name: 'Apple iPad 10.2 (2020)',
          brand: 'Apple',
          categoryId: 2,
          description: JSON.stringify([
            {
              title: 'Versatile and Affordable',
              text: [
                "The Apple iPad 10.2 (2020) offers a versatile and affordable option for everyday tasks and entertainment. Whether you're browsing the web, streaming content, or using productivity apps, it delivers a smooth and responsive experience.",
                'With its large 10.2-inch Retina display, it provides a great viewing experience for all your content.',
              ],
            },
            {
              title: 'Powerful Performance',
              text: [
                "Experience powerful performance with the iPad 10.2's A12 Bionic chip. It enables fast and efficient multitasking, allowing you to run multiple apps smoothly and seamlessly.",
                'From gaming to editing documents, the iPad 10.2 can handle it all with ease.',
              ],
            },
            {
              title: 'Apple Pencil and Smart Keyboard Support',
              text: [
                'Unlock your creativity and productivity with Apple Pencil and Smart Keyboard support. Take notes, draw, and sketch with precision using the Apple Pencil (1st generation), and transform your iPad into a lightweight laptop with the Smart Keyboard.',
                "The iPad 10.2 adapts to your needs, whether you're a student, professional, or creative artist.",
              ],
            },
          ]),
          resolution: '2160x1620',
          screen: "10.2' Retina",
          processor: 'Apple A12 Bionic',
          ram: '3GB',
          camera: '8MP',
          zoom: 'Digital zoom up to 5x',
          year: '2020',
        },
        {
          name: 'Apple iPad Mini (5th Gen)',
          brand: 'Apple',
          categoryId: 2,
          description: JSON.stringify([
            {
              title: 'Compact and Powerful',
              text: [
                "The Apple iPad Mini (5th Gen) packs a punch with its compact size and powerful performance. Whether you're on the go or at home, it's perfect for productivity, entertainment, and creativity.",
                'With its A12 Bionic chip, the iPad Mini delivers fast and efficient performance, allowing you to run demanding apps and games smoothly.',
              ],
            },
            {
              title: 'Retina Display and True Tone',
              text: [
                "Experience stunning visuals on the iPad Mini's Retina display. With True Tone technology, it adjusts the display's color temperature to match the ambient lighting, providing a natural and comfortable viewing experience.",
                "From reading ebooks to browsing photos, the iPad Mini's display brings content to life with vibrant colors and sharp details.",
              ],
            },
            {
              title: 'Apple Pencil and Smart Keyboard Support',
              text: [
                'Unlock your creativity and productivity with Apple Pencil and Smart Keyboard support. Take notes, sketch, and annotate documents with precision using the Apple Pencil (1st generation), and turn your iPad Mini into a versatile workstation with the Smart Keyboard.',
                'The iPad Mini adapts to your needs, making it a powerful tool for both work and play.',
              ],
            },
          ]),
          resolution: '2048x1536',
          screen: "7.9' Retina",
          processor: 'Apple A12 Bionic',
          ram: '3GB',
          camera: '8MP',
          zoom: 'Digital zoom up to 5x',
          year: '2019',
        },
        {
          name: 'Apple Watch Series 6',
          brand: 'Apple',
          categoryId: 3,
          description: JSON.stringify([
            {
              title: 'Always-On Retina display',
              text: [
                'The Apple Watch Series 6 features an Always-On Retina display that is 2.5 times brighter outdoors when your wrist is down. So you can see all the information on your watch face at a glance.',
              ],
            },
            {
              title: 'Blood oxygen sensor',
              text: [
                'The Blood Oxygen app measures your blood oxygen levels with a revolutionary new sensor and app. You can also take an ECG from your wrist anytime, anywhere.',
              ],
            },
            {
              title: 'Track your daily activity',
              text: [
                'The Apple Watch Series 6 tracks your daily activity including workouts, steps taken, and calories burned. It also has a built-in GPS to track your runs, walks, and hikes.',
              ],
            },
          ]),
          resolution: '324x394',
          screen: "1.57' OLED",
          processor: 'Apple S6',
          ram: '1GB',
          camera: '8MP',
          zoom: 'Digital zoom up to 5x',
          year: '2019',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};
