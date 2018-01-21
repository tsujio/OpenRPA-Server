<script>
export default {
  props: ['id', 'type', 'displayType', 'name'],

  created() {
    const self = this

    this.$root.$on('update:nodeproperty', function(node) {
      if (node.id === self.id) {
        self.$emit('update:node', node)
      }
    })
  },

  methods: {
    toJSON() {
      return JSON.parse(JSON.stringify(this.$props))
    },

    onClick() {
      this.$root.$emit('node.click', this)
    }
  }
}
</script>
