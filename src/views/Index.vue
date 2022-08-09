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
import { httpGetTest } from '@/api/test';

@Component({ name: 'Index', components: { Components } })
export default class Index extends Vue {
  private async created() {
    console.log(this.$utils.util());
    const res = await httpGetTest({ a: 1 });
    console.log(res);
  }
}
</script>

<style lang="scss" scoped></style>
