import { useEffect, useState } from "react";
import Login from "./Login";
import "./App.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import ResultTable from "./components/ResultTable";

// import axios from "axios";
import { find, TotalOnboard } from "./Api";

function App() {

  // for User Authentication (whether logged in or not)
  const [auth, setAuth] = useState(false);
  // for onboard count
  const [totalOnboard, setTotalOnboard] = useState(0);
  // for storing search results/shipments
  const [data, setData] = useState([]); // set shipment data

  // for first searching form
  const [sform, setSform] = useState({
    blnumber: "",
    status: "",
  });

  const refreshTotalOnboard = () => {
    // Fetching onboard count from the api and putting it in the state
    TotalOnboard((count) => setTotalOnboard(count));
  };

  useEffect(() => {
    // fetch initail data when Authenticated
    if (auth) {
      // Fetching Total Onboard Shipments when user is logged in
      refreshTotalOnboard();

      // // Fetching AllData At start
      // axios.get("http://localhost:5000/api/shipment/all").then((res) => {
      //   console.log(res);
      //   setData({ ...data, shipment: res.data });
      // });
    }
  }, [auth]);

  useEffect(() => {
    // calling api "/find" whenever search form field values are changing
    find(sform, (res) => {
      // console.log({ res });
      // And setting the results/response in the satte
      setData(res);
    });
  }, [sform]);

  if (!auth) {
    // If not logged in show Login Page/Component
    return <Login loginUser={setAuth} />;
  }

  // if login then Dashboard
  return (
    <>
      <nav>
        <h1 className="head">Shipment Portal</h1>
        <button className="logout" onClick={() => setAuth(false)}>
          Logout
        </button>
      </nav>
      <div className="Dash">
        <div className="col1">
          <div className="search wbox">
            <TextField
              id="filled-basic"
              label="BL Number"
              variant="filled"
              className="search__input"
              // Getting value from the state & putting it in the HTML
              value={sform.slnumber}
              // Getting value from the HTML & putting it in the state
              onChange={(e) => setSform({ ...sform, blnumber: e.target.value })}
            />
            <FormControl variant="filled" className="search__input">
              <InputLabel id="demo-simple-select-filled-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={sform.status}
                onChange={(e) => setSform({ ...sform, status: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Onboard">Onboard</MenuItem>
                <MenuItem value="Arrived Depot">Arrived Depot</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="onboard wbox">
            <p>Number of Onboard Shipment</p>
            <h1 title="Click to Refresh!!" onClick={refreshTotalOnboard}>
              {totalOnboard}
            </h1>
          </div>
        </div>

        <div className="col2 wbox">
          {/* Calling component ResultTable and passing the state variable & function (i.e data,setData) */}
          <ResultTable data={data} setData={setData} />
        </div>
      </div>
    </>
  );
}

export default App;
