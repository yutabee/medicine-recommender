import { useState } from "react";
import { SymptomSelector } from "@/components/SymptomSelector";
import { ProductList } from "@/components/ProductList";

export default function Home() {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const handleSymptomSelect = (symptomId: string) => {
    setSelectedSymptom(symptomId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Medicine Recommender</h1>
      <SymptomSelector onSymptomSelect={handleSymptomSelect} />
      {selectedSymptom && <ProductList symptomId={selectedSymptom} />}
    </div>
  );
}
