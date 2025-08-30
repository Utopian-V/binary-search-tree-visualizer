"""
Test suite for Binary Search Tree implementation
"""

import pytest
import sys
import os

# Add src directory to path for imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from binary_search_tree import BinarySearchTree, TreeNode


class TestTreeNode:
    """Test cases for TreeNode class"""
    
    def test_tree_node_creation(self):
        """Test TreeNode creation with value"""
        node = TreeNode(10)
        assert node.value == 10
        assert node.left is None
        assert node.right is None
        assert node.parent is None
    
    def test_tree_node_to_dict(self):
        """Test TreeNode to_dict method"""
        node = TreeNode(10)
        node.left = TreeNode(5)
        node.right = TreeNode(15)
        
        result = node.to_dict()
        expected = {
            'value': 10,
            'left': {'value': 5, 'left': None, 'right': None},
            'right': {'value': 15, 'left': None, 'right': None}
        }
        assert result == expected


class TestBinarySearchTree:
    """Test cases for BinarySearchTree class"""
    
    def setup_method(self):
        """Set up a fresh BST for each test"""
        self.bst = BinarySearchTree()
    
    def test_empty_tree(self):
        """Test empty tree properties"""
        assert self.bst.is_empty() is True
        assert self.bst.size == 0
        assert self.bst.height() == -1
        assert self.bst.root is None
    
    def test_insert_single_node(self):
        """Test inserting a single node"""
        result = self.bst.insert(10)
        assert result is True
        assert self.bst.size == 1
        assert self.bst.root.value == 10
        assert self.bst.is_empty() is False
        assert self.bst.height() == 0
    
    def test_insert_multiple_nodes(self):
        """Test inserting multiple nodes"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            assert self.bst.insert(value) is True
        
        assert self.bst.size == len(values)
        assert self.bst.root.value == 10
        assert self.bst.root.left.value == 5
        assert self.bst.root.right.value == 15
    
    def test_insert_duplicate(self):
        """Test inserting duplicate values"""
        self.bst.insert(10)
        result = self.bst.insert(10)
        assert result is False
        assert self.bst.size == 1
    
    def test_search_existing_value(self):
        """Test searching for existing values"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        for value in values:
            assert self.bst.search(value) is True
    
    def test_search_non_existing_value(self):
        """Test searching for non-existing values"""
        values = [10, 5, 15]
        for value in values:
            self.bst.insert(value)
        
        assert self.bst.search(20) is False
        assert self.bst.search(1) is False
        assert self.bst.search(8) is False
    
    def test_search_empty_tree(self):
        """Test searching in empty tree"""
        assert self.bst.search(10) is False
    
    def test_delete_leaf_node(self):
        """Test deleting a leaf node"""
        values = [10, 5, 15, 3, 7]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.delete(3)
        assert result is True
        assert self.bst.size == 4
        assert self.bst.search(3) is False
    
    def test_delete_node_with_one_child(self):
        """Test deleting a node with one child"""
        values = [10, 5, 15, 3]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.delete(5)
        assert result is True
        assert self.bst.size == 3
        assert self.bst.search(5) is False
        assert self.bst.root.left.value == 3
    
    def test_delete_node_with_two_children(self):
        """Test deleting a node with two children"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.delete(5)
        assert result is True
        assert self.bst.size == 6
        assert self.bst.search(5) is False
        # The left subtree should still be valid
        assert self.bst.search(3) is True
        assert self.bst.search(7) is True
    
    def test_delete_root(self):
        """Test deleting the root node"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.delete(10)
        assert result is True
        assert self.bst.size == 6
        assert self.bst.search(10) is False
        # Tree should still be valid
        assert self.bst.search(5) is True
        assert self.bst.search(15) is True
    
    def test_delete_non_existing_value(self):
        """Test deleting non-existing values"""
        values = [10, 5, 15]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.delete(20)
        assert result is False
        assert self.bst.size == 3
    
    def test_inorder_traversal(self):
        """Test inorder traversal"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.inorder_traversal()
        expected = sorted(values)
        assert result == expected
    
    def test_preorder_traversal(self):
        """Test preorder traversal"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.preorder_traversal()
        # Preorder should start with root
        assert result[0] == 10
    
    def test_postorder_traversal(self):
        """Test postorder traversal"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.postorder_traversal()
        # Postorder should end with root
        assert result[-1] == 10
    
    def test_level_order_traversal(self):
        """Test level-order traversal"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.level_order_traversal()
        # Level-order should start with root
        assert result[0] == 10
        # Should contain all values
        assert len(result) == len(values)
        assert set(result) == set(values)
    
    def test_height_calculation(self):
        """Test height calculation"""
        # Empty tree
        assert self.bst.height() == -1
        
        # Single node
        self.bst.insert(10)
        assert self.bst.height() == 0
        
        # Two levels
        self.bst.insert(5)
        self.bst.insert(15)
        assert self.bst.height() == 1
        
        # Three levels
        self.bst.insert(3)
        self.bst.insert(7)
        assert self.bst.height() == 2
    
    def test_clear_tree(self):
        """Test clearing the tree"""
        values = [10, 5, 15, 3, 7, 12, 18]
        for value in values:
            self.bst.insert(value)
        
        self.bst.clear()
        assert self.bst.is_empty() is True
        assert self.bst.size == 0
        assert self.bst.root is None
        assert self.bst.height() == -1
    
    def test_to_dict(self):
        """Test tree serialization to dictionary"""
        values = [10, 5, 15, 3, 7]
        for value in values:
            self.bst.insert(value)
        
        result = self.bst.to_dict()
        assert 'root' in result
        assert 'size' in result
        assert 'height' in result
        assert 'is_empty' in result
        assert result['size'] == len(values)
        assert result['is_empty'] is False
    
    def test_operation_steps_tracking(self):
        """Test operation steps tracking for animations"""
        # Insert operation should track steps
        self.bst.insert(10)
        steps = self.bst.get_operation_steps()
        assert len(steps) > 0
        assert steps[0]['action'] == 'insert_root'
        assert steps[0]['value'] == 10
        
        # Search operation should track steps
        self.bst.search(10)
        steps = self.bst.get_operation_steps()
        assert len(steps) > 0
        assert any(step['action'] == 'found' for step in steps)
    
    def test_complex_tree_operations(self):
        """Test complex tree operations"""
        # Build a larger tree
        values = [50, 25, 75, 12, 37, 62, 87, 6, 18, 31, 43, 56, 68, 81, 93]
        for value in values:
            self.bst.insert(value)
        
        assert self.bst.size == len(values)
        assert self.bst.height() == 3
        
        # Test all traversals
        inorder = self.bst.inorder_traversal()
        assert inorder == sorted(values)
        
        # Delete some nodes
        self.bst.delete(25)
        self.bst.delete(75)
        assert self.bst.size == len(values) - 2
        
        # Verify tree is still valid
        remaining_values = [v for v in values if v not in [25, 75]]
        for value in remaining_values:
            assert self.bst.search(value) is True


if __name__ == "__main__":
    pytest.main([__file__])
