let property_detail_app = new Vue({
    el:"#product-details-app",
    data: {
        property: undefined,
        processing:true,
        otherCharges:{},
        pk:'',
        otherId :-1,
        overlookingOptions:[],
        countryCodes:[],
        selectedOverlookingIds:[],
        videoTour:'',
        propertyVideos:[],
        propertyImages:{
            imageList:[]
        },
        imageSlider: {
            currentIndex: 0,
            listLength: 0,
        }
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
             that.propertyImages.imageList = that.property.images;
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
                "is_top": that.property.is_top,
                "images":that.property.images


            };
            debugger;
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
        addVideoUrlFields:function(){
            let that = this;
            let urls_dict = {};
            const index = generate_unique_number();
            urls_dict["url"] = "";
            urls_dict["index"] = index;
            urls_dict["title"] = "";
            urls_dict["type"] = "b";
            that.property.videos.push(urls_dict);
            //that.propertyVideos.push({"title":"", "type":"b","url":urls_dict["url"+index]});
        },
        removeVideoUrlFields:function(index){
            let that = this;
            that.property.videos.splice(index, 1)
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
                  //window.location.reload(true);
                  return
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
        },
        selectPropertyImage: function () {
            $("#select-image-hidden").click();
        },
        uploadPropertyImage: function (input) {
            let that = this;
            let unitArray = ['Bytes', 'KB', 'MB', 'GB'];
            if (input.target.files[0]){
                $.each(input.target.files, function (index, item) {
                    let size = item.size;
                    let i=0;
                    while(size>900)
                    {
                        size/=1024;
                        i++;
                    }
                    let actualSize = (Math.round(size * 100) / 100);
                    if (i>0 && actualSize > 100) {
                        alert("File size must be less than 100 kb, this file is too big " + actualSize + " " + unitArray[i]);
                        return
                    }
                    // Generate unique ID for all images
                    let image_id = 1212;

                    // Read image and append into doc
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        that.propertyImages.imageList.push({"file":e.target.result,"type":"b", "title":"", "description":"", "defaultInGroup":false});
                        that.imageSlider.listLength += 1;
                    };
                    reader.readAsDataURL(input.target.files[index]);
                });
                that.property.isPreviewImageActive = true;
                $("#select-image-hidden").val("");
            } else {
                alert("No files were selected. Please select at least one file.");
            }
        },
        removeImage: function (imageIndex) {
            let that = this;
            that.property.images.splice(imageIndex, 1);
            that.imageSlider.listLength -= 1;
            (that.property.images.length === 0)? that.property.isPreviewImageActive = false: that.property.isPreviewImageActive = true;
        },
    },
    mounted(){
        this.getPropertyDetails();

    }
});
