function runSketch(targetId) {
    const targetTextarea = document.getElementById(targetId);

    // Transpile & copy
    let s = myCodeMirror.getValue();
    targetTextarea.value = PiperToJS(s);

    // Remove old canvas...
    const canvasEl = document.getElementById("CAN");
    if (canvasEl !== null)
        canvasEl.remove();

    // Run the sketch
    eval(targetTextarea.value);

}

function load(txt) {
    const sourceTextarea = document.getElementById("editor");
    //sourceTextarea.value = txt;
    myCodeMirror.setValue(txt);
}

// Code to set up the editor windows
let parentId = document.getElementById("editor_host");
let myCodeMirror = CodeMirror(parentId, {
    value: "console.log('hello')",
    mode:  "javascript",
    indentUnit: 4,
    lineNumbers: true
});
myCodeMirror.setOption("extraKeys", {
    Tab: function(cm) {
        let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
        cm.replaceSelection(spaces);
    }
});
