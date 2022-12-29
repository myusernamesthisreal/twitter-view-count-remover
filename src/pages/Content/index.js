import { printLine } from './modules/print';
import { removeViews } from './modules/pageScript';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

(async () => {
    const { globalEnable } = await chrome.storage.sync.get(['globalEnable']);
    document.addEventListener('DOMNodeInserted', () => {
        globalEnable && removeViews();
    });
})();






// const s = document.createElement('script');
// s.src = chrome.runtime.getURL('js/Content/Content.js');
// s.onload = function() {
//     this.remove();
// };

// (document.head || document.documentElement).appendChild(s);
