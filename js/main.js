const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//Search states.json and filter it
const searchStates = async searchtext => {
    const res = await fetch('../data/in.json');
    const states = await res.json();
    
    //Get Matches to current text input
    let matches = states.filter(state=>{
        const regex = new RegExp(`^${searchtext}`, 'gi');
        return state.city.match(regex);
    });
    if(searchtext.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    
    outputhtml(matches);
};

//Show results in HTML
const outputhtml = matches => {
    if(matches.length === 0) {
        matchList.innerHTML = '<div class = "text-danger"> Oops! No Match Found </div>'
    }
    if(matches.length > 0) {
        const html = matches.map(
            match => `
            <div class = "card card-body-mb-1">
            <h4> ${match.city}  <span
            class="text-primary"> ${
                match.admin_name
            }
                </span></h4>
                <h5 class= "text-warning">Population: ${match.population} </h5>
                <small>Lat: ${match.lat} /Long: ${match.lng}</small>
                </div>
            `
        )
        .join('');
   
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchStates(search.value));