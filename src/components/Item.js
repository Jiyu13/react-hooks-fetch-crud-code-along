import React from "react";

function Item({ item }) {

  // 3. Update items:
  // Add function to handle button click
  function handleAddtoCartClick() {
    console.log("clicked item:", item)
  }


  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddtoCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove">Delete</button>
    </li>
  );
}

export default Item;
