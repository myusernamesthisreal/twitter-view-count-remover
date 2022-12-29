import { printLine } from './modules/print';
import { removeViews } from './modules/pageScript';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

(async () => {
    const { globalEnable } = await chrome.storage.sync.get(['globalEnable']);
    const { usernames } = await chrome.storage.sync.get(['usernames']);
    const { moveViews } = await chrome.storage.sync.get(['moveViews']);
    const observer = new MutationObserver(() => {
        globalEnable && removeViews(usernames, moveViews);
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();






// const s = document.createElement('script');
// s.src = chrome.runtime.getURL('js/Content/Content.js');
// s.onload = function() {
//     this.remove();
// };

// (document.head || document.documentElement).appendChild(s);
