import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import baseUrl from "../../utils/baseurl";

const ModalUpdate = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({});

  // Validation functions
  const validateField = (value, fieldName) => {
    if (!String(value).trim()) {
      return `${fieldName} cannot be empty`;
    }
  };

  const validateQuantity = (value, fieldName) => {
    if (!String(value).trim()) {
      return `${fieldName} cannot be empty`;
    }
    if (value < 0) {
      return `${fieldName} cannot be negative`;
    }
  };

  const onSubmit = async (data) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ productId: props.updateObj.pid, newdata: data }),
      redirect: "follow",
      credentials: "include", //!important
    };

    try {
      const response = await fetch(
        `${baseUrl}/products/update`,
        requestOptions
      ); // Updated API endpoint
      const result = await response.json();
      if (result.status) {
        toast.success("Product updated successfully");
        // to refresh,
        props.fetchProductsByCategory(props.selectedCategory); // Pass category to refetch
      } else {
        toast.error("Something went wrong! try again");
        console.log("Error::Modal Update::result", result.message);
      }
    } catch (error) {
      toast.error("Something went wrong! try again");
      console.log("Error::Modal Update::", error);
    } finally {
      // close dialog
      document.getElementById(props.id).close();
    }
  };

  const closeForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // close dialog
    document.getElementById(props.id).close();
  };

  useEffect(() => {
    // Set default values when updateObj changes
    reset({
      name: props.updateObj.name,
      storageTemp: props.updateObj.storageTemp,
      quantityOrdered: props.updateObj.quantityOrdered,
      quantityAvailable: props.updateObj.quantityAvailable,
      brand: props.updateObj.brand,
      lotNo: props.updateObj.lotNo,
      // Format dates for input type="date"
      dateOfPurchase: props.updateObj.dateOfPurchase
        ? new Date(props.updateObj.dateOfPurchase).toISOString().split("T")[0]
        : "",
      dateOfExpiry: props.updateObj.dateOfExpiry
        ? new Date(props.updateObj.dateOfExpiry).toISOString().split("T")[0]
        : "",
    });
  }, [props.updateObj, reset]);

  const renderCategorySpecificFields = () => {
    switch (props.updateObj.category) {
      case "chemical":
      case "teaching_kit":
        return (
          <>
            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Storage Temperature</span>
              </div>
              <input
                type="text"
                {...register("storageTemp", {
                  validate: (v) => validateField(v, "Storage Temperature"),
                })}
                name="storageTemp"
                placeholder="e.g., 2-8°C"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.storageTemp && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.storageTemp.message}
              </p>
            )}

            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Brand</span>
              </div>
              <input
                type="text"
                {...register("brand", {
                  validate: (v) => validateField(v, "Brand"),
                })}
                name="brand"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.brand && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.brand.message}
              </p>
            )}

            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Lot Number</span>
              </div>
              <input
                type="text"
                {...register("lotNo", {
                  validate: (v) => validateField(v, "Lot Number"),
                })}
                name="lotNo"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.lotNo && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.lotNo.message}
              </p>
            )}

            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Date of Purchase</span>
              </div>
              <input
                type="date"
                {...register("dateOfPurchase", {
                  validate: (v) => validateField(v, "Date of Purchase"),
                })}
                name="dateOfPurchase"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.dateOfPurchase && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.dateOfPurchase.message}
              </p>
            )}

            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Date of Expiry</span>
              </div>
              <input
                type="date"
                {...register("dateOfExpiry", {
                  validate: (v) =>
                    props.updateObj.category === "chemical"
                      ? validateField(v, "Date of Expiry")
                      : true,
                })}
                name="dateOfExpiry"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.dateOfExpiry && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.dateOfExpiry.message}
              </p>
            )}
          </>
        );
      case "plasticware":
      case "glassware":
      case "miscellaneous":
        return (
          <>
            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Brand</span>
              </div>
              <input
                type="text"
                {...register("brand", {
                  validate: (v) => validateField(v, "Brand"),
                })}
                name="brand"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.brand && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.brand.message}
              </p>
            )}

            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Lot Number</span>
              </div>
              <input
                type="text"
                {...register("lotNo", {
                  validate: (v) => validateField(v, "Lot Number"),
                })}
                name="lotNo"
                placeholder="Type here"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.lotNo && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.lotNo.message}
              </p>
            )}

            <label className="form-control w-full lg:max-w-xs px-2">
              <div className="label">
                <span className="label-text">Date of Purchase</span>
              </div>
              <input
                type="date"
                {...register("dateOfPurchase", {
                  validate: (v) => validateField(v, "Date of Purchase"),
                })}
                name="dateOfPurchase"
                className="input input-bordered w-full lg:max-w-xs"
              />
            </label>
            {errors.dateOfPurchase && (
              <p className="text-xs text-red-600 ps-2 mt-1">
                {errors.dateOfPurchase.message}
              </p>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <dialog id={props.id} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Update {props.updateObj.category.replace("_", " ")} Details
          </h3>
          <p className="py-4">Product ID: {props.updateObj.pid}</p>
          <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="form-control w-full lg:max-w-xs px-2">
                <div className="label">
                  <span className="label-text">Product No</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                  disabled
                  value={props.updateObj.index + 1}
                />
              </label>

              <label className="form-control w-full lg:max-w-xs px-2">
                <div className="label">
                  <span className="label-text">Product Name</span>
                </div>
                <input
                  type="text"
                  {...register("name", {
                    validate: (v) => validateField(v, "Product Name"),
                  })}
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                />
              </label>
              {errors.name && (
                <p className="text-xs text-red-600 ps-2 mt-1">
                  {errors.name.message}
                </p>
              )}

              <label className="form-control w-full lg:max-w-xs px-2">
                <div className="label">
                  <span className="label-text">Quantity Ordered</span>
                </div>
                <input
                  type="text"
                  {...register("quantityOrdered", {
                    validate: (v) => validateQuantity(v, "Quantity Ordered"),
                  })}
                  min={0}
                  name="quantityOrdered"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs"
                />
              </label>
              {errors.quantityOrdered && (
                <p className="text-xs text-red-600 ps-2 mt-1">
                  {errors.quantityOrdered.message}
                </p>
              )}

              <label className="form-control w-full lg:max-w-xs px-2">
                <div className="label">
                  <span className="label-text">Quantity Available</span>
                </div>
                <input
                  type="text"
                  {...register("quantityAvailable", {
                    validate: (v) => validateQuantity(v, "Quantity Available"),
                  })}
                  min={0}
                  name="quantityAvailable"
                  placeholder="Type here"
                  className="input input-bordered w-full lg:max-w-xs "
                />
              </label>
              {errors.quantityAvailable && (
                <p className="text-xs text-red-600 ps-2 mt-1">
                  {errors.quantityAvailable.message}
                </p>
              )}

              {renderCategorySpecificFields()}
            </div>
            <div className="modal-action">
              <div>
                <button className="btn mx-2 px-6 btn-sm btn-primary text-white">
                  Update
                </button>
                <button className="btn mx-2 px-6 btn-sm" onClick={closeForm}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
      <Toaster />
    </div>
  );
};

export default ModalUpdate;
