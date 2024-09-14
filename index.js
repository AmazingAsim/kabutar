
require('dotenv').config();
let express=require('express')
let app=express()
let router=require('./router/route')
let Message=require('./model/messagemodel');
let userRouter = require('./router/user_routes')
let cors=require('cors');
let errorhander = require('./middleware/errorHandler');
let db=require('./config/config');
db.dbconnection();




// app.use(cors({
//    origin:'https://webflix-omega.vercel.app',
//    methods:["GET","POST"],
//    credentials: true
// }));

app.use(cors({
  origin:'http://localhost:3000',
  methods:["GET","POST"],
  credentials: true
}));

// app.options('https://webflix-omega.vercel.app',cors())
app.options('http://localhost:3000',cors())





app.use(express.json());
app.use(express.static("views"));
app.use(express.urlencoded({extended:true}));

let port=( process.env.PORT || 9090)
let httpserver=require('http').createServer(app)
let io=require('socket.io')(httpserver,{
   cors: {
     origin: "*",
     methods: ["GET", "POST","DELETE"]
   }
 })
app.use('/users',userRouter);
app.use('/',router)




io.on('connection',(socket)=>{
   console.log('A user connected');

   socket.on('disconnect', () => {
       console.log('User disconnected');
   });

   socket.on('pm', async(msg, to) => {
       const messagebox={
         messageBody:msg.body,
         sender:msg.senderId,
         receiver:to
        }
        const message = new Message(messagebox);
    await message.save();
       io.to(to).emit('pm', msg.body);
       io.to(messagebox.sender).emit('pm', msg.body);
   });

   socket.on('register', (userId) => {
       socket.join(userId);
   });
})
   
app.use(errorhander)
httpserver.listen(port)



