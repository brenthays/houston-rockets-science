<template>
  <div id="MinutesPerGame">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'MinutesPerGame',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        if (player.active) {
          series.push({
            name: player.name,
            data: [
              parseFloat((player.total_play_time_seconds / player.total_games / 60).toFixed(2)),
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
            text: "Minutes Per Game",
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
            min: 0,
            max: 48,
            title: {
              text: 'Minutes Per Game',
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
