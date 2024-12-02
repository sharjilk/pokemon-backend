# 🐱‍🏍 Fullstack Pokémon App

## 🚀 Project Overview

The app is built using a **React (Vite)** frontend and a **Node.js (Express.js)** backend. Users can browse the first 150 Pokémon with pagination, view Pokémon details, and add/remove them from a favorites list. The backend provides RESTful APIs to manage Pokémon data and favorites.

### **Demo URL**
- **Frontend Production (Vercel)**: https://pokemon-client-vert.vercel.app/  
- **Backend Production (Render)**: https://pokemon-backend-mjgb.onrender.com/

---

## 🛠️ Tech Stack

### **Frontend:**
- **React** with **Vite** for fast development
- **TypeScript** for type safety
- **Tailwind CSS** for styling and responsiveness
- **Axios** for API requests
- **Deployed on Vercel**

### **Backend:**
- **Node.js** with **Express.js** for API handling
- **TypeScript** for backend logic
- **Express-Validator** for request validation
- **Deployed on Render**

---

## 🔍 Frontend Features
- **Homepage (`/`)**: Displays the first 150 Pokémon with pagination.
- **Favorites Page (`/favorites`)**: Lists all favorited Pokémon.
- **Detail Modal**: Shows detailed stats and type relationships.
- **Responsive Design**: Mobile-first, fully responsive using Tailwind CSS.

---

## 🔗 API Documentation

### **Pokémon API**

| Method | Endpoint            | Description                                     | Request Body                  | Response                                                                  |
|--------|---------------------|-------------------------------------------------|--------------------------------|---------------------------------------------------------------------------|
| `GET`  | `/api/pokemon`       | Fetches the list of all available Pokémon       | `None`                         | `200 OK` - Returns an array of Pokémon objects                            |
| `GET`  | `/api/pokemon/:id`   | Fetches a single Pokémon by its ID              | `None`                         | `200 OK` - Returns the Pokémon object or `404 Not Found` if it doesn't exist |

#### Example: Get All Pokémon
```bash
GET /api/pokemon
```

#### Example: Get Pokémon by ID
```bash
GET /api/pokemon/1
```

---

### **Favorites API**

| Method | Endpoint            | Description                                     | Request Body                  | Response                                                                  |
|--------|---------------------|-------------------------------------------------|--------------------------------|--------------------------------------------------------------------------|
| `POST`  | `/api/favorites`       | Adds a Pokémon to the favorites list       | `{ "id": number }`              | `201 Created` - Returns the updated favorites list                       |
| `DELETE`  | `/api/favorites/:id`   | Removes a Pokémon from the favorites list              | `None`           | `200 OK` - Returns the updated favorites list or `404 Not Found` if it doesn't exist |
| `GET`  | `/api/favorites`       | Fetches the list of all favorite Pokémon       | `{ "id": number }`              | `201 Created` - Returns an array of favorite Pokémon object            |

#### Example: Add Favorite
```bash
POST /api/favorites
Content-Type: application/json
{
  "id": 1
}
```

#### Example: Remove Favorite
```bash
DELETE /api/favorites/1
```

#### Example: Get Favorites
```bash
GET /api/favorites
```

---

## 🖥️ Running Locally

### **Prerequisites**
- Latest LTS version of Node.js and npm should be installed

---

### **Backend Setup**
1. Clone the repository
   ```bash
   git clone git@github.com:sharjilk/pokemon-backend.git
   cd backend
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run the backend
   ```bash
   npm run start
   ```
4. Backend runs on `http://localhost:4000/`

---

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   git clone git@github.com:sharjilk/pokemon-client.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Frontend runs on `http://localhost:5173/`
