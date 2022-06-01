var attachmentsArr=[]
var boxData = document.getElementById('searchBox')
var postBox = document.getElementById('posts')
var msgBox = document.getElementById('msgBox')
var msgBoxData={}
var newsdata=[]
var tagsData=[]
var msgTags=[]
var dadarray=[]
var reqAmt=0
var smallCaseStore=''
var Cooldown=''
var timestamp=''
var realMinutes=0
var realSeconds=0
const socket= io('https://newsserver.the-karambitkar.repl.co');
localStorage.setItem('searching','false')

socket.on('newsdata',(data)=>{
    for(let i=0;i<70;i++){
        if(data[i]){
        dadarray.push(data[i])
        messageOut(data[i]);
        document.querySelectorAll('.post')[0].scrollIntoView({block: "end"})
        }
    }
})

function messageOut(data){
    if(!data.tags[0]){
        data.tags[0]=''
        tag0=''
    }else if(data.tags[0]){
        tag0=`<a class="tag">#${data.tags[0]}</a>`
    }

    if(!data.tags[1]){
        data.tags[1]=''
        tag1=''
    }else if(data.tags[1]){
        tag1=`<a class="tag">#${data.tags[1]}</a>`
    }

    if(!data.tags[2]){
        data.tags[2]=''
        tag2=''
    }else if(data.tags[2]){
        tag2=`<a class="tag">#${data.tags[2]}</a>`
    }

    if(!data.Attachments[0]){
        data.Attachments[0]=''
    }

    if(!data.Attachments[1]){
        data.Attachments[1]=''
    }

    if(!data.Attachments[2]){
        data.Attachments[2]=''
    }

    if(!data.Pfp){
        data.Pfp='https://i.imgur.com/DgZCbZU.png'
    }else if(data.Pfp){
        data.Pfp=data.Pfp.split('-c')[0]
    }
    postBox.innerHTML=`<div class="post">
        <img class="pfp" src='${data.Pfp}'>
        <a class='postPoster'>${data.Name}</a>
        <a class='timestamp'>${data.Time}</a>
        <p class="postTopic">${data.Topic}</p>
        <p class="postContent">${data.Content}</p>
        <div class="Att"><a class="attachments">${data.Attachments[0]}${data.Attachments[1]}${data.Attachments[2]}</a></div>
        <p class="postTags">${tag0}${tag1}${tag2}</p><br>
        <button class="likebut${data._id}" id="likebtn" onclick="like('${data._id}');"><i class="fa-regular fa-thumbs-up"></i>  Like</button>
        <button class="dislikebut${data._id}" id="dislikebtn"  onclick="dislike('${data._id}');"><i class="fa-regular fa-thumbs-down"></i>  Dislike</button><br>
        <a id="like${data._id}">Likes: ${data.Likes}</a><br>
        <a id="dislike${data._id}">Dislikes: ${data.Dislikes}</a><br>
    </div>`+postBox.innerHTML

    if(localStorage.getItem('ID')){
        if(data.LikedIDs.includes(localStorage.getItem('ID'))){
            chLikeB(data._id);
        }else{
            normLikeB(data._id);
        }
        if(data.DislikedIDs.includes(localStorage.getItem('ID'))){
            chDislikeB(data._id);
        }else{
            normDislikeB(data._id);
        }
    }else{
        if(data.Likedips.includes(localStorage.getItem('IP'))){
            chLikeB(data._id);
        }else{
            normLikeB(data._id);
        }
        if(data.Dislikedips.includes(localStorage.getItem('IP'))){
            chDislikeB(data._id);
        }else{
            normDislikeB(data._id);
        }
    }
    
}


function hideTagsBar(){
    document.getElementById('tagsbar').style.display='none'
    document.getElementById('topicbar').style.display='block'
    document.querySelector('.dropdown-content').style.display='none'
}
function hideTopicBar(){
    document.getElementById('tagsbar').style.display='block'
    document.getElementById('topicbar').style.display='none'
    document.querySelector('.dropdown-content').style.display='none'
}
function showDropdown(){
    document.querySelector('.dropdown-content').style.display='block'
}
socket.on('newMsg',(data)=>{
    console.log(data);
    if(localStorage.searching!='true'){
        messageOut(data)
    }
    dadarray.push(data);
})
socket.on('updateMsgBox',()=>{
    msgBox.box1.value=''
    msgBox.box2.value=''
    msgBox.box3.value=''
    msgBox.box4.value=''
})

