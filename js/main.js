document.addEventListener("DOMContentLoaded", (e)=>{

    // ------------------------------------------information variables ------------
    // contains all clothing data
    let data;

    // all major selectors 
    const searchBar = document.querySelector("#searchBar");
    const productTemplate = document.querySelector("#itemBoxTemplate");
    const browseContent = document.querySelector("#browseItemContent");
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
        "lowPrice":"N/A",
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

    let activePage ="homeView";

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
            alert("fetch failure" + err);
            console.log(err);
        });
    
    /**
     * to prevent clutter of setting up all of the listeners at the same time,
     * I am using a manager that just calls the different categories of pages.
     */
    function pageManager(){
        loadLocalStorageInfo();
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
        document.querySelector("#browseView").style.display = "none";
        document.querySelector("#singleProductView").style.display = "none";
        document.querySelector("#shoppingCartView").style.display = "none";
        document.querySelector("#aboutUsView").style.display = "none";
    }

    function loadLocalStorageInfo(){
        try {
            let tempFilterInfo = localStorage.getItem("filterList");
            tempFilterInfo = JSON.parse(tempFilterInfo);
            if(tempFilterInfo){
                console.log(tempFilterInfo);
                filterList = tempFilterInfo;
            }else{
                throw new console.error("couldn't get filter information");
            }
        } catch (error) {
            console.log("get local storage info failed: " + error);
        }
    }

    // ------------------------------------------setup functions ------------
    function headerSetup(){

        // loads the home page
        document.querySelector("#pageIcon").addEventListener("click", (e)=>{
            loadHomeView();
        });

        //Load to browse view if user presses enter in search bar
        document.querySelector("#searchBarBox").addEventListener("keydown", (e)=>{
            if(e.key == "Enter"){
                let searchInput = searchBar.value;

                // I used W3Schools to determine how to write the first half of the replace function.
                // removes all special characters
                searchInput = searchInput.replace(/[^a-zA-Z0-9 ]/g, '');
                
                // checks the length (minus whiteSpace) 
                if(searchInput.replace(/\s+/g, '').length >2){
                    
                    filterList.name = searchInput;
                    updateFilterToggles("name");
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
                
                filterList.name = searchInput;
                updateFilterToggles("name");
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
            filterList.gender = "mens";
            updateFilterToggles("gender");
            loadBrowseView();
        });

        //load browse view with the filter of gender being female
        document.querySelector("#womenSuper").addEventListener("click",(e)=>{
            filterList.gender = "womens";
            updateFilterToggles("gender");
            loadBrowseView();
        });

    }

    function browseViewSetup(){
        document.querySelectorAll("#genderOptionContainer radio").forEach(radio =>{
            radio.addEventListener("click",(e)=>{
                
            });
        });

        document.querySelector("#categorySelectBox").addEventListener("change", (e)=>{
            console.log("hello");
        });

        document.querySelector("#maxValueInput").addEventListener("change", (e)=>{
            try {
                let valueInput = document.querySelector("#maxValueInput");
                let val = parseInt(valueInput.value);
                filterList.highPrice = val;
                loadBrowseView();
                updateFilterToggles("highPrice");
                updateLocalStorage();
            } catch (error) {
                alert("Please type an integer in your max price filter");
            }
        });

        document.querySelector("#minValueInput").addEventListener("change", (e)=>{
            console.log("hello")
            try {
                let valueInput = document.querySelector("#minValueInput");
                let val = parseInt(valueInput.value);
                filterList.lowPrice = val;
                loadBrowseView();
                updateFilterToggles("lowPrice");
                updateLocalStorage();
            } catch (error) {
                alert("Please type an integer in your min price filter");
                console.log(error);
            }
        });
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

    function updateLocalStorage(){
        localStorage.setItem("filterList", JSON.stringify(filterList));
    }

    function loadSingleProductView(productID){
        
    }

    /**
     * this goes through all the filter information that the user has applied and then 
     * filters the data using the filter information.
     * 
     * @returns data post filter
     */
    function getFilteredData(){
        let filteredData = data;
        //console.log(filteredData);
        if(filterList.name != "N/A"){
            filteredData = filteredData.filter(i => i.name.toLowerCase().startsWith(filterList.name.toLowerCase()));
        }
        //console.log(filteredData);
        if(filterList.gender != "N/A"){
            filteredData = filteredData.filter(i => i.gender == filterList.gender);
        }
        //console.log(filteredData);
        if(filterList.lowPrice != "N/A"){
            filteredData = filteredData.filter(i => i.price >= parseInt(filterList.lowPrice));
        }
        //console.log(filteredData);
        if(filterList.highPrice != "N/A"){
            filteredData = filteredData.filter(i => i.price <= parseInt(filterList.highPrice));
        }
        //console.log(filteredData);
        if(filterList.category != "N/A"){
            filteredData = filteredData.filter(i => i.category == filterList.category);
        }
        //console.log(filteredData);
        if(filterList.sizeXS != "N/A"){
            filteredData = filteredData.filter(i => i.sizes.includes("XS"));
        }
        //console.log(filteredData);
        if(filterList.sizeS != "N/A"){
            filteredData = filteredData.filter(i => i.sizes.includes("S"));
        }
        //console.log(filteredData);
        if(filterList.sizeM != "N/A"){
            filteredData = filteredData.filter(i => i.sizes.includes("M"));
        }
        //console.log(filteredData);
        if(filterList.sizeL != "N/A"){
            filteredData = filteredData.filter(i => i.sizes.includes("L"));
        }
        //console.log(filteredData);
        if(filterList.sizeXL != "N/A"){
            filteredData = filteredData.filter(i => i.sizes.includes("XL"));
        }
        //console.log(filteredData);
        if(filterList.sortBy != "N/A"){
            filteredData = filteredData.filter(i => i);
        }
        //console.log(filteredData);
        return filteredData;
    }

    /**
     * changes specific filter information when the user
     * sets a filter.
     * @param {*} element the filter name
     */
    function updateFilterToggles(element){
        if(element == "name"){
            document.querySelector("#searchBarBox").value = filterList.name;
        } else if(element == "gender"){
            document.querySelector("#"+filterList.gender+"GenderInput").checked = true;
        } else if(element == "lowPrice"){
            document.querySelector("#minValueInput").value = filterList.lowPrice;
        } else if(element == "highPrice"){
            document.querySelector("#maxValueInput").value = filterList.highPrice;
        } else if(element == "category"){
            document.querySelector("#categorySelectBox").value = filterList.category;
        } else if(element == "sortBy"){
            document.querySelector("#sortByFilterBox").value = filterList.sortBy;
        } else{
            // else only leaves the sizes
            let specificSize = element.replace("size", ""); 
            let button = document.querySelector("#"+specificSize);
            if(filterList[specificSize] == "true"){
                button.classList.add("toggleSizeTrue");
            } else{
                button.classList.remove("toggleSizeTrue");
            }
        }
    }  

    // loads the browse view with all filters that the user wanted
    function loadBrowseView(){
        togglePageView("browseView", activePage);
        activePage = "browseView";
        let filteredData = getFilteredData();
        
        browseContent.innerHTML = "";
        //console.log(filteredData);
        //console.log(filterList);
        if(filteredData){
            for(product of filteredData){
                let productElementClone = productTemplate.content.cloneNode(true);
                let productElement = productElementClone.querySelector(".itemBox");
                
                productElement.setAttribute("value", product.id);
                productElement.querySelector("click", (e)=>{
                    loadSingleProductView(e.target.value);
                });

                let img = productElement.querySelector("img");
                img.setAttribute("src","images/products/"+product.category+".png");
                img.setAttribute("alt", product.name + " image");
                img.setAttribute("title", product.name);

                let sizeBox = productElement.querySelector(".itemSizeAvailableBox");
                productElement.querySelector(".itemTitle").textContent = product.name;
                productElement.querySelector(".itemCost").textContent = product.price;

                browseContent.appendChild(productElement);
            }
        }
        
    }

    // loads home view
    function loadHomeView(){
        togglePageView("homeView", activePage);
        activePage = "homeView"
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

