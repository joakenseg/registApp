import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { observable } from 'rxjs';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  scanActive = false;
  scanResult = null;
  @ViewChild('video', { static: false}) video : ElementRef;
  @ViewChild('canvas', { static: false}) canvas : ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement = null;

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private database:AngularFireDatabase) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'enviroment'}
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    requestAnimationFrame(this.scan.bind(this));
  }

  scan(){
    console.log('SCAN');
    
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if (this.loading){
        this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height,{
        inversionAttempts: 'dontInvert'
      });
      console.log('code:', code);
      
      if (code){
        console.log(code);
        
        this.scanActive = false;
        this.scanResult = 'Asistencia registrada correctamente';
        this.database.list('Asistencia/').push({
          Asignatura: code.data,
        });
      } else {
        requestAnimationFrame(this.scan.bind(this));
      }
    }
  }

  // Helper functions
  stopScan() {
    this.scanActive = false;
    const stream = this.videoElement.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    this.scanResult = null;
    this.scan
    
    this.videoElement.srcObject = null;
  }

  reset(){
    this.scanResult= null;
  }

  async showQrToast(){
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text:'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  } 
}
