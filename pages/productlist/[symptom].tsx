import { ProductList } from "@/components/ProductList";
import { Header } from "@/components/Header";
import { getSymptomId } from "./getSymptomId";
import { GetServerSidePropsContext } from "next/types";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const symptomName = context.params?.symptom as string;
  const symptomId = await getSymptomId(symptomName);

  return {
    props: {
      symptomId,
    },
  };
};

const ProductListPage = ({ symptomId }: { symptomId: string | undefined }) => {
  if (symptomId === undefined) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <Header />
      <ProductList symptomId={symptomId} />
    </div>
  );
};

export default ProductListPage;
