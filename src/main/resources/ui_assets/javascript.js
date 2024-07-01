$(document).ready(function() {
    console.log("ready!");

    var button = $("#submit_button");
    var searchBox = $("#search_text");
    var resultsTable = $("#results table tbody");
    var resultsWrapper = $("#results");
    var processingTimeSpan = $("#processing_time");
    var nValueSpan = $("#n_value");

    button.on("click", function() {
        $.ajax({
            method: "POST",
            contentType: "application/json",
            data: createRequest(),
            url: "procesar_datos",
            dataType: "json",
            success: onHttpResponse
        });
    });

    function createRequest() {
        var searchQueryTmp = searchBox.val();
        var frontEndRequest = {
            searchQuery: searchQueryTmp
        };

        return JSON.stringify(frontEndRequest);
    }

    function onHttpResponse(data, status) {
        if (status === "success") {
            console.log(data);
            addResults(data);
        } else {
            alert("Error al conectarse al servidor: " + status);
        }
    }

    function addResults(data) {
        resultsTable.empty();
        var results = data.results;
        var totalProcessingTime = data.totalProcessingTime;
        var nValue = data.n;

        processingTimeSpan.text(totalProcessingTime);
        nValueSpan.text(nValue);

        resultsWrapper.show();
        
        results.forEach(function(result) {
            var phrase = result.phrase.toUpperCase();
            var documents = result.documents.map(function(doc) {
                return doc.toUpperCase();
            }).join("<br>");
            
            resultsTable.append("<tr><td>" + phrase + "</td><td>" + documents + "</td></tr>");
        });
    }
});
