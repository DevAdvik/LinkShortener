const root = document.querySelector(":root");

let singleZipLink = `
<div class="singleZipLink unfocus" id="singleZipLink_#id#">
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
                <p class="zipEdit" data-action="edit"><i class="fa-solid fa-pen-nib"></i> Edit ZipLink</p>
                <p class="zipEdit" data-action="redirectChange"><i class="fa-solid fa-pen-to-square"></i> Edit Original URL</p>
            </div>
            <div class="singleRow">
                <p class="zipEdit" data-action="delete"><i class="fa-solid fa-trash-can"></i> Delete ZipLink</p>
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
    const dropdownHeight = document.querySelector(".dropdown-options").scrollHeight;
    root.style.setProperty("--dropdown-menu-height", `${dropdownHeight + 10}px`);
    $(".lottieLoading").removeClass("activeLottie");

}

function showInfoPopup(text) {
    $(".popupInfo").text(text);
    $(".popupInfo").css({ right: "10px" });
    setTimeout(() => { $(".popupInfo").css({ right: "-100%" }) }, 1500);
}


let currentChecked;
function attachHandlers() {
    // Turn off all previous event listeners so as to re-assign event listeners to everylink
    $(".singleZlShort").off("click");
    $(".zipEdit").off("click");
    $(".dropdown-check").off("click");

    $(".singleZlShort").click(function (e) {
        navigator.clipboard.writeText(this.textContent);
        showInfoPopup("Ziplink Copied!");
    });

    // Since I'm setting a margin bottom to display the dropdown, need to calculate the height of the dropdown
    $(window).on("resize", function (e) {
        const dropdownHeight = document.querySelector(".dropdown-options").scrollHeight;
        root.style.setProperty("--dropdown-menu-height", `${dropdownHeight + 10}px`);
    })

    $(".zipEdit").click(function (e) {
        e.preventDefault();
        const clickedId = $(this).closest(".singleZipLink")[0].attributes.id;
        handleZipEdit(clickedId, this.dataset.action);
    });

    $(".dropdown-check").click(function (e) {
        if (currentChecked === this) {
            $(this).prop("checked", false);
            currentChecked = '';
        } else {
            currentChecked = this;
        }
    })


}