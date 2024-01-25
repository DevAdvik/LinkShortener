let singleZipLink = `
<div class="singleZipLink" id="singleZipLink_#id#">
    <div class="leftCheck">
        <input class="input-box" id="ziplink_#id#" type="checkbox" />
        <label class="customCheckBox" for="ziplink_#id#"><span>
                <svg width="12px" height="10px" viewbox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg></span>
        </label>
    </div>
    <div class="links">
        <p class="singleZlShort" title="Copy ZipLink!">https://link.advik.dev/#ziplink#</p>
        <p class="singleZlLong">#redirect_url#</p>
    </div>
    <div class="clicks">
        <p>Clicks:</p>
        <p class="clickCount">#click_count#</p>
    </div>
    <div class="dropdown-menu">
        <input class="dropdown-check" name="dropdown-name" type="radio" id="dropdown_#id#">
        <label for="dropdown_#id#">
            <i class="fa-solid fa-caret-down dropdown-icon"></i>
        </label>
        <div class="dropdown-options">
            <div class="singleRow">
                <p>Created on: <span class="author">#created_at#</span></p>
                <p>Click Count: <span class="clickCount">#click_count#</span></p>
            </div>
            <div class="singleRow">
                <p class="editZipLink zipEdit"><i class="fa-solid fa-pen-nib"></i> Edit ZipLink</p>
                <p class="editOriginalLink zipEdit"><i class="fa-solid fa-pen-to-square"></i> Edit Original URL</p>
            </div>
            <div class="singleRow">
                <p class="deleteZipLink zipEdit"><i class="fa-solid fa-trash-can"></i> Delete ZipLink</p>
            </div>
        </div>
    </div>
</div>`

$(document).ready(async function () {
    // $(".lottieLoading").addClass('activeLottie');
    $.ajax({
        type: "POST",
        url: "/dashboard",
        success: function (response) {
            renderLinks(response);
        }
    });
});

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


function renderLinks(array) {
    $.each(array, function (idx, obj) {
        const newElem = singleZipLink.replaceAll("#id#", obj.id)
            .replace("#ziplink#", obj.ziplink)
            .replace("#redirect_url#", obj.redirect_url)
            .replace("#created_at#", (new Date(obj.created_at)).toLocaleDateString())
            .replaceAll("#click_count#", obj.count);
        $(newElem).insertBefore(".createNew");
    });
    attachHandlers();
    $(".lottieLoading").removeClass("activeLottie");
}

function attachHandlers() {
    $(".singleZlShort").click(function (e) { 
        navigator.clipboard.writeText(this.textContent)
    });
    
    $(".zipEdit").click(function (e) { 
        e.preventDefault();
        console.log(this);
        console.log($(this).closest(".singleZipLink"));
    });
    $(".dropdown-check").click (function (e) {
        if ($(this).is(":checked")) {
            console.log("Checked!");
            $(this).prop("checked", false);
        }
    })
}