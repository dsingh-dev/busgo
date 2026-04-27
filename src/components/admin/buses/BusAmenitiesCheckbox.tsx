import { useEffect, useState } from "react";

export default function BusAmenitiesCheckbox({ selected = [], onChange }) {
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    fetch("/api/admin/amenities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("bus_admin_token")}`,
      }
    })
      .then(res => res.json())
      .then(data => setAmenities(data));
  }, []);

  const handleChange = (id) => {
    let updated;

    if (selected.includes(id)) {
      updated = selected.filter(item => item !== id);
    } else {
      updated = [...selected, id];
    }

    onChange(updated);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {amenities?.length > 0 ? (
    amenities.map((item) => (
      <label
        key={item.id}
        className="flex items-center gap-2 border p-2 rounded-full text-xs font-medium cursor-pointer hover:bg-gray-100"
      >
        <input
          type="checkbox"
          checked={selected.includes(item.id)}
          onChange={() => handleChange(item.id)}
        />

        <span>{item.name.replace("_", " ")}</span>
      </label>
    ))
  ) : (
    ""
  )}
    </div>
  );
}