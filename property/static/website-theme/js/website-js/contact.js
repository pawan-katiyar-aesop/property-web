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
            if (!that.contactName || !that.contactEmail || !that.contactMessage){
                show_notification("danger", "Please fill all information!");
            }
            else{
                let body = {
                    "name": that.contactName,
                    "email": that.contactEmail,
                    "message": that.contactMessage,
                    "partner_type": that.partnerType
                };
                axios.post('/api/customer_leads/', body)
                .then(function (response) {

                    show_notification("success", "Thank you for your message. We will connect with you shortly.");

                })
                .catch(function (response) {
                    show_notification("danger", "Invalid Email!");
                })
            }
        }
    },
    watch: {

    },
    mounted() {

    },
    computed: {

  }
});
