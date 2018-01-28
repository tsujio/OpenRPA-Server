<script>
export default {
  props: ['id', 'type', 'displayType', 'name'],

  data() {
    return {
      isSelected: false,
      isDragged: false
    }
  },

  created() {
    const self = this

    this.$root.$on('focus:node', function(node) {
      if (self.id === node.id) {
        self.isSelected = true

        self.$root.$emit('select:node', self)
      } else {
        self.isSelected = false
      }
    })

    this.$root.$on('update:nodeproperty', function(node) {
      if (node.id === self.id) {
        self.$emit('update:node', node)
      }
    })
  },

  methods: {
    serialize() {
      return JSON.stringify(this.$props)
    },

    toJSON() {
      return JSON.parse(this.serialize())
    },

    onDragStart(e) {
      this.isDragged = true

      e.dataTransfer.setData('text', this.serialize())
    },

    onDragEnd() {
      this.isDragged = false
    },

    onFocus() {
      this.$root.$emit('focus:node', this)
    },

    onDeleteKeyDown() {
      this.$root.$emit('remove:node', this)
    },
  }
}
</script>
