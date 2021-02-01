const form = document.getElementById("form");
const API_URL = "http://127.0.0.1:2001/contactos";

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    
    const password = formData.get("password");
    const username = formData.get("login");
    
    const user = 
    {
        username,
        password
    };
    console.log(user);

    fetch(API_URL,{
        method:'POST',
        body: JSON.stringify(user),
        headers: {'content-type':'application/json'}
    }).then(usuario =>{
        console.log(usuario);
    }).catch(err => console.log(err));
});