"""
Binary Search Tree Implementation

This module provides a comprehensive implementation of a Binary Search Tree (BST)
with all core operations including insert, delete, search, and various traversal methods.
"""

from typing import Optional, List, Dict, Any
from dataclasses import dataclass
import json


@dataclass
class TreeNode:
    """Represents a node in the Binary Search Tree."""
    value: int
    left: Optional['TreeNode'] = None
    right: Optional['TreeNode'] = None
    parent: Optional['TreeNode'] = None

    def to_dict(self) -> Dict[str, Any]:
        """Convert node to dictionary for JSON serialization."""
        return {
            'value': self.value,
            'left': self.left.to_dict() if self.left else None,
            'right': self.right.to_dict() if self.right else None
        }


class BinarySearchTree:
    """
    A comprehensive Binary Search Tree implementation with visualization support.
    
    Features:
    - Insert, delete, search operations
    - Multiple traversal methods (inorder, preorder, postorder, level-order)
    - Tree height and size calculation
    - JSON serialization for frontend visualization
    - Step-by-step operation tracking for animations
    """
    
    def __init__(self):
        self.root: Optional[TreeNode] = None
        self.size: int = 0
        self.operation_steps: List[Dict[str, Any]] = []
    
    def insert(self, value: int) -> bool:
        """
        Insert a value into the BST.
        
        Args:
            value: The integer value to insert
            
        Returns:
            bool: True if insertion was successful, False if value already exists
        """
        self.operation_steps = []  # Reset steps for new operation
        
        if self.root is None:
            self.root = TreeNode(value)
            self.size += 1
            self.operation_steps.append({
                'action': 'insert_root',
                'value': value,
                'tree_state': self.to_dict()
            })
            return True
        
        return self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node: TreeNode, value: int) -> bool:
        """Recursive helper for insertion."""
        if value == node.value:
            self.operation_steps.append({
                'action': 'duplicate_found',
                'value': value,
                'current_node': node.value,
                'tree_state': self.to_dict()
            })
            return False
        
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
                node.left.parent = node
                self.size += 1
                self.operation_steps.append({
                    'action': 'insert_left',
                    'value': value,
                    'parent': node.value,
                    'tree_state': self.to_dict()
                })
                return True
            else:
                self.operation_steps.append({
                    'action': 'traverse_left',
                    'value': value,
                    'current_node': node.value,
                    'tree_state': self.to_dict()
                })
                return self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
                node.right.parent = node
                self.size += 1
                self.operation_steps.append({
                    'action': 'insert_right',
                    'value': value,
                    'parent': node.value,
                    'tree_state': self.to_dict()
                })
                return True
            else:
                self.operation_steps.append({
                    'action': 'traverse_right',
                    'value': value,
                    'current_node': node.value,
                    'tree_state': self.to_dict()
                })
                return self._insert_recursive(node.right, value)
    
    def search(self, value: int) -> bool:
        """
        Search for a value in the BST.
        
        Args:
            value: The value to search for
            
        Returns:
            bool: True if value exists, False otherwise
        """
        self.operation_steps = []
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node: Optional[TreeNode], value: int) -> bool:
        """Recursive helper for search."""
        if node is None:
            self.operation_steps.append({
                'action': 'not_found',
                'value': value,
                'tree_state': self.to_dict()
            })
            return False
        
        self.operation_steps.append({
            'action': 'visit_node',
            'value': value,
            'current_node': node.value,
            'tree_state': self.to_dict()
        })
        
        if value == node.value:
            self.operation_steps.append({
                'action': 'found',
                'value': value,
                'current_node': node.value,
                'tree_state': self.to_dict()
            })
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)
    
    def delete(self, value: int) -> bool:
        """
        Delete a value from the BST.
        
        Args:
            value: The value to delete
            
        Returns:
            bool: True if deletion was successful, False if value not found
        """
        self.operation_steps = []
        self.root, deleted = self._delete_recursive(self.root, value)
        if deleted:
            self.size -= 1
        return deleted
    
    def _delete_recursive(self, node: Optional[TreeNode], value: int) -> tuple[Optional[TreeNode], bool]:
        """Recursive helper for deletion."""
        if node is None:
            self.operation_steps.append({
                'action': 'delete_not_found',
                'value': value,
                'tree_state': self.to_dict()
            })
            return None, False
        
        self.operation_steps.append({
            'action': 'delete_visit',
            'value': value,
            'current_node': node.value,
            'tree_state': self.to_dict()
        })
        
        if value < node.value:
            node.left, deleted = self._delete_recursive(node.left, value)
            return node, deleted
        elif value > node.value:
            node.right, deleted = self._delete_recursive(node.right, value)
            return node, deleted
        else:
            # Node to be deleted found
            if node.left is None:
                self.operation_steps.append({
                    'action': 'delete_no_left',
                    'value': value,
                    'replacement': node.right.value if node.right else None,
                    'tree_state': self.to_dict()
                })
                return node.right, True
            elif node.right is None:
                self.operation_steps.append({
                    'action': 'delete_no_right',
                    'value': value,
                    'replacement': node.left.value,
                    'tree_state': self.to_dict()
                })
                return node.left, True
            else:
                # Node has two children
                successor = self._find_min(node.right)
                self.operation_steps.append({
                    'action': 'delete_two_children',
                    'value': value,
                    'successor': successor.value,
                    'tree_state': self.to_dict()
                })
                node.value = successor.value
                node.right, _ = self._delete_recursive(node.right, successor.value)
                return node, True
    
    def _find_min(self, node: TreeNode) -> TreeNode:
        """Find the minimum value node in a subtree."""
        while node.left is not None:
            node = node.left
        return node
    
    def inorder_traversal(self) -> List[int]:
        """Return inorder traversal of the BST."""
        result = []
        self._inorder_recursive(self.root, result)
        return result
    
    def _inorder_recursive(self, node: Optional[TreeNode], result: List[int]):
        """Recursive helper for inorder traversal."""
        if node is not None:
            self._inorder_recursive(node.left, result)
            result.append(node.value)
            self._inorder_recursive(node.right, result)
    
    def preorder_traversal(self) -> List[int]:
        """Return preorder traversal of the BST."""
        result = []
        self._preorder_recursive(self.root, result)
        return result
    
    def _preorder_recursive(self, node: Optional[TreeNode], result: List[int]):
        """Recursive helper for preorder traversal."""
        if node is not None:
            result.append(node.value)
            self._preorder_recursive(node.left, result)
            self._preorder_recursive(node.right, result)
    
    def postorder_traversal(self) -> List[int]:
        """Return postorder traversal of the BST."""
        result = []
        self._postorder_recursive(self.root, result)
        return result
    
    def _postorder_recursive(self, node: Optional[TreeNode], result: List[int]):
        """Recursive helper for postorder traversal."""
        if node is not None:
            self._postorder_recursive(node.left, result)
            self._postorder_recursive(node.right, result)
            result.append(node.value)
    
    def level_order_traversal(self) -> List[int]:
        """Return level-order (breadth-first) traversal of the BST."""
        if self.root is None:
            return []
        
        result = []
        queue = [self.root]
        
        while queue:
            node = queue.pop(0)
            result.append(node.value)
            
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        
        return result
    
    def height(self) -> int:
        """Return the height of the BST."""
        return self._height_recursive(self.root)
    
    def _height_recursive(self, node: Optional[TreeNode]) -> int:
        """Recursive helper for height calculation."""
        if node is None:
            return -1
        return 1 + max(self._height_recursive(node.left), self._height_recursive(node.right))
    
    def is_empty(self) -> bool:
        """Check if the BST is empty."""
        return self.root is None
    
    def clear(self):
        """Clear all nodes from the BST."""
        self.root = None
        self.size = 0
        self.operation_steps = []
    
    def to_dict(self) -> Dict[str, Any]:
        """Convert the BST to a dictionary for JSON serialization."""
        return {
            'root': self.root.to_dict() if self.root else None,
            'size': self.size,
            'height': self.height(),
            'is_empty': self.is_empty()
        }
    
    def get_operation_steps(self) -> List[Dict[str, Any]]:
        """Get the steps from the last operation for animation purposes."""
        return self.operation_steps
    
    def __str__(self) -> str:
        """String representation of the BST."""
        if self.is_empty():
            return "Empty BST"
        
        def _build_tree_string(node: Optional[TreeNode], prefix: str = "", is_left: bool = True) -> str:
            if node is None:
                return ""
            
            result = ""
            result += _build_tree_string(node.right, prefix + ("│   " if is_left else "    "), False)
            result += prefix + ("└── " if is_left else "┌── ") + str(node.value) + "\n"
            result += _build_tree_string(node.left, prefix + ("    " if is_left else "│   "), True)
            return result
        
        return _build_tree_string(self.root).rstrip()
