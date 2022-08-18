import type { App, Plugin } from "vue";
import { createInstance } from "@shopware-pwa/shopware-6-client";
import { createShopware } from "@shopware-pwa/composables";
import { ref } from "vue";
import Cookies from "js-cookie";

type ShopwareFrontendsOptions = {
  shopwareEndpoint: string;
  shopwareAccessToken: string;
  apiDefaults: any;
  shopwareApiClient: {
    timeout: number;
  };
};

export default {
  install: (app: App, options: ShopwareFrontendsOptions) => {
    const cookieContextToken = Cookies.get("sw-context-token");
    const cookieLanguageId = Cookies.get("sw-language-id");

    const contextToken = ref(cookieContextToken);
    const languageId = ref(cookieLanguageId);

    const instance = createInstance({
      endpoint: options.shopwareEndpoint,
      accessToken: options.shopwareAccessToken,
      timeout: options.shopwareApiClient?.timeout || 5000,
      contextToken: contextToken.value,
      languageId: languageId.value,
    });

    /**
     * Save current contextToken when its change
     */
    instance.onConfigChange(({ config }) => {
      try {
        Cookies.set("sw-context-token", config.contextToken || "", {
          expires: 365,
          sameSite: "Lax",
          path: "/",
        });
        Cookies.set("sw-language-id", config.languageId || "", {
          expires: 365,
          sameSite: "Lax",
          path: "/",
        });

        contextToken.value = config.contextToken;
        languageId.value = config.languageId;
      } catch (e) {
        // Sometimes cookie is set on server after request is send, it can fail silently
      }
    });

    const shopwareContext = createShopware(app, {
      apiInstance: instance,
      enableDevtools: true,
      shopwareDefaults: options?.apiDefaults || {},
    });

    app.provide("shopware", shopwareContext);
    app.provide("swSessionContext", ref());
  },
} as Plugin;
