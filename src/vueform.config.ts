import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'
import MaskPlugin from '@vueform/plugin-mask'

// You might place these anywhere else in your project
import '@vueform/vueform/dist/vueform.css';

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
  plugins: [
    MaskPlugin,
  ],
  endpoint: false,
  endpoints: {
    submit: {
      url: '/form/submit',
      method: 'post'
    }
  }

  
})