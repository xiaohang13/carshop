new Vue( {
    el: ".container",
    data: {
        addressList: []
    },
    mounted: function () {
        this.$nextTick( function () {
            Vue.config.devtools = true;
            this.viewAddress();
        })
    },
    filters: {

    },
    methods: {
        // 查看所有地址信息
        viewAddress: function () {
            this.$http.get( "data/address.json" ).then( res => {
                this.addressList = res.body.result;
            });
        }
    }
});