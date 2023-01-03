import CheckoutBtn from "./menus/CartMenu";
import AuthButton from "./buttons/AuthButton";
import TitleClick from "./TitleClick";

const Header = () => {
  return (
    <div className="sticky top-0 bg-gray-100 sm:mx-3 mx-1 px-2 sm:py-5 py-4 border-b border-zinc-300 flex flex-row items-center justify-between">
      <TitleClick className="text-2xl text-red-800 font-black" route="/">
        Checks!
      </TitleClick>
      <div className="flex flex-row items-center justify-center">
        <AuthButton />
        <div className="m-1" />
        <CheckoutBtn />
      </div>
    </div>
  );
};

export default Header;
