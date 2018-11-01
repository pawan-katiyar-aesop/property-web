let website_home_app = new Vue({
    el: "#website-home-app",
    data: {
        property: undefined,
        searchInput: undefined,
        searchResults: undefined,
        processing: false
        
    },
    methods: {
        get_topProperty: function () {
            let that = this;
            axios.get('/api/real_estate/property/top/')
             .then(function (response) {
                 that.property = response.data;
                 debugger;
             })
             .catch(function (response) {

             });
        },
        get_searchResults: function () {
            let that = this;
            that.processing = true;
            let body = {
                "key": that.searchInput
            };
            axios.post('/api/real_estate/property/', body)
             .then(function (response) {
                 that.searchResults = response.data;
                 that.processing = false;

             })
             .catch(function (response) {
                alert("Failed fetching data for search");
                that.processing = false;
             });
        }
    },
    watch: {

    },
    mounted() {
        this.get_topProperty();

    },
    computed: {

  }
});
