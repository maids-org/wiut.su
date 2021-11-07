import { resolve } from 'path'
import { withDocus } from '@docus/app'

export default withDocus({
  rootDir: __dirname,
  head: {
    titleTemplate: 'WIUT SU - %s',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=DM+Serif+Display:ital@0;1&display=swap'
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' }
    ],
    meta: [
      { hid: 'og:site_name', property: 'og:site_name', content: 'WIUT SU' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@uwussimo' },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://nuxtjs.org/preview.png'
      },
      {
        hid: 'og:image:secure_url',
        property: 'og:image:secure_url',
        content: 'https://nuxtjs.org/preview.png'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'WIUT SU'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://nuxtjs.org/preview.png'
      }
    ],
    bodyAttrs: {
      class: ['min-w-xs']
    }
  },
  css: [resolve(__dirname, './assets/global.css')],
  build: {
    transpile: ['ohmyfetch'],
    loaders: {
      imgUrl: { limit: 0 }
    }
  },
  buildModules: [
    '@nuxt/typescript-build',
    'vue-plausible',
    '@docus/github',
    '@docus/twitter',
    process.env.RECAPTCHA_SITE_KEY ? '@nuxtjs/recaptcha' : undefined
  ].filter(_ => _),
  plugins: [
    '~/plugins/mq',
    '~/plugins/gtag.client',
    '~/plugins/clipboard.client',
    '~/plugins/v-tooltip.ts',
    '~/plugins/showcases',
    '~/plugins/nav',
    '~/plugins/timer'
  ],
  windicss: {
    root: resolve(__dirname),
    config: resolve(__dirname, 'windi.config.js')
  },
  /**
   * Add image domains for nuxt-image on Vercel
   */
  hooks: {
    generate: {
      async done() {
        try {
          if (!process.env.VERCEL) return

          const { copy } = await import('fs-extra').then(r => r.default || r)
          const src = resolve(__dirname, '.vercel_build_output')
          const dest = resolve(__dirname, '../.vercel_build_output')
          await copy(src, dest)
        } catch {
          // eslint-disable-next-line no-console
          console.log('Issue copying `.vercel_build_output` to project root.')
        }
      }
    }
  },
  vite: {
    server: {
      fs: {
        strict: false
      },
      optimizeDeps: {
        exclude: ['vue-demi', 'scule', '@vueuse/integrations', 'ohmyfetch'],
        include: ['defu', 'theme-colors', 'cookie', 'js-cookie', 'clipboard', 'property-information', 'ufo', 'url']
      }
    },
    optimizeDeps: {
      exclude: ['vue-demi', 'scule', '@vueuse/integrations', 'ohmyfetch'],
      include: ['defu', 'theme-colors', 'cookie', 'js-cookie', 'clipboard', 'property-information', 'ufo']
    }
  },
  image: {
    domains: [
      'pbs.twimg.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'github.com',
      'unsplash.com',
      'user-images.githubusercontent.com',
      'abs.twimg.com',
      'https://res.cloudinary.com/nuxt/',
      'npmjs.com',
      'cdn.krutiepatel.com',
      'i.imgur.com',
      'avatars0.githubusercontent.com',
      'avatars1.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars3.githubusercontent.com'
    ]
  },
  i18n: {
    langDir: 'i18n/',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.js',
        name: 'English'
      }
    ]
  },
  colorMode: {
    preference: 'system',
    fallback: 'light'
  },
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    plausible: {
      domain: process.env.PLAUSIBLE_DOMAIN
    },
    recaptcha: {
      version: 3,
      siteKey: process.env.RECAPTCHA_SITE_KEY
    }
  }
})
