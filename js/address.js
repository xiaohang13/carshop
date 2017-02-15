new Vue( {
    el: ".container",
    data: {
        addressList: [],
        showFlag: true,
        limit: 3,
        currentIndex: 0
    },
    mounted: function () {
        this.$nextTick( function () {
            Vue.config.devtools = true;
            this.viewAddress();
        })
    },
    computed: {
        filterAddressList: function () {
            return this.addressList.slice( 0, this.limit );
        }
    },
    filters: {

    },
    methods: {
        // 查看所有地址信息
        viewAddress: function () {
            this.$http.get( "data/address.json" ).then( res => {
                if ( res.body.status == 0 ) {
                    this.addressList = res.body.result;
                }
            });
        },
        // 展示更多地址
        moreAddress: function ( flag ) {
            if ( flag == true ) {
                this.limit = this.addressList.length;
                this.showFlag = false;
            } else {
                this.showFlag = true;
                this.limit = 3;
            }
        }
    }
});