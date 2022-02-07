

let generateButtons = (amount,array) => {
    for(var i = 0; i !== amount; i++){
        let btn = document.createElement("button");
        btn.innerHTML = data[i].text;
        btn.setAttribute('button-def', i)
        btn.addEventListener("click", votingLogic)
        document.getElementById('main-section').appendChild(btn);
    }
}






let startVotingPointer = () => {
    generateButtons(data.length, data);
    starterInfo.style.display = 'none';


    console.log(parties)
}

let votingLogic = () => {
    
}