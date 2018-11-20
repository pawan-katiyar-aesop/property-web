let wabout_app = new Vue({
    el: "#about-app",
    data: {
        testimonials: undefined
    },
    methods: {
        getTestimonails: function () {
            let that = this;
            axios.get('/api/settings/testimonial/')
            .then(function (response) {
                that.testimonials = response.data.results;
                // show_notification("success", "Property Successfully Created.");
            })
            .catch(function (response) {
                alert("Invalid Email!");
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        }
    },
    watch: {

    },
    mounted() {
        this.getTestimonails();
    },
    computed: {

  }
});
