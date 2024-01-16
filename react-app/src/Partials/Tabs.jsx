import React, { useEffect } from "react";
import "../Pages/CSS/tabs.css";
import Orders from "./Orders";
import EditShipping from "./EditShipping";

const Tabs = () => {

    useEffect(() => {

       
    function openTab(tabName) {
        let i;
        let tabContent;
        
        tabContent = document.getElementsByClassName("tab-content");
        
        
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        
        document.getElementById(tabName).style.display = "flex";
    }
    let tabContent = document.getElementsByClassName("tab-content");
    tabContent[0].style.display = "flex";
    // This needs to DRY'ed up so it can be used with a CMS
    let designLinkEl = document.getElementById("DesignLink");
   
    let musicLinkEl = document.getElementById("SupportLink");
   
    
    designLinkEl.addEventListener("click", function(){openTab("Design")}, false);
   
    musicLinkEl.addEventListener("click", function(){openTab("Support")}, false);
   
},[])
    return (
        <>
        <div class="container-fluid">
    <div class="row" style={{display:"flex",flexFlow:"row"}}>
        <div id="DesignLink" class="col-sm-6 heading-design">
            <h5 class="mb-0">01.</h5>
            <h1 class="mb-0"><strong>Orders</strong></h1>
        </div>
       
        <div id="SupportLink" class="col-sm-6 heading-music">
            <h5 class="mb-0">02.</h5>
            <h1 class="mb-0"><strong>Shipping</strong></h1>
        </div>
       
    </div>
</div>

<div id="Design" class="container-fluid tab-content">
    <div class="container-fluid">
    <div class="row">
            <div class="col-sm-12 right-content">
             <Orders/>
            </div>
        </div>
    </div>
    
</div>

<div id="Support" class="container-fluid tab-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 right-content">
                <EditShipping/>
                </div>
        </div>
    </div>
</div>


        </>
    )
}

export default Tabs;