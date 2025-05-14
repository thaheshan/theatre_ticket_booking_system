# 🎭 Theatre Ticket Booking System

A fully functional **movie discovery and ticket booking web application** developed as part of a client project for a startup. The platform allows users to **search for movies**, **view detailed information**, and **explore trending films**, with all data dynamically fetched through API calls.

---

## 🚀 Features

- 🔍 **Movie Search** — Search for movies by title and fetch results in real-time.
- 📽️ **Detailed View** — View movie descriptions, ratings, release dates, genres, and posters.
- 📊 **Trending Films** — Explore a curated list of trending or popular movies.
- 🌗 **Light/Dark Mode** — Users can toggle between light and dark themes.
- 📅 **Booking Interface** (Coming Soon) — Reserve tickets with date/time and seat selection.
- 📱 **Responsive Design** — Optimized for desktop and mobile devices.
- ⚡ **Fast & Optimized** — React-powered frontend with lazy loading and performance-focused design.

---

## 🧰 Tech Stack

- **Frontend:** React.js (with Create React App)
- **Styling:** Tailwind CSS
- **API Integration:** [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api)
- **State Management:** React Hooks
- **Theme Management:** Context API
- **Build Tools:** PostCSS, Webpack

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/theatre_ticket_booking_system.git
cd theatre_ticket_booking_system/my-app
Install dependencies

bash
Copy
Edit
npm install
Set up your TMDb API Key

Create a .env file in the root of the my-app folder.

Add the following line:

ini
Copy
Edit
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
You can obtain an API key by creating a free account on TMDb.

Start the development server

bash
Copy
Edit
npm start
The app will run locally on http://localhost:3000.

🛠 Build for Production
bash
Copy
Edit
npm run build
This will create an optimized production build in the /build directory.

📁 Project Structure
pgsql
Copy
Edit
theatre_ticket_booking_system/
│
└───my-app/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── Context/
    │   │   └── Themecontext.js
    │   ├── pages/
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    ├── package.json
    └── tailwind.config.js
📷 Screenshots
![Screenshot 2025-05-14 160805](https://github.com/user-attachments/assets/6d4f14b7-5b6b-4ec4-a6aa-ff773f091b5c)
![Screenshot 2025-05-14 160749](https://github.com/user-attachments/assets/3ea8e664-5f08-4038-8bc4-01cb4a88bd18)
![Screenshot 2025-05-14 160732](https://github.com/user-attachments/assets/b08d0172-9d5b-41d7-8a79-18febb4ed84a)
![Screenshot 2025-05-14 160820](https://github.com/user-attachments/assets/bd217bde-46f6-4e3a-ab2e-7ae26776b419)

🧩 Future Improvements
🎟️ Add seat selection and ticket purchasing

🧾 Integrate a payment gateway

🔐 Add user authentication and booking history

🌍 Add multi-language support

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License
This project is licensed under the MIT License.

🙌 Acknowledgements
TMDb API for movie data











