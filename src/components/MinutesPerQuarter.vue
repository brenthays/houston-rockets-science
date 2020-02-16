<template>
  <div id="MinutesPerQuarter">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'MinutesPerQuarter',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        series.push({
          name: player.name,
          data: [
            parseFloat((player.total_play_time_seconds_q1 / player.total_games / 60).toFixed(2)),
            parseFloat((player.total_play_time_seconds_q2 / player.total_games / 60).toFixed(2)),
            parseFloat((player.total_play_time_seconds_q3 / player.total_games / 60).toFixed(2)),
            parseFloat((player.total_play_time_seconds_q4 / player.total_games / 60).toFixed(2)),
          ],
          color: player.color
        })
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
            text: "Minutes by quarter",
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
            min: 0,
            max: 12,
            title: {
              text: 'Minutes',
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
