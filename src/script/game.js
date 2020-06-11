const $urlQuotes = 'https://www.breakingbadapi.com/api/quotes';
let $quote;
let $author;
let $randomButton;  
let $countPoint = 0;
let $lock = false;
let $randomNumber;


const main = () => {
    prepareDOMElements();
    prepareDOMEvents();

}
    
// pobieranie elementów 
const prepareDOMElements = () => {
    $gameText = document.querySelector('.game-txt');
    $buttons = document.querySelectorAll('.game-board__button');
    $answerBox = document.querySelector('.game-board__answer');
    $score = document.querySelector('.game-board__score');
};
        
        
// nadane Nasłuchiwanie
const prepareDOMEvents = () => {
    characters();
    randomQuote();
    $answerBox.addEventListener('click', choiceAnswer);
};

const randomQuote = () => {
    
    removeStyle();

    if($lock == false){

        $lock = true;

        $randomButton = Math.round(Math.random() * 3);
        $randomNumber = Math.round(Math.random() * 69);

        characters();
        
        axios.get($urlQuotes)
            .then(res => {
                 
                const data = res.data[$randomNumber];
                $quote = data.quote; 
                $author = data.author;
                
                $gameText.textContent = $quote;

                $buttons[$randomButton].textContent = $author;
                console.log($author);
                console.log($randomButton);
                
            })
            .catch(err => console.log(err))

    }
}

const characters  = () => {

    axios.get($urlQuotes)
        .then(res => {
            const Array = [];
            for (let i = 0; i < res.data.length; i++) {
                const el = res.data[i].author;
                Array.push(el)
            }
            
            const characterArray = [...new Set(Array)];

            for(const el of $buttons){
                el.innerHTML = characterArray[Math.round(Math.random() * 11)];
            }

        })
        .catch(err=>console.log(err));
}



const choiceAnswer = e => {
    const answer = e.target;

    if($lock == true && answer.classList.value != 'game-board__answer'){
        if (answer.textContent == $author) {
            $countPoint ++;

            answer.classList.add('good-answer');
            setTimeout(randomQuote, 2000);
            $lock = false;
            $score.textContent = `Point: ${$countPoint}`;
        } else {
            alert(`your score is ${$countPoint}`)
            $countPoint = 0;
            answer.classList.add('wrong-answer');
            setTimeout(randomQuote, 2000);
            
            $lock = false;
            $score.textContent = `Point: ${$countPoint}`;
        }
    }
}

const removeStyle = () => {
    $buttons.forEach(btnElement => {
        btnElement.classList.remove('good-answer');
        btnElement.classList.remove('wrong-answer');    
    });
}


document.addEventListener('DOMContentLoaded', main);