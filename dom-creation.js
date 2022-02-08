var questionCounter = 0;

const mainDiv = document.querySelector("main");
const startDiv = document.getElementById("start")
const votingDiv = document.getElementById("votingPointer");
const questionDiv = document.getElementById("question-group");
const positionsDiv = document.getElementById("positions");

let GeneratePointOfView = (questionCounter) => {
    
    //Check if questions exists.
    while(questionDiv.hasChildNodes()) {
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
        if(positionsDiv.childNodes.length !== 3){
                    //Create div for each side.
        let divWrapper = document.createElement('div');
        divWrapper.id = Element
        positionsDiv.appendChild(divWrapper);

        //Create title for each side
        let sideTitle = document.createElement('h3');
        sideTitle.innerHTML = Element;
        sideTitle.id = `title-${Element}`
        sideTitle.append(Element)
        
        }
    })

}


let  OpinionSettingGeneration = () => {
    //Hide start-screen.
    startDiv.classList.add('w3-hide');
    votingDiv.classList.remove('w3-hide');

    //Create buttons to let user vote agree,neutral or against.
    data.forEach((Element, index) => {
        let btn = document.createElement("button");
        btn.innerText = data[index].text;
        btn.setAttribute('user-select',index);
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