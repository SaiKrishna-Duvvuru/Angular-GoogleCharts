import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/globaldata';
import { DateWiseData } from 'src/app/models/datawisedata';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  globalData: GlobalDataSummary[] = [];
  selectedInfo = {}
  totalConfirmed:number=0;
  totalActive:number=0;
  totalRecovered=0;
  totalDeaths=0;
  selectedCountry: DateWiseData[];
  allDateWiseData ={}
  loading : boolean = true;
  datatable=[];
  chart = {
    LineChart: "LineChart",
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

    merge(
      this.dataService.getGlobalData().pipe(map(result=>{
        this.globalData = result
      })),
      this.dataService.getDateWiseData().pipe(map(result=>{
        this.allDateWiseData=result;
      }))
    ).subscribe(
      {
        complete : ()=>{
          this.clickedCountry('India')
         
        this.loading = false ;
        }
      }
    )
   
  } 
  updateChart(){
    
   this.datatable=[]
    this.selectedCountry.forEach(country=>{
      this.datatable.push([country.date, country.cases])
    })
    console.log(this.datatable)
      
    

  }

  clickedCountry(country:string) {

    let selectedInfo = this.globalData.find(item => item.country === country)
    console.log(selectedInfo)
    
      this.totalConfirmed=selectedInfo.confirmed
      this.totalRecovered=selectedInfo.recovered
      this.totalDeaths=selectedInfo.deaths
      this.totalActive=selectedInfo.active

     
      this.selectedCountry=this.allDateWiseData[country]
      console.log(this.selectedCountry);
      this.updateChart();
      
  }

}

