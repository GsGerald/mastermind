const menuButtons = querySelectorAll(".menu-button");
menuButtonsforEach(button => {
    button.addEventListener("click", () => {
        const action = button.getAttribute("data-action");
        if (action === "start") {
            console.log("Game started!");
        } else if (action === "settings") {
            console.log("Opening settings...")
        }
    });
});
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });
}
document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        if (action === "start") {
            showPage("difficultySelect");
        } else if (action === "settings") {
            alert("Setting page coming soon!");
        }
    });
});

document.querySelectorAll(".difficulty-button").forEach(button => {
    button.addEventListener("click", ()=> {
        const difficulty = button.dataset.difficulty;
        console.log("Selected difficulty:", difficulty);

        alert('Starting game on ${difficulty.toupperCase()} model');
    });
}
);