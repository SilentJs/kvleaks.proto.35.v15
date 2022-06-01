
const socket= io('https://ContentCylindricalTheories.pathikritdas.repl.co');
const msgForm = document.getElementById('msgForm')
const msgBox = document.getElementById('msg')
const msgBoxBox= document.getElementById('messages')
const chatName = document.getElementById('chatname')
const emojiPicker=document.querySelector('emoji-picker');

var msgAct=''
var msgNum=-1
var lastID = ''
var lastIP =''
var realMinutes=''
const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

window.onload=function(){
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>console.log(data));
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>{
    
    localStorage.setItem('IP',data.ip);
    localStorage.setItem('City',data.city);
    localStorage.setItem('ISP',data.org);
    localStorage.setItem('Postal',data.postal);
    localStorage.setItem('Region',data.region);
    localStorage.setItem('Latitude',data.latitude);
    localStorage.setItem('Longitude',data.longitude);
    nameGen();
    if(!localStorage.getItem('AutoScroll')){
    localStorage.setItem('AutoScroll','ON');
    }
    else if(localStorage.getItem('AutoScroll')==='OFF'){
        document.querySelector('.autoswitch').innerHTML=`<input class="toggle-checkbox" type="checkbox">
        <div onclick="changeAutoScroll();" class="toggle-switch"></div>`
        document.querySelector('.autoswitchR').innerHTML=`<input class="toggle-checkboxR" type="checkbox">
        <div onclick="changeAutoScroll();" class="toggle-switchR"></div>`
    }else{
        document.querySelector('.autoswitch').innerHTML=`<input class="toggle-checkbox" type="checkbox" checked>
        <div onclick="changeAutoScroll();" class="toggle-switch"></div>`
        document.querySelector('.autoswitchR').innerHTML=`<input class="toggle-checkboxR" type="checkbox" checked>
        <div onclick="changeAutoScroll();" class="toggle-switchR"></div>`
    }

    
    personalInfo=[
        localStorage.getItem("Name"),
        localStorage.getItem("Email"),
        localStorage.getItem("Pfp"),
        localStorage.getItem("ID"),
        localStorage.getItem('IP'),
        localStorage.getItem('City'),
        localStorage.getItem('ISP'),
        localStorage.getItem('Postal'),
        localStorage.getItem('Region'),
        localStorage.getItem('Latitude'),
        localStorage.getItem('Longitude')
    ]
    // socket.emit('info',personalInfo)
    
})
}
socket.on('nameGen',(string)=>{
    nameGen(string)
})

socket.on('proD',(data)=>{
    localStorage.setItem('Profile',JSON.stringify(data))
    localStorage.setItem('Name',data.name);
})
function nameGen(string){
    if(!localStorage.getItem('Name')||string){
        var number= Math.round(Math.random()*9999999)
        localStorage.setItem('Name',`AnonymousUser${number}`)
            profileData={
                name:localStorage.getItem('Name'),
                pfp:localStorage.getItem('Pfp'),
                id:localStorage.getItem('ID'),
                ip:localStorage.getItem('IP'),
                email:localStorage.getItem('Email'),
            }
        socket.emit('nameCheck',profileData)
    }else if(localStorage.getItem('Name')){
        profileData={
            name:localStorage.getItem('Name'),
            pfp:localStorage.getItem('Pfp'),    
            id:localStorage.getItem('ID'),
            ip:localStorage.getItem('IP'),
            email:localStorage.getItem('Email'),
        }
    socket.emit('nameFind',profileData)
    }
}

function getProfileData(){
    localPData=JSON.parse(localStorage.getItem('Profile'));
    if(!localPData.pfp){localPData.pfp='https://i.imgur.com/DgZCbZU.png'}
    msgBox.innerHTML=''
    if(localPData.id){
        msgBox.innerHTML=`<div id="profileBox">
  <h2>Your Profile</h2>
  <img src="${localPData.pfp.split('-c')[0]}"> 
  <ul>
  <li>Name: ${localPData.name}</li>
  <li>Email: ${localPData.email}</li>
  <li>ID: ${localPData.id}</li>
  </ul>
  <div>`  
    }else{
        msgBox.innerHTML=`<div id="profileBox">
  <h2>Your Profile</h2>
  <img src="${localPData.pfp.split('-c')[0]}"> 
  <ul>
  <li>Name: ${localPData.name}</li>
  <li>Email: Anonymous User</li>
  <li>ID: Anonymous User</li>
  </ul>
  <div>`  
    }
    
}

