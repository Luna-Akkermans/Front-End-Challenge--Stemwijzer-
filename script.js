let generateButtons = (array, functionalityOfButton) => {
    for(var i = 0; i !== array.length; i++){
        let btn = document.createElement("button");
        btn.innerHTML = array[i].text;
        btn.setAttribute('button-def', i)
        btn.addEventListener("click", functionalityOfButton)
        document.getElementById('button-group').appendChild(btn);
    }
}



let generateTextFields = () => {
    console.log(subjects[questionCounter].parties[2].name);
    //Title
    let title = document.createElement("h4");
    title.innerHTML = subjects[questionCounter].title;
    document.getElementById('question-group').appendChild(title);
    //Question
    let question = document.createElement("p");
    question.innerHTML = subjects[questionCounter].statement;
    document.getElementById('question-group').appendChild(question);

    //Information
   
}
   
let createInformationElements = () => {
    var positions = subjects[questionCounter].parties.map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index)
    for(let i = 0; i < positions.length; i++){
       

        let ulParent = document.createElement('ul');
        ulParent.id = `position-list-${positions[i]}`
        document.getElementById("positions").appendChild(ulParent);
    }

     for(let i = 0; i < subjects[questionCounter].parties.length; i++){
         let listItem = document.createElement('li');
         let opinionSpan = document.createElement('span');
        if(subjects[questionCounter].parties[i].position == 'pro'){
            listItem.innerHTML = subjects[questionCounter].parties[i].name
            opinionSpan.classList.add('w3-hide')
            listItem.onclick = toggleShow(opinionSpan)
            opinionSpan.innerHTML = subjects[questionCounter].parties[i].opinion
            listItem.appendChild(opinionSpan)
            document.getElementById('position-list-pro').appendChild(listItem)
        }else if(subjects[questionCounter].parties[i].position == 'contra'){
            listItem.innerHTML = subjects[questionCounter].parties[i].name
            document.getElementById('position-list-contra').appendChild(listItem)
        }else{
            listItem.innerHTML = subjects[questionCounter].parties[i].name
            document.getElementById('position-list-none').appendChild(listItem)
        }
    }
}





let startVotingPointer = () => {
    generateButtons(data, votingLogic);
    starterInfo.style.display = 'none';

    generateTextFields();
    createInformationElements();
    
}

let votingLogic = () => {
    questionCounter += 1;

}