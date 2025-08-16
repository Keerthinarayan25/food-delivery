import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "./ui/button";
import api from "@/services/api";


interface DishFormProps {
  restaurantId: string;

}

export default function DishForm({ restaurantId }: DishFormProps) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Veg",
    price: "",
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" || type === "radio") {
    const target = e.target as HTMLInputElement; // safely cast
    setFormData((prev) => ({
      ...prev,
      [name]: target.checked ? value || true : false,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        image: imageFile ?? undefined,
        restaurantId,
      };
      await api.post("/restaurant/add-dish", payload,{
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Dis added successfully ....");
      setFormData({
        name: "",
        description: "",
        category: "Veg",
        price: "",
        isAvailable: true,
      });
      setImageFile(null);
    } catch (error: unknown) {
      console.error("Error adding dish:", error);
      setMessage("Failed to add Dish . Try again");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div>
      <h2>Add New Dish</h2>
      {message && <p className="mb-3 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
        />

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value="Veg"
                checked={formData.category === "Veg"}
                onChange={handleChange}
              />
              <span>Veg</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="category"
                value="Non-Veg"
                checked={formData.category === "Non-Veg"}
                onChange={handleChange}
              />
              <span>Non-Veg</span>
            </label>
          </div>
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-lg p-2"
          required
          min="0"
        />
        <input
          type="file"
          accept="image/jpeg,image/jpg"
          onChange={handleFileChange}
          className="w-full border rounded-lg p-2"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isAvailable"
            checked={formData.isAvailable}
            onChange={handleChange}
          />
          <span>Available</span>
        </label>

        <Button type="submit"
          disabled={loading}>
          {loading ? "Adding..." : "Add Dish"}
        </Button>

      </form>
    </div>
  )
}