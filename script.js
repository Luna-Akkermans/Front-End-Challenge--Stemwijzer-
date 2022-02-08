let generateButtons = (array, functionalityOfButton) => {
    for (var i = 0; i !== array.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = array[i].text;
        btn.setAttribute('button-def', i)
        btn.addEventListener("click", votingLogic)
        btn.classList.add(array[i].class[0], array[i].class[1])
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
    for (let i = 0; i < positions.length; i++) {
        let ulParent = document.createElement('ul');
        ulParent.id = `position-list-${positions[i]}`
        document.getElementById("positions").appendChild(ulParent);
    }
    for (let i = 0; i < subjects[questionCounter].parties.length; i++) {
        let listItem = document.createElement('li');
        let contentListItem = document.createElement('span');
        let opinionContent = document.createElement('p');
        contentListItem.innerHTML = subjects[questionCounter].parties[i].name
        //Filter opinions.
        if (subjects[questionCounter].parties[i].position == 'pro') {
            listItem.appendChild(contentListItem)
            listItem.classList.add('w3-cursive')
            opinionContent.innerHTML = subjects[questionCounter].parties[i].opinion
            opinionContent.classList.add('w3-hide', 'w3-small')
            listItem.appendChild(opinionContent)
            contentListItem.addEventListener("click", () => {
                opinionContent.classList.toggle('w3-hide')
            })
            document.getElementById('position-list-pro').appendChild(listItem)
        } else if (subjects[questionCounter].parties[i].position == 'contra') {
            listItem.appendChild(contentListItem)
            document.getElementById('position-list-contra').appendChild(listItem)
            listItem.classList.add('w3-cursive')
            opinionContent.innerHTML = subjects[questionCounter].parties[i].opinion
            opinionContent.classList.add('w3-hide', 'w3-small')
            listItem.appendChild(opinionContent)
            contentListItem.addEventListener("click", () => {
                opinionContent.classList.toggle('w3-hide')
                
            })
        } else {
            listItem.appendChild(contentListItem)
            document.getElementById('position-list-none').appendChild(listItem)
            listItem.classList.add('w3-cursive')
            opinionContent.innerHTML = subjects[questionCounter].parties[i].opinion
            opinionContent.classList.add('w3-hide', 'w3-small')
            listItem.appendChild(opinionContent)
            contentListItem.addEventListener("click", () => {
                opinionContent.classList.toggle('w3-hide')
            })
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
    createInformationElements();
}