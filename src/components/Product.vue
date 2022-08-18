<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  useCart,
  useShopwareContext,
  useAddToCart,
} from "@shopware-pwa/composables-next";
import type { LineItem, Product } from "@shopware-pwa/types";

const props = defineProps<{ product: Product }>();
const { refreshCart, removeItem } = useCart();
const { apiInstance } = useShopwareContext();
const { addToCart, isInCart } = useAddToCart({
  product: props.product,
});

const addToCartProxy = async () => {
  await addToCart();
};
const removeFromCart = async () => {
  await removeItem({ id: props.product.id } as LineItem);
};
onMounted(() => {
  refreshCart();
});

const count = ref(0);
</script>

<template>
  <div class="sw-product-card">
    <span class="name"
      >{{ product.translated?.name }} ({{
        product.calculatedPrice.unitPrice
      }}
      €)</span
    >
    <button @click="addToCartProxy" class="sw-add-to-cart-item">
      Add to cart
    </button>
    <button v-if="isInCart" class="sw-remove-item" @click="removeFromCart()">
      x
    </button>
  </div>
</template>
<style>
.sw-product-card {
  padding: 5px;
}
.sw-product-card .name {
  font-size: 1.2em;
  font-weight: bold;
}
.sw-remove-item {
  margin-left: 10px;
  background: #ff5e5e;
  color: #fff;
}
.sw-add-to-cart-item {
  margin-left: 10px;
  background: #42b883;
  color: #fff;
}
</style>
