let website_contact_app = new Vue({
    el: "#website-contact-app",
    data: {
        contactName: '',
        contactEmail: '',
        contactMessage: '',
        partnerType: 'owner'

    },
    methods: {
        sendEmail: function () {
            let that = this;
            if (!that.contactName && !that.contactEmail && !that.contactMessage){
                alert("Please fill all information!")
            }
            let body = {
                "name": that.contactName,
                "email": that.contactEmail,
                "message": that.contactMessage,
                "partner_type": that.partnerType
            };
            axios.post('/api/customer_leads/', body)
            .then(function (response) {
                alert("Your request has been received.")

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


    },
    computed: {

  }
});
