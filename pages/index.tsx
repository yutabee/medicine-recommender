import { useState } from "react";
import { SymptomSelector } from "@/components/SymptomSelector";
import { ProductList } from "@/components/ProductList";

export default function Home() {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const handleSymptomSelect = (symptomId: string) => {
    setSelectedSymptom(symptomId);
  };

  return (
    <div>
      <h1>Medicine Recommender</h1>
      <SymptomSelector onSymptomSelect={handleSymptomSelect} />
      {selectedSymptom && <ProductList symptomId={selectedSymptom} />}
    </div>
  );
}
