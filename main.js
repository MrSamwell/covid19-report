new Vue({
    el: '#app',
    data: {
        apiData: {},
        deaths: 0,
        cases: 0,
        recovered: 0,
        theimage: ''
    },
    methods: {
        getApiData: function() {
            fetch(`https://api.covid19api.com/summary`)
            .then(response => response.json())
            .then(data => { 
                this.apiData = data;
                this.getNumbers();
            })
            .catch(err => alert("Woops! Something went wrong."))
        },
        getNumbers: function(){
            if(this.$refs.radioMundo.checked){
            console.log(this.apiData); 
            this.deaths = this.apiData.Global.TotalDeaths;
            this.cases = this.apiData.Global.TotalConfirmed;
            this.recovered = this.apiData.Global.TotalRecovered;
            this.theimage = "img/world.svg"
            }
            else{
                this.deaths = this.apiData.Countries[29].TotalDeaths;
                this.cases = this.apiData.Countries[29].TotalConfirmed;
                this.recovered = this.apiData.Countries[29].TotalRecovered;
                this.theimage = "img/brazil.svg"

            }
        
        },
        getNumbersAnim: function(){
            var funcao = this.getNumbers;
            var queijo = this.$refs.contentBox;
            queijo.classList.add("shrink")
            setTimeout(function(){
                
                queijo.classList.remove("shrink");
                queijo.classList.add("grow");
                
                funcao();
            },350);
           
            queijo.classList.remove("grow");
            
        }
    },
    mounted: function(){
        this.getApiData();
    }
    
})