import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globaldata';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  globalData: GlobalDataSummary[] = [];
  totalConfirmed: number = 0;
  totalActive: number = 0;
  totalRecovered = 0;
  totalDeaths = 0;
  loading: boolean = true;
  datatable = [];
  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: "out"
      },
      is3D: true


    }
  }






  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    this.dataService.getGlobalData().subscribe(
      {
        next: (result) => {
          console.log(result)
          this.globalData = result
          result.forEach(item => {
            if (!Number.isNaN(item.confirmed)) {
              this.totalConfirmed += item.confirmed
              this.totalActive += item.active
              this.totalRecovered += item.recovered
              this.totalDeaths += item.deaths



            }
          });
          this.initChart('c');

        },
        complete: () => {
          this.loading = false
        }
      });



  }

  initChart(caseType: string) {

    this.datatable = [];
    this.globalData.forEach(cs => {
      let val: number;

      if (caseType == 'c')
        if (cs.confirmed > 2000)
          val = cs.confirmed

      if (caseType == 'r')
        if (cs.recovered > 2000)
          val = cs.recovered

      if (caseType == 'd')
        if (cs.deaths > 1000)
          val = cs.deaths

      if (caseType == 'a')
        if (cs.active > 2000)
          val = cs.active

      this.datatable.push([cs.country, val])

    });
    console.log(this.datatable)


  }

  cases(value: string) {
    console.log(value)
    this.initChart(value);
  }
}
