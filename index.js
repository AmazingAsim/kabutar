let express=require('express')
let app=express()
let router=require('./router/route')
let cors=require('cors');
app.use(cors({
   origin:'*',
   methods:["GET",'DELETE']
}))
app.use(express.static("views"));
// app.set('view engine','ejs')
let port=( process.env.PORT || 2000)
let db=require('./config/config')
let httpserver=require('http').createServer(app)
let io=require('socket.io')(httpserver)
let model=require('./model/messagemodel');
db.dbconnection();

// app.get('/chat',(req,res)=>{
//     res.render('index')
// })

app.use('/',router)


io.on('connection',(socket)=>{
     console.log('client is connected');
     socket.on('client',(msg=>{

        message={
            message:msg.message,
            time:msg.time,
            sender:msg.name
           }
       
         io.emit('server',message)
        model.insertMany([message])
     }))
})

httpserver.listen(port)



