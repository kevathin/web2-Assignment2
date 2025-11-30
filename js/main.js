document.addEventListener("DOMContentLoaded", (e)=>{

    // ------------------------------------------information variables ------------
    // contains all clothing data
    let data;

    // all major selectors 
    const searchBar = document.querySelector("#searchBar");

    // the shopping cart is only going to contain the id of the items
    let shoppingCart = [];

    /*  
        a list containing all the filters that the user wanted
        "N/A" means no filter for that category.
        orderBy: LtoH (low to high cost), HtoL (high to low cost)
    */
    let filterList = {
        "name":"N/A",
        "gender":"N/A",
        "lowPrice":0,
        "highPrice":"N/A",
        "category":"N/A",
        "sizeXS":"N/A",
        "sizeS":"N/A",
        "sizeXS":"N/A",
        "sizeM":"N/A",
        "sizeL":"N/A",
        "sizeXL":"N/A",
        "orderBy":"N/A"
    };

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

    // ------------------------------------------setup functions ------------
    function headerSetup(){

        document.querySelector("#searchBarBox").addEventListener("keydown", (e)=>{
            if(e.key == "Enter"){
                let searchInput = searchBar.value;

                // I used W3Schools to determine how to write the first half of the replace function.
                // removes all special characters
                searchInput = searchInput.replace(/[^a-zA-Z0-9 ]/g, '');
                
                // checks the length (minus whiteSpace) 
                if(searchInput.replace(/\s+/g, '').length >2){
                    
                } else{
                    alert("please input a prompt with more than three regular characters");
                }
            }
        });

        document.querySelector("#searchButton").addEventListener("click", (e)=>{
            let searchInput = searchBar.value;

            searchInput = searchInput.replace(/[^a-zA-Z0-9 ]/g, '');
                
            // checks the length (minus whiteSpace) 
            if(searchInput.replace(/\s+/g, '').length >2){
                
            } else{
                alert("please input a prompt with more than three regular characters");
            }
        });

        document.querySelector("#shoppingCartBox").addEventListener("click", (e)=>{

        });

        document.querySelector("#aboutUsBox").addEventListener("click", (e)=>{

        });

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

    // ------------------------------------------dynamic (active use) functions ------------
    // Loads the shopping cart menu with items that the user ordered
    function loadShoppingCart(){

    }

    // loads the browse view with all filters that the user wanted
    function loadBrowseView(){

    }

    function togglePageView(pageOn, pageOff){
        document.querySelector("#"+pageOff).classlist.add("hidePage");
        document.querySelector("#"+pageOn).classlist.remove("hidePage");
    }

});

