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
            floorDetails: '',
            ceilingDetails: '',
            urinal: 0,
            wC: 0,
            videoTourURL:{
                'title':'',
                'type':'t',
                'url':''
            },
            bannerVideos:[
                //objects of format -->{ 'title':'','type':'','url:''}
            ],
            isTop:false,
            landmark: '',
            overlookingList: [],
            mediaList: [],
            nearestList: {},
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
            buildupArea: 0,
            isTop:false,
            floorPlan: []

        },
        processing:true,
        newAddress:{
            contactName: '',
            streetLine1: '',
            streetLine2: '',
            locality: '',
            city: '',
            state: '',
            country: '',
            zip: ''
        },
        overlookingOptions :[],
        otherId: -1,
        nearestId: 0,
        imageSlider: {
            currentIndex: 0,
            listLength: 0,
        },
        videoSlider: {
            currentIndex: 0,
            listLength: 0,
        },
        propertyImages:{
            imageList: [],
        },
        propertyVideos: [],
        videoTours:{
            list: [],
        },
        otherCharges:{},
        nearest:{},
        floorPlanEdit:{
            description:'',
            imageList:[],
            videos:[]
        },
        floorPlanListOfDescriptions:['','','',''],
        floorPlanListOfImagesList:[[],[],[],[]],
        floorPlanListOfVideoURLs:[[],[],[],[]],
        currentEditingFloor:-1,
        loaded:false

    },
    methods: {
        validateMandatoryFields:function(){
          let that = this;
          if(!that.newProperty.propertyName.length || !that.newProperty.contactNumber.length || !that.newAddress.contactName.length || !that.newAddress.streetLine1.length || !that.newProperty.propertyID.length || !that.newProperty.countryCode.length){
              alert("Please fill up fields marked as mandatory")
              return
          }
          else{

            if(!that.floorPlanListOfDescriptions[0].length && !that.floorPlanListOfDescriptions[1].length && !that.floorPlanListOfDescriptions[2].length && !that.floorPlanListOfDescriptions[3].length){
                alert("Create atleast one floor plan to proceed to save");
                return
            }
            else{
                alert("Click OK to continue with saving this property");
                that.createProperty();
            }

          }

        },
        createProperty: function(){
            let that = this;

            //that.newProperty.nearestList = {};
            //that.newProperty.otherCharges = {};
            // for (let i = 0; i<that.nearestId; i++){
            //     that.newProperty.nearestList[$("#nearestList-title-"+i).val()] = $("#nearestList-distance-"+i).val();
            // }
            // for (let i = 0; i<that.otherId; i++){
            //     that.newProperty.otherCharges[$("#otherCharges-charge-"+i).val()] = $("#otherCharges-value-"+i).val();
            // }
            let washroomDetails = {
                "Urinals":that.newProperty.urinal,
                "WC":that.newProperty.wC
            };

            that.populateCharges();
            that.populateNearest();
            let allVideoUrlList = [];
            if (that.newProperty.videoTourURL.url.length){
                that.propertyVideos.push(that.newProperty.videoTourURL);
            }
            that.newProperty.floorPlan.push(that.floorPlanListOfDescriptions);
            that.newProperty.floorPlan.push(that.floorPlanListOfImagesList);
            that.newProperty.floorPlan.push(that.floorPlanListOfVideoURLs);


            let newAddress = {
                "name": that.newAddress.contactName,
                "line_1": that.newAddress.streetLine1,
                "line_2": that.newAddress.streetLine2,
                "locality": that.newAddress.locality,
                "city": that.newAddress.city,
                "state": that.newAddress.state,
                "country": that.newAddress.country,
                "zip": that.newAddress.zip
            };
            let property_body = {
                "property_name": that.newProperty.propertyName,
                "description": that.newProperty.propertyDesc,
                "property_id": that.newProperty.propertyID,
                "age": that.newProperty.propertyAge,
                "country_code": that.newProperty.countryCode,
                "contact": that.newProperty.contactNumber,
                "address": newAddress,
                "rental_value": that.newProperty.rentCharge,
                "monthly_maintenance": that.newProperty.monthlyMaintenance,
                "security_deposit": that.newProperty.securityDeposits,
                "other_charges": that.otherCharges,
                "flooring_details": that.newProperty.floorDetails,
                "ceiling_details": that.newProperty.ceilingDetails,
                "washroom_details": washroomDetails,
                "landmark": that.newProperty.landmark,
                "overlooking": that.newProperty.overlookingList,
                "images": that.propertyImages.imageList,
                "nearest": that.nearest,
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
                "units_on_floor": that.newProperty.unitsOnFloors,
                "parking_area": that.newProperty.parkingArea,
                "ceiling_height": that.newProperty.ceilingHeight,
                "beam_height": that.newProperty.beamHeight,
                "lease_term": that.newProperty.leaseTerm,
                "carpet_area": that.newProperty.carpetArea,
                "buildup_area": that.newProperty.buildupArea,
                "is_top": that.newProperty.isTop,
                "videos":that.propertyVideos,
                "floor_plan": that.newProperty.floorPlan

            };



            axios.post('/api/property/', property_body)
                .then(function (response) {
                    // show_notification("success", "Property Successfully Created.");
                    window.location.href =  "/control/dash/properties/";
                })
                .catch(function (response) {
                    // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
                })


        },
        addOtherCharge: function () {
            let that = this;
            that.otherId += 1;
            $("#other-charge-parent").append('<div class="col-md-8">\n' +
                '<div class="form-group">\n' +
                '<input class="form-control" id="charge-'+that.otherId+'" type="text" required>\n' +
                '</div>\n' +
                '</div>\n' +
                '<div class="col-md-4">\n' +
                '<div class="form-group">\n' +
                '<input class="form-control" onKeyPress="if(this.value.length===7) return false;" id="value-'+that.otherId+'" type="number" required>\n' +
                '</div>\n' +
                '</div>');

        },
        addVideoUrlFields:function(){
            let that = this;
            let urls_dict = {};
            const index = generate_unique_number();
            urls_dict["url"] = "";
            urls_dict["index"] = index;
            urls_dict["title"] = "";
            urls_dict["type"] = "b";
            that.propertyVideos.push(urls_dict);
            //that.propertyVideos.push({"title":"", "type":"b","url":urls_dict["url"+index]});
        },
        removeVideoUrlFields:function(index){
            let that = this;
            that.propertyVideos.splice(index, 1)
        },
        addVideoUrlFieldsFloor:function(){
            
            let that = this;
            let urls_dict_floor = {};
            const index = generate_unique_number();
            urls_dict_floor["url"+index] = "";
            urls_dict_floor["index"] = index;
            urls_dict_floor["title"] = "";
            urls_dict_floor["type"] = "f";
            //that.floorPlanListOfVideoURLs[parseInt(this.currentEditingFloor)].push(urls_dict_floor);
            that.floorPlanEdit.videos.push(urls_dict_floor)
        },
        removeVideoUrlFieldsFloor:function(index){
            let that = this;
            that.floorPlanListOfVideoURLs[parseInt(this.currentEditingFloor)].splice(index, 1);
            that.floorPlanEdit.videos.splice(index, 1)
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
                listOfVal.push(parseFloat(this.value));
            });

            for(let i=0; i<listOfKey.length;i++){

                that.nearest[listOfKey[i]+""] = listOfVal[i];
            }
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
                '                                            <input type="number" onKeyPress="if(this.value.length===2) return false;" id="nearestList-distance-'+that.nearestId+'" class="form-control mb-20" required/>\n' +
                '                                        </div>');

            that.nearestId += 1;
        },
        loadCountryCodes: function(){
            let that = this;
            let country_codes = $('#select-country-code');
            country_codes.empty();
            country_codes.append('<option selected="true" disabled>Choose Country Code</option>');
            country_codes.prop('selectedIndex', 0);

            const url = '/api/country_codes/';

            // Populate dropdown with list of country codes
            $.getJSON(url, function (data) {
              $.each(data, function (key, entry) {
                country_codes.append($('<option></option>').attr('value', entry.id).text(entry.name));
              })
            });
        },
        loadOverlooking: function () {
            let that = this;
            that.processing = true;

             let overlookingElement = $('#select-overlooking');

            overlookingElement.select2({
                ajax: {
                url: "/api/overlooking/",
                headers: {
                    "Content-Type" : "application/json",
                },
                data: function (params) {
                    // "tax-policy"===urlParam?query={name:params.term}:"category"===urlParam?query={category:params.term}:"group"===urlParam?query={group:params.term}:"category/group"===urlParam?query={group:params.term}:"city"===urlParam?query={city:params.term}:"state"===urlParam?query={state:params.term}:"country"===urlParam?query={country:params.term}:"tag"===urlParam&&(query={country:params.term});
                    // return query;
                },
                processResults: function (data) {
                    const processed_data = $.map(data.results, function (obj) {
                        obj.text = obj['name'];
                        return obj;
                    });
                    return {
                        results: processed_data
                    };
                }
            },
                placeholder: "overlooking",
            }).on('select2:selecting select2:unselecting', function (e) {
                if (e.params.name === 'select') {
                    that.newProperty.overlookingList.push(e.params.args.data.id);
                }
                else if (e.params.name === 'unselect') {
                    that.newProperty.overlookingList.splice(_.indexOf(that.newProperty.overlookingList, e.params.args.data.id), 1)
                }
            });

        },
        get_overlooking: function(){
            let that = this;
            let overlooking = $('#select-overlooking');
            overlooking.empty();
            // overlooking.append('<option selected="true" id="overlooking-choose" disabled>Choose Any Option</option>');
            // overlooking.prop('selectedIndex', 0);

            const url = '/api/overlooking/';

            $.getJSON(url, function (data) {
              $.each(data, function (key, entry) {
                overlooking.append($('<option></option>').attr('value', entry.id).text(entry.name)).select2()

                //     .on('change', function () {
                //     if($(".select2-selection__choice").text() === "×Choose Any Option"){
                //         $(".select2-selection__choice").remove();
                //     }
                //     //that.newProperty.overlookingList = [];
                //     //that.newProperty.overlookingList.push($("#select-overlooking option:selected").text());
                //
                // })
                    .on('select2: selecting select:unselecting',function (e) {
                    if (e.params.name === 'select') {
                        that.newProperty.overlookingList.push(e.params.args.data.id);
                    }
                    else if(e.params.name === 'unselect'){
                        that.newProperty.overlookingList.splice(_.indexOf(that.newProperty.overlookingList, e.params.args.data.id), 1)
                    }
                });
              })
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
                    if (i>0 && actualSize > 500) {
                        alert("File size must be less than 500 kb, this file is too big " + actualSize + " " + unitArray[i]);
                        return
                    }
                    // Generate unique ID for all images
                    let image_id = generate_unique_number();;

                    // Read image and append into doc
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        that.propertyImages.imageList.push({"image":e.target.result,"type":"b", "title":"", "description":"", "defaultInGroup":false});
                        that.imageSlider.listLength += 1;
                    };
                    reader.readAsDataURL(input.target.files[index]);
                });
                that.propertyImages.isPreviewImageActive = true;
                $("#select-image-hidden").val("");
            } else {
                alert("No files were selected. Please select at least one file.");
            }
        },
        removeImage: function (imageIndex) {
            let that = this;
            that.propertyImages.imageList.splice(imageIndex, 1);
            that.imageSlider.listLength -= 1;
            (that.propertyImages.imageList.length === 0)? that.propertyImages.isPreviewImageActive = false: that.propertyImages.isPreviewImageActive = true;
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
                    if (i>0 && actualSize > 500) {
                        alert("File size must be less than 500 kb, this file is too big " + actualSize + " " + unitArray[i]);
                        return
                    }
                    // Generate unique ID for all images
                    let image_id = generate_unique_number();;

                    // Read image and append into doc
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        that.floorPlanEdit.imageList.push({"image":e.target.result,"type":"f", "title":"", "description":"", "defaultInGroup":false});
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
            that.floorPlanEdit.imageList.splice(imageIndex, 1);
            that.imageSlider.listLength -= 1;
            (that.floorPlanEdit.imageList.length === 0)? that.floorPlanEdit.isPreviewImageActive = false: that.floorPlanEdit.isPreviewImageActive = true;
        },
        addFloorPlan:function(){
            let that = this;
            let currentFloor = parseInt(that.currentEditingFloor);
            if(!that.floorPlanEdit.description){
                alert("Please fill a description")
                return
            }
            that.floorPlanListOfDescriptions[currentFloor] = that.floorPlanEdit.description;
            that.floorPlanListOfImagesList[currentFloor] = that.floorPlanEdit.imageList;
            that.floorPlanListOfVideoURLs[currentFloor] = that.floorPlanEdit.videos;

            //clear temporary floor plan
            _.each(_.keys(that.floorPlanEdit), function (item, index) {
                if(item === 'description'){
                    that.floorPlanEdit[item] = '';
                }
                else{
                    that.floorPlanEdit[item] = [];
                }

            });
            $("#floor-plan-modal").modal('hide');


        },
        clearFloorPlanEdit:function(){
            let that = this;
            //clear temporary floor plan
            _.each(_.keys(that.floorPlanEdit), function (item, index) {
                if(item === 'description'){
                    that.floorPlanEdit[item] = '';
                }
                else{
                    that.floorPlanEdit[item] = [];
                }

            })

        },
        populateFloorPlanEdit : function(floor){
            let that = this;
            
            that.floorPlanEdit.description = that.floorPlanListOfDescriptions[parseInt(that.currentEditingFloor)];
            that.floorPlanEdit.imageList = that.floorPlanListOfImagesList[parseInt(that.currentEditingFloor)];
            that.floorPlanEdit.videos = that.floorPlanListOfVideoURLs[parseInt(that.currentEditingFloor)];
        }

    },
    watch: {
        currentEditingFloor:function (newQuery, oldQuery) {
            this.populateFloorPlanEdit()
        }
    },
    mounted() {
        this.loadCountryCodes();
        this.loadOverlooking();
    },
    computed: {

  }
});
