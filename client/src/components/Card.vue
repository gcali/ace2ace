<template>
<div class="card" :style="{width: width + 'px', height: width * RATIO + 'px'}">
    <div class="value top-value">
        {{value}}
    </div>
    <div class="value bottom-value">
        {{value}}
    </div>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Card extends Vue {
  @Prop()
  public value: number = 0;
  public width: number = 100;
  private readonly RATIO: number = 1.5;
}
</script>

<style>
.card {
  border: 1px solid black;
  border-radius: 3px;
  position: relative;
}
.value {
  position: absolute;
}
.top-value {
  top: 10px;
  left: 10px;
}
.bottom-value {
  bottom: 10px;
  right: 10px;
}
</style>