
const $url = 'https://www.breakingbadapi.com/api/characters';


const main = () =>{
    prepareDOMElements();
    prepareDOMEvents();
}

// pobieranie elementów 
const prepareDOMElements = () => {
    $searchInput = document.querySelector('.character-search__input');
    $searchInputValue = $searchInput.value; 
    $searchButton = document.querySelector('.character-search__button');
    $loadCharacterButton = document.querySelector('.all-characters-button');
    $mainBox = document.querySelector('.main-box');
    $gridBtn = document.querySelector('.btn-set-look__grid');
    $listBtn = document.querySelector('.btn-set-look__list');
};


// nadane Nasłuchiwanie
const prepareDOMEvents = () => {
    $searchButton.addEventListener('click', () => 
    {
        if(!$searchInput.value){
            alert('Wpisz bohatera');
        }else{
            queryAPI();
        }
    }); 


    $loadCharacterButton.addEventListener('click', loadCharacter);
    $gridBtn.addEventListener('click', setGrid);
    $listBtn.addEventListener('click', setList);
};

const createComponent = (res) =>{

    for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];

        const characterBox = document.createElement('div');
        const characterBoxInner = document.createElement('div');
        const characterBoxImage = document.createElement('div');

        const name = document.createElement('h2');
        const nickName = document.createElement('p');
        const label1 = document.createElement('p');
        const label2 = document.createElement('p');
        const label3 = document.createElement('p');
        const label4 = document.createElement('p');
        const characterInfo1 = document.createElement('h4');
        const characterInfo2 = document.createElement('h4');
        const characterInfo3 = document.createElement('h4');
        const characterInfo4 = document.createElement('h4');
        const characterImg = document.createElement('img');


        characterBox.classList.add('character-box');
        characterBoxInner.classList.add('character-box__inner');
        characterBoxImage.classList.add('character-box__image');

        name.classList.add('character-box__name');
        name.innerHTML = element.name;

        nickName.classList.add('character-box__nickname');
        nickName.innerHTML = element.nickname;

        label1.classList.add('character-box__label');
        label1.innerHTML = "Birth date:";

        characterInfo1.classList.add('character-box__info');
        characterInfo1.innerHTML = element.birthday;

        label2.classList.add('character-box__label');
        label2.innerHTML = "Profession:";

        characterInfo2.classList.add('character-box__info');
        characterInfo2.innerHTML = element.occupation;

        label3.classList.add('character-box__label');
        label3.innerHTML = "Status:";

        characterInfo3.classList.add('character-box__info');
        characterInfo3.innerHTML = element.status;

        label4.classList.add('character-box__label');
        label4.innerHTML = "Portrayed:";

        characterInfo4.classList.add('character-box__info');
        characterInfo4.innerHTML = element.portrayed;

        characterImg.setAttribute('src', element.img);

        characterBoxInner.appendChild(name);
        characterBoxInner.appendChild(nickName);

        characterBoxInner.appendChild(label1);
        characterBoxInner.appendChild(characterInfo1);

        characterBoxInner.appendChild(label2);
        characterBoxInner.appendChild(characterInfo2);

        characterBoxInner.appendChild(label3);
        characterBoxInner.appendChild(characterInfo3);

        characterBoxInner.appendChild(label4);
        characterBoxInner.appendChild(characterInfo4);

        characterBoxImage.appendChild(characterImg);


        characterBox.append(characterBoxInner);
        characterBox.append(characterBoxImage);
        $mainBox.append(characterBox);
    }
}
const loadCharacter = () =>{

    // const url = `${$url}`;
    
    if($mainBox.children.length == 0){
        axios.get($url)
        .then(res => createComponent(res));
    }else {
        $mainBox.textContent ='';
        axios.get($url)
            .then(res => createComponent(res));
    }

}


const queryAPI = () =>{
    
    const characterName = $searchInput.value;
    const url = `${$url}?name=${characterName}`;

    
    axios.get(url)
        .then(res => {
        
            $mainBox.textContent = '';
            createComponent(res);
           console.log('to działą' ); 
        }) 
        .catch(err => {
           console.error(err)
           alert('Nie znaleziono :(');
        });
}







const setGrid = () => {

    if (!$mainBox.classList.contains('main-box--grid-style')) {
        $mainBox.classList.add('main-box--grid-style')
    }
}

const setList = () => {
    if($mainBox.classList.contains('main-box--grid-style')){
        $mainBox.classList.remove('main-box--grid-style');
    }
}

//Pobranie elementow i nadanie nasłuchania kiedy DOM sie załaduje
document.addEventListener('DOMContentLoaded', main);