$(".editBox").click(handleEditBox);

function handleZipEdit(id, action) {
    $(".editBox").css({ scale: 1, opacity: 1 });
    $(".unfocus").css({ pointerEvents: "none", userSelect: "none" });
    $(".editBox").data("action", action);
    $(".editBox").data("id", id);
    console.log(id);

    switch (action) {
        case "edit":
            $(".editBox > label").text("Edit ziplink:");
            const zipLink = $(`#${id.value} > .links > .singleZlShort`).text().match(/\w*$/)[0];
            $("#userEdit").val(zipLink);
            $(".editBox > .confirmChange").text("Save");
            $(".editBox > input").show();
            break;
        case "redirectChange":
            $(".editBox > label").text("Change the redirect URL: ");
            const originalUrl = $(`#${id.value} > .links > .singleZlLong`).text();
            $("#userEdit").val(originalUrl);
            $(".editBox > .confirmChange").text("Save");
            $(".editBox > input").show();
            break;
        case "delete":
            $(".editBox > label").text("Are you sure you want to delete this ZipLink?");
            $(".editBox > input").hide();
            $(".editBox > .confirmChange").text("Delete");
            break;
        default:
            break;
    }
    console.log(id);
}


function handleEditBox(ev) {
    if ($(ev.target).hasClass("cancel")) {
        $(".editBox").css({ scale: 0, opacity: 0 });
        $(".unfocus").css({ pointerEvents: "all", userSelect: "auto" });

    } else if ($(ev.target).hasClass("confirmChange")) {

        console.log($(".editBox").data("action"));
        console.log($(".editBox").data("id"));

        switch ($(".editBox").data("action")) {
            case "edit":
                const org_zipLink = $(`#${$(".editBox").data("id").value} > .links > .singleZlShort`).text().match(/\w*$/)[0];
                const editedZipLink = $("#userEdit").val()

                if (org_zipLink === editedZipLink) {
                    $(".editBox").css({ scale: 0, opacity: 0 });
                    $(".unfocus").css({ pointerEvents: "all", userSelect: "auto" });
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/edit",
                        data: { data: editedZipLink, action: $(".editBox").data("action"), id: $(".editBox").data("id").value.slice(14) },
                        success: function (response) {
                            console.log(response);
                        }
                    });
                }
                break;
            case "redirectChange":
                console.log("yes!");
                break;
            case "delete":
                break;
            default:
                break;
        }
    }

    if ($("#userEdit").val() == "") {
        console.log("ENTER!");
    }
}

function sendDataToServer(data, action) {

}
