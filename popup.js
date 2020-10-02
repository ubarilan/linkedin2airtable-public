var AirtableaApiKey = "YourAirtableAPIkey"; // Enter your API key here
var BaseID = 'YourBaseID' // Enter your base ID here
var TableName = 'YourTableName' // Enter the name of the table you're going to use





function getCurrentTabURL() { // Getting the current tab's URL
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    link = tabs[0].url;
 });
 return link; 
}

var thisDoc = document
String.prototype.replaceAll = function(search, replacement) { // Creating a function which replaces all the 'search' items with the 'replacement' items
    var target = this;
    return target.split(search).join(replacement);
};



String.prototype.replace = function(search, replacement) { // Changing the replace function with a one which replaces all the 'search' items with the 'replacement' items
    var target = this;
    return target.split(search).join(replacement);
};h
function consoleOnCurrentTab (text) { // A function which console.log()s on the current tab
    console.log(text)
}
        function enableButtons() { // I removed the code from here because it wasn't important
            $('#scanpage').css({ 
              //  'color': 'black',
               // 'border-color': 'black'
            });
            $('#exportuserstocsv').css({
             //   'background': 'black',
              //  'border-color': 'black'
            });
        }
        setTimeout(function() { // I made this one a timeout function because the document.body had to load before executing the function
            console.log(document.getElementById("cancel"))
            document.getElementById("cancel").onclick = function () {
            //     var style = "display: none;"
            //    document.body.style = style
            //    document.getElementById("cancel").style = "display: none;"
            window.close()
            }
        },0)

        


var isLinkedInPage  = false;
function disableButtons() { // First part of the function is useless
    $('#scanpage').css({
        
        'border-color': "#D3D3D3",
        'background-color': "#D3D3D3"
    });
    $('#exportuserstocsv').css({
       
        'border-color': "#D3D3D3",
        'background-color': "#D3D3D3"
    });
    document.getElementById("scanpage").disabled = true
    document.getElementById("scanpage").style = "color: gray; background-color: #D3D3D3; border-color: #D3D3D3; cursor: auto;"
}

chrome.tabs.getSelected(null, function (tab) { // Checking if the URL in the current tab is https://ilinkedin.com
    consoleOnCurrentTab(tab.url);
    tablink = tab.url;
    if (tablink.indexOf("https://www.linkedin.com/") > -1) {//is linkedin
        consoleOnCurrentTab("is linkedin page");
        isLinkedInPage = true;
        enableButtons();
    } else { // If it's not a https://linkedin.com page
        consoleOnCurrentTab("is not linkedin page, so nothing happened");
        isLinkedInPage = false;
        disableButtons();
    }
});



document.addEventListener('DOMContentLoaded', function () { // When the extension is loaded

    chrome.tabs.executeScript({
        code: '('+getBody+')();',//argument here is a string but function.toString() returns function's code
    }, (results) => {
      //  console.log(results[0].html);
       $("#html").html(results[0].html);
       runIsInDb();
    });

    document.getElementById('scanpage').onclick = function () {
        var style = "background: transparent;color: palevioletred;border-radius: 3px;border: 2px solid palevioletred;margin: 0 1em;padding: 0.25em 1em;float: left;cursor: pointer;"

        runCode()
        // Deleting the body first then closing the extension
        document.body.style = "diaplsy: none;"
            setTimeout(function(){
              //  window.close()
            },1200)
       
       
    }

}, false);// End of DOMContentLoaded event

function loadJS(){ // Load JQuery
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
    document.body.appendChild(scriptTag);
};

function getBody(){ // Get the document.body from the extension 
    return {html: document.body.innerHTML}
}

