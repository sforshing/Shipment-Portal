import axios from "axios";

const Server = "http://localhost:5000/api";

//

export const TotalOnboard = (callback) => {
  axios
    .get(Server + "/shipment/totalOnboard")
    .then((res) => {
      // console.log(res);
      console.log(res.data);
      callback(res.data.count);
    })
    .catch((err) => console.error(err));
};

//

export const search = (query, callback) => {
  // Validating whether query is present or not (if empty then stoping next line execution)
  if (!query) return;

  query = query.trim(); // removing trailing whitespace

  axios
    .post(Server + "/shipment/search", { query })
    .then((res) => {
      callback(res.data);
      //  return res.data;
    })
    .catch((err) => console.error(err));
};
export const find = (query, callback) => {
  // Validating, if any value is present then go to next line
  query.blnumber = query.blnumber.trim();
  if (!query.blnumber && !query.status) return;

  let obj = { ...query };
  Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);

  axios
    .post(Server + "/shipment/find", { query: obj })
    .then((res) => {
      callback(res.data);
      //  return res.data;
    })
    .catch((err) => console.error(err));
};
export const update = (query, callback) => {
  axios
    .post(Server + "/shipment/update/" + query._id, { query })
    .then((res) => {
      callback(res.data);
      //  return res.data;
    })
    .catch((err) => console.error(err));
};
