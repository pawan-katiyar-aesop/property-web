let list_customer_leads_app = new Vue({

    el:"#customer-leads-app",
    data:{
        leads:[],
        processing: true
    },
    methods:{
        get_data:function () {
            this.processing = true;
            let url = "/api/get-customer-leads/";
            axios.get(url)
                .then(function (response){
                this.leads = response.data;
                console.log(this.leads);
                this.processing = false;
            })
            .catch(function (response) {
                console.log("Failed");
                this.processing = false;

            });
        }

    },
    watch:{

    },
    mounted(){
        this.get_data();

    }
});