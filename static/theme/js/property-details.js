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
        otherCharges:{},
        pk:'',
        otherId :-1,
        overlookingOptions:[],
        countryCodes:[],
        selectedOverlookingIds:[]
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
             that.get_overlooking();
             that.loadOtherCharges();

             that.processing = false;


         })
         .catch(function (response) {
            alert("Failed fetching data for id : "+that.pk);
            that.processing = false;
         });
        },
        validateMandatoryFields:function(){
          let that = this;
          if(!that.property.property_name || !that.property.contact ||!that.property.country_code || !that.property.address.name || !that.property.address.line_1){
              return false;
          }
          return true;
        },
        updateProperty : function () {
            let that = this;
            let wahsroomDet = {
                "Urinals": that.property.washroom_details.Urinals,
                "WC": that.property.washroom_details.WC,
            };
            if (!that.validateMandatoryFields()){
                alert("Please fill fields marked mandatory with a red asterisk");
                return
            }
            that.populateCharges();
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
                "carpet_area": that.property.carpet_area,
                "landmark": that.property.landmark,
                "overlooking": that.property.overlooking,
                "buildup_area":that.property.buildup_area,
                "country_code":that.property.country_code,
                "other_charges":that.otherCharges,
                "is_top": that.property.is_top

            };
            axios.put("/api/property/"+parseInt(that.pk)+"/" ,data)
            .then(function (response) {
                alert( "Property has been successfully updated");
                window.location.reload(true);

            })
            .catch(function (response) {
                alert("A fatal error occurred, and this page might not function correctly.")
                console.log(response);
                //window.location.href = "http://localhost:8000/control/dash/properties/";
            });
        },
        updateAddress:function(){
          let that = this;

            if (!that.validateMandatoryFields()){
                alert("Please fill fields marked mandatory with a red asterisk");
                return
            }
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
                '                                                <input id="charge-'+that.otherId+'" class="form-control" type="text" required>\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                        <div class="col-md-4">\n' +
                '                                            <div class="form-group">\n' +
                '                                                <input id="value-'+that.otherId+'" class="form-control"  type="number"  required>\n' +
                '                                            </div>\n' +
                '                                        </div>');

        },
        populateCharges :function(){
            let that=this;
            let listOfKey = [];
            let listOfVal = [];
            $('#other-charge-parent > div > div').children('input').each(function () {
                if(this.id.toString()[0]==='c')
                {
                    listOfKey.push(this.value);
                }
                else {
                    listOfVal.push(parseInt(this.value));
                }
                });
            for(let i=0; i<listOfKey.length;i++){
                that.otherCharges[listOfKey[i]] = listOfVal[i];
            }
            console.log(that.otherCharges);
        },
        loadOtherCharges : function () {
            let that = this;
            for (let key in that.property.other_charges){
                let val =  that.property.other_charges[key];
                that.otherCharges[key] = val;
                that.addOtherCharge();
                $("#charge-"+that.otherId).val(key);
                $("#value-"+that.otherId).val(val);
            }
        },
         loadCountryCodes: function() {
             let that = this;
             let country_codes = $('#property-country_code');
             country_codes.empty();
             country_codes.append('<option selected="true" disabled>Choose Country Code</option>');
             country_codes.prop('selectedIndex', 0);

             const url = '/api/country_codes/';
             // Populate dropdown with list of country codes
             $.getJSON(url, function (data) {
                 that.countryCodes = data;
             });

         },
        get_overlooking: function(){
            let that = this;
            let overlooking = $("#select-overlooking");
            const url = '/api/overlooking/';
            axios.get(url)
                .then(function (response) {
                    that.overlookingOptions = response.data;
                })
                .catch(function (response) {
                    alert("Could not fetch the options for overlooking")
                });

            overlooking.select2({
                placeholder: "Overlooking",
                theme: "classic",
                allowClear: true
            }).on('select2:selecting select2:unselecting', function (e) {
                if(e.params.name === 'select'){
                    that.property.overlooking.push(e.params.args.data);
                }
                else if(e.params.name === 'unselect'){
                    that.property.overlooking.splice(_.indexOf(that.property.overlooking,e.params.args.data),1);
                }
            });
        }
    },
    mounted(){
        this.getPropertyDetails();

    }
});
