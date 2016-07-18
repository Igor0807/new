(function () {
	var select = document.getElementById('quantity')
	var licenseSelect = document.getElementById('radioGroupLic')
	

    var xhr = new XMLHttpRequest();
    var dataPath = "data/formData.json";

	select.addEventListener("change", recalculateSummary)
	licenseSelect.addEventListener("change", handleLicenseChange)

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var formData = JSON.parse(xhr.responseText);
            renderLicensePlans(licenseSelect,formData.licenses);
            renderOptions(select, formData.quantities);
            recalculateSummary();
        }
    };
    xhr.open("GET", dataPath, true);
    xhr.send()

})()

function handleLicenseChange(e) {
    setSelectedPlan(e.target.id);
    recalculateSummary();
}


function renderOptions(context, options) {
    options.forEach( function(item) {
        renderOption(context, item)
    })
}

function renderLicensePlans( context, licenses ) {
    var appendPosition ="beforeend";
    licenses.forEach( function( license ) {
        context.insertAdjacentHTML(appendPosition, getRadioButtonHTML( license ) );
    }, this);

}

function renderOption(context, value) {
    var option = document.createElement("option");
    
    option.setAttribute("value", value);
    option.innerText = value;
    context.appendChild(option);
}

function setSelectedPlan(id) {
    var selectedPlan = document.getElementById('selectedPlan')
    selectedPlan.innerText = id;
}

function recalculateSummary() {
    var summaryPrice = document.getElementById('totalSum')
    var quantities = document.getElementById('quantity')
    var quantity =  quantities.options[quantities.selectedIndex].value;
    var price = document.querySelector('input[name="licensePrice"]:checked').value;

    summaryPrice.innerText = "$" + price*quantity; 
}


function getRadioButtonHTML( license ){
    var isDefault = null;
    
    if (license.isDefault) {
        isDefault = "checked";
        setSelectedPlan(license.id);
    }
    // var isDefault = license.isDefault ? "checked" : null;
    var result = '<input id="'+license.id+'" type="radio" '+ isDefault +' dataset-price="'+license.id+'" name="licensePrice" value="'+license.price+'"/>' +
            '<label for="'+license.id+'">' +
                '<i></i>Licence Plan #'+license.id+' <span> $'+license.price +' per license <\/span>' + 
            '</label>';
        
    return result;
};



















