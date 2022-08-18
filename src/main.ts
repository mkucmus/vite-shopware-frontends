import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ShopwareFrontends from "./plugins/vue-shopware-frontends";
const app = createApp(App);

app.use(ShopwareFrontends, {
  shopwareEndpoint: "https://demo-frontends.swstage.store",
  shopwareAccessToken: "SWSCBHFSNTVMAWNZDNFKSHLAYW",
  apiDefaults: {},
});
app.mount("#app");
