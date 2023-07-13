const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const body = require("body-parser");
const { create, insert, del, update } = require("./Mod/mod");
const { all, query, lst, desc } = require("./Read/view");
app.post("/create/:tname", body.json(), create);
app.post("/insert/:tname", body.json(), insert);
app.post("/del/:tname", body.json(), del);
app.post("/update/:tname", body.json(), update);
app.get("/view/:tname", all);
app.get("/view", lst);
app.get("/view/des/:tname", desc);
app.get("/view/:tname/:col", body.json(), query);
app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});
