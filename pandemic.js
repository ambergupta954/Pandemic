function ConvertFormToJSON(form){
    var array = jQuery(form).serializeArray();
    var json = {};
    
    jQuery.each(array, function() {
        json[this.name] = this.value || '';
    });
    
    return json;
}

jQuery(document).on('ready', function() {
    jQuery('form#createData').bind('submit', function(event){
        event.preventDefault();
        
        var form = this;
        var json = ConvertFormToJSON(form);
        var tbody = jQuery('#data > tbody');

        $.ajax({
            type: "POST",
            url: "https://mhjnqlztic.execute-api.ap-south-1.amazonaws.com/Prod/form/submit",
            data: json,
            dataType: "json"
        }).done(function() { 
           console.log("posted")
        }).fail(function() { 
            alert("Failed to add to-do"); 
        });

        return true;
    });
});