<template>
  <div class="gmap-wrapper">
    <GmapMap 
      class="gmap"
      :center="center"
      :zoom="13"
      ref="map"

      :options="mapOptions"
      >

        <gmap-custom-marker :marker="m.position"
          @click.native="toggleInfoWindow(m, index)"
          :key="index"
          v-for="(m, index) in markers"
        >
          <div :class="'gmap-marker busy-' + m.busy">

            <q-icon
              :name="iconMap[m.type]" class="gmap-marker-icon"
            />
          </div>
        </gmap-custom-marker>

      <GmapInfoWindow  :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
        <div v-html="infoContent"></div>
      </GmapInfoWindow>

    </GmapMap>

  </div>
</template>

<style lang="sass">

.gmap-wrapper
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0

.gmap
  width: 100%
  height: 100%

.gmap-marker
  height: 40px
  width: 40px
  background-color: #999
  border-radius: 10px
  cursor: pointer
  display: flex
  justify-content: center
  align-items: center
  transition: 0.1s ease-in-out

  &.busy-1
    background-color: #3BDF04
  &.busy-2
    background-color: #B8F402
  &.busy-3
    background-color: #FFFF00
  &.busy-4
    background-color: #FFB22B
  &.busy-5
    background-color: #FF6A6A
    .gmap-marker.icon
      color: #fff

.gmap-marker:hover
  transform: scale(1.5)

.gmap-marker-icon
  font-size: 24px

.busy-5 .gmap-marker-icon
  color: #fff
</style>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
  name: 'MainMap',
  components: {
    GmapCustomMarker
  },

  data() {
    return {
      fallbackCenter: { lat: 46.2033337, lng: 7.3491754 },
      center: { lat: 46.2033337, lng: 7.3491754 },
      reportedCenter: { lat: 46.2033337, lng: 7.3491754 },
      
      iconMap : {
        'supermarket' : 'o_shopping_cart',
        'convenience' : 'o_storefront',
        'pharmacy' : 'o_local_pharmacy',
      },

      markers: [
        {
          position: {lat: 46.2033337, lng: 7.3491754},
          busy: 1,
          type: 'supermarket',
        },
        {
          position: {lat: 46.2033337, lng: 7.3001754},
          busy: 2,
          type: 'pharmacy',
        },
        {
          position: {lat: 46.2333337, lng: 7.2801754},
          busy: 3,
          type: 'convenience',
        },
        {
          position: {lat: 46.2433337, lng: 7.3101754},
          busy: 4,
          type: 'supermarket',
        },
        {
          position: {lat: 46.2433337, lng: 7.3601754},
          busy: 5,
          type: 'supermarket',
        },


      ],


      places: [],
      currentPlace: null,

      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },

      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,

      //optional: offset infowindow so it visually sits nicely on top of our marker
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },


    };
  },


  mounted() {
    this.geolocate()
  },

  methods: {

    toggleInfoWindow: function(marker, idx) {

      console.log("Set I window " + idx + " / " + marker)

      this.infoWindowPos = marker.position;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }

      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }

      if (this.infoWinOpen) {
          // Retrieve information
          this.infoContent = this.$t('Content');
      }

    },

    updateCenter(latLng) {
      this.reportedCenter = {
        lat: latLng.lat(),
        lng: latLng.lng(),
      }
    },

    syncCenter() {
      this.center = this.reportedCenter;
    },

    geolocate() {
      console.log("Geolocate")
      navigator.geolocation.getCurrentPosition(position => {
        this.reportedCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.center = this.reportedCenter
        console.log(this.center)
      }, error => {
        if (error.code == 2) {
          console.log("Error 2")
          this.center = this.fallbackCenter
          this.reportedCenter = this.fallbackCenter
        }
      });
    },

    markerClick(item) {
        console.log("Marker clicked");
        console.log(item)
    },
  }


  

}
</script>
