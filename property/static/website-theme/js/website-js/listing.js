let website_listing_app = new Vue({
    el: "#website-listing-app",
    data: {
        searchInput: '',
        searchResults: '',
        allProperties: '',
        filterInput: '',
        count: 0,
        pageNum: 1,
        processing: true

    },
    methods: {
        get_searchResults: function () {
            let that = this;
            that.searchInput = this.getUrlParameter('search');
            that.processing = true;
            if(that.searchInput){
                let url = '/api/real_estate/property/search/?search='+that.searchInput+'&page_size=20&page='+that.pageNum;
                axios.get(url)
                 .then(function (response) {
                     that.searchResults = response.data.results;
                     that.count = response.data.count;
                     that.count = Math.ceil(that.count/20);
                     that.allProperties = that.searchResults;
                     that.searchResults = _.sortBy(that.searchResults, function (item) {
                         return -item.id;
                     });
                     $(document).ready(function () {
                         $(".searching-data").removeClass('hidden');
                         $(".pagination-data").removeClass('hidden');
                     });
                     that.processing = false;

                 })
                 .catch(function (response) {
                    alert("Failed fetching data for search.");
                    that.processing = false;
                 });
            } else {
                let url = '/api/property/?page_size=20&page='+that.pageNum;
                axios.get(url)
                 .then(function (response) {
                     that.searchResults = response.data.results;
                     that.count = response.data.count;
                     that.count = Math.ceil(that.count/20);
                     that.allProperties = that.searchResults;
                     that.searchResults = _.sortBy(that.searchResults, function (item) {
                         return -item.id;
                     });
                     $(document).ready(function () {
                         $(".searching-data").removeClass('hidden');
                         $(".pagination-data").removeClass('hidden');
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
                    return parseFloat(item.rental_value) <= parseFloat(that.filterInput);

                });
            }
            else if (filter === "city") {
                that.searchResults = _.filter(that.allProperties, function (item) {
                    return item.address.city === that.filterInput;
                });
            }
            else if (filter === "locality") {
                that.searchResults = _.filter(that.allProperties, function (item) {
                    return item.address.locality === that.filterInput;
                });
            }
        },
        productDetails: function (property_id) {
            window.location = '/property-details/?id='+property_id;
        },
        nextPage: function () {
            this.pageNum = this.pageNum + 1;
            this.get_searchResults();
        },
        prevPage: function () {
            this.pageNum = this.pageNum - 1;
            this.get_searchResults();
        },
        staticPage: function (page) {
            this.pageNum = page;
            this.get_searchResults();
        },
        getUrlParameter : function (sParam) {
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
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