function exportToCsv(filename, rows) { // From here you can download a CSV file
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
var url;
chrome.tabs.getSelected(null, function (tab) {
    consoleOnCurrentTab(tab.url);
    url = tab.url;
   
});


function runCode() { // The document varriable is not the same as the ones before the function, it is the document of the linkedin page
    
    var notes = document.getElementById("notes").value; // Notes string input
    var email = document.getElementById("email").value; // Email (optional) (Must be a valid email adress)
    var score = document.getElementById("fitscore").value; // Fit score : number
    var difscore = document.getElementById("difscore").value; // Dif score : number
    var otherlinks = document.getElementById("otherlinks").value;
/* START OF GETTING ALL THE INFO FROM THE LINKEDIN PAGE*/
    var locTxt = $(".t-16.t-black.t-normal.inline-block").text().split(" ").join(" ")
    var jobs = $(".pv-entity__secondary-title")
    var jobsArr = new Array();

    for (var i = 0; i < jobs.length; i++) {
        jobsArr.push(jobs[i].innerText.replace("\n","").replace("        ","").replace("  ","")+" @"+$(".pv-entity__secondary-title")[i].innerText.replace("\n","").replace("        ","").replace("  ","")) // Clearing all the spaces from the text so it looks better and you can merge it
    }

    var skills = document.getElementsByClassName("pv-skill-category-entity__name-text t-16 t-black t-bold")
    var skillsArr = new Array();


    for (var i = 0; i < skills.length; i++) {
        skillsArr.push(skills[i].innerText.replace("\n","").replace("        ","").replace("  ","")) // Clearing all the spaces from the text so it looks better and you can merge it
    }

    var edus = $(".pv-entity__school-name.t-16.t-black.t-bold")
    var eduArr = new Array();

    for (var i = 0; i < edus.length; i++) {
        eduArr.push(edus[i].innerText.replace("\n","").replace("        ","").replace("  ","")) // Clearing all the spaces from the text so it looks better and you can merge it
    }

    var tabUrl;
    var degs = $(".pv-entity__comma-item")
    var degsArr = new Array();
    for (var i = 0;i < degs.length;i++) {
        degsArr.push(degs[i].innerHTML.replace("\n","").replace("        ","").replace("  ","")) // Clearing all the spaces from the text so it looks better and you can merge it
    }
    


    var locStr = $(".t-16.t-black.t-normal.inline-block").text().split("\n")[1]
    var flwArr = $(".t-16.t-black.t-normal.inline-block").text().split("\n")[3]
    var intrs = document.getElementsByClassName("pv-entity__summary-title-text")   
    var intrArr = new Array();
    for (var i = 0;i < intrs.length;i++) {
        intrArr.push(intrs[i].innerHTML)
    }
    var profilePic = document.getElementsByClassName("lazy-image pv-top-card-section__photo presence-entity__image EntityPhoto-circle-9 loaded")[0].src
    /* END OF GETTING ALL THE INFO FROM THE LINKEDIN PAGE*/
    var fullName = document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText.replace("  ","");
    var base = new console.airt({apiKey: AirtableaApiKey}).base(BaseID);

base(TableName).create({ // Creating a new record in the table
          "Full Name": document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText.replace("  ",""),
          "headline": $('.mt1.t-18.t-black.t-normal').text().replace("\t","").replace("  ",""),
          "about": $(".lt-line-clamp__line").text().replace("\t","").replace("  ",""),
          "location": locStr.replace("\t","").replace("  ",""),
          "jobs": jobsArr.join(","),
          "educations": eduArr.join(","),
          "Notes":notes,
          "Fit-Score": Number(score),
          "Difficult-Score": Number(difscore),
          "Profile-URL": url,
          //"Profile-Picture": profilePic   , // Currently not in use
          "Skills": skillsArr.join(",")   ,
          "Degree": degsArr.join(","),
          "Email":email,
          "Speaker":document.getElementById("speaker").checked,
       //   "Content-Writer":document.getElementById("content-writer").checked,
          "Locate-In-Israel": document.getElementById("locateinisrael").checked,
          "Other-Links": otherlinks
        }, function(err, record) {
          if (err) {
            console.error(err);
            return;
          }
          console.log(record.getId());
        });
        return {};
}

function runIsInDb(){
    var fullName = document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText.replace("  ","");
    var base = new console.airt({apiKey: AirtableaApiKey}).base(BaseID);
    base('db').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 200,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
    for(var i=0;i<records.filter(r=>r.get("Full Name") == document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText.replace("  ","")).length;i++) {
        var record = records.filter(r=>r.get("Full Name") == document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0].innerText.replace("  ",""))[i]
        console.log(record.get('Full Name')," ",i);
    }
    var inDb = Boolean(records.find(r=>r.get("Full Name") == fullName) !== undefined ? records.find(r=>r.get("Full Name") == fullName) : false)
    console.log(inDb)
    var str = `In database: ${inDb !== false ? "Yes" : "No"}`
    while(str ==`In database: Yes`) {
        thisDoc.getElementById("indb").innerHTML = str
        break;
    }

    //console.log(`In database: ${inDb ? "Yes" : "No"}`)
    
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}//end of is in db
