<template>
  <div id="PlusMinusPerQuarter">
    <highcharts class="chart" :options="chartOptions"></highcharts>
  </div>
</template>

<script>
  import seasons from '../json/seasons.json'

  export default {
    name: 'PlusMinusPerQuarter',
    props: ['players'],
    data () {
      let series = []
      this.players.forEach(function(player) {
        if (player.active) {
          series.push({
            name: player.name,
            data: [
              parseFloat((parseInt(player.total_team_points_q1) - parseInt(player.total_team_points_against_q1)).toFixed(2)),
              parseFloat((parseInt(player.total_team_points_q2) - parseInt(player.total_team_points_against_q2)).toFixed(2)),
              parseFloat((parseInt(player.total_team_points_q3) - parseInt(player.total_team_points_against_q3)).toFixed(2)),
              parseFloat((parseInt(player.total_team_points_q4) - parseInt(player.total_team_points_against_q4)).toFixed(2)),
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
            text: "Plus/Minus by quarter",
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
              text: 'Total Plus/Minus',
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
