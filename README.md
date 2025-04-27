## Features

- Display a dynamic list of playgrounds from `data.json`
- Search playgrounds by **name** or **city**
- Filter playgrounds by city
- View detailed playground information
- Book available hours on playgrounds
- Save bookings and reserved hours into **localStorage**
- Display user's **personal bookings** after booking
- Persistent data across page refresh and navigation

---

## Core Technologies

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **localStorage** for client-side persistence
- **Live Server** (for serving `data.json` properly)

---

## How It Works

1. On first load, data is fetched from `assests/data.json` and saved into localStorage.
2. On future loads, data is retrieved directly from localStorage (no repeated fetching).
3. Any modifications (like booking) update localStorage immediately.
4. User can search or filter playgrounds easily.
5. Bookings are displayed **filtered by the logged-in user's ID**.

---

## Deployment

1. Clone or download this repository.
2. Open the project in **VS Code** (or any IDE).
3. Install Live Server extension (if not already).
4. Right-click `index.html` and choose **"Open with Live Server"**.
5. Navigate through playgrounds and start booking!

---

## Future Enhancements (Ideas)

- Authentication system for real users
- Backend API with Node.js to store real bookings
- Admin dashboard to manage playgrounds and reservations
- Date/time picker for better hour selection
- Visual calendar of reservations

---

## Screenshots



---

## 🤝 Credits

Developed with 💻 and ☕ by [Manar - Mohamed Adel - Mahmoud].

---

