import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile: FileList;

  constructor(private http: HttpClient) { }
  setFile(event) {
    this.selectedFile = event.target.files;
    // console.log(event.target.files);
    // for (let i = 0; i < event.target.files.length; i++) {
    //   this.selectedFile.item[i] = <File>event.target.files[i];
    // }
  }

  uploadFile() {
    const fd = new FormData();
    fd.append('contractorId', "123");
    for (let i = 0; i < this.selectedFile.length; i++) {
      console.log(this.selectedFile.item(i));
      fd.append('image', this.selectedFile.item(i), this.selectedFile.item.name);
    }
    console.log("fd",fd);
    this.http.post('<url>', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload Progress: ', Math.round(event.loaded / event.total * 100), '%');
      } else if (event.type === HttpEventType.Response) {
        console.log(event);
      }


    })
  }
}
