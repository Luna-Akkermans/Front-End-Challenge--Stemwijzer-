

 


let generateButtons = (amount,array) => {
    for(var i = 0; i !== amount; i++){
        let btn = document.createElement("button");
        btn.innerHTML = data[i].text;
        btn.setAttribute('button-def', i)
        btn.addEventListener("click", votingLogic)
        document.getElementById('main-section').appendChild(btn);
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
   




let startVotingPointer = () => {
    generateButtons(data.length, data);
    starterInfo.style.display = 'none';

    generateTextFields();
    
}

let votingLogic = () => {
    questionCounter += 1;

}