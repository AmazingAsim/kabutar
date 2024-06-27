

let onlineurl=`https://${location.host}`;
let localurl="http://localhost:2000"

let socket = io()
let user=localStorage.getItem('user');

if(user==null || user=='null' || user==undefined || user==''){
    var username=prompt('please enter your name');
    localStorage.setItem('user',username); 
}
else{
    alert('welcome '+user)
}

fetch(`http://localhost:9090/messages/667dd3c7319bc79b2ea51f57/667dd38eaefeab8644919291`)
.then(r => { return r.json() })
.then(r => {
    for (let x of r) {
        let dt = document.createElement('b')
        let dd = document.createElement('h6')
        let dbutton=document.createElement('button');
        dbutton.innerText=`delete`
        let listitem = document.createElement('li');
        dbutton.addEventListener('click',()=>{
            fetch(onlineurl+'/delete/'+x._id,{method:'Delete', 'Content-type': 'application/json; charset=UTF-8'})
            .then((res)=>{res.json()})
            .then((res)=>{
                alert('delete successfull')
            }).catch(err=>{alert(err)});
               dbutton.parentElement.remove()
        })
        dt.textContent ='from '+ x.sender.user_name + " at " + x.timestamp
        dd.textContent = x.messageBody

        listitem.appendChild(dt);
        listitem.appendChild(dd);
        listitem.appendChild(dbutton);

        document.getElementById('msgbox').appendChild(listitem)

    }

    window.scrollTo(0,document.body.scrollHeight);
}

)


socket.on('server', (msg) => {
    let dt = document.createElement('b');
    let dd = document.createElement('h6')
 

   
    dt.textContent =' from '+ msg.sender+" at "+ msg.time;
    dd.textContent = msg.message

    let listitem = document.createElement('li');

    listitem.appendChild(dt);
    listitem.appendChild(dd);
    document.getElementById('msgbox').appendChild(listitem)
    
})

function send() {
    console.log('send function')
    let username=localStorage.getItem('user');

    if(username==null || username=="null" || username==''){
        username=prompt('please enter your name');
        localStorage.setItem('user',username);
      
    }else{
        let message = document.getElementById('messageinput').value;
        document.getElementById('messageinput').value=''
        socket.emit('private message', {body:message,senderId:"667dd3c7319bc79b2ea51f57"},'667dd38eaefeab8644919291')
    }
    
}

// // 667dd38eaefeab8644919291

// 667dd3c7319bc79b2ea51f57

function handle(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
            send()
           
       
}
}


