import { useSymptoms } from "@/hooks/useSymptoms";
import { useState, ChangeEvent, FC } from "react";

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
      className="py-2 px-3 my-2 border rounded-lg bg-slate-50"
    >
      <option value="">症状を選んでください...</option>
      {safeSymptoms.map((symptom) => (
        <option key={symptom.id} value={symptom.id}>
          {symptom.name}
        </option>
      ))}
    </select>
  );
};
