// General config
$(".config").on("change", (e) => {
    localStorage.setItem(e.target.id, e.target.value);
    console.log(e.target.id)
});
$(".config").each((i, elem) => {
    elem.value = localStorage.getItem(elem.id);
})


// Send requests
function displayRequestResponse(data, success=true) {
    $("#result").animate({
        "height": "600px",
    }).css(
        "border-color", success ? "green": "red"
    ).jsonViewer(data);
}
function onFormSubmit(formSelector, args) {
    $(formSelector).on("submit", (e) => {
        e.preventDefault();
        sendRequest(args);
    });
}
onFormSubmit("form#manual", {});



function sendRequest(args) {
    const method = args.method || $("#method").val();
    const baseurl = args.baseurl || $("#baseurl").val().trim();
    const endpoint = args.endpoint || $("#endpoint").val().trim();
    const param = args.param || $("#param").val().trim();
    const body = args.body || false;

    console.log(baseurl + endpoint + param)
        
    const requestOptions = {
        type: method,
        url: baseurl + endpoint + param,
        
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + $("#accesstoken").val()
        }
    };

    if (body) {
        requestOptions.body = body;
    }

    $.ajax(requestOptions).then((data) => {
        console.log(data)
        displayRequestResponse(data, success=true);
    }).catch((err) => {
        console.error(err);
        displayRequestResponse(err, false);
    });
}

