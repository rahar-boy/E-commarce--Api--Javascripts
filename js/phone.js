const loadPhons = async ( surchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${surchText}`);
    const data = await res.json();
    const phones = data.data; 
    // console.log(phones);
    dispiayPhone(phones, isShowAll);

}




const dispiayPhone = (phones, isShowAll) => {
    // console.log (phones);

    const phoneContiner = document.getElementById('phone-continer');
    // clear data 
    phoneContiner.textContent= '';
    
    // display show all butten if there are more 12 phons 
    const showAllContainer = document.getElementById('Show-all-continer');
    if (phones.length > 12 && !isShowAll) { // Correct spelling of "length"
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    console.log('is show all', isShowAll)
    // display only 12 item show 
    if(!isShowAll){
        phones = phones.slice(0,12);
    }


    phones.forEach(phones =>{
        console.log (phones);
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl';
        phoneCard.innerHTML = `
        <figure>
            <img src="${phones.image}"alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phones.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick=" handaleShowDetils('${phones.slug}') " class="btn btn-primary">Detils</button>
            </div>
        </div>
        `;
        phoneContiner.appendChild(phoneCard);
    });
    // loading height 
    toggleLadingSpeaner(false);
}
loadPhons(); 


// click show detils 
const handaleShowDetils = async(id) =>{
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetels(phone);
}


const showPhoneDetels = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detels-phone-name');
    phoneName.innerHTML = phone.name;


    const showDetalsContainer = document.getElementById('show-detels-container');
    showDetalsContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span>${phone.mainFeatures.storage}</p>
        <p><span>Display size:</span>${phone.mainFeatures.displaySize}</p>
    `

    show_detils_modal.showModal();
}


// surch 
const handklerSurch = (isShowAll) =>{
    toggleLadingSpeaner(true);
    const surchFild = document.getElementById('surch-Fild');
    const surchText = surchFild.value;
    console.log(surchText);
    loadPhons(surchText, isShowAll);
}

const toggleLadingSpeaner = (isLoading) => {
    const loddingSpeaner = document.getElementById('loading-spnner');
    if(isLoading){
        loddingSpeaner.classList.remove('hidden')
    }
    else{
        loddingSpeaner.classList.add('hidden')
    }
}

// show all 
const handaleShowAll = () =>{
    handklerSurch(true);
}