function updateBaseurl() {
    $("form").each((i, elem) => {
        elem = $(elem);
        elem.attr("action", "https://" + localStorage.getItem("baseurl") + elem.attr("data-action"));
    });   
}

$(".config").on("change", (e) => {
    localStorage.setItem(e.target.id, e.target.value);
    console.log(e.target.id)

    if (e.target.id == "baseurl") {
        updateBaseurl();
    }
});


$(".config").each((i, elem) => {
    elem.value = localStorage.getItem(elem.id);
})


$("form input").on("keyup", (e) => {
    const form = $(e.target).parent("form");

    let action = form.attr("action");
    action = action.substring(0, action.lastIndexOf("/") + 1) + e.target.value;

    form.attr("action", action);
    form.children("h2").text(form.attr("method") + " " + action)
});

$("form").on("submit", function(e) {
    e.preventDefault();
    target = $(e.target);

    $.ajax({
        type: target.attr("method"),
        url: target.attr("action"),
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("accesstoken").trim()
        }
    }).then((data) => {
        console.log(data)
        $("#result").jsonViewer(data);
    });
});

updateBaseurl();