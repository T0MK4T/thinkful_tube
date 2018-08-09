const  YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getData(searchTerm, callback){
    const query = {
        part: 'snippet',
        q : searchTerm,
        key: APIkey,
        maxResults: 25
    }
    $.getJSON(YOUTUBE_SEARCH_URL,query,callback);
}
function renderResult(result){
    let datePublished = Date.now() - result.snippet.publishedAt;
    return `
        <div class = 'js-search-result'>
                            <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
                                <img src= ${result.snippet.thumbnails.high.url} alt="name of video">
                                <div class="video-details">
                                    <h3>${result.snippet.title}</h3>
                                    <ul>
                                        <li>${result.snippet.channelTitle}</li>
                                        <li>40K? views</li>
                                        <li>${result.snippet.publishedAt}</li>
                                    </ul>
                                    <p class="video-description">
                                        ${result.snippet.description}
                                    </p>
                                </div>
                            </a>
                        </div>  
                <div>
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