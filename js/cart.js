new Vue( {
    el: "#app",
    data: {
        productList: [],
        AllCheck: false,
        showFlag: false,
        curProduct: null
    },
    filters: {
        // 格式化金额
        formatMoney: function ( value ) {
            if ( value == null ) {
                return;
            }
            return "￥" + value.toFixed( 2 ) + "元";
        }
    },
    computed: {
        // 计算总金额
        totalMoney: function () {
            var total = 0;
            this.productList.forEach( function ( value, index ) {
                total += value.productPrice * value.productQuentity;
            });
            return total;
        }
    },
    // 页面初始化完成后加载
    mounted: function () {
        this.$nextTick( function () {
            Vue.config.devtools = true;
            this.cartView();
        });
    },
    methods: {
        cartView: function () {
            this.$http.get( "data/cartData.json" ).then( res => {
                this.productList = res.body.result.list;
            });
        },
        // 修改商品数量
        changeNum: function ( item, type ) {
            if ( type < 0 ) {
                if ( item.productQuentity < 2 ) {
                    item.productQuentity = 1;
                } else {
                    item.productQuentity--;
                }
            } else {
                item.productQuentity++;
            }
        },
        // 单选商品
        selectProduct: function ( item ) {
            console.log( item );
            if ( typeof item.checked == 'undefined' ) {
                this.$set( item, 'checked', true );
            } else {
                item.checked = !item.checked;
            }
        },
        // 选中/取消所有商品
        selectAllProduct: function ( flag ) {
            var that = this;
            that.AllCheck = flag;
            this.productList.forEach( function ( product ) {
                // 默认此选项属性是undefined，未定义
                if ( typeof product.checked == 'undefined' ) {
                    that.$set( product, 'checked', flag );
                } else {
                    product.checked = flag;
                }
            })
        },
        // 刪除按鈕
        delConfirm: function ( item ) {
            this.showFlag = true;
            this.curProduct = item;
        },
        // 刪除商品
        delProduct: function () {
            var index = this.productList.indexOf( this.curProduct );
            // splice() 方法用于插入、删除或替换数组的元素
            this.productList.splice( index, 1 );
            this.showFlag = false;
        }
    }
});
