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

    // -------------------------------------------------------------------------
    // 1.Displaying Items - use useEffect to fetch data from http://localhost:4000/items
    useEffect(() => {
      fetch("http://localhost:4000/items")
      .then(res => res.json())
      .then(data => setItems(data))
    }, [])
    // ------------------------------------------------------------------------

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
