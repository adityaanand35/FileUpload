import { Component } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFiles: FileList;

  constructor(private http: HttpClient) { }
  setFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadFile() {
    const fd: FormData = new FormData();
    fd.append('siteId', "122");
    fd.append('latLong', "5,6");
    if (this.selectedFiles && this.selectedFiles.length < 6) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        fd.append('image', this.selectedFiles.item(i));
      }
      console.log("fd", fd);
      this.http.post('http://localhost:3000/app/updateSite', fd, {
        reportProgress: true,
        observe: 'events'
        // headers: new HttpHeaders({
        //   'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        // })
      }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ', Math.round(event.loaded / event.total * 100), '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      })
    } else {
      this.selectedFiles.length > 5 ? alert("You cannot upload more than 5 images.") : alert("Please select a file.")
    }
  }
}
