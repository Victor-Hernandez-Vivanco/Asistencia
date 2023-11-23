import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import {
  Barcode,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService } from '../services/dialog/dialog.service';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  user = {
    idAlumno: 0,
    nombre: '',
    apellido: '',
    nombreseccion: '',
    seccion: '',
    codseccion: '',
  };
  fechaActual: string = '';
  horaActual: string = '';

  selectedSeccion = '';

  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });

  qrCodeString = 'This is a secret qr code message';
  scannedResult: any;
  content_visibility = '';

  displayValue = '';
  rawValue = '';

  msgOne = '';
  msgTwo = '';

  err = '';

  constructor(
    private loadingController: LoadingController,
    public alertController: AlertController,
    public navCtr: NavController,
    private router: Router,
    private apiService: BBDDasistenciaService,
    private readonly dialogService: DialogService,
    private readonly ngZone: NgZone
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state?.['user'];
      console.log('Recibido del Login:', this.user);
    }
  }

  async ngOnInit() {
    this.fechaActual = this.obtenerFechaActual();
    this.horaActual = this.obtenerHoraActual();
    // BarcodeScanner.isSupported().then((result) => {
    //   this.isSupported = result.supported;
    // });

    // BarcodeScanner.isSupported().then((result) => {
    //   this.isSupported = result.supported;
    // });
    // BarcodeScanner.checkPermissions().then((result) => {
    //   this.isPermissionGranted = result.camera === 'granted';
    // });
    // BarcodeScanner.removeAllListeners().then(() => {
    //   BarcodeScanner.addListener(
    //     'googleBarcodeScannerModuleInstallProgress',
    //     (event) => {
    //       this.ngZone.run(() => {
    //         console.log('googleBarcodeScannerModuleInstallProgress', event);
    //         const { state, progress } = event;
    //         this.formGroup.patchValue({
    //           googleBarcodeScannerModuleInstallState: state,
    //           googleBarcodeScannerModuleInstallProgress: progress,
    //         });
    //       });
    //     }
    //   );
    // });
  }

  public async scan(): Promise<void> {
    try {
      const element = await this.dialogService.showModal({
        component: BarcodeScanningModalComponent,
        // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
        cssClass: 'barcode-scanning-modal',
        showBackdrop: false,
        // componentProps: {
        //   formats: ,
        //   lensFacing: lensFacing,
        // },
      });
      element.onDidDismiss().then((result) => {
        const barcode: Barcode | undefined = result.data?.barcode;
        if (barcode) {
          this.barcodes = [barcode];

          this.apiService
            .updateUserState(this.user.idAlumno, 'Activo')
            .subscribe((res) => {
              this.msgOne = '👁️ Asistencia registrada';
              this.msgTwo = '¡Gracias por asistir!';
            });
        }
      });

      //   const { barcodes } = await BarcodeScanner.scan();

      // if (barcodes.length > 0) {
      //   // console.log('Barcode displayValue: ', barcodes[0].displayValue);
      //   // console.log('Barcode rawValue: ', barcodes[0].rawValue);
      //   // this.displayValue = barcodes[0].displayValue;
      //   // this.rawValue = barcodes[0].rawValue;
      //   if (this.user.idAlumno === 0) {
      //     const alert = await this.alertController.create({
      //       header: 'Permisos denegados',
      //       message:
      //         "No se ha podido obtener el usuario. Por favor, vuelva a iniciar sesión.",
      //       buttons: ['OK'],
      //     });
      //     await alert.present();
      //     return;
      //   }

      //   this.apiService.updateUserState(this.user.idAlumno, "Activo").subscribe((res) => {
      //     BarcodeScanner.stopScan();
      //   })
      // }

      //this.barcodes = barcodes;
    } catch (err) {
      console.log('Error scan method');
      console.log(err);
      this.err = JSON.stringify(err);
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permisos denegados',
      message:
        'Otorgue permiso a la cámara para usar el escáner de código de barras.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cerrarSesion() {
    const loading = await this.loadingController.create({
      message: 'Cerrando su sesión',
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss().then(() => {
        // Redirige al usuario al login después de completar el loading
        this.router.navigate(['/login']);
      });
    }, 1500); // Tiempo de espera antes de redireccionar
  }

  obtenerFechaActual(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const fecha = new Date().toLocaleDateString(undefined, options);
    return fecha;
  }

  obtenerHoraActual(): string {
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const hora = new Date().toLocaleTimeString(undefined, opcionesHora);
    return hora;
  }
}
