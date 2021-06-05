import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exceltojson';


  json: any;
  willDownload = false;

  constructor() { }

  xmlToJson(ev: any) {
    let workBook: any  = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: { [x: string]: unknown[]; }, name: string | number) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
      this.json = dataString;
      this.Download(dataString);
    }
    reader.readAsBinaryString(file);
  }


  Download(data: string | number | boolean) {
    this.willDownload = true;
    setTimeout(() => {
      const el :any = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }



}
