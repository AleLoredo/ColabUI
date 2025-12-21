// inject.js
// This script runs in the page context (MAIN world) to access the 'monaco' global object.

(function () {
    const FT_FONT_SIZE = 18; // Desired font size
    const FT_LINE_HEIGHT = 28; // Optional: Adjust line height for better spacing

    // Function to apply font settings to all Monaco editors
    function applyMonacoSettings(enable) {
        if (typeof monaco === 'undefined' || !monaco.editor) {
            // Monaco might not be loaded yet or not available globally on some views
            // Try finding editors via DOM if global is missing, though usually 'monaco' is global in Colab
            console.log("ColabUI: Monaco global object not found.");
            return;
        }

        const editors = monaco.editor.getEditors();

        editors.forEach(editor => {
            if (enable) {
                // Store original options if needed, but for now just applying overrides
                editor.updateOptions({
                    fontSize: FT_FONT_SIZE,
                    // lineHeight: FT_LINE_HEIGHT, // Uncomment if line height needs adjustment
                    suggestFontSize: FT_FONT_SIZE, // autocomplete font size
                });
            } else {
                // Reset to default (Colab usually uses 14px or 12px)
                // We might need to guess or store original. 
                // Colab default is typically around 14px.
                editor.updateOptions({
                    fontSize: 14,
                    suggestFontSize: 14
                });
            }
        });
    }

    // Listen for messages from content.js
    window.addEventListener('message', function (event) {
        // We only accept messages from ourselves
        if (event.source !== window) return;

        if (event.data.type && (event.data.type === 'FROM_CONTENT_SCRIPT')) {
            if (event.data.action === 'SET_FONT_SIZE') {
                applyMonacoSettings(event.data.enable);
            }
        }
    });

    console.log("ColabUI: Inject script loaded.");
})();
