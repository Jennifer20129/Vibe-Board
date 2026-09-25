// ==============================
// DATA PER DATE RANGE
// ==============================

const dataByRange = {
    7: {
        followers: 24680, followersChange: 12.5,
        likes: 18420, likesChange: 8.4,
        comments: 3842, commentsChange: 5.7,
        views: 42910, viewsChange: -2.1,
        chart: [45, 58, 50, 68, 62, 78, 90],
        chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    30: {
        followers: 26120, followersChange: 18.2,
        likes: 21340, likesChange: 14.1,
        comments: 4590, commentsChange: 9.8,
        views: 39880, viewsChange: -4.3,
        chart: [30, 42, 55, 48, 60, 72, 65, 80, 88, 95],
        chartLabels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10"]
    },
    90: {
        followers: 29900, followersChange: 27.6,
        likes: 24980, likesChange: 19.3,
        comments: 5210, commentsChange: 12.4,
        views: 44120, viewsChange: 1.8,
        chart: [25, 35, 48, 40, 55, 62, 58, 70, 78, 85, 92, 100],
        chartLabels: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"]
    }
};

const posts = [
    { emoji: "📸", title: "Weekend lifestyle dump", date: "2 days ago", likes: 4820, comments: 342 },
    { emoji: "🎥", title: "A day in my life", date: "4 days ago", likes: 3960, comments: 280 },
    { emoji: "✨", title: "Things I learned this month", date: "6 days ago", likes: 2910, comments: 194 },
    { emoji: "💻", title: "My coding journey", date: "1 week ago", likes: 2480, comments: 156 }
];

// ==============================
// ELEMENTS
// ==============================

const el = id => document.getElementById(id);
const themeButton = el("themeButton");
const dateFilter = el("dateFilter");
const postsContainer = el("postsContainer");
const chartBars = el("chartBars");

// ==============================
// RENDER STATS + CHART
// ==============================

function renderChangeText(node, value, invert = false) {
    const positive = invert ? value < 0 : value >= 0;
    node.className = positive ? "positive" : "negative";
    const arrow = value >= 0 ? "↑" : "↓";
    node.innerHTML = `${arrow} ${Math.abs(value)}% <span>vs last period</span>`;
}

function renderDashboard(range) {
    const data = dataByRange[range];

    el("followers").textContent = data.followers.toLocaleString();
    el("likes").textContent = data.likes.toLocaleString();
    el("comments").textContent = data.comments.toLocaleString();
    el("views").textContent = data.views.toLocaleString();

    renderChangeText(el("followersChange"), data.followersChange);
    renderChangeText(el("likesChange"), data.likesChange);
    renderChangeText(el("commentsChange"), data.commentsChange);
    renderChangeText(el("viewsChange"), data.viewsChange, true);

    el("chartTotal").innerHTML = `${data.followers.toLocaleString()} <span class="growth" id="chartGrowth">+${data.followersChange}%</span>`;

    chartBars.innerHTML = "";
    data.chart.forEach((height, i) => {
        const wrapper = document.createElement("div");
        wrapper.className = "bar-wrapper";
        wrapper.innerHTML = `<div class="bar" style="height:${height}%"></div><span>${data.chartLabels[i]}</span>`;
        chartBars.appendChild(wrapper);
    });
}

// ==============================
// POSTS
// ==============================

function displayPosts() {
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <div class="post-left">
                <div class="post-image">${post.emoji}</div>
                <div>
                    <p class="post-title">${post.title}</p>
                    <p class="post-date">${post.date}</p>
                </div>
            </div>
            <div class="post-stats">
                <span>❤️ ${post.likes.toLocaleString()}</span>
                <span>💬 ${post.comments}</span>
            </div>`;
        postsContainer.appendChild(postElement);
    });
}

// ==============================
// DARK MODE
// ==============================

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

themeButton.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeButton.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// ==============================
// DATE FILTER (now functional)
// ==============================

dateFilter.addEventListener("change", () => {
    renderDashboard(dateFilter.value);
});

// ==============================
// NAVIGATION
// ==============================

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        document.querySelectorAll("nav a").forEach(item => item.classList.remove("active"));
        link.classList.add("active");
    });
});

// ==============================
// INIT
// ==============================

renderDashboard(dateFilter.value);
displayPosts();