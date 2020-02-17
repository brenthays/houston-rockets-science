<template>
  <div id="FGPercentage">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'FGPercentage',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        if (player.active) {
          series.push({
            name: player.name,
            data: [
              parseFloat((parseInt(player.total_player_made_shots) / (parseInt(player.total_player_made_shots) + parseInt(player.total_player_missed_shots)) * 100).toFixed(2)),
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
            text: "FG%",
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
              text: 'FG%',
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
