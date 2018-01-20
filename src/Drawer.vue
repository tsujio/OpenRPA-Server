<template>
<div class="drawer">
  <mdc-drawer temporary :toggle-on="drawerEvent">
  </mdc-drawer>
</div>
</template>

<script>
export default {
  name: 'rpa-drawer',

  props: ['drawerEvent'],
}
</script>
