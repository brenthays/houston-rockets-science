<template>
  <div id="ReboundsPerQuarter">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'ReboundsPerQuarter',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        if (player.active) {
          series.push({
            name: player.name,
            data: [
              parseFloat(((parseInt(player.total_player_rebounds_q1) / parseInt(player.total_games) * 36) / (parseInt(player.total_play_time_seconds_q1)/60/parseInt(player.total_games))).toFixed(2)),
              parseFloat(((parseInt(player.total_player_rebounds_q2) / parseInt(player.total_games) * 36) / (parseInt(player.total_play_time_seconds_q2)/60/parseInt(player.total_games))).toFixed(2)),
              parseFloat(((parseInt(player.total_player_rebounds_q3) / parseInt(player.total_games) * 36) / (parseInt(player.total_play_time_seconds_q3)/60/parseInt(player.total_games))).toFixed(2)),
              parseFloat(((parseInt(player.total_player_rebounds_q4) / parseInt(player.total_games) * 36) / (parseInt(player.total_play_time_seconds_q4)/60/parseInt(player.total_games))).toFixed(2)),
            ],
            color: player.color
          })
        }
      })

      return {
        chartOptions: {
          chart: {
            backgroundColor: '#343a40',
            style: { color: '#fff' },
          },
          legend: {
            itemStyle: {
              color: '#fff',
            }
          },
          title: {
            text: "Rebounds per 36 by quarter",
            style: { color: '#fff' },
          },
          xAxis: {
            categories: [
              '1st Quarter',
              '2nd Quarter',
              '3rd Quarter',
              '4th Quarter',
            ],
            labels: {
              style: { color: '#fff' },
            },
            title: {
              labels: {
                style: { color: '#fff' },
              }
            }
          },
          yAxis: {
            title: {
              text: 'Rebounds per 36',
              style: { color: '#fff' },
            },
            labels: {
              style: { color: '#fff' },
            },
          },
          series: series,
        }
      }
    }
  }
</script>
