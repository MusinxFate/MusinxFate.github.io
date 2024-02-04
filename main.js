
    document.getElementById('weather-searchid').addEventListener('click', function () {
        console.log('Weather search button clicked');
        var showSearch = document.querySelector('.header_search-box');
        document.querySelector('.header_search-box').style.display = 'none';
    });

    document.getElementById('search-back').addEventListener('click', function () {
        console.log('Search back button clicked');
        var hideSearch = document.querySelector('.header_search-box');
        hideSearch.style.display = 'none';
    });
 