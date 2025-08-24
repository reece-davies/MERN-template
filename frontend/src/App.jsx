import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // get backend URL from Vite env
  const apiUrl = import.meta.env.VITE_API_URL;

  // fetch all items on load
  useEffect(() => {
    console.log(apiUrl);
    fetch(`${apiUrl}/api/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err.message));
  }, [apiUrl]);

  // handle form submit (add new item)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = { name, description };

    try {
      const res = await fetch(`${apiUrl}/api/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const savedItem = await res.json();

      // update state to show new item immediately
      setItems((prev) => [...prev, savedItem]);

      // reset form
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Items</h1>

      {/* Form to add new item */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      {/* List all items */}
      <ul>
        {items.map((i) => (
          <p key={i._id}> {i.name} – {i.description} </p>
        ))}
      </ul>
    </div>
  );
}

export default App;