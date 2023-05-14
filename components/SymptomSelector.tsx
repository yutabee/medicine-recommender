// components/SymptomSelector.tsx
import { useState, useEffect } from "react";

export default function SymptomSelector({ onSymptomSelect }) {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState("");

  useEffect(() => {
    fetch("/api/symptoms")
      .then((response) => response.json())
      .then((data) => setSymptoms(data));
  }, []);

  const handleChange = (event) => {
    setSelectedSymptom(event.target.value);
    onSymptomSelect(event.target.value);
  };

  return (
    <select value={selectedSymptom} onChange={handleChange}>
      <option value="">Select a symptom...</option>
      {symptoms.map((symptom) => (
        <option key={symptom.id} value={symptom.id}>
          {symptom.name}
        </option>
      ))}
    </select>
  );
}
