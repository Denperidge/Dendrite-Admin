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

$("form").on("submit", function(e) {
    console.log("meow")

    e.preventDefault();
    target = $(e.target);

    console.log("meow")

    $.ajax({
        type: $("#method").val(),
        url: $("#baseurl").val().trim() + $("#endpoint").val().trim() + $("#arg").val().trim(),

        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + $("#accesstoken").val()
        }
    }).then((data) => {
        console.log(data)
        displayRequestResponse(data, success=true);
    }).catch((err) => {
        console.error(err);
        displayRequestResponse(err, false);
    });
});


function endpointSelect() {
    const target = $("#selectendpoint option:selected");

    console.log(target)
    const method = target.attr("data-method");
    const endpoint = target.attr("data-endpoint");
    const argname = target.attr("data-argname");
    const placeholder = target.attr("data-placeholder");

    $("#method").val(method);
    $("#endpoint").val(endpoint);
    $("#arglabel").text(argname);
    $("#arg").attr("placeholder", placeholder);
}

$("#selectendpoint").on("input", endpointSelect);
endpointSelect();
