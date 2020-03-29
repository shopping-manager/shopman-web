<template>
  <q-page class="page-col">
    <h2>Report a shortage</h2>

    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6 q-mb-sm">Your missing items</div>
        <div class="q-gutter-xs">
          <q-chip v-for="(item, k) in reportedItems" :key="k" removable @remove="removeItem(k)" color="primary" text-color="white" icon="o_local_pizza">
            {{item.name}}
          </q-chip>
          <q-chip v-if="reportedItems.length == 0" disabled label="Nothing selected"/>
        </div>
      </q-card-section>
    </q-card>


    <div class="row items-center q-mt-md" v-if="showChooser">
      <q-btn round color="primary" icon="o_arrow_upward" class="q-mr-md" @click="goUp" :disable="browseStack.size == 0"/>
      <q-breadcrumbs>
        <template v-slot:separator>
          <q-icon
            size="1.2em"
            name="arrow_forward"
          />
        </template>

        <q-breadcrumbs-el label="Home" icon="o_storefront" />
        <q-breadcrumbs-el :label="item" v-for="(item, k) in browseStack" :key="k"/>

      </q-breadcrumbs>
    </div>

    <div class="q-mt-xs row items-start q-gutter-md" v-if="showChooser">
      <q-card v-for="(item, k) in currentBrowseList" :key="k" class="item-card">
        <div v-ripple class="cursor-pointer relative-position card-ripple" @click="activateItem(item, k)">

        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          basic
          class="card-image"
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            {{item.name}}
          </div>
        </q-img>
        </div>
      </q-card>
    </div>

    <template v-if="showAddMoreScreen" >
      <p class="q-mt-xl" >Would you like to add another item to your report?</p>
      
      <div class="q-gutter-md q-mt-md">
        <q-btn color="accent" icon="o_playlist_add_check" rounded label="Submit report" @click="submitReport"/>
        <q-btn color="primary" icon="o_playlist_add" rounded label="Add another item" @click="addAnotherOne"/>
      </div>
    </template>

    <template v-if="reportDone">
      <q-icon name="o_sentiment_satisfied_alt" color="primary" style="font-size: 6rem;" />
      <h4>Thank you!</h4>

      <p>We will treat your report soon. We appreciate your efforts helping the community. Because we're all in this together!</p>
    </template>

  </q-page>
</template>

<style lang="sass">
.item-card
  max-width: 190px
  width: 100%
  overflow: hidden

.card-image
  opacity: 85%
  transition: opacity 0.1s ease-in-out

.item-card:hover .card-image
  opacity: 100%


.page-col
  margin-left: auto
  margin-right: auto
  max-width: 900px
  padding: 16px 46px
  margin-bottom: 64px
</style>

<script>
export default {
  name: 'ReportShortage',
  data() {
    return {

      showAddMoreScreen: false,
      showChooser: true,
      reportDone: false,

      reportedItems: [],

      currentBrowseList: [],
      browseStack: [],

      listItems: [
        {name: 'Food', subsections: 
          [
            {name:'Produce', subsections: 
              [
                {name:'Tomatoes'},
                {name:'Zucchini'},
                {name:'Onions'},
                {name:'Carrots'},
                {name:'Lettuce'},
                {name:'Potateos'},
                {name:'Peppers'},
                {name:'Apples'},
                {name:'Oranges'},
                {name:'Grapes'},
                {name:'Pears'},
                {name:'Lemons'},
                {name:'Bananas'},
              ]
            },
            {name:'Bread'},
            {name:'Butter'},
            {name:'Milk'},
            {name:'Pasta'},
            {name:'Rice'},
            {name:'Tomato sauce'},
            {name:'Biscuits'},
            {name:'Chocolate'},
            {name:'Flour'},
            {name:'Sugar'},
            {name:'Cheese'},
            {name:'Coffee'},
            {name:'Canned food'},
            {name:'Frozen pizza'},
            {name:'Frozen vegetables'},
          ] 
        },
        {name: 'Hygiene', subsections: 
          [
            {name:'Toilet paper'},
            {name:'Multi-use paper'},
            {name:'Sponge'},
            {name:'Dish soap'},
            {name:'Soap'},
            {name:'Shampoo'},
            {name:'Deodorant'},
            {name:'Laundry detergent'},
          ] 
        },
        {name: 'House supplies', subsections: 
          [
            {name:'Light bulb'},
            {name:'Paper'},
            {name:'Pen'},
            {name:'Pencil'},
            {name:'Printer ink'},
            {name:'Kitchenware'},
          ] 
        },
        {name: 'Pet supplies', subsections: 
          [
            {name:'Dog food'},
            {name:'Cat food'},
            {name:'Cat litter'},
          ] 
        },

      ]
    }
  },
  mounted: function() {
    this.activateRoot()
  },
  methods: {
    activateRoot: function() {
      this.browseToStack([])
    },

    removeItem: function(idx) {
      this.reportedItems.splice(idx, 1)
    },

    goUp: function() {
      let stack = this.browseStack
      this.browseStack.pop()
      stack.pop()
      this.currentBrowseList = this.listItems
      browseToStack([])
    },

    browseToStack: function(stack) {
      let list = this.listItems
      console.log(stack)
      stack.map(level => {
        let filtered = list.filter(item => {return item.name == level})
        if (filtered.length > 0 && 'subsections' in filtered[0]) {
          list = filtered[0].subsections
        }
      })
      this.browseStack = stack
      this.currentBrowseList = list
    },

    addItem(item) {
      this.reportedItems.push({name: item.name})
    },

    activateItem: function(item, k) {
      console.log(item.name)
      if ('subsections' in item) {
        let stack = this.browseStack
        console.log("Activate " + item.name)
        stack.push(item.name)
        this.browseToStack(stack)
      }
      else {
        // Add it and back to top
        console.log("Add item to list: " + item.name)
        this.addItem(item)
        this.activateRoot()
        this.showChooser = false
        this.showAddMoreScreen = true
      }
    },

    addAnotherOne: function() {

        this.showChooser = true
        this.showAddMoreScreen = false
    },

    submitReport: function() {
      this.showAddMoreScreen = false
      this.showChooser = false
      this.reportDone = true
    }
  }
}
</script>
