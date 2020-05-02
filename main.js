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
            .then(data => { this.apiData = data; 
                })
            
            .catch(err => alert("Woops! Something went wrong."))
        },
        getNumbers: function(){
            this.getApiData();
            alert(this.apiData)

        }
    },
    mounted: function(){
        this.getNumbers();
        
    }
    
})