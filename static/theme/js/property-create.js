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
            landmarkList: [],
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
        landmarkId: 0,
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
                "landmark": that.newProperty.landmarkList,
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
                window.location.href =  "/control/properties/";
            })
            .catch(function (response) {
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        },
        addOtherCharge: function () {
            let that = this;
            $("#other-charge-parent").append('<div class="col-md-8">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="charge-'+that.otherId+'" class="form-control" v-model="newProperty.otherCharges-'+that.otherId+'" type="number" required>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="col-md-4">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="value-'+that.otherId+'" class="form-control" v-model="newProperty.otherCharges-'+that.otherId+'" type="number" required>\n' +
                '                                            </div>\n' +
                '                                        </div>');

            that.otherId += 1;

        },
        addLandmark: function () {
            let that = this;
            $("#add-landmark").append('<div class="col-md-6">\n' +
                '                                            <input type="text" class="form-control mt-15" v-model="newProperty.landmarkList-'+that.landmarkId+'" required/>\n' +
                '                                        </div>');
            that.landmarkId += 1;
        },
        addNearest: function () {
            let that = this;
            $("#nearest-building").append('<div class="col-md-6">\n' +
                '                                            <input type="text" v-model="newProperty.nearestList-'+that.nearestId+'" class="form-control mt-15" required/>\n' +
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
        }

    },
    mounted() {
        this.get_country_codes();
    },
    computed: {

  }
});

$(document).ready(function() {
    $('#property-overlooking').select2();
});