export const removeViews = () => {

    // TEST DATA
    const whitelistedAccounts = ["MyUsernamesThis"];

    // Timeline views that are not from twitter circles
    document.querySelectorAll('a').forEach((link) => {
        if (link.ariaLabel?.includes("View Tweet analytics")) {
            const wlFilter = whitelistedAccounts.map(account => account.toLowerCase()).includes(link.href.split("/")[3].toLowerCase());
            if (!wlFilter)
                link.parentElement.remove();
        }
    });

    // Post views when opening a post
    document.querySelectorAll('span').forEach((span) => {
        if (span.textContent?.includes("View") && span.parentElement.tagName === "SPAN") {
            const shouldBeALink = span.parentElement.parentElement;
            if (shouldBeALink.tagName === "A") {
                const wlFilter = whitelistedAccounts.map(account => account.toLowerCase()).includes(shouldBeALink.href.split("/")[3].toLowerCase());
                if (!wlFilter)
                    span.parentElement.parentElement.parentElement.parentElement.remove();
                return;
            }
        }
    });

    // Timeline views (Twitter circle posts)
    document.querySelectorAll('div').forEach((div) => {
        if (div.ariaLabel?.includes("View Tweet analytics") && div.role === "button") {
            div.parentElement.remove();
        }
    });
}
