/*
 * Form is rechecked
 */

import { useContext, useState } from "react";
import AuthContext from "../../../store/AuthContext";

import "../../../styles/form.css";
import FormInput from "../../forms/FormInput";

const inputs = [
  {
    id: 1,
    name: "shopName",
    type: "text",
    placeholder: "Shop Name",
  },
  {
    id: 2,
    name: "address",
    type: "text",
    placeholder: "Address",
  },
  {
    id: 3,
    name: "contact",
    type: "text",
    placeholder: "Contact",
  },
];

export default function ShopForm() {

  const authCtx = useContext(AuthContext);
  const [display, setDisplay] = useState("");

  const [values, setValues] = useState({
    shopName: "",
    address: "",
    contact: "",
  });

  const onChangeHandler = (e) => {
    setDisplay("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    let url = "http://localhost:8080/api/shop/";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        shopName: values.shopName,
        address: values.address,
        contact: values.contact,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authCtx.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          res
            .text()
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setDisplay("auth-display");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setValues({
      shopName: "",
      address: "",
      contact: "",
    });
  };

  return (
    <div className="app-2">
      <div className="container-card">
        <div className="title-2">Shop Details</div>
        <br></br>
        <br></br>
        <form onSubmit={onSubmitHandler}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChangeHandler}
            />
          ))}

          <div className={`auth ${display}`}>
            <h4>Shop Already Exist</h4>
          </div>

          <br></br>
          <br></br>
          <button className="button" type="submit">
            {" "}
            Enter{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
