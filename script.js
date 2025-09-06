
const createElements=(arr)=>{
    const htmlElements=arr.map(el=>`<span class="btn">${el}</span>`);
    return htmlElements.join('');
};
const manageSpinner=(status)=>{
    if(status){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');

    }
    else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');
    }
}

const loadLessons=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(json=>displayLessons(json.data))
};

const removeActive=()=>{
    const lessonButtons=document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach(btn=>btn.classList.remove('active'));
}

const loadLevelWord=(id)=>{
    manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActive();
        const clickBtn=document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        diplayLevelWord(data.data);

    });
}
const diplayLevelWord=(words)=>{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";
    console.log(words);
    if(words.length==0){
        wordContainer.innerHTML=`
        <div class="text-center col-span-full space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    }
    words.forEach((element) => {
        const card=document.createElement('div');
        card.innerHTML=`
            <div class="bg-white rounded-xl shadow-sm space-y-4 text-center py-10 px-5">
            <h2 class="font-bold text-2xl">${element.word?element.word:"Word Was Not Found"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${element.meaning?element.meaning:"Word Was Not Found"} / ${element.pronunciation?element.pronunciation:"Word Was Not Found"}"</div>
            <div class="flex justify-between items-center ">
                <button onclick="loadWordDetails(${element.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.appendChild(card);
    });
    manageSpinner(false);
}

const displayLessons=(lessons)=>{
    const levelContainer=document.getElementById("level-container");
    levelContainer.innerHTML="";
    for(let lesson of lessons){
        const btnDiv=document.createElement('div');
        btnDiv.innerHTML=`
        <button id="lesson-btn-${lesson.level_no}"  onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;
        levelContainer.appendChild(btnDiv);

    }
}

const loadWordDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    const res=await fetch(url);
    const details= await res.json();
    displayWordDetails(details.data);

}

// word: 'Cautious', meaning: 'সতর্ক', pronunciation: 'কশাস', level: 2, sentence: 'Be cautious while crossing the road.', …}
// id
// : 
// 3
// level
// : 
// 2
// meaning
// : 
// "সতর্ক"
// partsOfSpeech
// : 
// "adjective"
// points
// : 
// 2
// pronunciation
// : 
// "কশাস"
// sentence
// : 
// "Be cautious while crossing the road."
// synonyms
// : 
// (3) ['careful', 'alert', 'watchful']
// word
// : 
// "Cautious"

const displayWordDetails=(word)=>{
    console.log(word);
    const detailsBox=document.getElementById("details-container");
    detailsBox.innerHTML=`
    
    <div>
        <h2 class="text-2xl font-bold ">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>

    </div>
    <div>
        <h2 class=" font-bold ">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
    </div>
    <div>
        <h2 class=" font-bold ">Example</h2>
        <p class="font-bangla">${word.sentence}</p>
    </div>
    <div>
        <h2 class=" font-bold ">Synonyms</h2>
        <div>
        ${createElements(word.synonyms)}
        </div>
        
        
    </div>
   
    `;
    document.getElementById("word_modal").showModal();
}

loadLessons();