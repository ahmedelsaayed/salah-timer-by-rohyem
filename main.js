let citis = [
    "القاهره","المنصوره","الزقازيق","المنوفيه"
]

for(city of citis){
   let contant = `
<option>${city}</option>
`
document.getElementById("city-select").innerHTML += contant; 
}

document.getElementById("city-select").addEventListener("change",function(){
    if(this.value == "المنصوره"){
        getcityfrom("Ad Daqahlīyah");
        document.querySelector(".citiii").innerHTML = "المنصوره";
    }else if(this.value == "الزقازيق"){
        getcityfrom("Ash Sharqīyah");
        document.querySelector(".citiii").innerHTML = "الزقازيق";
    }else if(this.value == "المنوفيه"){
        getcityfrom("Al Minūfīyah");
        document.querySelector(".citiii").innerHTML = "المنوفيه";
    }else{
        getcityfrom("Cairo");
        document.querySelector(".citiii").innerHTML = "القاهره";
    }   
})

function timmingget(id,time){
    document.querySelector(`#${id}`).innerHTML = time;
}

function getcityfrom(citisname){
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: {
            country:"EG",
            city:citisname//"Cairo"
        }
      })
      .then(function (response) {
        let timming = response.data.data.timings;
        timmingget("fajr",timming.Fajr);
        timmingget("shrouk",timming.Sunrise);
        timmingget("duhr",timming.Dhuhr);
        timmingget("asr",timming.Asr);
        timmingget("maghreb",timming.Sunset);
        timmingget("asha",timming.Isha);
    
        // >>>>>>>>>>>>>>>day<<<<<<<<<<<<<<<<//
        let year =response.data.data.date.readable;
        let day = response.data.data.date.hijri.weekday.en;
        document.getElementById("day").innerHTML = day + " " + year;
        
      })
      .catch(function (error) {
        console.log(error);
      })
};
getcityfrom("Cairo")
