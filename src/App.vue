<template>
<div class="app">
  <mdc-layout-app>
    <mdc-toolbar slot="toolbar" fixed>
      <mdc-toolbar-row>
        <mdc-toolbar-section align-start >
          <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
          <mdc-toolbar-title>Drawer Exemple</mdc-toolbar-title>
        </mdc-toolbar-section>
      </mdc-toolbar-row>
    </mdc-toolbar>
    <mdc-drawer slot="drawer" toggle-on="toggle-drawer">
      <mdc-drawer-list>
        <mdc-drawer-item start-icon="inbox">Inbox</mdc-drawer-item>
        <mdc-drawer-item start-icon="send">Sent Mail</mdc-drawer-item>
        <mdc-drawer-item start-icon="drafts">Drafts</mdc-drawer-item>
      </mdc-drawer-list>
    </mdc-drawer>
    <main class="content" >
    </main>
  </mdc-layout-app>
</div>
</template>

<script>
  export default {
    name: 'app',

    data () {
      return {
        msg: 'hello',
      };
    },
  }
</script>
