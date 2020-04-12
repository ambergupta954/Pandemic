function ConvertFormToJSON(form){
    var array = $(form).serializeArray();
    var json = {};
    
    $.each(array, function() {
        json[this.name] = this.value || '';
    });
    
    return json;
}

console.log("test");

jQuery(document).ready(function() {


    console.log("Ready");
    $('form#createData').bind('submit', function(event){
        event.preventDefault();
        
        var form = this;
        var json = ConvertFormToJSON(form);
        var tbody = $('#data > tbody');
        console.log(json);

        $.ajax({
            type: "POST",
            url: "https://mhjnqlztic.execute-api.ap-south-1.amazonaws.com/Prod/form/submit",
            data: JSON.stringify(json),
            dataType: "json",
            contentType:"text/plain"
        }).done(function() { 
           console.log("posted")
        }).fail(function() { 
            alert("Failed to add to-do"); 
        });

        return true;
    });
});