function loadData() {
var $nytHeaderElem = $('#nytimes-header');
var $nytElem = $('#nytimes-articles');
var cityStr = $('#city').val(); //city input
// clear out old data before new request
$nytElem.text("");
//NYT AJax request
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=4c3e33c2b2534f8c958d1c1e6084f75e';
       $.getJSON(nytimesUrl,function(data){
     $nytHeaderElem.text('New york Times articles about ' + cityStr);
     articles = data.response.docs;
console.log(articles);
//checks if articles are there or not and to handle if a ser puts a wierd query
if(articles.length===0 ){
  $nytHeaderElem.text(' articles are not there');
}
if(!$.trim(cityStr)) {
  $nytHeaderElem.text('please enter an input first');
}
else
     for(var i=0;i<articles.length;i++){

       var article = articles[i];
       $nytElem.append('<li class="article">'+
           				'<a href="'+article.web_url+'">'+article.headline.main+
           					'</a>'+
           				'<p>' + article.snippet + '</p>'+
           				'</li>');     };
                }).fail(function(e) {
              $nytHeaderElem.text('New york Times articles could not be loaded ');

});


return false; //important as you wont get the output without it

};
// $('#inputSection').submit(loadData); //calls the load data function
clickContainer = document.getElementById('nyt');
// clickContainer.addEventListener('submit', loadData);
clickContainer.addEventListener('click', loadData);
