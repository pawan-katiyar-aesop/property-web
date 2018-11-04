let website_home_app = new Vue({
    el: "#website-home-app",
    data: {
        property: undefined,
        searchInput: '',
        processing: false,
        clientCountryCode:'',
        clientName: '',
        clientEmail: '',
        clientContact: '',
        agentMessage: '',
        agentName: '',
        agentEmail: '',
        agentContact: '',
        agentCountryCode:''
        
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
            let agent_country_codes = $('#agent-select-country-code');
            agent_country_codes.empty();
            agent_country_codes.append('<option selected="true" disabled>Choose Country Code</option>');
            agent_country_codes.prop('selectedIndex', 0);

            const url = '/api/country_codes/';

            // Populate dropdown with list of country codes
            $.getJSON(url, function (data) {
              $.each(data, function (key, entry) {
                country_codes.append($('<option></option>').attr('value', entry.id).text(entry.code));
                agent_country_codes.append($('<option></option>').attr('value', entry.id).text(entry.code));
              })
            });
        },
        clientQuery: function () {
            let that = this;
            let body = {
                "name": that.clientName,
                "email": that.clientEmail,
                "contact": that.clientContact,
                "country_code": that.clientCountryCode
            };
            axios.post('/api/customer_leads/', body)
            .then(function (response) {
                $("#client-query-modal").modal('toggle');
                // show_notification("success", "Property Successfully Created.");

            })
            .catch(function (response) {
                alert("error occured.");
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        },
        agentQuery: function () {
            let that = this;
            let body = {
                "name": that.agentName,
                "email": that.agentEmail,
                "contact": that.agentContact,
                "country_code": that.agentCountryCode,
                "message": that.agentMessage
            };
            axios.post('/api/agent_leads/', body)
            .then(function (response) {
                $("#agent-query-modal").modal('toggle');
                // show_notification("success", "Property Successfully Created.");

            })
            .catch(function (response) {
                alert("error occured.");
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        },
        productDetails: function (property_id) {
            Cookies.set("property-id-for-details", property_id);
            window.location = '/property-details/';
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