function multipleExist(arr, values) {
    return values.every(value => {
    return arr.includes(value);
    });
}


boxData.addEventListener('submit',e=>{
    localStorage.setItem('searching','true');
    e.preventDefault()
    postBox.innerHTML=''
    if(boxData.box1.value){
    let searchData=boxData.box1.value.replaceAll('#',' ').split(' ')
    tagsData=[]
    searchData.forEach(element => {
        if(element!=''){
            tagsData.push(element);
        }
    });
    for (let i = 0; i < 70; i++) {
        if(dadarray[i]){
            if(multipleExist(dadarray[i].tags,tagsData)){
                messageOut(dadarray[i])
            }
        }
    }
    }


})

function clearSBox(){
    boxData.box1.value=''
    localStorage.setItem('searching','false');
    postBox.innerHTML=''
        for(let i=0;i<70;i++){
            if(dadarray[i]){
            messageOut(dadarray[i]);
            document.querySelectorAll('.post')[0].scrollIntoView()
            }
        }
}
function like(check){
    if(localStorage.getItem('ID')){
    var randArray = [check,localStorage.getItem('ID')]
    socket.emit('idlike',randArray);
    }else{
    var randArray = [check,localStorage.getItem('IP')]
    socket.emit('iplike',randArray);
    }
}
function dislike(check){
    if(localStorage.getItem('ID')){
    var randArray = [check,localStorage.getItem('ID')]
    socket.emit('iddislike',randArray);
    }else{
    var randArray = [check,localStorage.getItem('IP')]
    socket.emit('ipdislike',randArray);
    }
}


msgBox.addEventListener('submit',e=>{
    today =new Date();
    if(msgBox.box3.value){
        var attachments=msgBox.box3.value.split(" ")
        var att1
        var att2 
        var att3 
        if(attachments[0]){
            if(attachments[0].includes('.jpeg')||attachments[0].includes('.png')||attachments[0].includes('.jpg')||attachments[0].includes('.gif')){
                att1=`<img class="attachImg" src='${attachments[0]}' alt='${attachments[0]}'>`
            }else if(attachments[0].includes('.ogg')||attachments[0].includes('.mp4')){
                att1=`<video class="attachVid" width="320" height="240" controls><source  src="${attachments[0]}" type="video/mp4"> <source src="${attachments[0]}" type="video/ogg">Your browser does not support the video tag</video>`
            }else if(attachments[0].includes('.mp3')){
                att1=`<audio class="attachAud" controls><source src="${attachments[0]}" type="audio/ogg"><source src="${attachments[0]}" type="audio/mpeg">Your browser does not support the audio element</audio>`
            }else{
                att1='invalid url'
            }
    }
    if(attachments[1]){
            if(attachments[1].includes('.jpeg')||attachments[1].includes('.png')||attachments[1].includes('.jpg')||attachments[1].includes('.gif')){
                att2=`<img class="attachImg" src='${attachments[1]}' alt='${attachments[1]}'>`
            }else if(attachments[1].includes('.ogg')||attachments[1].includes('.mp4')){
                att2=`<video class="attachVid" width="320" height="240" controls><source src="${attachments[1]}" type="video/mp4"> <source src="${attachments[1]}" type="video/ogg">Your browser does not support the video tag</video>`
            }else if(attachments[1].includes('.mp3')){
                att2=`<audio class="attachAud" controls><source src="${attachments[1]}" type="audio/ogg"><source src="${attachments[1]}" type="audio/mpeg">Your browser does not support the audio element</audio>`
            }else{
                att2='invalid url'
            }
    }
    if(attachments[2]){
            if(attachments[2].includes('.jpeg')||attachments[2].includes('.png')||attachments[2].includes('.jpg')||attachments[2].includes('.gif')){
                att3=`<img class="attachImg" src='${attachments[2]}' alt='${attachments[2]}'>`
            }else if(attachments[2].includes('.ogg')||attachments[2].includes('.mp4')){
                att3=`<video class="attachVid" width="320" height="240" controls><source src="${attachments[2]}" type="video/mp4"> <source src="${attachments[2]}" type="video/ogg">Your browser does not support the video tag</video>`
            }else if(attachments[2].includes('.mp3')){
                att3=`<audio class="attachAud" controls><source src="${attachments[2]}" type="audio/ogg"><source src="${attachments[2]}" type="audio/mpeg">Your browser does not support the audio element</audio>`
            }else{
                att3='invalid url'
            }
    }
    }

    attachmentsArr=[
        att1,
        att2,
        att3
    ]

    if(today.getMinutes()<10){
        realMinutes=`0${today.getMinutes()}`
    }else{
        realMinutes=today.getMinutes();
    }
    if(today.getSeconds()<10){
        realSeconds=`0${today.getSeconds()}`
    }else{
        realSeconds=today.getSeconds();
    }
    let searchData=msgBox.box4.value.replaceAll('#',' ').split(' ')
    msgTags=[]
    searchData.forEach(element => {
        if(element!=''){
            msgTags.push(element);
        }
    });
    e.preventDefault();
    pfpvar=localStorage.getItem('Pfp')
    Cooldown=`${today.getDate()} ${today.getMonth()+1} ${today.getFullYear()} ${today.getHours()} ${realMinutes} ${realSeconds}`
    timestamp=`${today.getDate()+'/'+`${today.getMonth()+1}`+'/'+today.getFullYear()+' '+today.getHours()+':'+realMinutes}`
    msgBoxData={
        Name:localStorage.getItem('Name'),
        Pfp:localStorage.getItem('Pfp'),
        Topic:msgBox.box1.value,
        Content:msgBox.box2.value,
        Attachments:attachmentsArr,
        tags:msgTags,
        ip:localStorage.getItem('IP'),
        Likes:'0',
        Dislikes:"0",
        Pfp:pfpvar,
        Time:timestamp,
        Cooldown
    }
    
    socket.emit('post',msgBoxData); 
    Cooldown=``
    timestamp=``
})
var coolDownClock
socket.on('cooldown',(string)=>{
    if(!coolDownClock){
        CDclock();
    }else if(coolDownClock){
        clearInterval(coolDownClock)
        coolDownClock=null
        CDclock();
    }
    function CDclock(){
        coolDownClock=setInterval(function(){
            if(parseInt(string)>-1){
                mins=Math.floor(parseInt(string)/60)
                secs=parseInt(string)%60
                if(secs<10){
                    secs=`0${secs}`
                }
                document.querySelector('.cdButton').style.background='#e38585'
                document.querySelector('.cdButton').style.fontSize='24px'
                document.querySelector('.cdButton').textContent=`Cooldown ${mins}:${secs}`
                string=parseInt(string-1)
            }else{
                clearInterval(coolDownClock)
                coolDownClock=null;
                document.querySelector('.cdButton').style.background='#f0efef'
                document.querySelector('.cdButton').style.fontSize='30px'
                document.querySelector('.cdButton').textContent=`Post`
            }    
        },1000)
    }
})



