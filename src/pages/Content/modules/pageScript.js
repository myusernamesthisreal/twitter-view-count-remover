export const removeViews = () => {
    console.log("Removing views buttons...");
    let count = 0;
    let viewDivs = [];
    document.querySelectorAll('a').forEach((link) => {
        if (link.href.includes("/analytics") && link.ariaLabel.includes("View Tweet analytics")) {
            count++;
            viewDivs.push(link);
            link.parentElement.remove();
        }

    });

    console.log("There are this many views buttons:", count);
}
