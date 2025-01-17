import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import "../../styles/table.css";

function FailedToStore() {
  const authCtx = useContext(AuthContext);
  const [erroredDeliveries, setErroredDeliveries] = useState([]);

  useEffect(() => {
    let url = "http://localhost:8080/api/issue-product/errored-all";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${authCtx.token}`,
      },
    })
      .then((res) => {
        res
          .text()
          .then((data) => {
            console.log(data);
            const new_arr = JSON.parse(data);
            setErroredDeliveries(new_arr);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ authCtx]);
  console.log(erroredDeliveries);
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <h2 style={{ margin: "0", fontSize: "40px", color: "#0f003c" }}>
          Unsuccessful deliveries to Store
        </h2>
      </div>

      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Job Id</div>
          <div className="col col-2">Customer Name</div>
          <div className="col col-3">Amount Due</div>
          <div className="col col-4">Payment Status</div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42235
          </div>
          <div className="col col-2" data-label="Customer Name">
            John Doe
          </div>
          <div className="col col-3" data-label="Amount">
            $350
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42442
          </div>
          <div className="col col-2" data-label="Customer Name">
            Jennifer Smith
          </div>
          <div className="col col-3" data-label="Amount">
            $220
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42257
          </div>
          <div className="col col-2" data-label="Customer Name">
            John Smith
          </div>
          <div className="col col-3" data-label="Amount">
            $341
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
        <li className="table-row">
          <div className="col col-1" data-label="Job Id">
            42311
          </div>
          <div className="col col-2" data-label="Customer Name">
            John Carpenter
          </div>
          <div className="col col-3" data-label="Amount">
            $115
          </div>
          <div className="col col-4" data-label="Payment Status">
            Pending
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FailedToStore;
