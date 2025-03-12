Vue.component('product-details', {
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,

    props: {
        details: {
            type: Array,
            required: true
        }
    },
})

Vue.component('product', {
    template: `
    <div class="product">

        <div class="product-image">
            <img :src="image" :alt="altText">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ description }}</p>

            <p v-if="inStock">In stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else :class="{ stock: !inStock }">Out of Stock</p>

            <span v-show="onSale">On Sale</span><br><br>
            <p>{{ sale }}</p>

            <a :href="link">More products like this</a>

            <product-details :details="details"></product-details>
            <p>Shipping: {{ shipping }}</p>

            <div class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)">
            </div>

            <ul v-for="size in sizes">
                <li>{{ size }}</li>
            </ul>

<!--            <div class="cart">-->
<!--                <p>Cart({{ cart }})</p>-->
<!--            </div>-->

            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">
                Add to cart
            </button>
            <button v-on:click="removeFromCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">
                    Remove from cart
            </button>
        </div>

    </div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    data(){
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: "A pair of warm, fuzzy socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            selectedVariant: 0,
            altText: "A pair of socks",
            inventory: 0,
            onSale: true,
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0
                }
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',
            this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },

        removeFromCart() {
            this.$emit('remove-from-cart',
                this.variants[this.selectedVariant].variantId);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image(){
            return this.variants[this.selectedVariant].variantImage;
        },

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },

        sale(){
            return this.brand + ' ' + this.product + ': ' + (this.onSale ? 'on Sale' : 'off Sale');
        },

        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },

    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        cart: [],
    },

    methods: {
        updateCart(id) {
            this.cart.push(id);
        },

        removeFromCart(id) {
            this.cart.splice(this.cart.indexOf(id), 1);
        },
    }
})



