// components/Header.tsx
const Header = () => {
  return (
    <header className="text-white bg-gray-500 p-4 md:flex md:items-center md:justify-between">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-2xl text-grey-darkest">
          Medicine Recommender
        </h1>
      </div>
    </header>
  );
};

export default Header;
