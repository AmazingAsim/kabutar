

// https://whitekabutar.herokuapp.com/messages
let onlineurl="https://whitekabutar.herokuapp.com";
let localurl="http://localhost:2000"

let socket = io()
let user=localStorage.getItem('user');
if(user==null){
    let username=prompt('please enter your name');
    localStorage.setItem('user',username); 
}
else{
    alert('welcome '+user)
   
    
}


fetch(onlineurl+'/messages').then(r => { return r.json() }).then(r => {
    for (let x of r) {
        let dt = document.createElement('h5')
        let dd = document.createElement('h6')
        let dbutton=document.createElement('button');
        dbutton.innerText=`delete`
        let listitem = document.createElement('li');
        dbutton.addEventListener('click',()=>{

            fetch(onlineurl+'/delete/'+x._id,{method:'Delete', 'Content-type': 'application/json; charset=UTF-8'}).then((res)=>{res.json()}).then((res)=>{
                alert('delete successfull')
            }).catch(err=>{alert(err)});
               dbutton.parentElement.remove()
        })
        dt.textContent = x.sender + " " + x.time
        dd.textContent = x.message

       



        listitem.appendChild(dt);
        listitem.appendChild(dd);
        listitem.appendChild(dbutton);

        document.getElementById('msgbox').appendChild(listitem)



    }

    window.scrollTo(0,document.body.scrollHeight);
}

)







socket.on('server', (msg) => {
    let dt = document.createElement('h5')
    let dd = document.createElement('h6')
 

   
    dt.textContent = msg.sender+""+msg.time;
    dd.textContent = msg.message

    let listitem = document.createElement('li');

    listitem.appendChild(dt);
    listitem.appendChild(dd);



    document.getElementById('msgbox').appendChild(listitem)
    





})

function send() {
    let message = document.getElementById('messageinput').value;
    socket.emit('client', { name: localStorage.getItem('user'), message: message, time: new Date().toLocaleDateString })
}

function handle(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
            send()
       
}
}