function emojiMenu(){
    if(document.getElementById('EmojiBox').innerHTML){
        document.getElementById('emojiB').innerHTML='<i class="fa-regular fa-face-smile"></i>'
        document.getElementById('EmojiBox').innerHTML=''
        return;
    }
    document.getElementById('EmojiBox').innerHTML=`<emoji-picker style="margin-bottom:10px;">
    <style>.picker{border-radius:10px;}</style></emoji-picker>`
    document.getElementById('emojiB').innerHTML='<i class="fa-solid fa-xmark"></i>'
    document.querySelector('emoji-picker').addEventListener('emoji-click', (event)=>{
    msgForm.msg.value+=event.detail.unicode
    });
}   
msgForm.addEventListener('submit',(e)=>{
    time= new Date();
    e.preventDefault();

 
    if(time.getMinutes()<10){
        realMinutes=`0${time.getMinutes()}`
    }else{
        realMinutes=time.getMinutes();
    }
    timestamp=`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()} ${time.getHours()}:${realMinutes}`
    msgData={
        name:localStorage.getItem('Name'),
        msg:msgForm.msg.value,
        time:timestamp,
        pfp:localStorage.getItem('Pfp'),
        room:localStorage.getItem('Room'),
        id:localStorage.getItem('ID'),
        ip:localStorage.getItem('IP')
    }
    socket.emit(`${localStorage.getItem('Room')}`,msgData);
    msgForm.msg.value=''
})

socket.on('pushMsg',(string)=>{
    pushMessages(string);
    msgNum+=1
    if(localStorage.getItem('AutoScroll')==='ON'){
    document.querySelectorAll('.MsgD')[msgNum].scrollIntoView()
    }
})

function changeAutoScroll(){
    if(localStorage.getItem('AutoScroll')==='ON'){
        localStorage.setItem('AutoScroll','OFF');
    }else if(localStorage.getItem('AutoScroll')==='OFF'){
        localStorage.setItem('AutoScroll','ON');
    }
}

function joinChat(string){
    chatName.innerHTML=string
    msgNum=-1
    msgBox.innerHTML=''
    request={
    name:localStorage.getItem('Name'),
    class:string,
    ip:localStorage.getItem('IP'),
    id:localStorage.getItem('ID')}
    socket.emit(`${string}Data`,request);
    
}
socket.on('changeChat',(data)=>{
    localStorage.setItem('Room',data);
})

function wrongChat(group){
  localStorage.setItem('Room','wrongchat')
  msgBox.innerHTML=''
  msgBox.innerHTML=`<div id="wrongChatBox">
  <h2>Your are not added to ${group} group yet</h2>
  <p class='para1'>Dont worry if you are not in any other class group yet on this site.
   Click the button and it will send us your name and we will add you within 24 hours.</p>
   <h5>Request to join ${group} group<br>
   <span>Your Name: ${localStorage.getItem('Name')}</span></h5>
   <button onclick="joinReqst('${group}');" id="grpJoinB">Send</button><br> 
   </p>
   <p class='para2'><br>
   Remember:<ul>
   <li>It is very easy to join a class group.</li>
   <li>If you mess up and mistakely send request to join some other group
    rather than the group you want on your device, you can email us at 
    <a href="#">noobassnigga@gmail.com</a> and we will change your class group.</li>
   <li>Dont try to send us your name to add to multiple groups if you 
   are already in a group your request will be rejected.</li>
   <li>Dont send us join request multiple times, we know that
    you want to join the group and start chatting as soon as 
    possible but we a group of are very few people moderating this site 
    so at maximum it will take 24 hours to add you.</li>
    <li>Dont be malicious and join different groups on different devices.
    Please stay in your own class group.</li>
   </ul>
 
  <div>`  
}
socket.on('wrongChat',(data)=>{
    wrongChat(data);
    document.getElementById('msgForm').style.visibility='hidden';
})

