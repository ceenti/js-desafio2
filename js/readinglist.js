let params = new URLSearchParams(document.location.search.substring(1));
let idPost = params.get("postid")
console.log(idPost)



const saveToReadingList = id => {
    $.ajax({
                url: `https://cards-6f1a0-default-rtdb.firebaseio.com/${id}.json`,
                method: "PATCH",
                data:JSON.stringify({"savedPost": true}),
                success: (response) => {
                  console.log(response);
                 
                },
                error: (error) => {
                  console.log(error);
                }
    });
};
saveToReadingList(idPost)

