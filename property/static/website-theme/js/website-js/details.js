let website_details_app = new Vue({
    el: "#website-details-app",
    data: {
        propertyId: 0,
        propertyDetails: '',
        clientName: '',
        clientEmail: '',
        clientContact: '',
        clientCountryCode: '+91',
        processing: false,
        nearest_code: {
            'bus': 'Bus Stop',
            'school': 'School',
            'mall': 'Shopping Mall',
            'hospital': 'Hospital',
            'bank': 'Bank',
            'atm': 'ATM',
            'restaurant': 'Restaurant',
            'metro': 'Metro Station',
            'train': 'Train Station',
            'pharmacy': 'Pharmacy'
        },
        furnishing_status: {
            'semi': 'Semi Furnished',
            'bare': 'Bareshell'
        },
        parking_choice: {
            'cover': 'Covered',
            'expose': 'Exposed'
        },
        facing_options: {
            'n': 'North',
            'ne': 'North East',
            'nw': 'North West',
            's': 'South',
            'se': 'South East',
            'sw': 'South west',
            'e': 'East',
            'w': 'West'
        },
        flooring_type: {
            'tile': 'Tiles',
            'wood': 'Wooden',
            'carpet': 'Carpet',
            'bare': 'Bare'
        },
        floor_choice: {
            "-1": 'No Plan',
            0: 'Bareshell',
            1: 'Office Plan',
            2: 'Design Renders',
            3: 'Site Photos'
        },
        i_icon: {
            'bus': 'fa fa-bus',
            'school': 'fa fa-university',
            'mall': 'fa fa-shopping-basket',
            'hospital': 'fa fa-hospital-o',
            'bank': 'fa fa-credit-card',
            'atm': 'fa fa-money',
            'restaurant': 'fa fa-cutlery',
            'metro': 'fa fa-train',
            'train': 'fa fa-train',
            'pharmacy': 'fa fa-medkit'
        },
        floorPlanDesign: 6,
        fullUrl: ''

    },
    methods: {
        get_product_details: function () {
            let that = this;
            that.propertyId = this.getUrlParameter('id');
            that.processing = true;
            axios.get('/api/property/'+that.propertyId)
             .then(function (response) {
                 that.propertyDetails = response.data;
                 that.processing = false;

             })
             .catch(function (response) {
                alert("Failed fetching data for property details.");
                that.processing = false;
             });
        },
        clientQuery: function () {
            let that = this;
            let body = {
                "name": that.clientName,
                "email": that.clientEmail,
                "contact": that.clientContact,
                "country_code": that.clientCountryCode,
                "for_property": that.propertyId,
                "partner_type": "client"
            };
            axios.post('/api/customer_leads/', body)
            .then(function (response) {
                show_notification("success", "Your Query Submitted.");

            })
            .catch(function (response) {
                alert("error occured.");
                show_notification("danger", "A fatal error occurred, and this form might not function correctly.")
            })
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
        this.get_product_details();
        this.fullUrl = window.location.href;
    },
    computed: {

  }
});

