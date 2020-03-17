$(function () {

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newB").val().trim(),
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("New Burger READY!");
            location.reload();
        });
    });

    $(".devour").on("click", function (event) {
        var id = $(this).data("id");
        var nowdevoured = $(this).data("nowdevoured");
        console.log("grabb true " + nowdevoured);
        var newDevouredStatus = {
            devoured: nowdevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredStatus
        }).then(function () {
            console.log("changed to: ", nowdevoured);
            location.reload();
        })
    })
});