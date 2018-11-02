let website_details_app = new Vue({
    el: "#website-details-app",
    data: {
        propertyId: Cookies.get("property-id-for-details"),
        propertyDetails: '',
        processing: false

    },
    methods: {
        get_product_details: function () {
            let that = this;
            that.processing = true;
            axios.get('/api/property/'+that.propertyId)
             .then(function (response) {
                 that.propertyDetails = response.data;
                 that.processing = false;
                 debugger;
                 Cookies.set("property-id-for-details", '');

             })
             .catch(function (response) {
                alert("Failed fetching data for property details.");
                that.processing = false;
             });
        }
    },
    watch: {

    },
    mounted() {
        this.get_product_details();

    },
    computed: {

  }
});
