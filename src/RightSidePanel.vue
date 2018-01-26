<template>
<div class="right-side-panel">
  <div class="upper">
    <slot name="upper"></slot>
  </div>
  <div class="lower">
    <slot name="lower"></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'rpa-right-side-panel',
}
</script>

<style lang="scss" scoped>
@import './theme';

.right-side-panel {
    position: fixed;
    top: 64px;
    right: 0;
    bottom: 0;
    width: 300px;
    box-sizing: border-box;
}

.upper,
.lower {
    height: calc((100vh - 64px) / 2);
    overflow: auto;
    border-left: 1px solid $rpa-background-dark;
}

.upper {
    border-bottom: 1px solid $rpa-background-dark;
}
</style>
