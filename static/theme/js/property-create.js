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
            contactName: '',
            streetLine1: '',
            streetLine2: '',
            city: '',
            state: '',
            zip: '',
            rentCharge: 0,
            monthlyMaintenance: 0,
            securityDeposits: 0,
            otherCharges: '',
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
            leaseTerm: 0
        }
    },
    methods: {
        createProperty: function(){
            let that = this;
            let body = {
                "property_name": that.newProperty.propertyName,
                "property_desc": that.newProperty.propertyDesc,
                "property_id": that.newProperty.propertyID,
                "propertyAge": that.newProperty.propertyAge,
                "country_code": that.newProperty.countryCode,
                "contact_number": that.newProperty.contactNumber,
                "contact_name": that.newProperty.contactName,
                "street_line1": that.newProperty.streetLine1,
                "street_line2": that.newProperty.streetLine2,
                "city": that.newProperty.city,
                "state": that.newProperty.state,
                "zip": that.newProperty.zip,
                "rent_charge": that.newProperty.rentCharge,
                "monthly_maintenance": that.newProperty.monthlyMaintenance,
                "security_deposits": that.newProperty.securityDeposits,
                "otherCharges": that.newProperty.otherCharges,
                "floor_details": that.newProperty.floorDetails,
                "ceiling_details": that.newProperty.ceilingDetails,
                "washroom_details": that.newProperty.washroomDetails,
                "landmarks": that.newProperty.landmarkList,
                "overlooking": that.newProperty.overlookingList,
                "medias": that.newProperty.mediaList,
                "nearest": that.newProperty.nearestList,
                "pantry": that.newProperty.pantry,
                "powerbackup": that.newProperty.powerBackup,
                "lift": that.newProperty.liftAvailability,
                "airconditioner": that.newProperty.airConditioner,
                "cctv": that.newProperty.cctv,
                "cafeteria": that.newProperty.cafeteria,
                "fire_sprinklers": that.newProperty.fireSprinklers,
                "earthing": that.newProperty.earthing,
                "e_con": that.newProperty.electricalConnection,
                "furnishing_status": that.newProperty.furnishingStatus,
                "parking": that.newProperty.parking,
                "facing": that.newProperty.facing,
                "flooring": that.newProperty.flooring,
                "unit_of_area": that.newProperty.unitOfArea,
                "no_of_floors": that.newProperty.noOfFloors,
                "no_of_basements": that.newProperty.numberOfBasements,
                "units_on_floor": that.newProperty.units_on_floor,
                "parking_area": that.newProperty.parkingArea,
                "ceiling_height": that.newProperty.ceilingHeight,
                "beam_height": that.newProperty.beamHeight,
                "lease_term": that.newProperty.leaseTerm
            };
            axios.post('/api/v1/product/', body)
            .then(function (response) {
                show_notification("success", "Product Successfully Created.");
                window.location.href =  "/control/v1/products/detail/?product_pk="+ response.data.id;
            })
            .catch(function (response) {
                show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        }
    },
    mounted() {

    },
    computed: {

  }
});
