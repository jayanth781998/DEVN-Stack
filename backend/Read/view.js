const aws =require("aws-sdk")
const ddb = new aws.DynamoDB({
  endpoint: "http://localhost:8000",
  region:"us-east-1"
  // configuration variables
})


const all=async(req,res)=>{
    const {tname}=req.params
    const params={
       TableName:tname,
    }
    await ddb.scan(params,(err,data)=>{//fetching all data in table
       if(!err){
          res.send(data.Items)
       }
       else{
          res.send(err)
       }
    })
 }

 const query=async (req,res)=>{
     const tname=req.params.tname
     const col=req.params.col
     const {coll}= req.body
    const params={
     TableName:tname,   
     KeyConditionExpression: coll+" =:a",
     ExpressionAttributeValues:{
         ":a":{S:col}
     }
  }
  await ddb.query(params,(err,data)=>{//fetching only queried data from db
     if(!err){res.send(data.Items)} 
  else{res.send("fail"+err)}
  })
 }
 module.exports={all,query}