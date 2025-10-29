# JSON Tree Visualizer

A modern, interactive web application to visualize JSON data as hierarchical tree structures.

![Dark Mode](https://img.shields.io/badge/Theme-Dark%20%2F%20Light-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

### Core Features ✅
- **JSON Input & Validation** - Real-time validation with error messages
- **Interactive Tree Visualization** - Canvas-based layout with React Flow
- **Smart Search** - JSON path search ($.user.name, $.items[0])
- **Auto Highlighting** - Visual feedback with auto-pan
- **Color-Coded Nodes** - Blue (Objects), Green (Arrays), Orange (Primitives)

### Bonus Features 🎁
- **Dark/Light Mode** - Persistent theme with smooth transitions
- **Copy Path** - Click nodes to copy JSON path
- **Export Image** - Download tree as PNG
- **Hover Info** - Tooltips with path and value
- **Modern UI** - Beautiful animations and responsive design

## 🚀 Quick Start

```bash
git clone https://github.com/Anku-yadav-001/JSON-tree-visualizer.git
cd json-tree-visualizer

npm install

npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14 | React framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| React Flow | 11 | Tree visualization |
| html-to-image | 1.11 | PNG export |
| Lucide React | 0.400 | Icons |

## 🎯 Usage Guide

### 1. Input JSON
```json
{
  "user": {
    "name": "Aman yadav",
    "email": "test@email.com",
    "address": {
      "city": "Bhopal"
    }
  }
}
```

### 2. Generate Tree
Click "Generate Tree" button

### 3. Search
Use JSON path format:
- `$.user.name` - Access property
- `$.items[0]` - Access array element
- `$.user.address.city` - Nested property

### 4. Interact
- **Click nodes** - Copy path to clipboard
- **Hover nodes** - View full information
- **Zoom/Pan** - Navigate large trees
- **Download** - Export as PNG image

## 🎨 Color Legend
| Color | Node Type | Example |
|-------|-----------|---------|
| 🔵 Blue | Objects | `{"key": "value"}` |
| 🟢 Green | Arrays | `[1, 2, 3]` |
| 🟡 Orange | Primitives | `"string"`, `123`, `true` |

## 🤝 Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'feat: Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open Pull Request

### Branch Strategy
- `main` - Production
- `feature/project-setup` - Initial setup
- `feature/json-parsing-validation` - Parsing
- `feature/tree-visualization` - Tree rendering
- `feature/search-functionality` - Search
- `feature/bonus-enhancements` - Extra features

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Modular components
- ✅ Custom hooks for state
- ✅ Clean architecture

### Tree Not Rendering
1. Check JSON validity
2. Open browser console
3. Verify React Flow CSS loaded

### Search Not Working
- Use correct format: `$.path`
- Check console for errors
- Verify path exists in JSON

## 👨‍💻 Author
**Aman Yadav**
- GitHub: [@Anku-yadav-001](https://github.com/Anku-yadav-001)

## 🙏 Acknowledgments
- [React Flow](https://reactflow.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Lucide Icons](https://lucide.dev/)

⭐ Star this repo if you find it helpful!

**Live Demo**: [View Demo](https://json-tree-visualizer-ji6g.onrender.com/)