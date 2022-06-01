const socketP= io('http://localhost:4001');

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
    // socketP.emit('info',personalInfo)
    
})
}
socketP.on('nameGen',(string)=>{
    nameGen(string)
})

socketP.on('proD',(data)=>{
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
        socketP.emit('nameCheck',profileData)
    }else if(localStorage.getItem('Name')){
        profileData={
            name:localStorage.getItem('Name'),
            pfp:localStorage.getItem('Pfp'),    
            id:localStorage.getItem('ID'),
            ip:localStorage.getItem('IP'),
            email:localStorage.getItem('Email'),
        }
    socketP.emit('nameFind',profileData)
    }
}
