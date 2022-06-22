var loadJS = function(url, callback, location){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = callback;
    // scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

(async () => {
    // CARREGA O HEAD
    let head = document.querySelector("head");

    const headResponse = await fetch('/shared/partials/_head.html')
    const headData = await headResponse.text()
    head.innerHTML = headData

    if (typeof(initFn) !== 'undefined') {
        loadJS('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js', initFn, document.body);
    }
    
    loadJS('https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/11.4.17/sweetalert2.all.js', null, document.body)

    // CARREGA O HEADER
    let header = document.querySelector("header#general-header");

    const headerResponse = await fetch('/shared/partials/_header.html')
    const headerData = await headerResponse.text()

    header.innerHTML = headerData;


    // CARREGA O FOOTER
    let footer = document.querySelector("footer#general-footer");

    const footerResponse = await fetch('/shared/partials/_footer.html')
    const footerData = await footerResponse.text()

    footer.innerHTML = footerData;
})()