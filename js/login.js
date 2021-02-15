let params = new URLSearchParams(document.location.search.substring(1));
let idPost = params.get("sessionExpired");
//console.log(idPost)
if(idPost){
  localStorage.removeItem("token")
  localStorage.removeItem("email")
}

let email = localStorage.getItem("email")
let token = localStorage.getItem("token")
if(!token && idPost){
  let alertDiv = document.createElement("div")
  alertDiv.classList.add("alert", "alert-warning")
  let newAttr = document.createAttribute("role")
  newAttr.value = "alert"
  alertDiv.innerText = "Su sesión a expirado. Ingrese nuevamente"
  alertDiv.setAttributeNode(newAttr)
   document.getElementById("login").prepend(alertDiv)

}

let htmlCollection = document.getElementsByClassName("form-control")
htmlCollection = [...htmlCollection] // convertir una colleccion html en un Array para iterar con forEach
const formContent = {}
htmlCollection.forEach(element => {
    element.addEventListener("change", (event)=> {
      formContent[event.target.name] = event.target.value 
    })
});

//console.log(JSON.stringify(formContent))
document.getElementById("submit").addEventListener("click", (event) => {
 login(JSON.stringify(formContent))
})
const login = (data) => {
    $.ajax({
        url: "http://localhost:8080/auth/login",
        method: "POST",
        data: data,
        contentType: "application/json",
        success: (response) => {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("email", response.data.email)
          window.location.href = "index.html"
          console.log(response);
         
        },
        error: (error) => {
          console.log(error);
        }
    });
}