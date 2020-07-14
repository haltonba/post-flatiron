let obj = {
    clicked: false
}

document.addEventListener("click", function (event) {
    if (event.target.id = "button") {
        obj.clicked = !obj.clicked
        if (obj.clicked) {
            document.getElementsByTagName('h1')[0].innerText = "CLICKED!"
        } else {
            document.getElementsByTagName('h1')[0].innerText = "GANG!"
        }
    }
})