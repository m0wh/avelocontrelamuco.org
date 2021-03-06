<template>
  <div class="layout-default">
    <Header ref="header" />
    <slot class="avclm-main" />
    <Footer v-if="footer" @special="$refs.helper.toggle()" />
    <GridHelper ref="helper" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import GridHelper from '../components/GridHelper.vue'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { CustomEase } from 'gsap/CustomEase'

Component.registerHooks([
  // 'beforeRouteEnter',
  'beforeRouteLeave'
  // 'beforeRouteUpdate'
])

@Component({
  components: {
    Header,
    Footer,
    GridHelper
  }
})
export default class DefaultLayout extends Vue {
  @Prop({ type: Boolean, default: true }) footer?: boolean

  mounted () {
    gsap.registerPlugin(ScrollToPlugin, CustomEase)

    const cubicBezierRegex = /cubic-bezier\(([0-9]*?\.?[0-9]*?, ?[0-9]*?\.?[0-9]*?, ?[0-9]*?\.?[0-9]*?, ?[0-9]*?\.?[0-9]*?)\)/
    const bezier: string = (window.getComputedStyle(document.documentElement).getPropertyValue('--main-easing').match(cubicBezierRegex) as string[])[1]
    CustomEase.create('main', bezier)
  }
}
</script>

<style lang="scss">
@include reset;
@include layout;

body {
  font-style: normal;
  background-color: #fff;

  p {
    margin: 0;
    font-size: 15px;
    @include lh(2);
  }

  * {
    font-weight: $font-weight;
    font-family: $font;
  }

  em {
    font-style: normal;
    font-family: $font-alt;
  }

  :not(.logo) > a:hover {
    &, * {
      font-style: italic;
    }
  }
}
</style>
