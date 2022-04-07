let express=require('express')
let app=express()
let port=( process.env.PORT || 2000)
let db=require('./config/config')
let httpserver=require('http').createServer(app)
let io=require('socket.io')(httpserver)
let model=require('./model/messagemodel');
db.dbconnection();

app.get('/chat',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get('/messages',async (req,res)=>{
  let data= await model.find()
  res.send(data);
})

io.on('connection',(socket)=>{
     console.log('client is connected');
     socket.on('client',(msg=>{

        message={
            message:msg.message,
            time:new Date().toLocaleTimeString(),
            sender:msg.name
           }
       
         io.emit('server',msg)
        model.insertMany([message])
     }))
})

httpserver.listen(port)



