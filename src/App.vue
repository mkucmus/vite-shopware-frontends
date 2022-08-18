<script setup lang="ts">
import { useCart } from "@shopware-pwa/composables-next";
import { useSessionContext } from "@shopware-pwa/composables-next";
import { onMounted } from "vue";
import Products from "./components/Products.vue";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
const { refreshSessionContext } = useSessionContext();
const { count, refreshCart, totalPrice } = useCart();

onMounted(() => {
  refreshSessionContext();
  refreshCart();
});
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <h1 class="title">Vite + Vue</h1>

  <Transition name="bounce">
    <div :key="count" class="cart">
      products in cart: <strong>{{ count }}</strong
      ><br />
      total price: <strong>{{ totalPrice }} €</strong>
    </div>
  </Transition>
  <Products />
</template>

<style scoped>
.title {
  margin-bottom: 100px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.cart {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1em;
  font-size: 2em;
  line-height: 1.2em;
}

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
</style>
