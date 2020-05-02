new Vue({
    el: '#app',
    data: {
        apiData: {},
        deaths: 0,
        cases: 0,
        recovered: 0
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
            }
            else{
                this.deaths = this.apiData.Countries[29].TotalDeaths;
                this.cases = this.apiData.Countries[29].TotalConfirmed;
                this.recovered = this.apiData.Countries[29].TotalRecovered;
            }
        }
    },
    mounted: function(){
        this.getApiData();
    }
    
})