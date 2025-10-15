import { useEffect, useState } from "react";
import axios from "axios";
import config from "./config";

function App() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ brand: "", model: "", year: "", price: "" });

  // Fetch all cars from backend
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/all`);
      setCars(res.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Add a new car
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.baseUrl}/add`, form);
      setForm({ brand: "", model: "", year: "", price: "" });
      fetchCars();
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  // Delete a car
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.baseUrl}/del/${id}`);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚗 Car Management System</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Brand"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
        <input
          placeholder="Model"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          required
        />
        <input
          placeholder="Year"
          type="number"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <button type="submit">Add Car</button>
      </form>

      <h2>All Cars</h2>
      <ul>
        {cars.length === 0 ? (
          <p>No cars found 🛠️</p>
        ) : (
          cars.map((car) => (
            <li key={car.id}>
              <strong>{car.brand}</strong> {car.model} ({car.year}) — ₹{car.price}{" "}
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
