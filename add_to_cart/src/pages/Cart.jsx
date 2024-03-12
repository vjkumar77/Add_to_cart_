import React, { useContext, useEffect, useState } from "react";
import Header from "../Components/Header";
import { cartContext } from "../CartContext/MainContext";
import upi from "../upi.png";
import upi2 from "../upi2.jpg";
import upi3 from "../upi3.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  let { carts, setCarts } = useContext(cartContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  // Calculate total amount whenever carts change
  useEffect(() => {
    let total = 0;
    carts.forEach((item) => {
      total += item.price * item.qty;
    });
    setTotalAmount(total);

    let tax = Math.floor(0.18 * total);
    setTaxAmount(tax);

    setFinalAmount(total + tax);
  }, [carts]);

  let checkout = () => {
    document.getElementById("modal").classList.toggle("hidden");
  };

  let payClick = () => {
    toast.warn("Scan Above Code", {
      position: "bottom-center",
    });
    console.log("Pay Clicked clicked");
  };
  return (
    <div>
      <Header />

      {/* Modal */}
      <div
        className="fixed  z-10 overflow-y-auto top-0 w-full left-0 hidden"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <div
            className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white  px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <img src={upi3}></img>
            </div>

            <div className="bg-gray-200 px-4 flex justify-center py-3 text-right">
              <button
                type="button"
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={checkout}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                type="button"
                onClick={payClick}
                className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
              >
                <i className="fas fa-plus"></i> Pay: ${finalAmount}
                <ToastContainer />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal end */}

      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Cart Items</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Serial Number
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Product Image / Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      QTY.
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cartItems, index) => {
                    return <CartList index={index} cartItems={cartItems} />;
                  })}
                </tbody>
              </table>
            </div>

            <div className=" flex justify-end mt-3">
              <table>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    total Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${totalAmount}
                  </th>
                </tr>

                <tr className="m-5">
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tax Amount(18%)
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ${taxAmount}
                  </th>
                </tr>

                <tr className="mt-2">
                  <th className="px-5 py-3     border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Final Amount
                  </th>
                  <th className="px-5 py-3 border-b-2  border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    ${finalAmount}
                  </th>
                </tr>

                <tr className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={checkout}
                    className="btn px-4 py-2 bg-green-400 text-white rounded"
                  >
                    Checkout
                  </button>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartList({ cartItems, index }) {
  let { carts, setCarts } = useContext(cartContext);
  let removeData = () => {
    let filterData = carts.filter((v, i) => index !== i);
    setCarts(filterData);
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={cartItems.image}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {cartItems.title}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">${cartItems.price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {/* <input
          value={cartItems.qty}
          type="number"
          className="border border-red-700"
        /> */}
        <input
          value={cartItems.qty}
          type="number"
          className="border border-red-700"
          onChange={(e) => {
            const newQty = parseInt(e.target.value);
            if (!isNaN(newQty)) {
              // Check if the input is a valid number
              if (newQty < 1) {
                // If the new quantity is 1, do nothing
                return;
              }
              // Otherwise, update the quantity
              setCarts((prevCarts) => {
                const updatedCarts = [...prevCarts];
                updatedCarts[index].qty = newQty;
                return updatedCarts;
              });
            }
          }}
        />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span>{cartItems.price * cartItems.qty}</span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={removeData}
          className="btn px-4 py-2 bg-blue-400 text-white rounded"
        >
          Remove Item
        </button>
      </td>
    </tr>
  );
}
