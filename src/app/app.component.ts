import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apptunix-angular';
  imgPath = [];
  // hard coded for 6, can be made dynamic upon more thinking on it.
  imageObj = [{id:0,imgUrl:''},{id:1,imgUrl: ''},{id:2,imgUrl:''},{id:3,imgUrl: ''},{id:4,imgUrl:''},{id:5,imgUrl:''}]


  setPreview(files, img){
    console.log(files, img);

    if(files.length === 0)
      return;

    let mimeType = files[0].type;
    if(mimeType.match(/image\/*/) == null){
      alert('wrong');
    }

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      if(img.imgUrl.length){
        console.log(img);
        console.log(this.imageObj[img.id-1]);
        this.imageObj[img.id].imgUrl = reader.result.toString();
        alert('place er');
      } else {
        this.assignImage(reader.result);
      }
    }
  }

  assignImage(imgData) {
    console.log('got img')
    for(let i = 0; i < this.imageObj.length; i++) {
      if(this.imageObj[i].imgUrl == ''){
          this.imageObj[i].imgUrl = imgData;
          console.log(this.imageObj);
          break;
      }
    }
  }

  removePreview(imgData){
    console.log(imgData);
    console.log(this.imageObj[imgData.id]);
    this.imageObj[imgData.id].imgUrl = '';
    this.checkAndShift();
  }

  checkAndShift(){
    for(let i = 0; i < this.imageObj.length-1; i++){
      if(this.imageObj[i].imgUrl === ''){
        this.imageObj[i].imgUrl = this.imageObj[i+1].imgUrl;
        this.imageObj[i+1].imgUrl = '';
      }
    }
  }

}
