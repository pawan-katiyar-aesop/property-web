let property_detail_app = new Vue({
    el:"#product-details-app",
    data: {
        property: undefined,
        processing:true,
        newAddress:{
            name : undefined,
            line_1 : undefined,
            line_2 : undefined,
            city : undefined,
            state : undefined,
            country : undefined,
            zip : undefined
        },
        newOtherCharges:{},
        pk:'',
        otherId :-1
    }
    ,
    methods:{
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
        getPropertyDetails : function () {
            let that = this;
            this.processing = true;
            that.pk = this.getUrlParameter('p');
            axios.get('/api/property/'+that.pk+"/")
         .then(function (response) {
             that.property = response.data;
             console.log(that.property);
             that.loadCountryCodes();
             that.processing = false;

         })
         .catch(function (response) {
            alert("Failed fetching data for id : "+that.pk);
            that.processing = false;
         });
        },
        
        updateProperty : function () {
            let that = this;
            let wahsroomDet = {
                "Urinals": that.property.washroom_details.Urinals,
                "WC": that.property.washroom_details.WC,
            };

            const data  = {
                "property_name": that.property.property_name,
                "description": that.property.description,
                "property_id": that.property.property_id,
                "age": that.property.age,
                "contact": that.property.contact,
                "rental_charge": that.property.rental_charge,
                "monthly_maintenance": that.property.monthly_maintenance,
                "security_deposit": that.property.security_deposit,
                "flooring_details": that.property.flooring_details,
                "ceiling_details": that.property.ceiling_details,
                "washroom_details": wahsroomDet,
                "pantry": that.property.pantry,
                "washroom": that.property.washroom,
                "power_backup": that.property.power_backup,
                "lift_availability": that.property.lift_availability,
                "a_c": that.property.a_c,
                "cctv": that.property.cctv,
                "cafeteria": that.property.cafeteria,
                "fire_sprinklers": that.property.fire_sprinklers,
                "earthing": that.property.earthing,
                "electrical_con": that.property.electrical_con,
                "furnishing_status": that.property.furnishing_status,
                "parking": that.property.parking,
                "facing": that.property.facing,
                "flooring": that.property.flooring,
                "unit_of_area": that.property.unit_of_area,
                "number_of_floors": that.property.number_of_floors,
                "total_number_of_floors": that.property.total_number_of_floors,
                "number_of_basements": that.property.number_of_basements,
                "units_on_floor": that.property.units_on_floor,
                "parking_area": that.property.parking_area,
                "ceiling_height": that.property.ceiling_height,
                "beam_height": that.property.beam_height,
                "lease_term": that.property.lease_term,
                "carpet_area": that.property.carpet_area
            };
            axios.put("/api/property/"+parseInt(that.pk)+"/" ,data)
            .then(function (response) {
                alert( "Property has been successfully updated");
                window.location.reload(true);

            })
            .catch(function (response) {
                alert("A fatal error occurred, and this page might not function correctly.")
                //window.location.href = "http://localhost:8000/control/dash/properties/";
            });
        },
        updateAddress:function(){
          let that = this;
          axios.put('/api/address/'+that.property.address.id+'/', that.property.address)
              .then(function (response) {
                  alert("Address has been updated for prop : "+that.property.property_id);
                  window.location.reload(true);
              })
            .catch(function (response) {
                alert("A fatal error occurred, and this page might not function correctly.")
                //window.location.href = "http://localhost:8000/control/dash/properties/";
            });
        },
        addOtherCharge: function () {
            let that = this;
            that.otherId += 1;
            $("#other-charge-parent").append('<div class="col-md-8">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="charge-'+that.otherId+'" class="form-control" v-model="newOtherCharges-'+that.otherId+'" type="text" required>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="col-md-4">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="value-'+that.otherId+'" class="form-control" v-model="newOtherCharges-'+that.otherId+'" type="number" required>\n' +
                '                                            </div>\n' +
                '                                        </div>');



        },
         loadCountryCodes: function(){
            let that = this;
            $('.select-country_code').select2({
                ajax: {
                    url: "/api/country_codes/",
                    data: function (params) {
                        return {
                            code: btoa(params.term)
                        }
                    },
                    processResults: function (data) {
                        let processed_data = $.map(data, function (obj) {
                            obj.text = obj.text || obj.code;
                            return obj;
                        });
                        return {
                            results: processed_data
                        };
                    }
                },
                placeholder: "Country code",
                theme: "classic",
                allowClear: true
            }).on('change', function () {
                that.property.country_code = this.value;
            });
        }




    },
    mounted(){
        this.getPropertyDetails();


    }
});
