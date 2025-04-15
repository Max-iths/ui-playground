<template>
  <unscramble />
  <InsectAdventure />
</template>

<script>
import unscramble from "../components/unscramble.vue";

import InsectAdventure from "../components/InsectAdventure.vue";


export default {
  name: "Home",
  components: {
    unscramble,
    InsectAdventure,
  },
};
</script>

<style scoped></style>
