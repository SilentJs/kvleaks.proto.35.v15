
// const socket= io('https://userdetailsdb.the-karambitkar.repl.co')
var personalInfo =[]
var queryEmail = ''
var queryName = ''
var number= Math.round(Math.random()*99999)

function imgSlider(any){
    document.querySelector('.starbucks').src=any;
}
function changeCircleColor(color){
    const circle = document.querySelector('.redcircle');
    circle.style.background = color
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    queryName=profile.getName();
    queryEmail=profile.getEmail();
    queryPfp=profile.getImageUrl();
    queryID=profile.getId();
        localStorage.setItem("Name",queryName);
        localStorage.setItem("Email",queryEmail);
        localStorage.setItem("Pfp",queryPfp);
        localStorage.setItem("ID",queryID);
    document.querySelector('.signinB').style.display='flex'
    document.querySelector('.g-signin2').style.display='none'
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    // document.querySelector('.signinB').style.display='none'
    // document.querySelector('.g-signin2').style.display='flex'
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>console.log(data));
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>{
    if(!localStorage.getItem('Name')){
            localStorage.setItem('Name',`AnonymousUser${number}`)
    }
    localStorage.setItem('IP',data.ip);
    localStorage.setItem('City',data.city);
    localStorage.setItem('ISP',data.org);
    localStorage.setItem('Postal',data.postal);
    localStorage.setItem('Region',data.region);
    localStorage.setItem('Latitude',data.latitude);
    localStorage.setItem('Longitude',data.longitude);
    
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

window.onload=function(){
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>console.log(data));
    fetch('https://ipapi.co/json/').then(results=>results.json()).then(data=>{
    if(!localStorage.getItem('Name')){
            localStorage.setItem('Name',`AnonymousUser${number}`)
    }
    localStorage.setItem('IP',data.ip);
    localStorage.setItem('City',data.city);
    localStorage.setItem('ISP',data.org);
    localStorage.setItem('Postal',data.postal);
    localStorage.setItem('Region',data.region);
    localStorage.setItem('Latitude',data.latitude);
    localStorage.setItem('Longitude',data.longitude);
    
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


