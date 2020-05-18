
const img = document.querySelector('.character');
const input = document.querySelector('.input');
const searchBtn = document.querySelector('.search-btn');
const name = document.querySelector('.name');
const nick = document.querySelector('.nick');
const job = document.querySelector('.occupation');
const birthday = document.querySelector('.born');
const status = document.querySelector('.status');
const actor = document.querySelector('.actor');

// console.log(img);
const url = 'https://www.breakingbadapi.com/api/characters?name=';

// fetch(url)
// .then(res => res.json())
// .then(res => console.log(res))
// .catch(err => console.log(err));


// searchBtn.addEventListener("click", function(){
//     const characterName = input.value;
//     const search = `${url}${characterName}`;  
//     fetch(search)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             name.innerText = data[0].name;
//             nick.innerHTML = data[0].nickname;
//             job.innerHTML = data[0].occupation;
//             birthday.innerHTML = data[0].birthday;
//             status.innerHTML = data[0].status;
//             actor.innerHTML = data[0].portrayed;
//             img.setAttribute('src', data[0].img)
//         })
//         .catch(err => console.log(err));
// })

const urll = 'https://api.spacexdata.com/v3/rockets';

// fetch(urll)
//     .then(res => res.json())
//     .then(res => console.log(res))
//     .catch(err => console.log(err));



axios.get(urll)
    .then(res=> console.log(res.data));

