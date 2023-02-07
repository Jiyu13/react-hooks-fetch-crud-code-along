import React, { useState } from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  // 3. Update items:
  // Add function to handle button click
  function handleAddtoCartClick() {

    // updated isInCart to true
    const updated = {
      isInCart: !item.isInCart
    }

    // fetch PATCH request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(updated)
    })
    .then(res => res.json())
    .then(updatedItem => onUpdateItem(updatedItem))

  }
  // -----------------------------------------------------------

  // ------------------------------------------------------------
  // 4. Delete items:
  // create onClick events for delete button
  function handleDeleteClick() {
    // console.log(item)
    
    // DELETE request,  Call onDeleteItem, passing the deleted item
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => onDeleteItem(item))
  }
  // ------------------------------------------------------------


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddtoCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
