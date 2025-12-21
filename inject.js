// inject.js
// This script runs in the page context (MAIN world) to access the 'monaco' global object.

(function () {
    const FT_FONT_SIZE = 18; // Desired font size
    const FT_LINE_HEIGHT = 28; // Optional: Adjust line height for better spacing

    let isOptimizationEnabled = false;

    // Function to apply font settings to a single editor instance
    function updateEditorStyle(editor, enable) {
        if (enable) {
            editor.updateOptions({
                fontSize: FT_FONT_SIZE,
                suggestFontSize: FT_FONT_SIZE,
            });
        } else {
            editor.updateOptions({
                fontSize: 14,
                suggestFontSize: 14
            });
        }
    }

    // Function to apply font settings to all Monaco editors
    function applyMonacoSettings(enable) {
        isOptimizationEnabled = enable;

        if (typeof monaco === 'undefined' || !monaco.editor) {
            // Monaco might not be loaded yet or not available globally on some views
            // Try finding editors via DOM if global is missing, though usually 'monaco' is global in Colab
            console.log("ColabUI: Monaco global object not found.");
            return;
        }

        const editors = monaco.editor.getEditors();
        editors.forEach(editor => updateEditorStyle(editor, enable));
    }

    // Initialize listener for new editors (dynamic cell creation)
    function initDynamicListener() {
        if (typeof monaco !== 'undefined' && monaco.editor && monaco.editor.onDidCreateEditor) {
            monaco.editor.onDidCreateEditor(editor => {
                if (isOptimizationEnabled) {
                    // Apply settings to the new editor
                    updateEditorStyle(editor, true);
                }
            });
        } else {
            // Retry if monaco isn't ready yet
            setTimeout(initDynamicListener, 1000);
        }
    }

    // Start listening immediately
    initDynamicListener();

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
