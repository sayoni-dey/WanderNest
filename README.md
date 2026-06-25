# WanderNest - An Airbnb Clone

A full-stack Airbnb-inspired web application that allows users to discover, list, and book unique accommodations around the world. This project replicates the core functionality of Airbnb while providing a modern, responsive, and user-friendly experience. The primary goal of this project is to get hands on experience on building a production level web application and implementation of system design techniques to handle scalability and lower latency.

---

## Overview

This Airbnb Clone is built using the MERN stack and focuses on providing a seamless booking experience. Users can browse properties, search based on location, list their own accommodations, manage bookings, and securely authenticate into the platform.

---

## Features

### Authentication
- User Registration & Login
- Secure Password Hashing
- JWT Authentication
- Protected Routes

### Property Listings
- Browse all available listings
- View detailed property information
- Upload listing images
- Create, Edit, and Delete listings
- Responsive property cards

### Search & Filtering
- Search by location
- Filter properties by category
- Price-based filtering
- Date selection

### Booking System
- Book available properties
- Prevent overlapping bookings
- Booking history
- Reservation management

### User Dashboard
- Manage personal listings
- View booked trips
- Manage reservations
- Update profile information

### Responsive Design
- Mobile Friendly
- Tablet Support
- Desktop Optimized

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS / Tailwind CSS *(depending on your project)*
- Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Database
- MongoDB Atlas

### Other Tools
- Cloudinary (Image Uploads)
- Git & GitHub
- Postman

---

## Project Structure

```
WanderNest
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── .gitignore
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/airbnb-clone.git
```

### Navigate to the project

```bash
cd airbnb-clone
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file.

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## Usage

1. Register a new account.
2. Log in securely.
3. Browse available listings.
4. Search for your desired destination.
5. View listing details.
6. Book a stay.
7. List your own property.
8. Manage bookings from your dashboard.

---

## Screenshots

will add screenshots here.

### Home Page

```
Home Page Screenshot
```

### Property Details

```
Property Details Screenshot
```

### User Dashboard

```
Dashboard Screenshot
```

---


## Future Improvements

- Wishlist / Favorites
- Google Authentication
- Stripe Payment Integration
- Email Notifications
- Reviews & Ratings
- Interactive Maps
- Property Availability Calendar
- Admin Dashboard
- Dark Mode
- Real-time Messaging
- AI-powered Property Recommendations

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/feature-name
```

3. Commit your changes.

```bash
git commit -m "Add your feature"
```

4. Push the branch.

```bash
git push origin feature/feature-name
```

5. Open a Pull Request.

---

## Running Tests

```bash
npm test
```

---

## License

This project is licensed under the MIT License.

---

## Author

Sayoni Dey

GitHub: [https://github.com/sayoni-dey](https://github.com/sayoni-dey)

---
