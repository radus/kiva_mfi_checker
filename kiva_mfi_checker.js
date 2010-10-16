function requestListener(request, sender, sendResponse) {
    highlightMfis(document, request);
    sendResponse({});
}

function highlightMfis(doc, request) {
    var selected_mfis = request.selected_mfis;
    var page_type = request.page_type;
    if (page_type=="new") {
        alert("new");
        var all_rows = document.getElementsByTagName("div");
        for (var i = 0; i< all_rows.length; i++) {
            if (/biz_row_\d+/.test(all_rows[i].id)) {
                var listing = all_rows[i].childNodes[1];
                // mfi name should be a text node, in the span element at the end of the list
                // so, get the last child (<span>text</span>) and then its child - the text
                var mfi_span = listing.childNodes[listing.childNodes.length-1];
                var mfi_str = mfi_span.childNodes[0].data;
                mfi_str = mfi_str.substr("Funding via ".length); 
                if (selected_mfis.indexOf(mfi_str) != -1) {
                    mfi_span.className += " kiva-mfi-checker-blacklist";
                }
            }
        }
    } else {
        var all_rows = document.getElementsByTagName("tr");
        for (var i = 0; i< all_rows.length; i++) {
            var elem = all_rows[i];
            if (/biz_row_\d+/.test(elem.id)) {
                var mfi_name = elem.childNodes[7].childNodes[3].data;
                if (selected_mfis.indexOf(mfi_name) != -1) {
                    elem.childNodes[7].className += " kiva-mfi-checker-blacklist";
                }
            }
        }
    }

}

chrome.extension.onRequest.addListener(requestListener);
