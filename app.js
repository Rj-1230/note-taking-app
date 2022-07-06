console.log("Hello !! This is my notes making app");
// let notesImpObj=[];
showNotes();
showImpNotes();
//If user adds a note, it must be saved to the local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        txt: addTxt.value,
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
    showImpNotes();
});


//function to show Notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="note-card my-2 mx-2 card" style="width: 18rem;">
                <!-- <img src="..." class="card-img-top" alt="..."> -->
                <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <h6 class="card-title"> ${element.title}</h5>
                  <p class="card-text">${element.txt}</p>
                  <button id="${index}"onclick ="editNote(this.id)" class="btn btn-primary">Edit</button>
                  <button id="${index}"onclick ="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                  <button id="${index}"onclick ="impNote(this.id)" class="btn btn-primary">&#9733;</button>
                </div>
              </div>`;
    });

    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show !! Use "Add a note" section to add your notes `;
    }

}


//function to show Notes
function showImpNotes() {
    let notesImp = localStorage.getItem("notesImp");
    if (notesImp == null) {
        notesImpObj = [];
    }
    else {
        notesImpObj = JSON.parse(notesImp);
    }
    let htmlImp = "";
    for (let i = 0; i < notesImpObj.length; i++) {
        htmlImp += `
        <div class="note-card my-2 mx-2 card" style="width: 18rem;">
                <!-- <img src="..." class="card-img-top" alt="..."> -->
                <div class="card-body">
                  <h5 class="card-title"> Imp Note ${+i + 1}</h5>
                  <h6 class="card-title"> ${notesImpObj[i][0].title}</h5>
                  <p class="card-text">${notesImpObj[i][0].txt}</p>
                  <button class="btn btn-primary" disabled> Delete </button>
                  <button id="${+i}" onclick ="unImpNote(this.id)" class="btn btn-primary my-3"> Not important </button>
                </div>
              </div>`;
    }

    let notesImpElem = document.getElementById("notesImp");
    if (notesImpObj.length != 0) {
        notesImpElem.innerHTML = htmlImp;
    }
    else {
        notesImpElem.innerHTML = `No notes marked as important !! `;
    }

}




// function to delete a note 
function impNote(index) {
    // let notesImp = localStorage.getItem("notesImp");
    console.log(`I am deleting Note ${+index + 1}`);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let notesImp = localStorage.getItem("notesImp");
    if (notesImp == null) {
        notesImpObj = [];
    }
    else {
        notesImpObj = JSON.parse(notesImp);
    }

    var myDeletedObj = notesObj.splice(index, 1);
    console.log(myDeletedObj);
    notesImpObj.push(myDeletedObj);
    //sirf itna likhne se dleete ni hoga
    //we need to update this in the local storage also
    localStorage.setItem("notes", JSON.stringify(notesObj));
    localStorage.setItem("notesImp", JSON.stringify(notesImpObj));
    //by this function I am setting item in localstorage again
    //notesObj me to change krdia h , now i am stringifying 
    //it to local storage

    showNotes();
    showImpNotes();
}




// function to mark note as important 
function deleteNote(index) {
    // console.log(`I am deleting Note ${+index+1}`);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    // notesImpObj.push(myImpObj);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    // localStorage.setItem("notesImp", JSON.stringify(notesImpObj));
    //by this function I am setting item in localstorage again
    //notesObj me to change krdia h , now i am stringifying 
    //it to local storage

    showNotes();
    showImpNotes();
}





let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value;
    // console.log('Input event fired',inputVal);

    let noteCards = document.getElementsByClassName('note-card');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        let cardTitle = element.getElementsByTagName("h6")[0].innerText;
        // console.log(cardTitle);
        cardTxt = cardTxt.toLowerCase();
        cardTitle = cardTitle.toLowerCase();
        inputVal = inputVal.toLowerCase();
        if (cardTxt.includes(inputVal) || cardTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})






// function to edit note 
function editNote(index) {
    // console.log(`I am deleting Note ${+index+1}`);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // editNotesImpObj.push(notesObj[index]);
    const editObj = notesObj[index];
    var editedTitle = prompt("Please enter your title", `${editObj.title}`);
    if (editedTitle == null)
    editedTitle = editObj.title;
    var editedText = prompt("Please enter your text", `${editObj.txt}`);
    if (editedText == null)
    editedText = editObj.txt;
    function confirmAction() {
        let confirmAction = confirm("Are you sure to edit this note?");
        if (confirmAction) {
            alert("Successfully edited");
            notesObj[index].title = editedTitle;
            notesObj[index].txt = editedText;
        } else {
            alert("Edit declined");
        }
    }
    confirmAction();

        localStorage.setItem("notes", JSON.stringify(notesObj));
        // localStorage.setItem("notesImp", JSON.stringify(notesImpObj));
        //by this function I am setting item in localstorage again
        //notesObj me to change krdia h , now i am stringifying 
        //it to local storage

        showNotes();
        showImpNotes();
    }



    function unImpNote(index) {
        // let notesImp = localStorage.getItem("notesImp");
        // console.log(`I am deleting Note ${+index + 1}`);
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
    
        let notesImp = localStorage.getItem("notesImp");
        if (notesImp == null) {
            notesImpObj = [];
        }
        else {
            notesImpObj = JSON.parse(notesImp);
        }
    
        var notImpObj = notesImpObj.splice(index, 1);
        // console.log(notImpObj);
        const unImpObj = {
            title : notImpObj[0][0].title,
            txt : notImpObj[0][0].txt,
        }
        notesObj.push(unImpObj);
        //sirf itna likhne se dleete ni hoga
        //we need to update this in the local storage also
        localStorage.setItem("notes", JSON.stringify(notesObj));
        localStorage.setItem("notesImp", JSON.stringify(notesImpObj));
        //by this function I am setting item in localstorage again
        //notesObj me to change krdia h , now i am stringifying 
        //it to local storage
    
        showNotes();
        showImpNotes();
    }