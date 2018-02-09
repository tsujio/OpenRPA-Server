<template>
<div class="condition-node">
  <div class="shape-upper">
    <div class="name">
      <slot name="name" />
    </div>
  </div>
  <div class="shape-lower"></div>
</div>
</template>

<script>
export default {
  name: 'rpa-condition-node',

  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import './node-mixin';

.shape-upper, .shape-lower {
    height: 0;
    width: 0;
    border-left: calc(#{$node-width} / 2) solid transparent;
    border-right: calc(#{$node-width} / 2) solid transparent;
}

.shape-upper {
    border-bottom: 30px solid #346789;
    position: relative;
}

.shape-lower {
    border-top: 30px solid #346789;
}

.name {
    position: absolute;
    min-width: $node-width;
    left: calc(-1 * #{$node-width} / 2);
    top: calc(30px / 2);
    text-align: center;
}
</style>
