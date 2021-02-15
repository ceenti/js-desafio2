let params = new URLSearchParams(document.location.search.substring(1));
let idPost = params.get("postid")
console.log(idPost)


const getPostById = id => {
    
    $.ajax({
        url: `https://cards-6f1a0-default-rtdb.firebaseio.com/${id}.json`,
        method: "GET",
        success: (response) => {
            fillContent(response)
          console.log(response);
         
        },
        error: (error) => {
          console.log(error);
        }
      });
};
getPostById(idPost);

const fillContent = selectedCard =>{
        let { picUrl, title, tags, name, lastName, text, date } = selectedCard;
        $("#myTopImg").attr("src", picUrl );
        $("#nombreDeUsuario").text(name + " " + lastName)
        $("#fechaDelPost").text(moment(date,"YYYY-MM-DD HH:mm:ss").fromNow())
        $("#misHashTags").empty()
        if(tags !== undefined){
            tags.forEach(item =>{
                $("#misHashTags").append(`<a href="#"><span class="crayon">${item}</span></a>`)
            })
        } 
      
        $("#mytitlePage").text(title)
        $("#myText").text(text)
}