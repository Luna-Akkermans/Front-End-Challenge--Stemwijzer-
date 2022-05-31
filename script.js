var answers = [];
var questionCounter = 0;
var weightedOptions = [];

var showParties;
const bigParties = 10;
const startButton = document.getElementById("start-button");
const buttonDiv = document.getElementById("button-group");
const questionIndex = document.getElementById("question-index");
const questionTitle = document.getElementById("question-title");
const questionP = document.getElementById("question-p");
var bigP = document.getElementById("testBox");
const mainBox = document.getElementById("main-section");
const questionGroup = document.getElementById("votingPointer");

const testDiv = document.getElementById("selectables");
startButton.addEventListener("click", () => {
    startButton.classList.add('w3-hide')
    showParties = bigP.checked;
    document.getElementById("party-size-div").classList.add('w3-hide')
    createButtons();
    questionInitialize(questionCounter);
    for(var i = 0; i <= parties.length; i++){
        let party = {};
        if(showParties && parties[i].size >= 10){
            party["party"] = parties[i].name;           
         }else{
             party["party"] = parties[i].name; 
         }
         party["votes"] = 0;
         answerInformation.push(party)
        }
})




let createButtons = () => {
    buttonInformation.forEach((element, index) => {
        let button = document.createElement("button");
        button.innerText = buttonInformation[index].text;
        button.setAttribute('selection', buttonInformation[index].attr);
        button.classList.add(buttonInformation[index].class[0], buttonInformation[index].class[1], buttonInformation[index].class) 
        button.setAttribute('user-input', buttonInformation[index].attr)     
        button.addEventListener("click", (e) => {
         
            userInput = e.target.getAttribute('user-input');
            switch (userInput){
                case 'back' : 
                testCalc(questionCounter,userInput)
                questionCounter--;
                break;
        
                case 'pro' : 
                testCalc(questionCounter,userInput)
                questionCounter++
                break;
                
                case 'none' : 
                testCalc(questionCounter,userInput)
                questionCounter++
                break;
        
                case 'contra' : 
                testCalc(questionCounter,userInput)
                questionCounter++;
                break;
        
                case 'next' : 
                testCalc(questionCounter,userInput)
                questionCounter++;
                break;
            }
            questionInitialize(questionCounter);
        })
        buttonDiv.appendChild(button);
    });
}

let  questionInitialize = (i) => {
    if(i < 30){
    subjects.forEach(element => {
        if (i < subjects.length) {
            if (questionIndex.classList.contains('w3-hide')) questionIndex.classList.remove('w3-hide')
            questionIndex.innerText = `${questionCounter + 1}/${subjects.length}`
            questionTitle.innerText = subjects[i].title;
            questionP.innerText = subjects[i].statement;
        }
    })
}else{
    questionGroup.classList.add("w3-hide")
    showWeightedOptions();
}
} 



let showWeightedOptions = () => {
    subjects.forEach((element, index) => {
        questionGroup.classList.add('w3-hide')
        let container = document.createElement('div');
        container.classList.add('select-container');
    
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", element.title);
        checkbox.setAttribute("id", index);
    
        let label = document.createElement('label');
        label.setAttribute("for", element.title);
        label.innerText = element.title;
    
        container.appendChild(checkbox);
        container.appendChild(label);

        testDiv.appendChild(container);

        let submit = document.createElement('button');
        submit.innerText = 'Naar resultaat'
        submit.classList.add('w3-button', 'w3-green', 'w3-padding-large', 'w3-display-bottomright')
        submit.addEventListener('click', resultShowing);
        testDiv.appendChild(submit)
    })
}




let resultShowing = () => {
   for(var i = 0; i <= parties.length; i++){
        if(document.getElementById(i).checked && answers[i].question == i){
            for(x = 0; x  < answerInformation.length; x++){
                answers[i].parties.forEach((element, index) => {
                    if(element == answerInformation[x].party){
                        answerInformation[x].votes += 2;
                    }
                })
            }       
        }else{ 
            // if not
            answers[i].parties.forEach((element, index) => {
                for(x = 0; x  < answerInformation.length; x++){
                    if(element == answerInformation[x].party){
                        answerInformation[x].votes += 1
                     }
                }
            })
        }
    }
    testDiv.classList.add('w3-hide')
    result.classList.remove('w3-hide');
    createList(answerInformation)



}


let createList = (array) => {
    let ul = document.createElement('ul');
    result.appendChild(ul);
    let values = array.sort((a, b) => {
        return b.votes - a.votes;
    });
    values.forEach(function (item) {
        percentResult = calculatePercent(item.votes);
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML  = `${item.party} Overeenkomst: ${percentResult}%`
    })


}

function calculatePercent(num){
    perc = (num/3)*10;
    return Math.floor(perc);
}



var tempObj = {};

let testCalc = (counter, statement) => {
    let tempArray = []
    for(let i = 0 ; i < subjects[counter].parties.length; i++){
        if(subjects[counter].parties[i].position == statement){
            tempArray.push(subjects[counter].parties[i].name)
            tempObj = {};
            tempObj['parties'] = tempArray;
            tempObj['question'] = counter;
        }
    }
    
    answers.push(tempObj);
}
