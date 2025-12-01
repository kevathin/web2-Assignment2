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
        "N/A" means no filter for that filter.
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
        "sortBy":"N/A"
    };

    // ------------------------------------------ fetch + setup manager----------------

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
            alert("fetch failure");
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
        document.querySelector("#homeView").style.display = "none";
        document.querySelector("#singleProductView").style.display = "none";
        document.querySelector("#shoppingCartView").style.display = "none";
        document.querySelector("#aboutUsView").style.display = "none";
    }

    // ------------------------------------------setup functions ------------
    function headerSetup(){

        //Load to browse view if user presses enter in search bar
        document.querySelector("#searchBarBox").addEventListener("keydown", (e)=>{
            if(e.key == "Enter"){
                let searchInput = searchBar.value;

                // I used W3Schools to determine how to write the first half of the replace function.
                // removes all special characters
                searchInput = searchInput.replace(/[^a-zA-Z0-9 ]/g, '');
                
                // checks the length (minus whiteSpace) 
                if(searchInput.replace(/\s+/g, '').length >2){
                    clearFilterList();
                    filterList.name = searchInput;
                    loadBrowseView();
                } else{
                    alert("please input a prompt with more than three regular characters");
                }
            }
        });

        // load to browse view if user clicks the search button in search bar
        document.querySelector("#searchButton").addEventListener("click", (e)=>{
            let searchInput = searchBar.value;

            searchInput = searchInput.replace(/[^a-zA-Z0-9 ]/g, '');
                
            // checks the length (minus whiteSpace) 
            if(searchInput.replace(/\s+/g, '').length >2){
                clearFilterList();
                filterList.name = searchInput;
                loadBrowseView();
            } else{
                alert("please input a prompt with more than three regular characters");
            }
        });

        // load to checkout section if user clicks the shopping cart box
        document.querySelector("#shoppingCartBox").addEventListener("click", (e)=>{

        });

        // load to about us section if user clicks the about us box
        document.querySelector("#aboutUsBox").addEventListener("click", (e)=>{

        });

    }

    function homeViewSetup(){

        //load browse view with the filter of gender being male
        document.querySelector("#menSuper").addEventListener("click",(e)=>{
            clearFilterList();
            filterList.gender = "mens";
            loadBrowseView();
        });

        //load browse view with the filter of gender being female
        document.querySelector("#womenSuper").addEventListener("click",(e)=>{
            clearFilterList();
            filterList.gender = "womens";
            loadBrowseView();
        });

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

    // simply just resets the filter list
    function clearFilterList(){
        filterList = {
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
            "sortBy":"N/A"
        };
    }

    /**
     * this is toggles the page view when the user switches 
     * from one sub-page to another sub-page.
     * 
     * @param {*} pageOn the page to be toggled on
     * @param {*} pageOff the previous page to be toggled off
     */
    function togglePageView(pageOn, pageOff){
        document.querySelector("#"+pageOff).style.display = "none";
        document.querySelector("#"+pageOn).style.display = "flex";
    }

});

