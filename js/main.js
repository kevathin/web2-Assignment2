document.addEventListener("DOMContentLoaded", (e)=>{

    let data;

    // the shopping cart is only going to contain the id of the items
    let shoppingCart = [];

    fetch("https://gist.githubusercontent.com/rconnolly/d37a491b50203d66d043c26f33dbd798/raw/37b5b68c527ddbe824eaed12073d266d5455432a/clothing-compact.json")
        .then(Response =>{
            if(Response.ok){
                return Response.json();
            }else{
                throw new Error("fetch failure");
            }
        }).then(info =>{
            data = info;
            pageManager();
        }).catch(err =>{
            
        });
    
    /**
     * to prevent clutter of setting up all of the listeners at the same time,
     * I am using a manager that just calls the different categories of pages.
     */
    function pageManager(){
        initialPageHidden();
        headerSetup();
        homeViewSetup();
        browseViewSetup();
        singleProductViewSetup();
        shoppingCartViewSetup();
        aboutUsViewSetup();
    }

    /**
     * this just adds the hidePage class to all sub-pages from javascript 
     * instead of html.
     */
    function initialPageHidden(){
        document.querySelector("#browseView").classList.add("hidePage");
        document.querySelector("#singleProductView").classList.add("hidePage");
        document.querySelector("#shoppingCartView").classList.add("hidePage");
        document.querySelector("#aboutUsView").classList.add("hidePage");
    }

    function headerSetup(){
        
    }

    function footerSetup(){

    }

    function homeViewSetup(){

    }

    function browseViewSetup(){

    }

    function singleProductViewSetup(){

    }

    function shoppingCartViewSetup(){

    }
    
    function aboutUsViewSetup(){

    }

    function togglePageView(pageOn, pageOff){
        pOff = document.querySelector("#"+pageOff);
        pOn = document.querySelector("#"+pageOn);
        pOff.classlist.add("hidePage");
        pOn.classlist.remove("hidePage");
    }

});

