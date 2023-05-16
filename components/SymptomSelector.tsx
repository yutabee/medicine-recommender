import { useSymptoms } from "@/hooks/useSymptoms";
import { useState, FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTablets,
  faCapsules,
  faSyringe,
  faFlask,
  faEyeDropper,
  faTint,
  faTooth,
  faHeadSideCough,
  faProcedures,
  faPills,
  faVial,
  faBed,
  faAppleAlt,
  faFirstAid,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface SymptomSelectorProps {
  onSymptomSelect: (symptomId: string) => void;
}

const categoryToIcon: Record<string, IconDefinition> = {
  風邪薬: faTablets,
  胃腸薬: faCapsules,
  痛み止め: faSyringe,
  アレルギー薬: faFlask,
  目薬: faEyeDropper,
  皮膚薬: faTint,
  歯科用薬: faTooth,
  鼻炎薬: faHeadSideCough,
  "咳・喉・鼻炎薬": faProcedures,
  サプリメント: faPills,
  "ビタミン・ミネラル": faVial,
  睡眠補助薬: faBed,
  健康食品: faAppleAlt,
  その他: faFirstAid,
};

export const SymptomSelector: FC<SymptomSelectorProps> = ({
  onSymptomSelect,
}) => {
  const { symptoms, isLoading, isError } = useSymptoms();
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const handleIconClick = (symptomId: string) => {
    setSelectedSymptom(symptomId);
    onSymptomSelect(symptomId);
  };

  if (isLoading) return <div className="text-center text-xl">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-xl text-red-500">Error occurred</div>
    );

  // symptomsが未定義の場合は空の配列を使用
  const safeSymptoms = symptoms || [];

  return (
    <div className="grid grid-cols-3 gap-4">
      {safeSymptoms.map((symptom) => (
        <Link key={symptom.id} href={`/productlist/${symptom.name}`}>
          <div
            key={symptom.id}
            className={`bg-gray-50 flex flex-col items-center justify-center p-4 transition-colors duration-200 ease-in-out border-2 border-gray-200 rounded-md cursor-pointer hover:border-blue-200 ${
              selectedSymptom === symptom.id.toString()
                ? "border-blue-500 bg-blue-100"
                : ""
            }`}
            onClick={() => handleIconClick(symptom.id.toString())}
          >
            <FontAwesomeIcon
              icon={categoryToIcon[symptom.name]}
              className="text-2xl mb-2"
            />
            <div className="text-sm">{symptom.name}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};
