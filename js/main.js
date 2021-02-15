$(window).on("load", function () {

      function on() {
        document.getElementById("overlay").style.display = "block";
    }

    function off() {
        document.getElementById("overlay").style.display = "none";
    }

    function clickSave(content) {
      if (content.innerHTML == 'Saved') {
        content.innerHTML = 'Save';
      } else {
        content.innerHTML = 'Saved';
      }
    }

    $("#headingOne").click(function () {
      $("#headingOne").hide();
    });

    // Select filters
    $("#feed-filter-select").change(event => {
      let dataOption = $(event.target).find(':selected').data('option')//days
      let dataContainer = $(event.target).find(':selected').data('container')//days
      let option = $(event.target).val()//infinity
      let placeToPrint = `#pills-${dataContainer}`;
      $(".tab-pane").hide();
      $(placeToPrint).show();

      if(option !== "latest"){
          let filteredPosts = {}
          let today = moment()
          for(id in cardsCollection){
            let dateMomentType = moment(cardsCollection[id].date, "YYYYMMDD HH:mm:ss")
            if(dataOption === "") {
              if(today.diff(dateMomentType) > 0) filteredPosts[id] = cardsCollection[id]
            } else {
              if(today.diff(dateMomentType, dataOption) <= 1)filteredPosts[id] = cardsCollection[id]
            }
          }
          filteredPosts = sortPosts(filteredPosts)
          printCards(option,filteredPosts)
        }else{
          latestFunction()
        }
    })

 
  const latestFunction = () => {
      let arrayPosts = []
      let newPosts = cardsCollection;
      let newLatestCards = {}
      for(id in newPosts){
          let newObject = {...newPosts[id]};
          newObject["id"] = id;
          arrayPosts.push(newObject)
      }
      currentPosts = arrayPosts.sort((a,b) => moment(b.date).diff(moment(a.date)));
      let latestPost = currentPosts.filter((item, key) => key < 10? item : null)
      const reversedPost = latestPost.reverse()
      reversedPost.forEach((item, key) => newLatestCards[item.id]= item)
      printCards("latest", newLatestCards )
  }
  
});