socket.on('chLikeB',(any)=>{
    chLikeB(any);
})
socket.on('normDislikeB',(any)=>{
    normDislikeB(any);
})
socket.on('normLikeB',(any)=>{
    normLikeB(any);
})
socket.on('chDislikeB',(any)=>{
    chDislikeB(any);
})
function chLikeB(any){
    document.querySelector('.likebut'+any).style.backgroundColor='#cafaff'
    document.querySelector('.likebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-up"></i>  Liked`
}
function normLikeB(any){
    document.querySelector('.likebut'+any).style.backgroundColor='#f0efef'
    document.querySelector('.likebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-up"></i>  Like`

}
function chDislikeB(any){
    document.querySelector('.dislikebut'+any).style.backgroundColor='#cafaff'
    document.querySelector('.dislikebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-down"></i>  Disliked`
}
function normDislikeB(any){
   document.querySelector('.dislikebut'+any).style.backgroundColor='#f0efef'
   document.querySelector('.dislikebut'+any).innerHTML=`<i class="fa-regular fa-thumbs-down"></i>  Dislike`
}

socket.on('iLike',(string)=>{
    var change = document.getElementById('like'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])+1
    var noog=document.getElementById('like'+string).innerHTML='Likes: '+parse
})
socket.on('dLike',(string)=>{
    var change = document.getElementById('like'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])-1
    var noog=document.getElementById('like'+string).innerHTML='Likes: '+parse
})
socket.on('iDislike',(string)=>{
    var change = document.getElementById('dislike'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])+1
    var noog=document.getElementById('dislike'+string).innerHTML='Dislikes: '+parse
})
socket.on('dDislike',(string)=>{
    var change = document.getElementById('dislike'+string).innerHTML.split(" ")
    var parse=parseInt(change[1])-1
    var noog=document.getElementById('dislike'+string).innerHTML='Dislikes: '+parse
})



