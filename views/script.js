
window.scrollTo(0, document.body.scrollHeight);
let socket = io()
let username = prompt('please enter your name');

fetch("https://whitekabutar.herokuapp.com/messages").then(r => { return r.json() }).then(r => {
    for (let x of r) {
        let dt = document.createElement('h5')
        let dd = document.createElement('h6')
        let dbutton=document.createElement('button');
        let listitem = document.createElement('li');
        dbutton.addEventListener('click',()=>{
            fetch('https://whitekabutar.herokuapp.com/delete/'+x._id,{method:'Delete'}).then(()=>{
                dbutton.parentElement.remove()
          
             })
        })
        dt.textContent = x.sender + " " + x.time
        dd.textContent = x.message

       



        listitem.appendChild(dt);
        listitem.appendChild(dd);
        listitem.appendChild(dbutton);

        document.getElementById('msgbox').appendChild(listitem)



    }
}

)







socket.on('server', (msg) => {
    let dt = document.createElement('h5')
    let dd = document.createElement('h6')
    let dbutton=document.createElement('button');
    dbutton.addEventListener('click',()=>{
        fetch('https://whitekabutar.herokuapp.com/delete/'+msg.time,{method:'Delete'}).then(()=>{
            dbutton.parentElement.remove()
        })
    })

    dbutton.innerText="&times;"
    dt.textContent = msg.sender+""+msg.time;
    dd.textContent = msg.message

    let listitem = document.createElement('li');

    listitem.appendChild(dt);
    listitem.appendChild(dd);
    listitem.appendChild(dbutton)


    document.getElementById('msgbox').appendChild(listitem)
    window.scrollTo(0, document.body.scrollHeight);





})

function send() {
    let message = document.getElementById('messageinput').value;
    socket.emit('client', { name: username, message: message, time: new Date().toLocaleTimeString })
}

function handle(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
            send()
       
}
}


