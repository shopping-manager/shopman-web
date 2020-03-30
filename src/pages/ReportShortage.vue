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
          :src="item.name in imageTable ? imageTable[item.name] : imageDefault"
          basic
          class="card-image"
          :ratio="1"
        >
          <div class="absolute-bottom card-image-cap text-subtitle2 text-center">
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

.q-img__content .card-image-cap
  font-weight: 400
  padding: 4px

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

      imageDefault: 'statics/itempics/nathalia-rosa-rWMIbqmOxrY-unsplash.jpg',
      imageTable: {
        'Apples' : "statics/itempics/matheus-cenali-wXuzS9xR49M-unsplash.jpg",
        'Pasta' : "statics/itempics/chuttersnap-ycnyotoyk8o-unsplash.jpg",
        'Pharmacy' : "statics/itempics/enecta-cannabis-extracts-8yF6aQ3NL7w-unsplash.jpg",
        'Toilet paper' : "statics/itempics/erik-mclean-GNHkPsONmac-unsplash.jpg",
        'Coffee' : "statics/itempics/estela-shaddix-kzkH7Vh11fs-unsplash.jpg",
        'Carrots' : "statics/itempics/harshal-s-hirve-yNB8niq1qCk-unsplash.jpg",
        'Produce' : "statics/itempics/ja-ma--gOUx23DNks-unsplash.jpg",
        'Pears' : "statics/itempics/jonathan-mast-RW6Wz9QaoKk-unsplash.jpg",
        'Cooking oil' : "statics/itempics/jonathan-ocampo-iCgfwfqgdzo-unsplash.jpg",
        'Flour' : "statics/itempics/kristiana-pinne-FL8NSCfvty0-unsplash.jpg",
        'Cat food' : "statics/itempics/ramiz-dedakovic-9SWHIgu8A8k-unsplash.jpg",
        'Eggs' : "statics/itempics/rebekah-howell-A4z0UBgAwyc-unsplash.jpg",
        'Soap' : "statics/itempics/ruby-tGSr_dzVBZw-unsplash.jpg",
        'Pet supplies' : "statics/itempics/tran-mau-tri-tam-7QjU_u2vGDs-unsplash.jpg",
        'Dog food' : "statics/itempics/victor-grabarczyk-N04FIfHhv_k-unsplash.jpg",
        'Sponge' : "statics/itempics/volodymyr-hryshchenko-WU9dA3C4R28-unsplash.jpg",
        'Cat litter' : "statics/itempics/wolfgang-hasselmann-VH8QlHCkZ-U-unsplash.jpg",
        'Masks' : "statics/itempics/de-an-sun-gki8YD94Qg0-unsplash.jpg",
        'Disinfectant' : "statics/itempics/enecta-cannabis-extracts-8yF6aQ3NL7w-unsplash.jpg",
        'Milk' : "statics/itempics/gabi-miranda-dxb_HSjoQ40-unsplash.jpg",
        'Bread' : "statics/itempics/wesual-click-rsWZ-P9FbQ4-unsplash.jpg",
        'Sugar' : "statics/itempics/sharon-mccutcheon-oKay0q7Pa30-unsplash.jpg",
        'House supplies' : "statics/itempics/scott-webb-1ddol8rgUH8-unsplash.jpg",
        'Rice': "statics/itempics/pille-riin-priske-xmuIgjuQG0M-unsplash.jpg",
        'Cheese': "statics/itempics/waldemar-brandt-kPqaqug998Y-unsplash.jpg",
        'Chocolate': "statics/itempics/charisse-kenion-tWe8ib-cnXY-unsplash.jpg",
        'Biscuits': "statics/itempics/christina-branco-7P-wc2Z2Ujs-unsplash.jpg",
        'Frozen pizza': "statics/itempics/alan-hardman-SU1LFoeEUkk-unsplash.jpg",
        'Tomato sauce': "statics/itempics/sara-dubler-SdxnUyHEKGY-unsplash.jpg",
        'Canned food': "statics/itempics/calle-macarone-Vl78eNdiJaQ-unsplash.jpg",
        'Food': "statics/itempics/angelo-pantazis-1uIy-v4OlIk-unsplash.jpg",
        'Hygiene': "statics/itempics/curology-29wToZsX0Is-unsplash.jpg",
        'Lettuce': "statics/itempics/agence-producteurs-locaux-damien-kuhn-fd05H8aHoXY-unsplash.jpg",
        'Lemons': "statics/itempics/bannon-morrissy-DlIf_0GR_nM-unsplash.jpg",
        'Oranges': "statics/itempics/bannon-morrissy-kgkhD_kPSzQ-unsplash.jpg",
        'Potatoes': "statics/itempics/lars-blankers-B0s3Xndk6tw-unsplash.jpg",
        'Onions': "statics/itempics/lars-blankers-pmS8XSz5NU0-unsplash.jpg",
        'Peppers': "statics/itempics/martin-adams-_LGlGi3KJIA-unsplash.jpg",
        'Printer ink': "statics/itempics/museums-victoria-bat9Y6pSoTI-unsplash.jpg",
        'Grapes': "statics/itempics/rajesh-rajput-y2MeW00BdBo-unsplash.jpg",
        'Bananas': "statics/itempics/waldemar-brandt-kV3GEmrSp8k-unsplash.jpg",
        'Pen': "statics/itempics/steve-johnson-htqCupyYlCQ-unsplash.jpg",
        'Light bulb': "statics/itempics/federico-bottos-TuAtSs8peoM-unsplash.jpg",
        'Paper': "statics/itempics/brandi-redd-aJTiW00qqtI-unsplash.jpg",
        'Tomatoes': "statics/itempics/lars-blankers-6Z7Ss9jlEL0-unsplash.jpg",
      },

      listItems: [
        {name: 'Food', subsections: 
          [
            {name:'Produce', subsections: 
              [
                {name:'Tomatoes'},
                {name:'Onions'},
                {name:'Carrots'},
                {name:'Lettuce'},
                {name:'Potatoes'},
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
            {name:'Eggs'},
            {name:'Milk'},
            {name:'Pasta'},
            {name:'Rice'},
            {name:'Tomato sauce'},
            {name:'Biscuits'},
            {name:'Chocolate'},
            {name:'Cooking oil'},
            {name:'Flour'},
            {name:'Sugar'},
            {name:'Cheese'},
            {name:'Coffee'},
            {name:'Canned food'},
            {name:'Frozen pizza'},
          ] 
        },
        {name: 'Hygiene', subsections: 
          [
            {name:'Toilet paper'},
            {name:'Sponge'},
            {name:'Soap'},
          ] 
        },
        {name: 'House supplies', subsections: 
          [
            {name:'Light bulb'},
            {name:'Paper'},
            {name:'Pen'},
            {name:'Printer ink'},
          ] 
        },        
        {name: 'Pharmacy', subsections: 
          [
            {name:'Masks'},
            {name:'Disinfectant'},
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
