const aws = require("aws-sdk");
const ddb = new aws.DynamoDB({
  endpoint: "http://localhost:8000",
  region: "us-east-1",
  // configuration variables
});

const create = async (req, res) => {
  const { tname } = req.params;
  //const { key } = req.body;
  let arr = [];
  let key = [];
  for (const i in req.body) {
    arr.push({ AttributeName: req.body[i].key, AttributeType: "S" });
    key.push({ AttributeName: req.body[i].key, KeyType: req.body[i].keyT });
  }
  console.log(arr);
  const params = {
    TableName: tname,
    KeySchema: key,
    AttributeDefinitions: arr,
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  console.log(params);
  await ddb.createTable(params, function (err, data) {
    if (err) {
      console.log("error");
      res.send("Unable to create table " + err);
    } else {
      console.log("yes");
      res.send("Success");
    }
  });
};

const insert = async (req, res) => {
  const { tname } = req.params;
  let arr = {};
  for (const i in req.body) {
    arr[i] = { S: req.body[i] };
  }
  var params = {
    TableName: tname,
    Item: arr,
  };
  await ddb.putItem(params, (err) => {
    if (!err) {
      res.send("success ");
    } else {
      res.send("fail" + err);
    }
  });
};

const update = async (req, res) => {
  const { tname } = req.params;
  console.log(req.body);
  var params = req.body;
  await ddb.updateItem(params, (err) => {
    if (!err) {
      res.send(`success `);
    } else {
      res.send("fail" + err);
    }
  });
};
const del = async (req, res) => {
  const { tname } = req.params;
  let arr = {};
  for (const i in req.body) {
    arr[i] = { S: req.body[i] };
  }
  const params = {
    TableName: tname,
    Key: arr,
  };
  console.log(params);
  await ddb.deleteItem(params, (err) => {
    //deleting specific data
    if (!err) {
      res.send(`deleted`);
    } else {
      res.send("fail" + err);
    }
  });
};
const dele=async (req,res)=>{
  const {tname}=rq.params
  const params={
    TableName:tname
  }
  await ddb.deleteTable(params,(err,data)=>{
    if(!err){res.send(`successfully deleted ${tname}`)}
    else{res.send("failed")}
  })

}
module.exports = { create, insert, del, update };
