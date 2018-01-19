<template>
<div class="drawer">
  <mdc-drawer temporary="true" :toggle-on="drawerEvent">
  </mdc-drawer>
</div>
</template>

<script>
export default {
  name: 'rpa-drawer',

  props: ['drawerEvent'],
}
</script>
