<template>
  <div class="gmap-wrapper">
    <GmapMap 
      class="gmap"
      :center="center"
      :zoom="16"
      ref="map"
      :options="mapOptions"
      >

        <gmap-custom-marker :marker="m.position"
          @click.native="toggleInfoWindow(m, index)"
          :key="index"
          v-for="(m, index) in markers"
          alignment="center"
          class="gmap-marker-wrapper"
        >
          <div :class="'gmap-marker busy-' + m.busy_ind + ' '">

            <q-icon
              :name="iconMap[m.type]" class="gmap-marker-icon"
            />
          </div>
        </gmap-custom-marker>

    </GmapMap>

    <q-page-sticky position="bottom-left" :offset="[18, 18]">
      <q-btn fab icon="o_refresh" color="accent" @click="fetchData" :loading="loading"/>
    </q-page-sticky>
    <q-page-sticky position="bottom-left" :offset="[80, 18]">
      <q-btn fab icon="o_list" color="accent" to="/shoppinglist"/>
    </q-page-sticky>

    <q-dialog v-model="placeDialogOpen">
      <q-card class="my-card">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{placeDialogData.name}}
            </div>
            <!-- <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              250 ft
            </div> -->
          </div>

          <q-rating v-model="placeDialogData.busy_ind" :max="5" color="grey-6" color-selected="primary" size="32px" icon="o_directions_walk" readonly/>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{placeDialogData.type}}
          </div>
          <div class="text-caption text-grey">
            More info about the place
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Plan a trip" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<style lang="sass">

.gmap-wrapper
  position: absolute
  left: 0
  right: 0
  top: 48px
  bottom: 0

.gmap
  width: 100%
  height: 100%

.gmap-marker-wrapper:hover
  z-index: 2000

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
  z-z-index: 2000

.gmap-marker-icon
  font-size: 24px

.gmap-marker-selected
  z-index: 1000


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
      fallbackCenter: { lat: 47.3824551, lng: 8.5244547 },
      center: { lat: 47.3824551, lng: 8.5244547 },
      reportedCenter: { lat: 47.3824551, lng: 8.5244547 },
      
      loading: false,

      iconMap : {
        'supermarket' : 'o_shopping_cart',
        'convenience' : 'o_storefront',
        'pharmacy' : 'o_local_pharmacy',
      },
      
      attendanceBarColors: [ 'light-green-3', 'light-green-6', 'green', 'green-9', 'green-10' ],

      markers: [
        {
          position: {lat: 46.2033337, lng: 7.3491754},
          busy: 15,
          busy_ind: 1,
          type: 'supermarket',
        },
        {
          position: {lat: 46.2033337, lng: 7.3001754},
          busy: 35,
          busy_ind: 2,
          type: 'pharmacy',
        },
        {
          position: {lat: 46.2333337, lng: 7.2801754},
          busy: 55,
          busy_ind: 3,
          type: 'convenience',
        },
        {
          position: {lat: 46.2433337, lng: 7.3101754},
          busy: 75,
          busy_ind: 4,
          type: 'supermarket',
        },
        {
          position: {lat: 46.2433337, lng: 7.3601754},
          busy: 95,
          busy_ind: 5,
          type: 'supermarket',
        },


      ],

      currentMarker: null,
      placeDialogOpen: false,
      placeDialogData: {
        attendance: 0,
        name: "",
      },


      places: [],
      currentPlace: null,

      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false,
        styles: [
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#e0efef"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "hue": "#1900ff"
              },
              {
                  "color": "#c0e8e8"
              }
            ]
          },    
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                  "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "stylers": [
              {
                  "visibility": "off"
              }
            ]
          },

          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                  "lightness": 100
              },
              {
                  "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              {
                  "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "lightness": 700
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                  "color": "#7dcdcd"
              }
            ]
          }
        ]

      },

      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      currentMarkerOpen: -1,

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
    //this.fetchData()
  },

  methods: {

    fetchData : async function() {
      let url = process.env.API_SERVER + "/stores"
      this.loading = true
      try {
        let response = await this.$axios.get(url)
        this.loading = false
        let data = response.data
        this.markers.length = 0
        data.map((val, idx, num) => {
          this.markers.push({
            position: {
              lat: val.lat,
              lng: val.long
            },
            busy: val.busy,
            busy_ind: Math.floor(val.busy / 20) + 1,
            type: val.type,
            name: val.name,
            g_url: val.url,
          })
        })
      }
      catch (error) {
        this.loading = false
        console.error(error)
      }
    },

    toggleInfoWindow: function(marker, idx) {

      this.currentMarker = marker
      this.placeDialogData = marker
      this.placeDialogOpen = true

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
