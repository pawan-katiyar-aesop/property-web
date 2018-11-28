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
        propertyVideos:[],
        propertyImages:{
            imageList:[]
        },
        imageSlider: {
            currentIndex: 0,
            listLength: 0,
        },
        nearest:{},
        floorPlanEdit:{
            description:'',
            images:[],
            videos:[],
            id:undefined,
            floor_number: 0
        },
        floorPlanListOfDescriptions:['','','',''],
        floorPlanListOfImagesList:[[],[],[],[]],
        floorPlanListOfVideoURLs:[[],[],[],[]],
        currentEditingFloor:-1,
        nearestId:0,
        existing:false,
        videoTour:{
            url:'',
            type:'',
            title:''
        },
        countryCode : '',
        selectedOverlooking:[],
        jsonData:{
            results:[]
        },
        mapAddress: '',
        lat:'',
        lng:''
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
                that.loadOtherCharges();
                that.countryCode = that.countryCodes[_.indexOf(_.pluck(that.countryCodes,'id'),that.property.country_code)]['name'];
                that.processing = false;
                that.loadOverlooking();


            })
            .catch(function (response) {
                that.processing = false;
            })
                .finally(function (response) {
                that.initSelect2();
                })
                ;
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
            that.populateCountryCode();
            that.populateNearest();
            that.populateLatLng();
            const data  = {
                "property_name": that.property.property_name,
                "description": that.property.description,
                "property_id": that.property.property_id,
                "age": that.property.age,
                "contact": that.property.contact,
                "rental_value": that.property.rental_value,
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
                "floor_num": that.property.floor_num,
                "total_number_of_floors": that.property.total_number_of_floors,
                "number_of_basements": that.property.number_of_basements,
                "units_on_floor": that.property.units_on_floor,
                "parking_area": that.property.parking_area,
                "ceiling_height": that.property.ceiling_height,
                "beam_height": that.property.beam_height,
                "lease_term": that.property.lease_term,
                "carpet_area": that.property.carpet_area,
                "landmark": that.property.landmark,
                "overlooking": that.selectedOverlooking,
                "buildup_area":that.property.buildup_area,
                "country_code":that.property.country_code,
                "other_charges":that.otherCharges,
                "is_top": that.property.is_top,
                "images":that.property.images,
                "nearest":that.nearest,
                "videos":that.property.videos,
                "latitude":that.lat,
                "longitude":that.lng,
                "map_address":that.mapAddress,
                "floor_number": that.floorPlanEdit.floor_number
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
        addVideoUrlFields:function(){
            let that = this;
            let urls_dict = {};
            const index = generate_unique_number();
            urls_dict["url"] = "";
            urls_dict["index"] = index;
            urls_dict["title"] = "";
            urls_dict["type"] = "";
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
        addNearest: function () {
            let that = this;
            $("#nearest-building").append('<div class="col-md-8">\n' +
                '                                            <select name="parking" class="form-control mb-20" id="nearestList-title-'+that.nearestId+'" required>\n' +
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
                '                                            <input type="text" id="nearestList-distance-'+that.nearestId+'" class="form-control mb-20" required/>\n' +
                '                                        </div>');

            that.nearestId += 1;
        },
        populateCountryCode : function(){
          let that = this;
          that.property.country_code = that.countryCodes[_.indexOf(_.pluck(that.countryCodes,'name'),that.countryCode)]['id'];
          //console.log(that.property.country_code);

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
                that.otherCharges[listOfKey[i]+""] = listOfVal[i];
            }
        },
        populateNearest :function(){
            let that=this;
            let listOfKey = [];
            let listOfVal = [];
            let element = $('#nearest-building > div');
            element.children('select').each(function () {
                listOfKey.push(this.value);
            });
            element.children('input').each(function () {
                listOfVal.push(this.value);
            });

            for(let i=0; i<listOfKey.length;i++){

                that.nearest[listOfKey[i]+""] = listOfVal[i];
            }
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
        loadOverlooking: function () {
            let that = this;
            axios.get("/api/overlooking/")
                .then(function (response) {
                    that.overlookingOptions = response.data.results;
                    that.selectedOverlooking = _.pluck(that.property.overlooking,'id');
                    for(let j=0;j< that.overlookingOptions.length;j++){
                        let obj = that.overlookingOptions[j];
                        obj["text"] = obj['name'];

                        for (let i=0;i<that.selectedOverlooking.length;i++){
                            if(obj['id']===that.selectedOverlooking[i]){
                                obj['selected']=true;
                            }

                        }
                        that.jsonData.results.push(obj);
                    }
                })
                .catch(function (response) {
                    alert("Some error occurred fetching overlooking options");
                });

        },
        initSelect2:function(){
            let that = this;
            let overlookingElement = $('#select-overlooking');
            try{

            if (overlookingElement.hasClass("select2-hidden-accessible")){overlookingElement.select2('destroy');
                overlookingElement.find('option').remove();}
            }
            catch (e) {
                //nothing
            }
             overlookingElement.select2({
                placeholder:"Overlooking",
                 allowClear:true,
                 data: that.jsonData
             })
                 .on('select2:selecting select2:unselecting', function (e) {
                if (e.params.name === 'select') {
                    that.selectedOverlooking.push(parseInt(e.params.args.data.id));
                }
                else if (e.params.name === 'unselect') {
                    that.selectedOverlooking.splice(_.indexOf(that.selectedOverlooking, parseInt(e.params.args.data.id)), 1)
                }
            });

            // for (let i = 0; i < that.overlookingOptions.length; i++){
            //    overlookingElement.append(
            //         new Option(that.overlookingOptions[i].name, that.overlookingOptions[i].id,
            //             !!_.findWhere(that.property.overlooking, {id: that.overlookingOptions[i].id}), false,
            //             )
            //    ).trigger("change");
            // }

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
                    if (i>1 && actualSize > 2) {

                        alert("File size must be less than 2 MB, this file is too big " + actualSize + " " + unitArray[i]);

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
        selectFloorPlanImage:function(){
          $("#select-floor-image-hidden").click();
        },
        uploadFloorPlanImage: function (input) {
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
                    if (i>1 && actualSize > 2) {
                        alert("File size must be less than 2 MB, this file is too big " + actualSize + " " + unitArray[i]);
                        return
                    }
                    // Generate unique ID for all images
                    let image_id = 1212;

                    // Read image and append into doc
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        that.floorPlanEdit.images.push({"image":e.target.result,"type":"f", "title":"", "description":"", "defaultInGroup":false});
                        that.imageSlider.listLength += 1;
                    };
                    reader.readAsDataURL(input.target.files[index]);
                });
                that.floorPlanEdit.isPreviewImageActive = true;
                $("#select-floor-image-hidden").val("");
            } else {
                alert("No files were selected. Please select at least one file.");
            }
        },
        removeFloorPlanImage: function (imageIndex) {
            let that = this;
            that.floorPlanEdit.images.splice(imageIndex, 1);
            that.imageSlider.listLength -= 1;
            (that.floorPlanEdit.imageList.length === 0)? that.floorPlanEdit.isPreviewImageActive = false: that.floorPlanEdit.isPreviewImageActive = true;
        },
        addVideoUrlFieldsFloor:function(){
            let that = this;
            let urls_dict_floor = {};
            const index = generate_unique_number();
            urls_dict_floor["url"+index] = "";
            urls_dict_floor["index"] = index;
            urls_dict_floor["title"] = "";
            urls_dict_floor["type"] = "f";
            that.floorPlanListOfVideoURLs[parseInt(this.currentEditingFloor)].push(urls_dict_floor);
            that.floorPlanEdit.videos.push(urls_dict_floor)
        },
        removeVideoUrlFieldsFloor:function(index){
            let that = this;
            that.floorPlanListOfVideoURLs[parseInt(this.currentEditingFloor)].splice(index, 1);
            that.floorPlanEdit.videos.splice(index, 1)
        },
        loadFloorPlan:function () {
            let that=this;
            let currentFloorPlan = {};
            let index = -1;
            let floorPlanId = -1;
            index = _.indexOf(_.pluck(that.property.floor_plan,'floor_number'),parseInt(that.currentEditingFloor));
            if (index!==-1){
                that.existing = true;
                floorPlanId = that.property.floor_plan[index]['id'];
                that.floorPlanEdit['description']=that.property.floor_plan[index]['description'];
                that.floorPlanEdit['images']=that.property.floor_plan[index]['images'];
                that.floorPlanEdit['videos']=that.property.floor_plan[index]['videos'];
                that.floorPlanEdit['id']=floorPlanId;
            }
            else{
                that.existing = false;
                that.floorPlanEdit['description'] = "";
                that.floorPlanEdit['images'] = [];
                that.floorPlanEdit['videos'] = [];
                that.floorPlanEdit['id'] = undefined;
            }
        },
        clearFloorPlan: function () {
            let that = this;
            that.floorPlanEdit['description'] = "";
            that.floorPlanEdit['images'] = [];
            that.floorPlanEdit['videos'] = [];
            that.floorPlanEdit['id'] = undefined;
        },
        updateFloorPlan: function () {
            let that = this;
            let data = {
                "description":that.floorPlanEdit['description'],
                "images":that.floorPlanEdit['images'],
                "videos":that.floorPlanEdit['videos'],
                "no_of_floor": that.floorPlanEdit["floor_number"]
            };
            axios.put("/api/floor_plan/"+parseInt(that.floorPlanEdit['id'])+"/", data)
                .then(function (response) {
                    alert("Updated floor plan!");
                    window.location.reload(true);
                })
                .catch(function (response) {
                    alert("Error occured while updating floor plan!!");
                });
        },
        unlinkFloorPlan: function () {
            let that = this;
            if (that.property.floor_plan.length===1){
                alert("Sorry, this is your only floor plan, deleting not allowed");
                return
            }
            axios.delete("/api/floor_plan/"+parseInt(that.floorPlanEdit['id'])+"/")
                .then(function (response) {
                    alert("Updated floor plan!");
                    window.location.reload(true);
                })
                .catch(function (response) {
                    alert("Error occured while updating floor plan!!");
                });
        },
        deleteProperty : function () {
            let that = this;
            bootbox.confirm({
            title: "Delete Property?",
            message: "Do you want to delete this property? This cannot be undone.",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                }
            },
            callback: function (result) {
                if(result){
                    axios.delete("/api/property/"+that.pk+"/")
                        .then(function (response) {
                            alert("Property has been successfully delete");
                            window.location.href =  "/control/dash/properties/";
                        })
                        .catch(function (response) {
                            alert("Somer error occurred while deleting the property");
                        })
                }
            }
            });
        },
        addNewFLoorPlan : function () {
            let that = this;
            let data = {
                "floor_number":parseInt(that.currentEditingFloor),
                "description":that.floorPlanEdit['description'],
                "images":that.floorPlanEdit['images'],
                "videos":that.floorPlanEdit['videos'],
                "property":that.pk,
                "no_of_floor": that.floorPlanEdit["floor_number"]
            };
            axios.post("/api/floor_plan/",data)
                .then(function (response) {
                    alert("Saved new floor plan successfully");
                    window.location.reload(true);
                })
                .catch(function (response) {
                    alert("Error occured in saving new floor plan")
                })

        },
        populateLatLng:function () {
            let that = this;
            that.mapAddress = $("#address").val();
            that.lat = $("#latitude").val();
            that.lng = $("#longitude").val();
            console.log(that.mapAddress, that.lat, that.lng);
        }
    },
    mounted(){
        this.loadCountryCodes();
        //this.get_overlooking();
        this.getPropertyDetails();


    },
    watch:{
        currentEditingFloor:function (newQuery, oldQuery) {
            this.loadFloorPlan()
        }
    }
});
