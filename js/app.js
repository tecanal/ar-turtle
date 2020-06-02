window.onload = function() {
    // Create splitter panel
    $(".panel-left").resizable({
        handleSelector: ".splitter",
        resizeHeight: false
    });

    // Create CodeMirror editor
    var editor = CodeMirror(document.getElementById("editor"), {
        mode: "text/html",
        lineNumbers: true,
        value: document.getElementById("code_text").innerHTML.trim()
    });
        
    editor.setOption("mode", "javascript");
    editor.setOption("lint", true);
    
    var firstRun = true;
    
    document.getElementById("execute").addEventListener("click", execute);
    
    function execute() {
        // Get code from editor
        var code = 'var c = document.getElementById("turtle");\n' + editor.getValue();
        code += '\nvar $turtle=$("#turtleSprite");turtle.on("move",function(t){$turtle.css({left:(t.x - 10 + c.width / 2) +"px",top: (t.y + window.innerHeight / 2)+"px"})}),turtle.on("rotate",function(t){$turtle.css({"-webkit-transform":"rotate("+Math.round(t)+"deg)","-moz-transform":"rotate("+Math.round(t)+"deg)",transform:"rotate("+Math.round(t)+"deg)"})});';
                
         // Add code as a script to page + execute
        var script = document.createElement('script');
        try {
            // If its first time executing something
            if (firstRun) {
                // Add script tag
                script.appendChild(document.createTextNode(code));
                document.body.appendChild(script);
            }
            else {
                // Remove old code
                document.body.removeChild(document.body.lastChild);
                    
                // Add new code
                script.appendChild(document.createTextNode(code));
                document.body.appendChild(script);
            }
            
            firstRun = false;
        } catch (e) {
            script.text = code;
            document.body.appendChild(script);
            }
        }
        
    // Add click listener to the menu file tabs
    // for (var li of document.getElementsByTagName("LI")) {
    //     li.addEventListener("click", function(e) {
    //         document.getElementsByClassName("active")[0].className = "";
    //         e.srcElement.className = "active";
    //         currentTab = e.srcElement.innerHTML;
                
    //         if (currentTab == "Text") {
    //             editor.setValue(document.getElementById("html").innerHTML.trim());
    //             editor.setOption("mode", "text/html");
    //         }
    //         else if (currentTab == "Block") {
    //             editor.setValue(document.getElementById("css").innerHTML.trim());
    //             editor.setOption("mode", "css");
    //         }
    //     });
    // }
};