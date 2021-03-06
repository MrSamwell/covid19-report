new Vue({
    el: '#app',
    data: {
        apiData: {},
        deaths: 0,
        cases: 0,
        recovered: 0,
        theimage: '',
        lastUpdate: ''
    },
    methods: 
        {
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
                this.deaths = this.apiData.Countries[30].TotalDeaths;
                this.cases = this.apiData.Countries[30].TotalConfirmed;
                this.recovered = this.apiData.Countries[30].TotalRecovered;
                this.theimage = "img/brazilmap.svg"
            }
            this.setDateFormat();
        },
        setDateFormat: function(){
            let update = new Date(this.apiData.Date);
            let day = update.getDate();
            let month = update.getMonth() + 1;
            let year = update.getFullYear();
            let hours = (update.getHours()<10?'0':'') + update.getHours();
            let minutes = (update.getMinutes()<10?'0':'') + update.getMinutes();
            let seconds = update.getSeconds();
            let str = `${day}/${month}/${year} ás ${hours}:${minutes}:${seconds}`;
            this.lastUpdate = str;        
        },
        toLocaleString: function(valor){
                return valor.toLocaleString('pt-BR');
            
        },
        getNumbersAnim: function(){
            var funcao = this.getNumbers;
            var queijo = this.$refs.contentBox;
            if(this.$refs.radioMundo.checked){
            queijo.classList.add("shrink")
            setTimeout(function(){
                
                queijo.classList.remove("shrink");
                queijo.classList.add("grow");
                
                funcao();
            },350);
           
            queijo.classList.remove("grow");
        }
        else{
            queijo.classList.add("shrink")
            setTimeout(function(){
                
                queijo.classList.remove("shrink");
                queijo.classList.add("grow");
                
                funcao();
            },350);
           
            queijo.classList.remove("grow");
        }
        },
        formatarData: function(data) {
            numeros = data.split('-');
            dataFormatada = `${numeros[2]}/${numeros[1]}/${numeros[0]}`;
            return dataFormatada;
        }
    },
    mounted: function(){
        this.getApiData();
    }
    
})