var questionCounter = 0;

const mainDiv = document.querySelector("main");
const startDiv = document.getElementById("start")
const votingDiv = document.getElementById("votingPointer");
const questionDiv = document.getElementById("question-group");
const positionsDiv = document.getElementById("positions");


let ChildRemover = (id) => {
        const myNode = document.getElementById(id);
        while (myNode.firstChild) {
          myNode.removeChild(myNode.lastChild);
        }
}



let GeneratePointOfView = (questionCounter) => {
    //Check if questions exists.
    while (questionDiv.hasChildNodes()) {
        questionDiv.removeChild(questionDiv.firstChild);
    }
    //Title of POV
    let title = document.createElement('h4');
    title.innerHTML = subjects[questionCounter].title;
    questionDiv.appendChild(title);

    //Question
    let question = document.createElement('p');
    question.innerHTML = subjects[questionCounter].statement;
    questionDiv.appendChild(question);

    //Statements | Parties
    const positions = subjects[questionCounter].parties.map(item => item.position)
        .filter((value, index, self) => self.indexOf(value) === index)
    positions.forEach((Element, index) => {
        if (positionsDiv.childNodes.length !== 3) {
            //Create div for each side.
            let divWrapper = document.createElement('div');
            divWrapper.id = Element
            positionsDiv.appendChild(divWrapper);

            //Create title for each side
            let sideTitle = document.createElement('h3');
            sideTitle.innerHTML = (Element == 'pro') ? ("Voor") : ((Element == 'contra') ? ("Tegen") : ("Neutraal"));
            sideTitle.id = `title-${Element}`
            sideTitle.classList.add('side-title')
            divWrapper.append(sideTitle)
        }

        //Create parent UL
        let ulParent = document.createElement('ul');
        ulParent.id = `position-list-${positions[index]}`
        document.getElementById(Element).appendChild(ulParent);
    })
    

    ChildRemover("info")
    ChildRemover("position-list-pro")
    ChildRemover("position-list-none")
    ChildRemover("position-list-contra")
    let showMore = document.createElement('button');
    showMore.innerHTML = 'Wat vinden de partijen?'
    showMore.addEventListener("click", () => {
        positionsDiv.classList.toggle('w3-hide')
    })
    showMore.classList.add("w3-button", "w3-teal")
    document.getElementById("info").appendChild(showMore);



    //Show politcal views based on party.
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


let OpinionSettingGeneration = () => {
    //Hide start-screen.
    startDiv.classList.add('w3-hide');
    votingDiv.classList.remove('w3-hide');

    //Create buttons to let user vote agree,neutral or against.
    data.forEach((Element, index) => {
        let btn = document.createElement("button");
        btn.innerText = data[index].text;
        btn.setAttribute('user-select', index);
        btn.addEventListener("click", (e) => {
            questionCounter++;
            GeneratePointOfView(questionCounter);
        })

        //Set styling for buttons
        btn.classList.add(data[index].class[0], data[index].class[1])

        //Add Buttons to document
        document.getElementById('button-group').appendChild(btn);
    })
}





document.getElementById('start-button').addEventListener("click", () => {
    GeneratePointOfView(questionCounter);
    OpinionSettingGeneration();
});