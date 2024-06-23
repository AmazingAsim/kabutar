let express=require('express')
let app=express()
let router=require('./router/route')
let cors=require('cors');
let errorhander = require('./middlewares/errorHandler')

app.use(cors({
   origin:'*',
   methods:["GET",'DELETE']
}));


app.use(express.json());
app.use(express.static("views"));
// app.set('view engine','ejs')
let port=( process.env.PORT || 9090)
let db=require('./config/config');
let httpserver=require('http').createServer(app)
let io=require('socket.io')(httpserver,{
   cors: {
     origin: "*",
     methods: ["GET", "POST","DELETE"]
   }
 })
let model=require('./model/messagemodel');
db.dbconnection();

// app.get('/chat',(req,res)=>{
//     res.render('index')
// })

app.use('/',router)


io.on('connection',(socket)=>{
     socket.on('client',(async msg=>{
        console.log(msg)
        message={
            message:msg.message,
            time:msg.time,
            sender:msg.name,
            senderId:msg.senderId
           }
           let result = await model.insertMany([message]);
           io.emit('server',result[0])
     }))
})
   
app.use(errorhander)
httpserver.listen(port)



