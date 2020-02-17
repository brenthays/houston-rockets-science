<template>
  <div id="FTPercentage">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'FTPercentage',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        if (player.active) {
          series.push({
            name: player.name,
            data: [
              parseFloat((parseInt(player.total_player_made_free_throws) / (parseInt(player.total_player_made_free_throws) + parseInt(player.total_player_missed_free_throws)) * 100).toFixed(2)),
            ],
            color: player.color
          })
        }
      })

      return {
        chartOptions: {
          chart: {
            type: 'column',
            backgroundColor: '#343a40',
            style: { color: '#fff' },
          },
          legend: {
            itemStyle: {
              color: '#fff',
            }
          },
          title: {
            text: "FT%",
            style: { color: '#fff' },
          },
          xAxis: {
            categories: [
              'Player',
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
            max: 100,
            title: {
              text: 'FT%',
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
