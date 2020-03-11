document.addEventListener("DOMContentLoaded", function(){
    moveToPage(location.pathname)
})

function moveToPage(url){
    const currentPage = document.getElementsByClassName("currentPage")[0]
    if(currentPage){
        currentPage.classList.remove("currentPage")
    }

    
}