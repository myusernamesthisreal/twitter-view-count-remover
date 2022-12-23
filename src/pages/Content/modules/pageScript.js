export const removeViews = () => {
    // Timeline views that are not from twitter circles
    document.querySelectorAll('a').forEach((link) => {
        if (link.ariaLabel?.includes("View Tweet analytics")) {
            link.parentElement.remove();
        }
    });

    // Timeline views (Twitter circle posts)
    document.querySelectorAll('div').forEach((div) => {
        if (div.ariaLabel?.includes("View Tweet analytics") && div.role === "button") {
            div.parentElement.remove();
        }
    });
}
