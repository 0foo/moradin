export const URLutil = {
    openLocation: function(newPath, queryParams, openInNewTab = true) {
        /*
        // Example usage:
            const queryParams = {
            character_id: 1231245,
            another_param: 'value'
            };
            // If openInNewTab is not provided, it will default to true
            openInNewTabOrWindow('/edit.html', queryParams);
        */
        // Construct the full URL with query parameters
        const currentURL = new URL(window.location.href);
        currentURL.pathname = newPath;
        // Add query parameters to the URL
        for (const [key, value] of Object.entries(queryParams)) {
          currentURL.searchParams.set(key, value);
        }
        // Determine the target
        const target = openInNewTab ? '_blank' : '_self'; // '_blank' opens in a new tab, '_self' opens in the same tab/window
        // Open the URL in a new tab or the same tab/window
        const newWindow = window.open(currentURL.toString(), target);
        if (newWindow && openInNewTab) {
          newWindow.focus();
        }
      },
      getParameter(parameter_key){
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parameter_key);
      }
}