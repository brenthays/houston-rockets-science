<template>
  <div id="app" class="bg-dark text-light">
    <!-- Page Header -->
    <header class="masthead">
      <div class="container text-center">
        <h1>Houston Rocket Science</h1>
        <h2>Compare Player Stats</h2>
      </div>
    </header>
    <!-- Season Select -->
    <div class="container py-5">
      <h1>About The App</h1>
      <p class="mb-5">This web application was built to visualize data produced by
        <a href="https://github.com/brenthays/NBA-Stats-API-Laravel" class="text-secondary" target="_blank" title="NBA-Stats-API-Laravel">NBA-Stats-API-Laravel</a>.
        The Laravel project handles seeding play-by-play data provided by
        <a href="https://www.bigdataball.com/" target="_blank" class="text-secondary" title="BigDataBall">BigDataBall</a>
        into a MySQL database and creates an API to interact with the data. This application focuses on historical data for only Houston Rockets players, and the data
        is cached locally. Use the dropdown below to change the season to view stats for.</p>
      <div class="mb-3">
        <b-dropdown variant="primary" center>
          <template v-slot:button-content>
            {{ selectedSeason ? selectedSeason.name : 'Select a Season' }}
          </template>
          <b-dropdown-item v-for="s in seasons" :key="s.id" v-on:click="setSelectedSeason(s)">{{ s.name }}</b-dropdown-item>
        </b-dropdown>
      </div>
      <span class="badge badge-pill badge-primary mx-1" v-for="p in selectedPlayers" v-bind:style="{ backgroundColor: p.color }">{{ p.name }}</span>
    </div>
    <!-- Render Chart Components -->
    <div class="container" v-if="this.selectedPlayers.length" :key="playerKey">
      <div class="py-5">
        <MinutesPerQuarter :players="this.selectedPlayers"/>
      </div>
      <div class="py-5">
        <FGPercentagePerQuarter :players="this.selectedPlayers"/>
      </div>
      <div class="py-5">
        <ScoringPerQuarter :players="this.selectedPlayers"/>
      </div>
      <div class="py-5">
        <AssistsPerQuarter :players="this.selectedPlayers"/>
      </div>
      <div class="py-5">
        <ReboundsPerQuarter :players="this.selectedPlayers"/>
      </div>
    </div>
  </div>
</template>

<script>
import seasons from './json/seasons.json'
import MinutesPerQuarter from './components/MinutesPerQuarter'
import FGPercentagePerQuarter from './components/FGPercentagePerQuarter'
import ScoringPerQuarter from './components/ScoringPerQuarter'
import AssistsPerQuarter from './components/AssistsPerQuarter'
import ReboundsPerQuarter from './components/ReboundsPerQuarter'

export default {
  name: 'app',
  components: {
    MinutesPerQuarter,
    FGPercentagePerQuarter,
    ScoringPerQuarter,
    AssistsPerQuarter,
    ReboundsPerQuarter
  },
  data () {
    return {
      seasons: seasons,
      seasonOptions: [],
      selectedSeason: null,
      selectedPlayers: [],
      playerKey: 0,
    }
  },
  methods: {
    setSelectedSeason (season) {
      this.selectedSeason = season
      this.setDefaultPlayers()
    },
    setDefaultPlayers () {
      // Different seasons have different defaulted players
      const defaultPlayerIds = {
        1: [9,10,12,8,7,17,199,220,206],
        2: [9,10,12,8,7,17,199,220,206]
      }
      const selectedSeason = this.selectedSeason.id
      const colors = ['#ffc72c', '#3498db', '#ba0c2f', '#218c74', '#9E9B94', '#8e44ad', '#e67e22', '#fd79a8', '#2ed573']
      let numPlayersFound = 0
      let selectedPlayers = []

      for (let i=0; i<this.seasons.length; i++) {
        if(this.seasons[i].id == selectedSeason) {
          this.seasons[i].players.forEach(function(player) {
            if(defaultPlayerIds[selectedSeason].indexOf(player.id) >= 0) {
              player.color = colors[numPlayersFound++]
              selectedPlayers.push(player)
            }
          })
          break
        }
      }
      this.selectedPlayers = selectedPlayers
      this.playerKey++
    }
  },
  created () {
    this.setSelectedSeason(this.seasons[0])
  }
}
</script>

<style lang="scss">
  // Customized Bootstrap 4
  @import "./assets/styles/_theme.scss";
  @import "./node_modules/bootstrap-scss/bootstrap.scss";

  h1, h2, .highcharts-title {
    font-family: 'Squada One', sans-serif;
    text-transform: uppercase;
  }

  .highcharts-title {
    font-size: 1.5rem!important;
  }

  .masthead {
    padding-top: 100px;
    padding-bottom: 100px;
    background-image: url('./assets/images/harden.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;

    h1, h2 {
      color: #fff;
      text-shadow: 0 8px 28px rgba(0, 0, 0, 0.4);
    }
    h1 {
      font-size: 3rem;
    }
  }
</style>