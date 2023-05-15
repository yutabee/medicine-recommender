import { useSymptoms } from "@/hooks/useSymptoms";
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
  const { symptoms, isLoading, isError } = useSymptoms();
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymptom(event.target.value);
    onSymptomSelect(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  // symptomsが未定義の場合は空の配列を使用
  const safeSymptoms = symptoms || [];

  return (
    <select
      value={selectedSymptom}
      onChange={handleChange}
      className="py-2 px-3 border rounded-lg bg-slate-50"
    >
      <option value="">Select a symptom...</option>
      {safeSymptoms.map((symptom) => (
        <option key={symptom.id} value={symptom.id}>
          {symptom.name}
        </option>
      ))}
    </select>
  );
};
