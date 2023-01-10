import CheckoutBtn from "./menus/CartMenu";
import AuthButton from "./buttons/AuthButton";
import TitleClick from "./TitleClick";
import SearchSection from "./sections/SearchSection/SearchSection";

const Header = () => {
  return (
    <div className="sticky top-0 bg-gray-100 mx-1 px-2 py-3 border-b border-zinc-300 flex flex-row items-center justify-between z-[1]">
      <div className="flex flex-row items-center gap-5">
        <TitleClick className="text-2xl text-red-800 font-black" route="/">
          Checks!
        </TitleClick>
        <SearchSection />
      </div>
      <div className="flex flex-row items-center justify-center">
        <AuthButton />
        <div className="m-1" />
        <CheckoutBtn />
      </div>
    </div>
  );
};

export default Header;
