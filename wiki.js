$(document).ready(function() {

    $("#inputSearch").click(function(event){
        event.preventDefault();

        getArticles();
        return false;
    });

    function getArticles() {
        var inputText = document.getElementById('inputText').value;

        $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            type: "GET",
            dataType: "jsonp",
            data: {
                action: "query",
                list: "allpages",
                apfrom: inputText,
                aplimit: 5,
                format: "json"
            },
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                $(data.query.allpages).each(function(index, item) {
                    var title = item.title;
                    var pageId = "http://en.wikipedia.org/?curid=" + item.pageid;

                    var newElement = document.createElement('div');
                    newElement.className = "json-each";

                    var aTag = document.createElement('a');
                    aTag.setAttribute('href', pageId);
                    aTag.innerText = title;

                    newElement.append(aTag);

                    $("#errorStatus").append($(newElement));
                });
            },
            error: function(data, error) {
                $('#errorStatus').html("Did not work: " + JSON.stringify(data));
            }
        });
    }
});