<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ name: 'Components' })
export default class Components extends Vue {
  @Prop({ type: String, default: '' }) private readonly msg!: string
}
</script>

<style lang="scss" scoped></style>
