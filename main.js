let $box = document.querySelector("#box");
let $form = document.getElementById("form");
let $btnModal = document.getElementById("btn_modal");
let $asideBtn = document.getElementById("aside_btn");
let $asideList = document.getElementById("aside_list");
let $modal = document.getElementById("modal");
let $aside = document.getElementById("aside_list");
let $heard = document.getElementById("heard");


async function fechData() {
    try {
        const fetchUrl = await fetch('https://63a3312e471b38b20608adc5.mockapi.io/ExampPakemon')
        const urlJson = await fetchUrl.json()

        return await urlJson
    } catch (error) {
        console.log(error.message);
    }
}

window.onload = async () => {
    renderFilms(await fechData(), $box);
    let ApiDada = await fechData()

    $form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let { search, genre, sort } = evt.target.elements

        let regex = new RegExp(search.value.trim(), "gi");

        let filteredApi = ApiDada.filter((item) => item.name.match(regex));

        let genreFilteredFilms = []
        if (genre.value === "all") {
            genreFilteredFilms = filteredApi
        } else {
            genreFilteredFilms = filteredApi.filter(element => element.type.includes(genre.value))
            console.log(genre.value);
        }

        if (sort.value === "a-z") {
            genreFilteredFilms.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        } else {
            genreFilteredFilms.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1)
        }
        renderFilms(genreFilteredFilms, $box)
    });
}

$btnModal.addEventListener('click', () => {
    $modal.style.transform = 'translateX(0%)'
})
$asideBtn.addEventListener('click', () => {
    $modal.style.transform = 'translateX(150%)'
})

async function renderFilms(array, element) {
    element.innerHTML = null;
    let newLi = "";

    await array.forEach((item) => {
        newLi += `
        <li class="card">
        <img class="card_img" src='${item.images}' alt="sjhas" >
        <ul class="card_text">
             <li class="name_check">
                <h2>${item.name}</h2>
                <button class="heard" id="heardlike" onclick="likeClick(${item.id})"> &#x2764;</button>
             </li>
             <li>${item.type}</li>
             <li class="nums">
                 <strong>${item.kg} kg</strong>
                 <strong>${item.age} age</strong>
             </li>
             </ul> 
        </li>
        `;
    });
    element.innerHTML += newLi;
}

async function likeClick(id) {
    let fech = await fechData()
    let logFech =  fech.filter(element => element.id.includes(id))
    let localSet = localStorage.setItem("users", JSON.stringify(logFech))
    let localGet = JSON.parse(localStorage.getItem("users"))
    console.log(localGet);

    let asideLI = "";
    await localGet.forEach((item) => {
        asideLI += `
        <li class="card">
        <img class="card_img" src='${item.images}' alt="sjhas" >
        <ul class="card_text">
             <li class="name_check">
                <h2>${item.name}</h2>
                <button class="heard" id="heardlike" onclick="likeClick(${item.id})"> &#x2764;</button>
             </li>
             <li>${item.type}</li>
             <li class="nums">
                 <strong>${item.kg} kg</strong>
                 <strong>${item.age} age</strong>
             </li>
             </ul> 
        </li>
        `;
    });

    $asideList.innerHTML += asideLI;
}

// likeClick(id)












































// const heart_icon = popup_container.querySelector('.heart-icon');

// const movie_ids = get_LS()
// for (let i = 0; i <= movie_ids.length; i++) {
//     if (movie_ids[i] == movie_id) heart_icon.classList.add('change-color')
// }

// heart_icon.addEventListener('click', () => {
//     if (heart_icon.classList.contains('change-color')) {
//         remove_LS(movie_id)
//         heart_icon.classList.remove('change-color')
//     } else {
//         add_to_LS(movie_id)
//         heart_icon.classList.add('change-color')
//     }
//     fetch_favorite_movies()
// })


// function get_LS() {
//     const movie_ids = JSON.parse(localStorage.getItem('movie-id'))
//     return movie_ids === null ? [] : movie_ids
// }
// function add_to_LS(id) {
//     const movie_ids = get_LS()
//     localStorage.setItem('movie-id', JSON.stringify([...movie_ids, id]))
// }
// function remove_LS(id) {
//     const movie_ids = get_LS()
//     localStorage.setItem('movie-id', JSON.stringify(movie_ids.filter(e => e !== id)))
// }


// fetch_favorite_movies()

// async function fetch_favorite_movies() {
//     main_grid.innerHTML = ''
//     const movies_LS = await get_LS()
//     const movies = []
//     for (let i = 0; i <= movies_LS.length - 1; i++) {
//         const movie_id = movies_LS[i]
//         let movie = await get_movie_by_id(movie_id)
//         add_favorites_to_dom_from_LS($aside)
//         movies.push(movie)
//     }
// }
// async function add_favorites_to_dom_from_LS(movie_data) {
//     main_grid.innerHTML += `
//    <div class="card" data-id="${movie_data.id}">
//    <div class="img">
//        <img src="${image_path + movie_data.poster_path}" alt="">
//    </div>
//    <div class="info">
//        <h2>${movie_data.original_title}</h2>
//        <div class="single-info">
//            <span>Rate:</span>
//            <span>${movie_data.vote_average} / 10</span>
//        </div>
//        <div class="single-info">
//            <span>Release Date:</span>
//            <span>${movie_data.release_date}</span>
//        </div>
//    </div>
// </div>
//    `

//     const cards = document.querySelectorAll(".card")
//     add_click_efect_to_card(cards)
// }