let website_listing_app = new Vue({
    el: "#website-listing-app",
    data: {
        searchInput: Cookies.get("token"),
        searchResults: '',
        allProperties: '',
        filterInput: '',
        processing: false

    },
    methods: {
        get_searchResults: function () {
            let that = this;
            that.processing = true;
            if(that.searchInput){
                axios.get('/api/real_estate/property/'+that.searchInput)
                 .then(function (response) {
                     that.searchResults = response.data.results;
                     that.allProperties = that.searchResults;
                     that.processing = false;
                     Cookies.set("token", '');

                 })
                 .catch(function (response) {
                    alert("Failed fetching data for search.");
                    that.processing = false;
                 });
            } else {
                axios.get('/api/property/')
                 .then(function (response) {
                     that.searchResults = response.data.results;
                     that.allProperties = that.searchResults;
                     that.searchResults = _.sortBy(that.searchResults, function (item) {
                         return -item.id;
                     });
                     that.processing = false;

                 })
                 .catch(function (response) {
                    alert("Failed fetching data for all properties.");
                    that.processing = false;
                 });
            }
        },
        sortPropertyList: function () {
            let that = this;
            let sortList = $("#sort-property-list").val();
            if (sortList === "lth") {
                that.searchResults = _.sortBy(that.searchResults, function (item) {
                    return item.rental_value;
                });
            }
            else if (sortList === "htl") {
                that.searchResults = _.sortBy(that.searchResults, function (item) {
                    return -item.rental_value;
                });
            }
            else if (sortList === "new") {
                that.searchResults = _.sortBy(that.searchResults, function (item) {
                    return -item.id;
                });
            }
            else if (sortList === "area") {
                that.searchResults = _.sortBy(that.searchResults, function (item) {
                    return item.buildup_area;
                });
            }
        },
        filterPropertyList: function () {
            let that = this;
            let filter = $("#filter-property-list").val();
            if (filter === "all") {
                that.searchResults = that.allProperties;
            }
            else if (filter === "budget") {
                that.searchResults = _.filter(that.allProperties, function (item) {
                    return item.rental_value <= that.filterInput;
                });
            }
            else if (filter === "city") {
                that.searchResults = _.filter(that.allProperties, function (item) {
                    return item.address.city === that.filterInput;
                });
            }
            else if (filter === "locality") {
                that.searchResults = _.filter(that.allProperties, function (item) {
                    return item.address.line_2 === that.filterInput;
                });
            }
        }
    },
    watch: {

    },
    mounted() {
        this.get_searchResults();

    },
    computed: {

  }
});
