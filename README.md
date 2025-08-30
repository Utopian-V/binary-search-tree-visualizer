# Binary Search Tree Visualizer

A comprehensive, interactive web application for visualizing Binary Search Tree (BST) operations with real-time animations and step-by-step operation tracking.

## 🌟 Features

### Core BST Operations
- **Insert**: Add new nodes with visual feedback
- **Delete**: Remove nodes with proper tree restructuring
- **Search**: Find values with path highlighting
- **Clear**: Reset the entire tree

### Traversal Algorithms
- **Inorder Traversal** (Left-Root-Right)
- **Preorder Traversal** (Root-Left-Right)  
- **Postorder Traversal** (Left-Right-Root)
- **Level-order Traversal** (Breadth-First Search)

### Interactive Visualization
- Real-time tree rendering with smooth animations
- Step-by-step operation visualization
- Color-coded node states (visited, found, current, etc.)
- Responsive design for all screen sizes
- Beautiful, modern UI with smooth transitions

### Technical Features
- RESTful API with FastAPI backend
- React frontend with Framer Motion animations
- Real-time operation tracking
- JSON serialization for tree state
- Comprehensive error handling

## 🏗️ Architecture

```
DSA project/
├── backend/                 # FastAPI backend
│   ├── src/
│   │   ├── main.py         # FastAPI application
│   │   └── binary_search_tree.py  # BST implementation
│   ├── tests/              # Test files
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service layer
│   │   └── App.js         # Main application
│   ├── public/            # Static assets
│   └── package.json       # Node.js dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server:**
   ```bash
   python src/main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📚 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information and available endpoints |
| GET | `/tree` | Get current tree state |
| POST | `/tree/insert` | Insert a value into the BST |
| POST | `/tree/delete` | Delete a value from the BST |
| POST | `/tree/search` | Search for a value in the BST |
| GET | `/tree/traversal/inorder` | Get inorder traversal |
| GET | `/tree/traversal/preorder` | Get preorder traversal |
| GET | `/tree/traversal/postorder` | Get postorder traversal |
| GET | `/tree/traversal/levelorder` | Get level-order traversal |
| POST | `/tree/clear` | Clear the entire tree |
| GET | `/tree/random` | Generate a random BST |
| GET | `/tree/height` | Get tree height |
| GET | `/tree/size` | Get tree size |

### Example API Usage

```bash
# Insert a value
curl -X POST "http://localhost:8000/tree/insert" \
     -H "Content-Type: application/json" \
     -d '{"value": 10}'

# Get tree state
curl "http://localhost:8000/tree"

# Get inorder traversal
curl "http://localhost:8000/tree/traversal/inorder"
```

## 🎮 How to Use

1. **Start both servers** (backend and frontend)
2. **Open the application** in your browser at `http://localhost:3000`
3. **Insert values** using the control panel on the right
4. **Watch the tree grow** with real-time visualizations
5. **Try different operations**:
   - Insert/Delete nodes
   - Search for values
   - Perform traversals
   - Generate random trees
6. **Observe the animations** showing each step of the operations

## 🔧 Development

### Backend Development

The backend uses FastAPI with the following key components:

- **`binary_search_tree.py`**: Core BST implementation with operation tracking
- **`main.py`**: FastAPI application with REST endpoints
- **Operation Steps**: Each operation returns detailed steps for frontend animation

### Frontend Development

The frontend is built with React and includes:

- **`BSTVisualizer`**: Main tree visualization component
- **`TreeNode`**: Individual node rendering with animations
- **`ControlPanel`**: User interface for operations
- **`TraversalPanel`**: Traversal algorithm controls
- **`bstService`**: API communication layer

### Key Technologies

**Backend:**
- FastAPI - Modern Python web framework
- Pydantic - Data validation
- Uvicorn - ASGI server

**Frontend:**
- React 18 - UI library
- Styled Components - CSS-in-JS styling
- Framer Motion - Animation library
- Axios - HTTP client

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📊 Performance

- **Tree Operations**: O(log n) average case for insert/delete/search
- **Traversals**: O(n) time complexity
- **Memory**: O(n) space for tree storage
- **Animation**: 60fps smooth transitions

## 🎨 Customization

### Styling
- Modify `styled-components` in React components
- Update color schemes in component files
- Adjust animation timings in Framer Motion

### Functionality
- Add new traversal algorithms in `binary_search_tree.py`
- Extend API endpoints in `main.py`
- Add new visualizations in React components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- FastAPI for the excellent Python web framework
- React team for the powerful UI library
- Framer Motion for smooth animations
- The data structures and algorithms community

---

**Happy Coding! 🌳✨**
