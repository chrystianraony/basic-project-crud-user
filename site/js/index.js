(async () => {
    // CARREGA O HEAD
    let head = document.querySelector("head");

    const headResponse = await fetch('/shared/partials/_head.html')
    const headData = await headResponse.text()

    head.innerHTML = headData;

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