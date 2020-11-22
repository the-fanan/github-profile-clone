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
    let navBar = document.getElementById("main-nav")
    if (searchArea.classList.contains("display-sm-none")) {
        searchArea.classList.remove("display-sm-none");
        navBar.classList.add("show-search-area");
    } else {
        searchArea.classList.add("display-sm-none");
        navBar.classList.remove("show-search-area");
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
 * Converts date in UTC string format to a human difference format (2020-04-23T06:44:00Z)
 * @param {String} dateString 
 * 
 * @return {String}
 */
function generateHumanDate(dateString)
{
    let today = new Date();
    let date = new Date(dateString);
    let diffSeconds = (today.getTime() - date.getTime()) / (1000);
    if (diffSeconds < 60) {
        return " a few seconds ago";
    }

    let diffMinutes = Math.round((today.getTime() - date.getTime()) / (1000 * 60));
    if (diffMinutes === 1) {
        return diffMinutes + " minute ago";
    }
    if (diffMinutes < 60) {
        return diffMinutes + " minutes ago";
    }

    let diffHours = Math.round((today.getTime() - date.getTime()) / (1000 * 3600));
    if (diffHours === 1) {
        return diffHours + " hour ago";
    }
    if (diffHours <= 24) {
        return diffHours + " hours ago";
    }

    let diffDays = Math.round((today.getTime() - date.getTime()) / (1000 * 3600 * 24));
    if (diffDays === 1) {
        return diffDays + " day ago";
    }
    if (diffDays <= 8) {
        return diffDays + " days ago";
    }

    if (diffDays < 365) {
        return "on " + date.toLocaleString('default', { month: 'short' }) + " " + date.getDay();
    }

    let diffYears = Math.round((today.getTime() - date.getTime()) / (1000 * 3600 * 24 * 365));
    if (diffYears === 1) {
        return diffYears + " year ago";
    }

    return diffYears + " years ago";
}

/**
 * Generates an SVG element with specified path d
 * 
 * @param {String} pathString 
 * @param {Object} options 
 * 
 * @return {Element}
 */
function generateSvgWithPath(pathString, options = {}) 
{
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute("viewBox", options.viewBox ? options.viewBox : "0 0 16 16");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("width", options.width ? options.width : "16");
    svg.setAttribute("height", options.height ? options.height : "16");
    svg.setAttribute("aria-hidden", "true");

    let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute("d", pathString);
    svg.appendChild(path);
    return svg;
}

/**
 * Generates the HTML element for a repository
 * 
 * @param {Object} repository 
 * 
 * @return {Element}
 */
function generateRepositoryMarkup(repository)
{
    let starButton = null;
    if (repository.viewerHasStarred) {
        starButton = document.createElement('button');
        starButton.classList.add('button');
        starButton.appendChild(generateSvgWithPath("M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"));
        let t = document.createTextNode('Unstar');
        starButton.appendChild(t)
    } else {
        starButton = document.createElement('button');
        starButton.classList.add('button');
        starButton.appendChild(generateSvgWithPath("M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"));
        let t = document.createTextNode('Star');
        starButton.appendChild(t)
    }

    let dateInfo = document.createElement('span');
    dateInfo.classList.add('info-item')
    dateInfo.innerHTML = 'Updated ' + generateHumanDate(repository.updatedAt);

    let languageInfo = null

    if (repository.primaryLanguage != null) {
        languageInfo = document.createElement('span');
        languageInfo.classList.add('info-item');

        let languageColor = document.createElement('span');
        languageColor.classList.add('language-color');
        languageColor.style.backgroundColor = repository.primaryLanguage.color;

        languageInfo.appendChild(languageColor);

        let t = document.createTextNode(repository.primaryLanguage.name);
        languageInfo.appendChild(t)
    }

    let starGazersInfo = null;
    if (repository.stargazerCount > 0) {
        starGazersInfo = document.createElement('span');
        starGazersInfo.classList.add('info-item');

        let anchor = document.createElement('a');
        anchor.href = repository.url + '/stargazers';
        anchor.appendChild(generateSvgWithPath("M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"));
        let t = document.createTextNode(repository.stargazerCount);
        anchor.appendChild(t);
        starGazersInfo.appendChild(anchor)
    }

    let forkCountInfo = '';
    if (repository.forkCount > 0) {
        forkCountInfo = document.createElement('span');
        forkCountInfo.classList.add('info-item');

        let anchor = document.createElement('a')
        anchor.href = repository.url + '/network/members';
        anchor.appendChild(generateSvgWithPath("M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"));
        let t = document.createTextNode(repository.forkCount);
        anchor.appendChild(t);
        forkCountInfo.appendChild(anchor)
    }

    let licenseInfo = '';
    if (repository.licenseInfo != null) {
        licenseInfo = document.createElement('span');
        licenseInfo.classList.add('info-item');

        licenseInfo.appendChild(generateSvgWithPath("M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"));
        let t = document.createTextNode(repository.licenseInfo.name);
        licenseInfo.appendChild(t);
    }

    let repositoryMain = document.createElement('div');
    repositoryMain.classList.add('repository-main');
    repositoryMain.classList.add('padding-vertical-md');

    let left = document.createElement('div');
    left.classList.add('width-75');

    let right = document.createElement('div');
    right.classList.add('width-25');
    right.classList.add('star-button-holder');
    right.appendChild(starButton);

    let headingAnchor = document.createElement('a');
    headingAnchor.href = repository.url;
    let t = document.createTextNode(repository.name);
    headingAnchor.appendChild(t);
    let heading = document.createElement('h3');
    heading.appendChild(headingAnchor);
    left.appendChild(heading);

    let description = document.createElement('p');
    description.classList.add('description');
    t = document.createTextNode(repository.description);
    description.append(t);
    left.appendChild(description);

    let info = document.createElement('div')
    info.classList.add("info");
    if (languageInfo) {
        info.appendChild(languageInfo);
    }
    if (starGazersInfo) {
        info.appendChild(starGazersInfo);
    }
    if (forkCountInfo) {
        info.appendChild(forkCountInfo);
    }
    if (licenseInfo) {
        info.appendChild(licenseInfo);
    }
    if (dateInfo) {
        info.appendChild(dateInfo);
    }
    left.appendChild(info);

    repositoryMain.appendChild(left);
    repositoryMain.appendChild(right);
   /*  let markup = '\
    <div class="repository-main padding-vertical-md">\
        <div class="width-75">\
            <h3><a href="' + repository.url + '">' + repository.name + '</a></h3>\
            <p class="description">' + repository.description + '</p>\
            <div class="info">' +
            languageInfo +

            starGazersInfo +

            forkCountInfo +

            licenseInfo +

            dateInfo +
            '</div>\
        </div>\
        <div class="width-25 star-button-holder">' +
            starButton +
        '</div>\
    </div>\
    ';*/

    return repositoryMain;
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
    //populate the repositories list element with repositories
    let repositoriesList = document.getElementById("repositories-list");
    let repositories = data.user.repositories.nodes;
    for (let i = 0; i < data.user.repositories.totalCount; i++) {
        let repository = repositories[i];
        if (repository == undefined) {
            continue;
        }
        repositoriesList.append(generateRepositoryMarkup(repository));
    }
}

getProfileData()
    .then(data => {
        updateDOMWithProfileData(data.data)
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })

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
    let body = '{ "query": "query { user(login:\\\"the-fanan\\\") { name url login bio avatarUrl followers { totalCount } following { totalCount } location email twitterUsername websiteUrl starredRepositories { totalCount } status { id emoji } repositories(first: 20, orderBy: {field:UPDATED_AT, direction:DESC}) { totalCount nodes { updatedAt licenseInfo { name } viewerHasStarred description name url isPrivate forkCount stargazerCount primaryLanguage { id name color } owner { login } defaultBranchRef { name } } } } }" }';

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
})