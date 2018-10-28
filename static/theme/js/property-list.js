let list_property_app = new Vue({

    el:"#property-list-app",
    data:{
        propertyList:[],
        processing: true
    },
    methods:{
        get_data:function () {
            this.processing = true;
            let url = "/api/property/";
            axios.get(url)
                .then(function (response){
                this.propertyList = response.data;
                console.log(this.propertyList);
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