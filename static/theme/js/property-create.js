let property_create_app = new Vue({
    el: "#vue-property-create-app",
    data: {
        newProperty: {
            propertyName: '',
            propertyDesc: '',
            propertyID: '',
            propertyAge: '',
            countryCode: '',
            contactNumber: '',
            address: '',
            rentCharge: 0,
            monthlyMaintenance: 0,
            securityDeposits: 0,
            otherCharges: [],
            floorDetails: '',
            ceilingDetails: '',
            washroomDetails: {
                urinal: undefined,
                wC: undefined
            },
            landmark: '',
            overlookingList: [],
            mediaList: [],
            nearestList: [],
            pantry: false,
            washroom: false,
            powerBackup: false,
            liftAvailability: false,
            airConditioner: false,
            cctv: false,
            cafeteria: false,
            fireSprinklers: false,
            earthing: false,
            electricalConnection: false,
            furnishingStatus: undefined,
            parking: undefined,
            facing: undefined,
            flooring: undefined,
            unitOfArea: undefined,
            noOfFloors: 0,
            totalNoOfFloors: 0,
            numberOfBasements: 0,
            unitsOnFloors: 0,
            parkingArea: 0,
            ceilingHeight: 0,
            beamHeight: 0,
            leaseTerm: 0,
            carpetArea: 0,
            buildupArea: 0
        },
        newAddress:{
            contactName: '',
            streetLine1: '',
            streetLine2: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        },
        otherId: 0,
        nearestId: 0
    },
    methods: {
        createProperty: function(){
            let that = this;
            let property_body = {
                "property_name": that.newProperty.propertyName,
                "description": that.newProperty.propertyDesc,
                "property_id": that.newProperty.propertyID,
                "age": that.newProperty.propertyAge,
                "country_code": that.newProperty.countryCode,
                "contact": that.newProperty.contactNumber,
                "name": that.newAddress.contactName,
                "line_1": that.newAddress.streetLine1,
                "line_2": that.newAddress.streetLine2,
                "city": that.newAddress.city,
                "state": that.newAddress.state,
                "country": that.newAddress.country,
                "zip": that.newAddress.zip,
                "rental_value": that.newProperty.rentCharge,
                "monthly_maintenance": that.newProperty.monthlyMaintenance,
                "security_deposit": that.newProperty.securityDeposits,
                "other_charges": that.newProperty.otherCharges,
                "flooring_details": that.newProperty.floorDetails,
                "ceiling_details": that.newProperty.ceilingDetails,
                "washroom_details": that.newProperty.washroomDetails,
                "landmark": that.newProperty.landmark,
                "overlooking": that.newProperty.overlookingList,
                "media": that.newProperty.mediaList,
                "nearest": that.newProperty.nearestList,
                "pantry": that.newProperty.pantry,
                "washroom": that.newProperty.washroom,
                "power_backup": that.newProperty.powerBackup,
                "lift_availability": that.newProperty.liftAvailability,
                "a_c": that.newProperty.airConditioner,
                "cctv": that.newProperty.cctv,
                "cafeteria": that.newProperty.cafeteria,
                "fire_sprinklers": that.newProperty.fireSprinklers,
                "earthing": that.newProperty.earthing,
                "electrical_con": that.newProperty.electricalConnection,
                "furnishing_status": that.newProperty.furnishingStatus,
                "parking": that.newProperty.parking,
                "facing": that.newProperty.facing,
                "flooring": that.newProperty.flooring,
                "unit_of_area": that.newProperty.unitOfArea,
                "number_of_floors": that.newProperty.noOfFloors,
                "total_number_of_floors": that.newProperty.totalNoOfFloors,
                "number_of_basements": that.newProperty.numberOfBasements,
                "units_on_floor": that.newProperty.units_on_floor,
                "parking_area": that.newProperty.parkingArea,
                "ceiling_height": that.newProperty.ceilingHeight,
                "beam_height": that.newProperty.beamHeight,
                "lease_term": that.newProperty.leaseTerm,
                "carpet_area": that.newProperty.carpetArea,
                "buildup_area": that.newProperty.buildupArea
            };
            axios.post('/api/property/', property_body)
            .then(function (response) {
                // show_notification("success", "Property Successfully Created.");
                window.location.href =  "/dash/properties/";
            })
            .catch(function (response) {
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        },
        addOtherCharge: function () {
            let that = this;
            $("#other-charge-parent").append('<div class="col-md-8">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="charge-'+that.otherId+'" class="form-control" v-model="newProperty.otherCharges-charge-'+that.otherId+'" type="number" required>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="col-md-4">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="value-'+that.otherId+'" class="form-control" onKeyPress="if(this.value.length===7) return false;" v-model="newProperty.otherCharges-value-'+that.otherId+'" type="number" required>\n' +
                '                                            </div>\n' +
                '                                        </div>');

            that.otherId += 1;

        },
        addNearest: function () {
            let that = this;
            $("#nearest-building").append('<div class="col-md-8">\n' +
                '                                            <select name="parking" class="form-control mb-20" v-model="newProperty.nearestList-title-\'+that.nearestId+\'" required>\n' +
                '                                                <option disabled selected>Choose Any Option</option>\n' +
                '                                                <option value="bus">Bus Stop</option>\n' +
                '                                                <option value="school">School</option>\n' +
                '                                                <option value="mall">Shopping Mall</option>\n' +
                '                                                <option value="hospital">Hospital</option>\n' +
                '                                                <option value="bank">Bank</option>\n' +
                '                                                <option value="atm">ATM</option>\n' +
                '                                                <option value="restaurant">Restaurant</option>\n' +
                '                                                <option value="metro">Metro Station</option>\n' +
                '                                                <option value="train">Train Station</option>\n' +
                '                                                <option value="pharmacy">Pharmacy</option>\n' +
                '                                            </select>\n' +
                '                                        </div>\n' +
                '                                        <div class="col-md-4">\n' +
                '                                            <input type="number" onKeyPress="if(this.value.length===2) return false;" v-model="newProperty.nearestList-distance-\'+that.nearestId+\'" class="form-control mb-20" required/>\n' +
                '                                        </div>');

            that.nearestId += 1;
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
        get_overlooking: function(){
            let that = this;
            let overlooking = $('#select-overlooking');
            overlooking.empty();
            // overlooking.append('<option selected="true" id="overlooking-choose" disabled>Choose Any Option</option>');
            // overlooking.prop('selectedIndex', 0);

            const url = '/api/overlooking/';

            // Populate dropdown with list of overlooking
            $.getJSON(url, function (data) {
              $.each(data, function (key, entry) {
                overlooking.append($('<option></option>').attr('value', entry.id).text(entry.name)).select2().on('change', function () {
                    if($(".select2-selection__choice").text() === "×Choose Any Option"){
                        $(".select2-selection__choice").remove();
                    }
                });
              })
            });
        }

    },
    watch: {

    },
    mounted() {
        this.get_country_codes();
        this.get_overlooking();
    },
    computed: {

  }
});
