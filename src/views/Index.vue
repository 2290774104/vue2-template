<template>
  <div>
    <div>index</div>
    <components msg="components1" />
    <components msg="components2" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Components from '@/components/Index.vue';

@Component({ name: 'Index', components: { Components } })
export default class Index extends Vue {
  private created() {
    console.log(this.$utils.util());
  }
}
</script>

<style lang="scss" scoped></style>
