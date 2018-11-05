<template>
<div class="code-wrapper">
    <pre>{{content}}</pre>
 </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class ApiOutput extends Vue {
  @Prop()
  public content: string = "";
  mounted() {
    axios
      .get("http://localhost:3000/serialized/fulldeck")
      .then(
        response => (this.content = JSON.stringify(response.data, null, 4))
      );
  }
}
</script>

<style>
.code-wrapper {
  border: 1px solid black;
  background-color: darkslategray;
  color: white;
  text-align: left;
}
</style>