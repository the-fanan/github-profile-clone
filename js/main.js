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

function hideDropdown()
{
    let dropdowns = document.getElementsByClassName("dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
        let dropdown = dropdowns[i];
        if (dropdown.tagName !== undefined) {
            dropdown.style.display = "none"
        }
    }
}

function toggleDropdown(event)
{   
    event.stopPropagation()
    let parent = event.target.closest(".nav-item")
    for (let i = 0; i < parent.childNodes.length; i++) {
        let child = parent.childNodes[i];
        if (child.tagName !== undefined) {
            if (child.classList.contains("dropdown")) {
                if (child.style.display == "none" || child.style.display == "") {
                    //close other dropdowns
                    hideDropdown()
                    child.style.display = "inline-block"
                } else {
                    child.style.display = "none"
                }
            }
        }
    }
}

window.addEventListener('load', function () {
    document.querySelectorAll('.dropdown-toggler').forEach(item => {
        item.addEventListener('click', event => {
            toggleDropdown(event)
        })
    })
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains("dropdown")) {
            hideDropdown()
        }
    })
})