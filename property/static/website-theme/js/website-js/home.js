let website_home_app = new Vue({
    el: "#website-home-app",
    data: {
        property: undefined,
        searchInput: '',
        processing: false,
        countryCode:'',
        clientName: '',
        clientEmail: '',
        clientContact: ''
        
    },
    methods: {
        get_topProperty: function () {
            let that = this;
            axios.get('/api/real_estate/property/top/')
             .then(function (response) {
                 that.property = response.data.results;
             })
             .catch(function (response) {

             });
        },
        get_searchResults: function () {
            Cookies.set("token", this.searchInput);
            window.location = '/property-listing';
        },
        get_country_codes: function(){
            let that = this;
            let country_codes = $('#select-country-code');
            country_codes.empty();
            country_codes.append('<option selected="true" disabled>Choose Country Code</option>');
            country_codes.prop('selectedIndex', 0);

            const url = '/api/country_codes/';

            // Populate dropdown with list of country codes
            $.getJSON(url, function (data) {
              $.each(data, function (key, entry) {
                country_codes.append($('<option></option>').attr('value', entry.id).text(entry.code));
              })
            });
        },
        clientQuery: function () {
            let that = this;
            let body = {
                "name": that.clientName,
                "email": that.clientEmail,
                "contact": that.clientContact,
                "country_code": that.countryCode
            };
            axios.post('/api/customer_leads/', body)
            .then(function (response) {
                $("#client-query-modal").hide();
                // show_notification("success", "Property Successfully Created.");

            })
            .catch(function (response) {
                alert("error occured.");
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        }
    },
    watch: {

    },
    mounted() {
        this.get_topProperty();
        this.get_country_codes();
    },
    computed: {

  }
});
