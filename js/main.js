"use strict";

function addSearchFocus() 
{
    let searchBox = document.getElementById("search-box");
    searchBox.classList.add("focused");
}

function removeSearchFocus()
{
    let searchBox = document.getElementById("search-box");
    searchBox.classList.remove("focused");
}

function toggleDropdown(elem)
{   
    for (let i = 0; i < elem.parentNode.childNodes.length; i++) {
        let child = elem.parentNode.childNodes[i];
        if (child.tagName !== undefined) {
            if (child.classList.contains("dropdown")) {
                if (child.style.display == "none" || child.style.display == "") {
                    child.style.display = "inline-block"
                } else {
                    child.style.display = "none"
                }
            }
        }
    }
}

window.addEventListener('load', function () {
   
})