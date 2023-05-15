import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="fixed top-0 z-50 w-full text-white bg-gray-500 p-4 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-2xl text-grey-darkest">
          Medicine Recommender
        </h1>
      </div>
    </header>
  );
};