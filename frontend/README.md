# Portfolio Website

A modern, interactive portfolio website showcasing my skills, projects, and experience as a Full Stack MERN Developer specializing in Generative AI and Agentic Systems.

##  Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Interactive Animations**: Smooth animations using Framer Motion
- **Modern UI**: Clean, professional design with gradients and rounded corners
- **Project Showcase**: Detailed project cards with tech stacks and live demos
- **Timeline Layout**: Experience and education displayed in timeline format
- **Contact Form**: Functional contact form for inquiries
- **Smooth Scrolling**: Navigation with smooth scroll to sections

##  Technologies Used

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

##  Project Structure

```
portfolio/
├── backend/
│   ├── data.js          # Portfolio data (experience, projects, etc.)
│   ├── server.js        # Express server
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # React components
    │   │   ├── About.jsx
    │   │   ├── Contact.jsx
    │   │   ├── Education.jsx
    │   │   ├── Experience.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Projects.jsx
    │   │   └── Skills.jsx
    │   ├── api.js       # API configuration
    │   ├── App.jsx      # Main app component
    │   ├── index.css    # Global styles
    │   ├── main.jsx     # App entry point
    │   └── ThemeContext.jsx # Theme management
    ├── package.json
    └── vite.config.js
```

##  Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nomaantalib/Portfolio.git
   cd portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

##  Customization

### Adding Your Profile Photo
Replace the placeholder image in `src/components/Hero.jsx`:
```jsx
<img src="path/to/your/photo.jpg" alt="Your Name" />
```

### Updating Portfolio Data
Edit `backend/data.js` to update:
- Personal information
- Skills
- Experience
- Education
- Projects
- Contact details

### Theme Customization
Modify colors in `src/index.css` and component files to match your brand.

## 📱 Usage

- Navigate through sections using the fixed navbar
- Toggle between dark and light modes
- View project details and visit live demos
- Use the contact form to send messages
- Responsive design works on mobile and desktop

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Contact

**Mohd Nomaan Talib**
- Email: mohdnomaantalib@gmail.com
- Phone: 7068604832
- LinkedIn: [Mohd Nomaan Talib](https://www.linkedin.com/in/mohd-nomaan-talib-256b93276)
- GitHub: [nomaantalib](https://github.com/nomaantalib)

---

⭐ If you like this project, please give it a star!
