let website_details_app = new Vue({
    el: "#website-details-app",
    data: {
        propertyId: 0,
        propertyDetails: undefined,
        clientName: '',
        clientEmail: '',
        clientContact: '',
        clientCountryCode: '+91',
        processing: true,
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
            0: 'Bareshell layout',
            1: 'Design Option 1',
            2: 'Design Option 2',
            3: 'Design Option 3'
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
        statusValue: undefined,
        longitude: '',
        latitude: '',
        mapAddress: ''

    },
    methods: {
        get_product_details: function () {
            console.log("Processing now,: ", this.processing);

            let self = this;
            let propertyID = self.getUrlParameter('id');

            axios({
                method:'get',
                url: '/api/property/'+ propertyID,
                timeout: 5000
            }).then((res)=>{
                console.log("response: ", res);
                self.propertyDetails = res.data;
                self.latitude = res.data.latitude;
                 self.longitude = res.data.longitude;
                 self.mapAddress = res.data.map_address;
                 self.statusValue = res.status;
                 self.processing = false;

            }).catch((e)=>{
                alert('api didnt hit');
            });


            // axios.get('/api/property/'+this.propertyId)
            //  .then((response)=>{
            //      this.propertyDetails = response.data;
            //      this.latitude = response.data.latitude;
            //      this.longitude = response.data.longitude;
            //      this.mapAddress = response.data.map_address;
            //      this.statusValue = response.status;
            //      this.processing = false;
            //  })
            //  .catch(function (response) {
            //     alert("Failed fetching data for property details.");
            //     this.processing = false;
            //  });
        },
        // clientQuery: function () {
        //     let that = this;
        //     let body = {
        //         "name": that.clientName,
        //         "email": that.clientEmail,
        //         "contact": that.clientContact,
        //         "country_code": that.clientCountryCode,
        //         "for_property": that.propertyId
        //     };
        //     axios.post('/api/customer_leads/', body)
        //     .then(function (response) {
        //         // show_notification("success", "Property Successfully Created.");
        //
        //     })
        //     .catch(function (response) {
        //         alert("error occured.");
        //         // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
        //     })
        // },
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
        },
        loaded: function () {
            alert("loaded");
        }
    },
    watch: {

    },
    created() {
        console.log('before mounted');
        this.processing = true;
        this.get_product_details();

    },
    mounted() {
        console.log("after mounted");
      console.log("data in response: ", this.propertyDetails.images);

    }
  //   computed: {
  //
  // }
});
