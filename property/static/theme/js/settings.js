let settings_app = new Vue({

    el:"#setting-app",
    data:{
        banner:{
            fields:[]
        },
        testimonials: undefined,
        processing: true
    },
    methods:{
        addBannerFields:function(){
            let that = this;
            let urls_dict = {};
            const index = generate_unique_number();
            urls_dict["url"] = "";
            urls_dict["index"] = index;
            urls_dict["title"] = "";
            urls_dict["type"] = "b";
            that.banner.fields.push(urls_dict);
            //that.propertyVideos.push({"title":"", "type":"b","url":urls_dict["url"+index]});
        },
        removeBannerFields:function(index){
            let that = this;
            that.banner.fields.splice(index, 1)
        },
        getBannerInfo:function () {
            let that = this;
            axios.get('/api/settings/banner/')
                .then(function (response) {
                    that.processing=false;
                    that.banner.fields = response.data.results;
                })
                .catch(function (response) {
                    // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
                })
        },
        postBannerInfo: function () {
            let that = this;
            axios.post('/api/settings/banner/', that.banner.fields)
                .then(function (response) {
                    show_notification("success", "Banner Updated Successfully!");
                    that.processing=false;
                    this.getBannerInfo();
                })
                .catch(function (response) {
                    // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
                })
        },
        getTestimonails: function () {
            let that = this;
            axios.get('/api/settings/testimonial/')
                .then(function (response) {
                    that.processing=false;
                    that.testimonials = response.data.results;
                })
                .catch(function (response) {
                    // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
                })
        },
        addTestimonialFields:function(){
            let that = this;
            let urls_dict = {};
            const index = generate_unique_number();
            urls_dict["name"] = "";
            urls_dict["index"] = index;
            urls_dict["message"] = "";
            urls_dict["city"] = "";
            that.testimonials.push(urls_dict);
            //that.propertyVideos.push({"title":"", "type":"b","url":urls_dict["url"+index]});
        },
        removeTestinomialFields:function(index){
            let that = this;
            that.testimonials.splice(index, 1)
        },
        postTestimonails: function () {
            let that = this;
            axios.post('/api/settings/testimonial/', that.testimonials)
                .then(function (response) {
                    that.processing=false;
                    that.testimonials = response.data.results;
                })
                .catch(function (response) {
                    // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
                })
        },
    },
    watch:{

    },
    mounted(){
        this.getBannerInfo();
        this.getTestimonails();
    }
});
