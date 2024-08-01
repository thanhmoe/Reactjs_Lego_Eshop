# Reactjs Lego E-shop

A React.js based e-commerce platform for Lego products.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Reactjs Lego E-shop is an e-commerce application built using React and Vite. It provides a platform to browse and purchase Lego products, simulating a real-world e-commerce store.

## Features

- Product listing and detailed view
- Shopping cart functionality
- User authentication (login/register)
- Order placement and history
- Responsive design for mobile and desktop views

## Technologies Used

- React: Frontend library for building user interfaces
- Vite: Next Generation Frontend Tooling
- JavaScript: Programming language used for frontend logic
- CSS: Styling the application

## Installation

To get a local copy up and running, follow these simple steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thanhmoe/Reactjs_Lego_Eshop.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd Reactjs_Lego_Eshop
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Setup enviroment:**
   create a `.env` file in root directory and add you url:

   ```plaintext
   VITE_BASE_URL=http://localhost:3000
   ```

   port `3000` is the port for the backend

5. **Setup Backend:**
   browse `https://github.com/KienPT2607-IT/express-boilerplate` for installation instructions.

6. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server should now be running at `http://localhost:3006`.

7. **(Optional) Configure port:**
   You can configure the port by editing port variable `vite.config.js` in root directory:

   ```plaintext
   export default defineConfig({
   server: {
    port: 3006,
   },
   })
   ```

## Usage

After starting the development server, open your browser and navigate to `http://localhost:3006` to see the application in action. You can browse products, add them to your cart, and simulate the checkout process.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

For more details, visit the [repository](https://github.com/thanhmoe/Reactjs_Lego_Eshop).
