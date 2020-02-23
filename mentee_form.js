$(document).ready(function () {
    $("#submit").on('click', function () {
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#num").val();
        var interest = $('input[name="exp"].checked').val();
        $.ajax({
            type: "POST",
            url: "localhost:8080/mentors",
            data: {
                name: name,
                email: email,
                phone: phone,
                interest: interest
            },
            success: function(result) {
                console.log(result);
            }
        });
    });
});
