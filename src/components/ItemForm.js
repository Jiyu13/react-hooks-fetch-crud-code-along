import React, { useState } from "react";

function ItemForm( { onAddItem } ) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  // -------------------------------------------------------------------
  // 2. Create items: Add function to handle submissions
  function handleSubmit(e) {
    e.preventDefault()

    // create item using data from form state
    const formData = {
      name: name,
      category: category,
      isInCart: false,
    }
    // console.log(formData)

    // POST request
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(newItem => onAddItem(newItem)) // update items by calling onAddItem to send data up
  }
  // -------------------------------------------------------------------

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
