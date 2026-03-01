import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { menuRegistry } from '@menu'
import { AdminMenuBuilder } from '@admin'
import { UserMenuBuilder } from '@user'
import { LanguageMenuBuilder } from "@/packages/vue-language";
import { MediaMenuBuilder } from "@media";
import { CmsMenuBuilder } from "@cms";
import { RssWatcherMenuBuilder } from "@rss-watcher";

menuRegistry.register(new AdminMenuBuilder())
menuRegistry.register(new UserMenuBuilder())
menuRegistry.register(new LanguageMenuBuilder())
menuRegistry.register(new MediaMenuBuilder())
menuRegistry.register(new CmsMenuBuilder())
menuRegistry.register(new RssWatcherMenuBuilder())

createApp(App).use(router).mount('#app')
