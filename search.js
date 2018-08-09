const  YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getData(searchTerm, callback){
    const query = {
        part: `${searchTerm} in: name`,
        key: APIkey,
        maxResults: 50
    }
    $.getJSON(YOUTUBE_SEARCH_URL,query,callback);
}
function renderResult(results){
    return `
        <div>
            <h2>
            <a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a>
            </h2>
        </div>
    `
}

function displaySearchData(data){
    const results = data.items.map((item, index) => renderResult(item));
    $('.results').html(results);
}

function watchSubmit(){
    $('#search-form').submit(function(event){
       event.preventDefault();
       const queryTarget = $(event.currentTarget).find('.search-bar');
       const query = queryTarget.val();
       queryTarget.val("");
       getData(query, displaySearchData);
    });
}

$(watchSubmit);