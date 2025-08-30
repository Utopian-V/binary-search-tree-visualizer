# Binary Search Tree Visualizer

Interactive web application for visualizing Binary Search Tree operations with real-time animations.

## Features

### Core BST Operations
- Insert, Delete, Search, Clear operations
- Real-time tree visualization
- Step-by-step operation tracking

### Traversal Algorithms
- Inorder, Preorder, Postorder, Level-order traversals
- Visual traversal results

### Technical Features
- FastAPI backend with REST endpoints
- React frontend with animations
- Real-time operation tracking
- JSON serialization for tree state

## Architecture

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

## Quick Start

### Prerequisites
- Python 3.8+ 
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python src/main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/tree` | Get current tree state |
| POST | `/tree/insert` | Insert a value |
| POST | `/tree/delete` | Delete a value |
| POST | `/tree/search` | Search for a value |
| GET | `/tree/traversal/inorder` | Get inorder traversal |
| GET | `/tree/traversal/preorder` | Get preorder traversal |
| GET | `/tree/traversal/postorder` | Get postorder traversal |
| GET | `/tree/traversal/levelorder` | Get level-order traversal |
| POST | `/tree/clear` | Clear the tree |
| GET | `/tree/random` | Generate random BST |
| GET | `/tree/height` | Get tree height |
| GET | `/tree/size` | Get tree size |

## How to Use

1. Start both servers (backend and frontend)
2. Open the application in your browser at `http://localhost:3000`
3. Insert values using the control panel
4. Watch the tree grow with real-time visualizations
5. Try different operations and traversals
6. Observe the animations showing each step

## Development

### Backend
- FastAPI with comprehensive BST implementation
- Operation step tracking for frontend animations
- RESTful API with proper error handling

### Frontend
- React with styled-components and Framer Motion
- Interactive tree visualization
- Real-time operation animations
- Modern, responsive UI

### Key Technologies
- FastAPI, Pydantic, Uvicorn (Backend)
- React, Styled Components, Framer Motion (Frontend)

## Testing

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

## License

This project is open source and available under the MIT License.