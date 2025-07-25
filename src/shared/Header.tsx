import { Link } from "react-router-dom";
// import { useAuth } from "../context/GlobalState";
import Logo from "../assets/header-logo.png";
import searchIcon from "../assets/icons/searchIcon.png";
import shoppingCart from "../assets/icons/shopping-cart.png";
import { useUser } from "../context/userUser";
import { auth } from "../../firebase";

const Header = () => {
  const { user, setUser } = useUser();

  const handleAuthentication = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="h-[65px] flex items-center bg-[#131921] sticky top-0 z-[100] px-4">
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          className="w-[100px] mt-[18px] object-contain"
        />
      </Link>

      <div className="flex flex-1 items-center rounded-[8px] mx-4 bg-white">
        <input
          type="text"
          className="h-[30px] p-2 flex-grow outline-none rounded-l-[8px]"
        />
        <img
          src={searchIcon}
          alt="search"
          className="p-[5px] h-[30px] bg-[#cd9042] rounded-r-[8px]"
        />
      </div>

      <div className="flex justify-evenly items-center space-x-4 text-white ">
        <Link to={user ? "/" : "/login"}>
          <div onClick={handleAuthentication} className="flex flex-col items-center cursor-pointer ">
            <span className="text-[13px]">
              Hello {user ? user.name : ""}
            </span>
            <span className={`text-[16px] font-extrabold transition-all duration-300 ${user ? "hover:!text-red-400" : "hover:!text-blue-500"}`}>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:!text-blue-500">
            <span className="text-[13px]">Returns</span>
            <span className="text-[16px] font-extrabold">& Orders</span>
          </div>
        </Link>

        <div className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:!text-blue-500">
          <span className="text-[13px]">Your</span>
          <span className="text-[16px] font-extrabold">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="flex items-center cursor-pointer">
            <img src={shoppingCart} alt="cart" className="h-6" />
            <span className="ml-2 mr-2 text-[17px] font-extrabold">
              {/* {basket?.length} */}3
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
