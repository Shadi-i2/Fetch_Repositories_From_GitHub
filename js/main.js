// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.addEventListener("click", function () {
    getRepos();
});

// Get Repos Function
function getRepos() {
    if (theInput.value == "") {
        // If value Is Empty
        reposData.innerHTML = "<span>Please Write Githup Username !</span>";
    } else {
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
            .then((repos) => repos.json())
            .then((repos) => {
                // Empty The Container
                reposData.innerHTML = "";
                // Loop On repositories
                repos.forEach((repo) => {
                    // Main Div
                    let mainDiv = document.createElement("div");
                    mainDiv.className = "repo-box";
                    let repoName = document.createElement("span")
                    repoName.className = "name-repo"
                    let repoText = document.createTextNode(repo.name);
                    repoName.appendChild(repoText)
                    mainDiv.appendChild(repoName);
                    // visit URL repos
                    let theUrl = document.createElement("a");
                    theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                    theUrl.setAttribute("target", "_blank");
                    let textUrl = document.createTextNode("Visit");
                    theUrl.appendChild(textUrl);
                    mainDiv.appendChild(theUrl);
                    // stars Count
                    let starsSpan = document.createElement("span");
                    starsSpan.className = "stars"
                    let starsText = document.createTextNode(
                        `Stars ${repo.stargazers_count}`
                    );
                    starsSpan.appendChild(starsText);
                    mainDiv.appendChild(starsSpan);
                    // Append The Main Div to container
                    reposData.appendChild(mainDiv);
                });
            });
    }
}