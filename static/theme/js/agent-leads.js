let agents_leads_app = new Vue({
    el:"#agent-leads-app",
   data:{
        leads :[]
   } ,
    methods:{
        get_data:function () {
            axios.get('/api/get-agent-leads/')
                .then(function (response) {
                    this.leads = response.data;
                    console.log(this.leads);

                })
                .catch(function (response) {
                    console.log("Failed")

                })

        }

    },
    mounted(){
        this.get_data();
    }
});