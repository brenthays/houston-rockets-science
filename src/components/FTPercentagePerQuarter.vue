<template>
  <div id="FTPercentagePerQuarter">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'FTPercentagePerQuarter',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        if (player.active) {
          series.push({
            name: player.name,
            data: [
              parseFloat((parseInt(player.total_player_made_free_throws_q1) / (parseInt(player.total_player_made_free_throws_q1) + parseInt(player.total_player_missed_free_throws_q1)) * 100).toFixed(2)),
              parseFloat((parseInt(player.total_player_made_free_throws_q2) / (parseInt(player.total_player_made_free_throws_q2) + parseInt(player.total_player_missed_free_throws_q2)) * 100).toFixed(2)),
              parseFloat((parseInt(player.total_player_made_free_throws_q3) / (parseInt(player.total_player_made_free_throws_q3) + parseInt(player.total_player_missed_free_throws_q3)) * 100).toFixed(2)),
              parseFloat((parseInt(player.total_player_made_free_throws_q4) / (parseInt(player.total_player_made_free_throws_q4) + parseInt(player.total_player_missed_free_throws_q4)) * 100).toFixed(2)),
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
            text: "FT% by quarter",
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
