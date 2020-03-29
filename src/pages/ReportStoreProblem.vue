<template>
  <q-page class="page-col">
    <h2>Report problem in a store</h2>

    <template v-if="!reportDone">
    <p>For which reason would you like to report a problem about this store?</p>

    <q-list bordered padding>


      <q-item tag="label" v-ripple v-for="(item, k) in listItems" :key="k">
        <q-item-section avatar>
          <q-radio v-model="chosenReason" :val="item.val"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{item.name}}</q-item-label>
          <q-item-label caption>{{item.desc}}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>

    <q-btn color="accent" icon="o_send" rounded label="Submit report" @click="submitReport" class="q-mt-md"/>
    </template>

    <template v-if="reportDone">


    <q-icon name="o_sentiment_satisfied_alt" color="primary" style="font-size: 6rem;" />
    <h4>Thank you!</h4>

    <p>We will treat your report soon. We appreciate your efforts helping the community. Because we're all in this together!</p>
    </template>

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
  name: 'ReportStoreProblem',
  data() {
    return {
      reportDone: false,
      chosenReason: 'cleanliness',
      listItems: [
        {
          name:'Closed', 
          val:'closed', 
          desc:'Store has ceased business for the duration of the crisis, although is is shown open on this service.'
        },
        {
          name:'Severely short on supplies', 
          val:'routine_shortage', 
          desc:'Store has shortages of essential items in many sections.'
        },
        { 
          name:'Unhygienic', 
          val:'hygiene', 
          desc:'Cleanliness is not treated seriously. '
        },
        {
          name:'Bad service', 
          val:'bad_service', 
          desc:'Store associates do not offer good service to guests. They are rude or deny some help when it is needed. The current times are difficult for everybody; a little bit of good service makes the day better for everyone.'
        },
        {
          name:'Overly crowded', 
          val:'no_social_distancing', 
          desc:'Patrons do not respect the social distancing measures. Store employees do not take care of enforcing them. Crowding is excessive'
        },
        {
          name:'Price hike / speculation', 
          val:'speculation', 
          desc:'Essential items are priced much higher than usual (beyond normal cost increases due to more challenging supply). Shop owner may take advantage of the situation.'
        }
      ]
    }
  },
  methods: {
    submitReport: function() {
      this.reportDone = true
    }
  }
}
</script>
