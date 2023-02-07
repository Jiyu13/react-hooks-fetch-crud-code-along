import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  // -------------------------------------------------------------------
  // 4. Delete items: create a callback for Item to update items without the deleted item
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter(item => item.id !== deletedItem.id) 
    setItems(updatedItems)
  }
  // -------------------------------------------------------------------


  // -------------------------------------------------------------------
  // 3. Update items: create a callback for Item to update items
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map(item => {
      if (item.id === updatedItem.id) {
        return updatedItem
      } else {
        return item
      }
    }) 
    setItems(updatedItems)
  }
  // -------------------------------------------------------------------

  // -------------------------------------------------------------------
  // 2. Create items: create a callback for ItemForm to update items
  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }
  // -------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // 1.Displaying Items - use useEffect to fetch data from http://localhost:4000/items
    useEffect(() => {
      fetch("http://localhost:4000/items")
      .then(res => res.json())
      .then(data => setItems(data)) // update items state variable
    }, [])
    // ------------------------------------------------------------------------

    const itemsToDisplay = items.filter((item) => {
      if (selectedCategory === "All") return true;
  
      return item.category === selectedCategory;
    });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
