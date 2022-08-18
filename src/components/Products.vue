<script setup lang="ts">
import { ref } from "vue";
import { useListing } from "@shopware-pwa/composables-next";
import Product from "../components/Product.vue";
const { search, getElements } = useListing({
  listingType: "productSearchListing",
});
const searchPhrase = ref("");

const invokeSearch = async () =>
  search({
    query: searchPhrase.value,
  });
</script>
<template>
  <h2>Find some products:</h2>
  <div class="sw-search-container">
    <input
      class="sw-search-input"
      type="text"
      v-model="searchPhrase"
      placeholder="type a product name"
      @keyup.enter="invokeSearch"
    />
    <div class="enter-hint">
      and press enter<br />(hint: phrase "<strong>chili</strong>" always works
      🙂)
    </div>
  </div>
  <transition name="bounce">
    <div
      class="sw-products-elements"
      :key="getElements.length"
      v-if="getElements.length > 0"
    >
      <Product
        v-for="product in getElements"
        :product="product"
        :id="product.id"
      />
    </div>
  </transition>
</template>
<style>
.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.enter-hint {
  color: rgb(88, 87, 87);
}

.sw-products-elements {
  margin-top: 2em;
}

.sw-search-container {
  width: 100%;
}

.sw-search-input {
  border-radius: 0.4em;
  text-align: center;
  font-size: large;
  font-weight: bold;
  padding: 1.2em 0.7em;
}
</style>
