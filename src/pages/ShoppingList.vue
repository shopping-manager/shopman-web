<template>
  <q-page class="page-col">
    <h2>Shopping list</h2>
    <q-list bordered padding>
      <q-item v-for="(item, k) in listItems" :key="k">
        <q-item-section side top>
          <q-checkbox v-model="item.checked" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
        </q-item-section>


        <q-item-section side top>
          <q-btn round flat icon="o_delete" @click="removeItem(k)" />
        </q-item-section>
      </q-item>
    </q-list>

    <q-input v-model="newItemToAdd" label="Add another item" @keydown.enter.prevent="addEnterItem('myInput')" ref="myInput">
      <template v-slot:after>
        <q-btn round flat icon="o_add_shopping_cart" @click="addItem" />
      </template>
    </q-input>

  </q-page>
</template>

<style lang="sass">
.page-col
  margin-left: auto
  margin-right: auto
  max-width: 900px
  padding: 16px 46px
  margin-bottom: 64px
</style>

<script>
export default {
  name: 'ShoppingList',
  data() {
    return {
      newItemToAdd: "",
      listItems: [
        {name:'Bread', checked:true},
        {name:'Butter', checked:false},
        {name:'Milk', checked:false},
        {name:'Detergent', checked:false},
        {name:'Pasta', checked:false},
        {name:'Toilet paper', checked:false},
      ]
    }
  },
  methods: {
    addItem: function() {

      if (this.newItemToAdd.length == 0) {
        return
      }
      this.listItems.push(
        {
          name: this.newItemToAdd,
          checked: false
        }
      )
      this.newItemToAdd = ""
    },

    addEnterItem(refKey) {
      this.listItems.push(
        {
          name: this.newItemToAdd,
          checked: false
        }
      )
      this.newItemToAdd = "";
    },

    removeItem(idx) {
      this.listItems.splice(idx, 1)
    }
  }
}
</script>
