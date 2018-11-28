let list_customer_leads_app = new Vue({

    el:"#customer-leads-app",
    data:{
        leads:[],
        processing: false
    },
    methods:{
        get_data:function () {
            let that = this;
            that.processing = true;
            let url = "/api/customer_leads/";
            axios.get(url)
                .then(function (response){
                that.leads = response.data;
                console.log(that.leads);
                that.processing = false;
            })
            .catch(function (response) {
                console.log("Failed");
                that.processing = false;

            });
        }

    },
    watch:{

    },
    mounted(){
        this.get_data();

    }
});
