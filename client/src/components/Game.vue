<template>
<div class="main-wrapper">
    <p>Game</p>
    <card value="12"></card>
    <api-output></api-output>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/Card.vue";
import ApiOutput from "@/components/ApiOutput.vue";
@Component({
  components: {
    card: Card,
    apiOutput: ApiOutput
  }
})
export default class Game extends Vue {}
</script>

<style>
.main-wrapper {
  display: inline-block;
}
</style>