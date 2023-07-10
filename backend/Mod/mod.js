const aws =require("aws-sdk")
const ddb = new aws.DynamoDB({
  endpoint: "http://localhost:8000",
  region:"us-east-1"
  // configuration variables
})


const create=async (req,res)=>{
    const {tname}=req.params
    const {key}=req.body
    let arr=[]
    for (const i in req.body){
        arr.push({ AttributeName: req.body[i] , AttributeType: "S" })
    }
    console.log(arr);
    const params = {
        TableName: tname,
        KeySchema: [{ AttributeName:key , KeyType: "HASH" }],
        AttributeDefinitions: arr,
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      };
      console.log(params)
   await ddb.createTable(params, function(err, data) {
        if (err) {
          console.log("error")
          res.send("Unable to create table "+err);
        } else {
          console.log("yes");
          res.send("Success");
        }
      });
}


const insert=async(req,res)=>{
  const {tname}=req.params
  let arr={}
  for (const i in req.body){
    arr[i]={ S:req.body[i] }
}
  var params = {
     TableName: tname,
     Item: arr
 };
 await ddb.putItem(params,(err)=>{
  if(!err){res.send('success ')} 
  else{res.send("fail"+err)}
 })
}


const update=async(req,res)=>{
  const {tname}=req.params
  let arr={}
  for (const i in req.body){
    arr[i]={ S:req.body[i] }
}
  var params = {
     TableName: tname,
     Item: arr
 };
 await ddb.putItem(params,(err)=>{
  if(!err){res.send(`success `)} 
  else{res.send("fail"+err)}
 })
}
module.exports={create,insert}