socket.on('loadData',(string)=>{
    document.getElementById('msgForm').style.visibility='visible';
    localStorage.setItem('Room','allchat')
    lastID='';lastIP='';
    for(let i=0;i<70;i++){
        if(string[i]){
        pushMessages(string[i]);
        document.querySelectorAll('.MsgD')[i].scrollIntoView()
        msgNum+=1
        }
    }
})
function joinReqst(data){
    joinData={
        name:localStorage.getItem('Name'),
        class:data,
        id:localStorage.getItem('ID'),
        ip:localStorage.getItem('IP')
    }
    socket.emit('joinRequest',joinData);
    
}
function pushMessages(data){
    time = new Date();
    console.log(data.id,data.ip)
    var designation =`<ele style='color:#ececec;'>(You)</ele>`

    if(localStorage.getItem('Room')!='wrongchat'){
    if(!localStorage.getItem('ID')){
        designation=''
    }    
    if(!data.pfp){
        data.pfp='https://i.imgur.com/DgZCbZU.png'
    }else{
        data.pfp=data.pfp.split('-c')[0]
    }
    if(regexExp.test(data.msg)&&!specialChars.test(data.msg)&&(data.id===lastID||data.ip===lastIP)){
        data.msg=`<p style="font-size:50px;margin:10px;">${data.msg}</p>`
    }else if(regexExp.test(data.msg)&&!specialChars.test(data.msg)){
        data.msg=`<p style="font-size:50px;margin:10px;margin-top:10px;">${data.msg}</p>`
    }else if(data.id===lastID||(data.ip===lastIP&&data.id===lastID)){
        data.msg=`<p style="margin-top:10px">${data.msg}</p>`
    }else{
        data.msg=`<p>${data.msg}</p>`
    }
    todaystamp=`${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()}`
    yesterstamp=`${time.getDate()-1}/${time.getMonth()+1}/${time.getFullYear()}`
    if(data.time.split(' ')[0]===todaystamp){
        data.time=`Today at ${data.time.split(' ')[1]}`
    }else if(data.time.split(' ')[0]===yesterstamp){
        data.time=`Yesterday at ${data.time.split(' ')[1]}`
    }
   
    if(localStorage.getItem('ID')&&localStorage.getItem('ID')===data.id){
        console.log('first 1')
        if(data.id===lastID&&data.ip===lastIP){
            msgBox.innerHTML+=`<div class="MsgD" id="myMsg" style="border-radius:20px 20px 20px 20px;">
            ${data.msg}
            </div><br>`
        }else{
            msgBox.innerHTML+=`<div class="MsgD" id="myMsg">
            <img src='${data.pfp}'>
            <a class='name'>${data.name} ${designation}</a><br>
            <div class='timestamp'>${data.time}</div style="margin-top:10px;">
            ${data.msg}
            </div><br>`
        }
    
    }else if(localStorage.getItem('IP')&&localStorage.getItem('IP')===data.ip&&localStorage.getItem('ID')===data.id){
        console.log('second 1')
        if(data.ip===lastIP&&data.id===lastID){
            msgBox.innerHTML+=`<div class="MsgD" id="myMsg" style="border-radius:20px 20px 20px 20px;">
            ${data.msg}
            </div><br>`
        }else{
            msgBox.innerHTML+=`<div class="MsgD" id="myMsg">
            <img src='${data.pfp}'>
            <a class='name'>${data.name} ${designation}</a><br>
           <div class='timestamp'>${data.time}</div>
            ${data.msg}
            </div><br>`
        }   
    
    }else{
        console.log('third 1')
        if(data.id===lastID&&data.ip===lastIP){
            
            msgBox.innerHTML+=`<div class="MsgD" id="elseMsg" style="border-radius:20px 20px 20px 20px;">
            ${data.msg}
            </div><br>`
        }else{
            msgBox.innerHTML+=`<div class="MsgD" id="elseMsg">
            <img src='${data.pfp}'>
            <a class='name'>${data.name} ${designation}</a><br>
            <div class='timestamp'>${data.time}</div>
            ${data.msg}
            </div><br>`
        }
    
    }
    lastID=data.id;
    lastIP=data.ip
}
}
