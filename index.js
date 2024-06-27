require('dotenv').config();
let express=require('express')
let app=express()
let router=require('./router/route')
let userRouter = require('./router/user_routes')
let cors=require('cors');
let errorhander = require('./middleware/errorHandler');
let db=require('./config/config');
db.dbconnection();
app.use(cors({
   origin:'*',
   methods:["GET",'DELETE']
}));

app.use(express.json());
app.use(express.static("views"));
app.use(express.urlencoded({extended:true}));
// app.set('view engine','ejs')
let port=( process.env.PORT || 9090)
let httpserver=require('http').createServer(app)
let io=require('socket.io')(httpserver,{
   cors: {
     origin: "*",
     methods: ["GET", "POST","DELETE"]
   }
 })

let Message=require('./model/messagemodel');


app.use('/users',userRouter);
app.use('/',router)

io.on('connection',(socket)=>{
   console.log('A user connected');
   socket.on('disconnect', () => {
       console.log('User disconnected');
   });

   socket.on('private message', async(msg, to) => {
       console.log('Private message:', msg, 'to:', to);
       const messagebox={
         messageBody:msg.body,
         sender:msg.senderId,
         receiver:to
        }
        const message = new Message(messagebox);
    await message.save();
       io.to(to).emit('private message', msg.body);
       io.to(messagebox.sender).emit('private message', msg.body);

   });

   socket.on('register', (userId) => {
       socket.join(userId);
       console.log('User registered with ID:', userId);
   });
})
   
app.use(errorhander)
httpserver.listen(port)



