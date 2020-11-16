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

window.addEventListener('load', function () {
   
})