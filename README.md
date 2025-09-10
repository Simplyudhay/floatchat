# 🌊 FloatChat - Ocean Data Explorer

> **AI-Powered Conversational Interface for Argo Ocean Data with Dynamic Theming**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🌊%20View%20App-blue?style=for-the-badge)](https://simplyudhay.github.io/floatchat/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/simplyudhay/floatchat?style=for-the-badge)](https://github.com/simplyudhay/floatchat)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Themes](#themes)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🌟 Overview

FloatChat is a cutting-edge web application that democratizes access to Argo ocean data through an AI-powered conversational interface. Built with modern web technologies, it features a stunning ocean-themed UI with customizable light/dark modes, real-time data visualization, and an immersive user experience.

### 🎯 Mission
To make complex oceanographic data accessible to researchers, educators, policymakers, and ocean enthusiasts through natural language conversations and beautiful visualizations.

## ✨ Features

### 🤖 **AI-Powered Conversations**
- Natural language processing for ocean data queries
- Intelligent response generation with context awareness
- Conversation memory and state management
- Real-time typing indicators

### 🎨 **Dynamic Theme System**
- **Light Ocean Theme**: Bright tropical colors with vibrant marine life
- **Dark Ocean Theme**: Deep-sea atmosphere with bioluminescent effects
- Automatic system preference detection
- Smooth animated transitions between themes
- Persistent theme storage

### 🌊 **Immersive Ocean Experience**
- Live animated background with floating marine life
- Parallax wave effects
- Rising bubble particles
- Shifting light beams
- Responsive fish, jellyfish, and sailing boats

### 📊 **Data Visualization**
- Interactive charts using Chart.js
- Ocean maps with Leaflet.js
- Argo float position tracking
- Temperature and salinity data plots
- Real-time data updates

### 🎬 **Advanced Animations**
- Framer Motion-inspired smooth transitions
- Animated preloader with ocean ripples
- Smooth scroll chat interface
- Micro-interactions throughout the UI
- Loading state animations

### ♿ **Accessibility Features**
- WCAG 2.1 compliant contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- ARIA labels and semantic HTML

## 🚀 Demo

### Live Application
[**🌊 Experience FloatChat Live**](https://simplyudhay.github.io/floatchat/)

### Sample Queries
Try asking FloatChat:
- "Show me ocean temperature in the Pacific"
- "What's the salinity near the equator?"
- "Display Argo float positions globally"
- "Analyze temperature trends over time"
- "Show me current ocean data for the Atlantic"

## 🛠️ Tech Stack

### **Frontend**
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with custom properties
- **JavaScript (ES6+)** - Modern client-side logic
- **Chart.js** - Interactive data visualizations
- **Leaflet.js** - Interactive ocean maps

### **Design & UX**
- **Responsive Design** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layouts
- **CSS Animations** - Smooth transitions and effects
- **Custom Theme System** - Light/dark mode support

### **Data & APIs**
- **Mock Argo Data** - Simulated oceanographic datasets
- **Local Storage** - Theme and conversation persistence
- **REST API Simulation** - Backend functionality mockup

## 📥 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (optional for local development)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/floatchat.git
cd floatchat
```

2. **Open in browser**
```bash
# Direct file opening
open index.html

# Or serve with Python
python -m http.server 8000

# Or serve with Node.js
npx serve .
```

3. **Visit the application**
```
http://localhost:8000
```

### Development Setup

For advanced development:

```bash
# Install dependencies (if using build tools)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 Usage

### Basic Interaction

1. **Start Conversation**: Type your ocean data query in natural language
2. **View Results**: Get AI-generated responses with data visualizations
3. **Switch Themes**: Click the sun/moon toggle in the header
4. **Explore Data**: Interact with charts and maps
5. **Continue Chatting**: Ask follow-up questions

### Advanced Features

- **Theme Persistence**: Your theme choice is saved automatically
- **Conversation History**: Chat history persists during your session
- **Responsive Design**: Works seamlessly on all devices
- **Keyboard Navigation**: Fully accessible via keyboard

## 📁 Project Structure

```
floatchat/
├── index.html              # Main HTML file
├── style.css              # Comprehensive styling with themes
├── app.js                 # Core JavaScript functionality
├── README.md              # Project documentation
├── LICENSE                # MIT License
├── assets/               
│   ├── icons/            # Theme toggle icons
│   └── images/           # Ocean-themed graphics
├── data/                 
│   └── mock-argo.json    # Sample oceanographic data
└── docs/                 
    ├── API.md            # API documentation
    ├── THEMES.md         # Theme system guide
    └── CONTRIBUTING.md   # Contribution guidelines
```

## 🎨 Themes

### Light Ocean Theme 🌅
- **Background**: Bright ocean blues (#f0f9ff → #bae6fd)
- **Text**: Dark navy (#1e293b, #334155)
- **Accents**: Bright aqua (#06b6d4) and coral (#f97316)
- **Ocean Life**: Vibrant tropical colors
- **Mood**: Bright, tropical, energetic

### Dark Ocean Theme 🌊
- **Background**: Deep sea blues (#0f172a → #334155)
- **Text**: Light cyan (#e2e8f0, #cbd5e1)
- **Accents**: Glowing cyan (#22d3ee) and orange (#fb923c)
- **Ocean Life**: Bioluminescent effects
- **Mood**: Mysterious, deep-sea exploration

## 📖 API Documentation

### Mock Endpoints

The application simulates these API endpoints:

```javascript
// Chat interaction
POST /api/chat
{
  "message": "Show me ocean temperature data",
  "context": "previous_conversation_context"
}

// Data retrieval
GET /api/argo/floats
GET /api/argo/temperature
GET /api/argo/salinity

// Visualization data
GET /api/visualize/temperature
GET /api/visualize/salinity
GET /api/visualize/floats
```

### Data Models

```javascript
// Argo Float
{
  "id": "1901393",
  "lat": 45.2,
  "lon": -30.1,
  "temperature": 15.2,
  "salinity": 35.1,
  "date": "2025-09-10",
  "depth": 2000
}

// Temperature Profile
{
  "depth": 0,
  "temperature": 25.2,
  "location": "Atlantic",
  "timestamp": "2025-09-10T12:00:00Z"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use ES6+ JavaScript features
- Follow semantic HTML practices
- Write accessible CSS with proper contrast
- Comment complex logic
- Test across multiple browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Udhayakumar R**  
*Intern at Ministry of Defence*

- 🌐 Portfolio: [www.udhay.tech]
- 📧 Email: [simplyudhay@gmail.com]
- 🐱 GitHub: [@simplyudhay](https://github.com/simplyudhay)

---

### 🙏 Acknowledgments

- **Argo Program** - For providing global ocean observation data
- **Chart.js & Leaflet.js** - For excellent visualization libraries
- **Ocean Research Community** - For inspiring democratized data access
- **Ministry of Defence** - For internship opportunity and support

### 🌊 Ocean Data Sources

This application uses simulated data based on the real [Argo Global Ocean Observing System](https://argo.ucsd.edu/), which maintains a global array of profiling floats to observe temperature, salinity, and currents in the Earth's oceans.

---

<div align="center">

**Made with 🌊 for Ocean Science**

[![Argo Program](https://img.shields.io/badge/Data%20Source-Argo%20Program-blue)](https://argo.ucsd.edu/)
[![Ocean Science](https://img.shields.io/badge/Supporting-Ocean%20Research-green)](https://www.go-ship.org/)

</div>
