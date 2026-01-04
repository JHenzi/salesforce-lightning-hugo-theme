var searchElem = document.getElementById("search-input");
var posts;

function loadSearch() {
    // Call the index.json file from server by http get request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                if (data) {
                    posts = data.items; // Load json data
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    // Use absolute path to index.json from site root
    var basePath = '/';
    xhr.open("GET", basePath + "index.json");
    xhr.send();
}

// Load search data when page loads
if (document.getElementById("search-input")) {
    loadSearch();
}

function showSearchResults() {
    var query = searchElem.value || ""; // Get the value from input
    var searchString = query.replace(/[^\w\s]/gi, "").trim(); // Clear special characters and trim
    var target = document.getElementById("list"); // Target the ul list to render the results
    
    if (!posts || posts.length === 0) {
        target.innerHTML = "<li class='slds-text-body_regular slds-text-color_weak'>Loading search index...</li>";
        return;
    }
    
    var postsByTitle = posts.reduce((acc, curr) => {
        // Map lunr search index to your articles
        acc[curr.title] = curr;
        return acc;
    }, {});
    
    // Build lunr index file
    var index = lunr(function () {
        this.ref("title");
        this.field("title");
        this.field("content");
        posts.forEach(function (doc) {
            this.add(doc);
        }, this);
    });
    
    // Search in lunr index
    if (searchString && searchString != "") {
        try {
            var matches = index.search(searchString);
            var matchPosts = [];
            matches.forEach((m) => {
                if (postsByTitle[m.ref]) {
                    matchPosts.push(postsByTitle[m.ref]);
                }
            });
            
            if (matchPosts.length > 0) {
                // Match found with input text and lunr index
                target.innerHTML = matchPosts
                    .map(function (p) {
                        if (p != undefined) {
                            var dateStr = p.date || "";
                            var contentPreview = p.content ? p.content.substring(0, 150) + "..." : "";
                            return `<li class="slds-m-bottom_small">
                                <div class="slds-media">
                                    <div class="slds-media__body">
                                        <h3 class="slds-text-heading_small slds-m-bottom_xx-small">
                                            <a href="${p.url}" class="slds-text-link">${p.title}</a>
                                        </h3>
                                        ${dateStr ? `<p class="slds-text-body_small slds-text-color_weak slds-m-bottom_xx-small">${dateStr}</p>` : ""}
                                        ${contentPreview ? `<p class="slds-text-body_regular">${contentPreview}</p>` : ""}
                                    </div>
                                </div>
                            </li>`;
                        }
                    })
                    .join("");
            } else {
                // If no results found, then render a general message
                target.innerHTML = `<li class="slds-text-align_center slds-p-around_medium">
                    <p class="slds-text-heading_small slds-text-color_weak">No search results found</p>
                    <p class="slds-text-body_regular slds-text-color_weak slds-m-top_x-small">Try different keywords or check your spelling</p>
                </li>`;
            }
        } catch (e) {
            console.error("Search error:", e);
            target.innerHTML = `<li class="slds-text-align_center slds-p-around_medium">
                <p class="slds-text-heading_small slds-text-color_weak">Search error occurred</p>
            </li>`;
        }
    } else {
        target.innerHTML = "";
    }
}

