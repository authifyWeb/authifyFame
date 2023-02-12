const el = document.querySelector(".searchterm");
var authData;

/* Initialising typeahead-standalone.js: https://typeahead.digitalfortress.tech/ */

typeahead({
    input: el,
    source: {
    prefetch: {
        url: "https://raw.githubusercontent.com/webVerts/wSource/main/fame.json",
        },
    
    transform: (data) => { 
			
			const modifiedSource = data.verifyWith.reduce((acc, item) => {
        
               item.name.forEach(name => {    
                   acc.push({
                     ...item,
                     id: name, 
                   })
               });
              
               return acc;
         }, []);
         
         return modifiedSource;
    },
    identifier: 'id',
	identity: (suggestion) => `${suggestion.id}`
},

debounceRemote: 200,
highlight: true,
className: 'typeahead-sgst',
minLength: 2,
preventSubmit: true,

hint: true,
autoSelect: true,
templates: {
    suggestion: (authifyFame) => (
    `<div  class="single-item">
    <img src="${authifyFame.avatar}?s=50&r=g" />
    <div class="company_name">${authifyFame.id}</div>
    </div>`
    ),
   
header: (resultSet) => ` Username : ${resultSet.count}`,
notFound: () => 'Sorry!!!&#x1F61F;, Company details not available in our database <br> Please request it <a href="#"> here</a> ',

footer:() => 'Source: <a href="#"> Github</a>',
},
onSubmit: (e, selectedSuggestion) => {



 
if (selectedSuggestion) {

 document.getElementById('output'),innerHTML ="";
const myJSON = JSON.stringify(selectedSuggestion);
const outp=JSON.parse(myJSON);
const {name, urls, type,id} = outp;
//console.log(myJSON)
//console.log(outp)
authData=outp;









document.getElementById('naam').innerHTML = `<p style="font-size:1em;"> Submit URL below to verify whether the site belongs to <span style="color:#DFB014 "> ${id} </span></> </p>`;

var form=`<input type='text' id='link_id'  autocomplete="off" placeholder="Paste the URL"  > `;
var btn=`<input type="submit" id="search_btn" value="Search 🔍" onClick="searchNow()" > <p style="color:white; font-size:12px; padding-top:2px;">Please use a valid URL format (with https://). Or else no data will be displayed.</p><div class="refresh_btn_box" style="margin-top:5px; margin-bottom:5px;"><button type="button"; onClick="window.location.reload()">Search Another Link </button></div> `;
input_form.innerHTML=form;
input_btn.innerHTML=btn;




}

}



});	 



input_form.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
     
      case "Enter":
        searchNow();
        link_id.blur();
        break;
      case "Esc": // IE/Edge specific value
      case "Escape":
        // Do something for "esc" key press.
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  
function searchNow()
{   var input = document.getElementById('link_id').value;
  document.getElementById("data").innerHTML ="";
	document.getElementById("disclaimer").innerHTML ="";
    var url = new URL(input);
    var hostname = url.hostname;
    var protocol = url.protocol;
    var origin = url.origin;
    var href= url.href;
    var pathname= url.pathname;
    var output= authification(url, href, origin, hostname,protocol,pathname); 
		
			data.innerHTML = (output || "...Verifying");
			




}

function authification(url, href, origin, hostname,protocol,pathname)
{
	if(protocol != "https:" ) {return `<p style="padding:40px; color:lightred;"> This website is not secure. Please refrain from submitting personal data and don't download files from such sources</p>`;}
	else if( origin =="https://www.facebook.com" )  
			{	
				link= hostname+'/'+pathname.split('/')[1];
				var output = compare(link);
				return output;
			}
	else if(origin =="https://twitter.com")
			{
				
				link=hostname+'/'+pathname.split('/')[1].toLowerCase();
				var output = compare(link);	
				return output;
			}
	else if(origin=="https://www.youtube.com")
      {
        var channel=(pathname.split('/')[1]);
        if(channel=="channel") { link = hostname +'/' +pathname.split('/')[1]+ '/' + pathname.split('/')[2];}
        else if(channel=="c") { 
        var id=pathname.split('/')[2].toLowerCase();
        link= hostname+'/'+id}
        else{link=hostname+'/'+pathname.split('/')[1].toLowerCase();}
        var output = compare(link);	
        return output;
      }
	else if( origin=="https://www.twitch.tv" || origin=="https://www.instagram.com" )
			{
				link = hostname + pathname.toLowerCase(); 
				var output = compare(link); 
			  return output;
			}
	else if(origin=="https://www.reddit.com" || origin=="https://old.reddit.com")
			{	
				link=hostname +'/' +pathname.split('/')[1]+ '/' + pathname.split('/')[2].toLowerCase();
				var output = compare(link);
				return output;
			}
	else if(origin == "https://github.com")
				{
				var id= pathname.split('/')[1];
					
					if(id=="orgs" || id=="sponsors")
						{ var link= hostname+'/'+pathname.split('/')[2].toLowerCase();
						}
					else{
						var link=hostname+'/'+pathname.split('/')[1].toLowerCase();
						}
				var output = compare(link);	
				return output;	
				}
	else if(origin == "https://ko-fi.com" || origin =="https://www.buymeacoffee.com" || origin=="https://liberapay.com" || origin =="https://opencollective.com")
				{
					
					link=hostname+'/'+pathname.split('/')[1].toLowerCase();
					var output = compare(link);
					return output ;
				}
		
					
	else{var output= compare(hostname);
				return output ;
			}
}

function compare(link){
var json = authData;
var new_link=link;
var cl= json.urls;

for(i=0;i<cl.length;i++){

    if(json.urls[i]===link)
      {console.log("Yay")
      var Data=`<div style="color:white;font-size:12px; background-color:#1f282d;">  ` + new_link + `</br> <p> <span style="color:#A2FB15; font-size: 14px; ">Verified by authifyURL.</span> &nbsp;<span class="tooltip" > ✅ <span class="tooltiptext">This website is valid and legal. </span> </p></br> <p><span style="font-size:18px; color:white;">The page you submitted belongs to: </span> <span style="font-size:14px; color: #E49759"> <br>` +json.id+ `</span></p></br></div>` ;
                
                var Disclaimer=`Read <a href ="https://github.com/authifyWeb/authifyURL#how-we-verify" style="color:white"; target ="_blank"> how we verify</a> what is valid and what is not. </br><div class="refresh_btn_box" style="margin-top:10px"><button type="button"; onClick="window.location.reload()">Search Another Link </button></div> `;
                data.innerHTML= Data;
                disclaimer.innerHTML=Disclaimer;
              return Data;
      }
} 
 
    console.log("Nop")
    var Data = `<div style=" color:white; background-color:#1f282d; font-size:12px;" >` + new_link + `<p><br><span style="color:red;  font-size: 18px;"> The page you submitted doesn't belong to username selected above</span>&nbsp; <span class="tooltip"> ❌ <span class="tooltiptext">Possibly scam. Report the page directly to the owner. </span> </p> </div>` ;
  var Disclaimer=`<br>Read <a href ="https://github.com/authifyWeb/authifyURL#how-we-verify" style="color:white;" target ="_blank"> how we verify</a> what is valid and what is not. </br> `;
  data.innerHTML= Data;
  disclaimer.innerHTML=Disclaimer;
  return Data;













}


