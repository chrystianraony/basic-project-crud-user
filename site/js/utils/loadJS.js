var loadJS = function(url, callback=null, location = document.body){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = callback;
    // scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

