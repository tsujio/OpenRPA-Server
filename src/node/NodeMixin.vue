<script>
import uuidv4 from 'uuid/v4'

export default {
  props: ['id', 'type', 'displayType', 'name'],

  methods: {
    createNodeInstance(nodeInfo) {
      const copy = JSON.parse(JSON.stringify(nodeInfo))

      return Object.assign(copy, {
        id: uuidv4(),
        name: copy.displayType,
      })
    },
  }
}
</script>
