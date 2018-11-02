let website_contact_app = new Vue({
    el: "#website-contact-app",
    data: {
        contactName: '',
        contactEmail: '',
        contactMessage: ''

    },
    methods: {
        sendEmail: function () {
            let that = this;
            let body = {
                "name": that.contactName,
                "email": that.contactEmail,
                "message": that.contactMessage
            };
            axios.post('/api/customer_leads/', body)
            .then(function (response) {
                // show_notification("success", "Property Successfully Created.");

            })
            .catch(function (response) {
                alert("error occured.");
                // show_notification("danger", "A fatal error occurred, and this page might not function correctly.")
            })
        }
    },
    watch: {

    },
    mounted() {


    },
    computed: {

  }
});
