import {
  ArchiveBoxIcon,
  ArrowLeftEndOnRectangleIcon,
  ChartBarIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import baseUrl from "../../utils/baseurl";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../Redux/products/productSlice";
import { setloginStatus } from "../../Redux/login/isLogin";
const Aside = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );

  const productCategories = [
    "chemical",
    "teaching_kit",
    "plasticware",
    "glassware",
    "miscellaneous",
  ];

  const showAdd = () => {
    document.getElementById("add_modal").showModal();
  };
  const logoutUser = async () => {
    if (window.confirm("Are you sure to logout?")) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
        credentials: "include", //!important
      };
    try { // 4. --- (Optional) Add try/catch for safety ---
        const response = await fetch(`${baseUrl}/logout`, requestOptions); // <-- 5. MAKE SURE THIS IS /auth/logout
        const result = await response.json();

        if (result.status) {
          console.log("Logout Success");
          // 6. --- DISPATCH LOGOUT ACTION ---
          dispatch(setloginStatus(false)); 
          // 7. --- REDIRECT TO LOGIN ---
          navigate('/login'); 
        } else {
          alert("Something went wrong! try again");
        }
      } catch (error) {
        console.error("Logout failed:", error);
        // 8. --- FORCE LOGOUT on error ---
        dispatch(setLoginStatus(false));
        navigate('/login');
      }
    }
  };
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4">
      <div className="text-xl pb-2 border-b-2 border-primary">
        Product Categories
      </div>
      {/* Category Links */}
      {productCategories.map((category) => (
        <li key={category} className="mt-2">
          <Link
            to={"/"} // Always navigate to the dashboard root for category selection
            className={selectedCategory === category ? "active" : ""}
            onClick={() => dispatch(setSelectedCategory(category))}
          >
            <ArchiveBoxIcon className="h-6 w-6" />
            {category.replace("_", " ")}
          </Link>
        </li>
      ))}

      {/* show add product btn only on home page: */}
      {location.pathname === "/" && (
        <li className="mt-2">
          <button onClick={showAdd}>
            <PlusCircleIcon className="h-6 w-6" />
            Add Product
          </button>
        </li>
      )}

      <div className="text-xl pb-2 border-b-2 border-primary mt-4">
        Issued Products
      </div>
      <li className="mt-2">
        {/* Updated Link */}
        <Link to={"/issue-product"}>
          <PlusCircleIcon className="h-6 w-6" />
          Issue the Product
        </Link>
      </li>
      <li className="mb-4 mt-2">
        {/* Updated Link */}
        <Link to={"/view-issued"}>
          <ChartBarIcon className="h-6 w-6" />
          List
        </Link>
      </li>

      <div className="text-xl pb-2 border-b-2 border-primary">
        Manage Account
      </div>
      <li className="mt-2">
        <Link to={"/profile"}>
          <UserCircleIcon className="h-6 w-6" />
          Profile
        </Link>
      </li>
      <li className="mb-4 mt-2">
        <button onClick={logoutUser}>
          <ArrowLeftEndOnRectangleIcon className="h-6 w-6" />
          Logout
        </button>
      </li>
    </ul>
  );
};

export default Aside;
