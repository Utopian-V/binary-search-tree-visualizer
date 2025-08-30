from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import uvicorn

from binary_search_tree import BinarySearchTree


class InsertRequest(BaseModel):
    value: int


class DeleteRequest(BaseModel):
    value: int


class SearchRequest(BaseModel):
    value: int


class TraversalResponse(BaseModel):
    traversal: List[int]
    tree_state: Dict[str, Any]


class OperationResponse(BaseModel):
    success: bool
    message: str
    tree_state: Dict[str, Any]
    operation_steps: List[Dict[str, Any]]


class TreeStateResponse(BaseModel):
    tree_state: Dict[str, Any]
    operation_steps: List[Dict[str, Any]]


app = FastAPI(
    title="Binary Search Tree API",
    description="A comprehensive API for BST operations with visualization support",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

bst = BinarySearchTree()


@app.get("/")
async def root():
    return {
        "message": "Binary Search Tree API",
        "version": "1.0.0",
        "endpoints": {
            "GET /tree": "Get current tree state",
            "POST /tree/insert": "Insert a value",
            "POST /tree/delete": "Delete a value",
            "POST /tree/search": "Search for a value",
            "GET /tree/traversal/inorder": "Get inorder traversal",
            "GET /tree/traversal/preorder": "Get preorder traversal",
            "GET /tree/traversal/postorder": "Get postorder traversal",
            "GET /tree/traversal/levelorder": "Get level-order traversal",
            "POST /tree/clear": "Clear the tree",
            "GET /tree/height": "Get tree height",
            "GET /tree/size": "Get tree size"
        }
    }


@app.get("/tree", response_model=TreeStateResponse)
async def get_tree_state():
    return TreeStateResponse(
        tree_state=bst.to_dict(),
        operation_steps=bst.get_operation_steps()
    )


@app.post("/tree/insert", response_model=OperationResponse)
async def insert_value(request: InsertRequest):
    try:
        success = bst.insert(request.value)
        message = f"Value {request.value} inserted successfully" if success else f"Value {request.value} already exists"
        
        return OperationResponse(
            success=success,
            message=message,
            tree_state=bst.to_dict(),
            operation_steps=bst.get_operation_steps()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting value: {str(e)}")


@app.post("/tree/delete", response_model=OperationResponse)
async def delete_value(request: DeleteRequest):
    try:
        success = bst.delete(request.value)
        message = f"Value {request.value} deleted successfully" if success else f"Value {request.value} not found"
        
        return OperationResponse(
            success=success,
            message=message,
            tree_state=bst.to_dict(),
            operation_steps=bst.get_operation_steps()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting value: {str(e)}")


@app.post("/tree/search", response_model=OperationResponse)
async def search_value(request: SearchRequest):
    try:
        found = bst.search(request.value)
        message = f"Value {request.value} found" if found else f"Value {request.value} not found"
        
        return OperationResponse(
            success=found,
            message=message,
            tree_state=bst.to_dict(),
            operation_steps=bst.get_operation_steps()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching value: {str(e)}")


@app.get("/tree/traversal/inorder", response_model=TraversalResponse)
async def inorder_traversal():
    try:
        traversal = bst.inorder_traversal()
        return TraversalResponse(
            traversal=traversal,
            tree_state=bst.to_dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting inorder traversal: {str(e)}")


@app.get("/tree/traversal/preorder", response_model=TraversalResponse)
async def preorder_traversal():
    try:
        traversal = bst.preorder_traversal()
        return TraversalResponse(
            traversal=traversal,
            tree_state=bst.to_dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting preorder traversal: {str(e)}")


@app.get("/tree/traversal/postorder", response_model=TraversalResponse)
async def postorder_traversal():
    try:
        traversal = bst.postorder_traversal()
        return TraversalResponse(
            traversal=traversal,
            tree_state=bst.to_dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting postorder traversal: {str(e)}")


@app.get("/tree/traversal/levelorder", response_model=TraversalResponse)
async def level_order_traversal():
    try:
        traversal = bst.level_order_traversal()
        return TraversalResponse(
            traversal=traversal,
            tree_state=bst.to_dict()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting level-order traversal: {str(e)}")


@app.post("/tree/clear", response_model=OperationResponse)
async def clear_tree():
    try:
        bst.clear()
        return OperationResponse(
            success=True,
            message="Tree cleared successfully",
            tree_state=bst.to_dict(),
            operation_steps=[]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error clearing tree: {str(e)}")


@app.get("/tree/height")
async def get_height():
    try:
        height = bst.height()
        return {
            "height": height,
            "tree_state": bst.to_dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting height: {str(e)}")


@app.get("/tree/size")
async def get_size():
    try:
        size = bst.size
        return {
            "size": size,
            "tree_state": bst.to_dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting size: {str(e)}")


@app.get("/tree/random")
async def generate_random_tree():
    import random
    
    try:
        bst.clear()
        values = random.sample(range(1, 21), random.randint(5, 15))
        
        for value in values:
            bst.insert(value)
        
        return OperationResponse(
            success=True,
            message=f"Random tree generated with {len(values)} values",
            tree_state=bst.to_dict(),
            operation_steps=[]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating random tree: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)