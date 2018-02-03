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
    top: $rpa-toolbar-height;
    right: 0;
    bottom: 0;
    width: $rpa-right-side-panel-width;
    box-sizing: border-box;
}

.upper,
.lower {
    height: calc((100vh - #{$rpa-toolbar-height}) / 2);
    overflow: auto;
    background: $rpa-background;
    border-left: 1px solid $rpa-background-dark;
}

.upper {
    border-bottom: 1px solid $rpa-background-dark;
}
</style>
