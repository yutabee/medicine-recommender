import { useState } from "react";
import { SymptomSelector } from "@/components/SymptomSelector";
import { ProductList } from "@/components/ProductList";
import { Header } from "@/components/Header";

export default function Home() {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

  const handleSymptomSelect = (symptomId: string) => {
    setSelectedSymptom(symptomId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <Header />
      <SymptomSelector onSymptomSelect={handleSymptomSelect} />
    </div>
  );
}
