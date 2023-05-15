import { useState, useEffect, ChangeEvent, FC } from "react";

interface ProductOnSymptom {
  productId: number;
  product: {
    id: number;
    amazonId: string;
    name: string;
    description: string;
    imageUrl: string;
  };
}

interface Symptom {
  id: number;
  name: string;
  description: string;
  products: ProductOnSymptom[];
}

interface SymptomSelectorProps {
  onSymptomSelect: (symptomId: string) => void;
}

export const SymptomSelector: FC<SymptomSelectorProps> = ({
  onSymptomSelect,
}) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  useEffect(() => {
    fetch("/api/symptoms")
      .then((response) => response.json())
      .then((data: Symptom[]) => setSymptoms(data));
  }, []);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
};
