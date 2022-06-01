var queryEmail = ''
var queryName = ''
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
    queryEmail=profile.getEmail();
    queryName=profile.getName();
    if(queryEmail){
        localStorage.setItem("Email",queryEmail)
    }
    if(queryName){
        localStorage.setItem("Name",queryName)
    }
    document.location.href = 'index.html'
    
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}