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
            dropdown.style.display = "none";
        }
    }
}

function toggleSearchArea()
{
    let searchArea = document.getElementById("search-area");
    if (searchArea.classList.contains("display-sm-none")) {
        searchArea.classList.remove("display-sm-none");
    } else {
        searchArea.classList.add("display-sm-none");
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
                    child.style.display = "inline-block";
                } else {
                    child.style.display = "none";
                }
            }
        }
    }
}

/**
 *  Updates DOM with the fetched user data
 * 
 * @param {Object} data 
 */
function updateDOMWithProfileData(data)
{
    // update repositories count components
    let respositoryCountBadges = document.getElementsByClassName('repositories-count')
    for (let i = 0; i < respositoryCountBadges.length; i++) {
        respositoryCountBadges[i].innerHTML = data.user.repositories.totalCount;
    }
}

/**
 * Gets the user data from Github GraphQL API
 * 
 * @return {Promise} 
 */
function getProfileData()
{
    let url = 'https://api.github.com/graphql';
    let token = '7f2a3f84fa56e87eb66f5c2df1c3ea4ceeb4642f';
    let headers = new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-type': 'application/json',
    })
    let body = '{ "query": "query { user(login:\\\"the-fanan\\\") { name url login bio avatarUrl followers { totalCount } following { totalCount } location email twitterUsername websiteUrl starredRepositories { totalCount } status { id emoji } repositories(first: 20, orderBy: {field:NAME, direction:ASC}) { totalCount nodes { name url isPrivate forkCount stargazerCount primaryLanguage { id name color } owner { login } defaultBranchRef { name } } } } }" }';

    let result = new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body,
            headers,
        })
        .then((response) => response.json())
        .then(function(data) {
            resolve(data)
        })
        .catch(function(error){
            reject(error);
        })
    })

    return result;
}

window.addEventListener('load', function () {
    document.querySelectorAll('.dropdown-toggler').forEach(item => {
        item.addEventListener('click', event => {
            toggleDropdown(event);
        })
    })
    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains("dropdown")) {
            hideDropdown();
        }
    })

    getProfileData()
    .then(data => {
        updateDOMWithProfileData(data.data)
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
})