import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, OnInit, Inject } from '@angular/core';
import { lyl, WithStyles, StyleRenderer, ThemeVariables, ThemeRef } from '@alyle/ui';
import {
  STYLES as CROPPER_STYLES,
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent,
  ImgCropperLoaderConfig
} from '@alyle/ui/image-cropper';
import { Platform } from '@angular/cdk/platform';
import { InterestService } from 'src/app/shared/services/interest.service';
import { AppConfig } from '../../shared/services/app.config';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/services/user.service';

interface DialogData {
  imageURL: string
}

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref.renderStyleSheet(CROPPER_STYLES);
  const cropper = ref.selectorsOf(CROPPER_STYLES);

  return {
    root: lyl `{
      ${cropper.root} {
        max-width: 400px
        height: 300px
      }
    }`,
    sliderContainer: lyl `{
      text-align: center
      max-width: 400px
      margin: 14px
    }`,
    cropResult: lyl `{
      border-radius: 50%
    }`
  };
};

@Component({
  selector: 'app-profile-image-popup',
  templateUrl: './profile-image-popup.component.html',
  styleUrls: ['./profile-image-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})


export class ProfileImagePopupComponent implements OnInit, WithStyles, AfterViewInit {
  user: any;
  classes = this.sRenderer.renderSheet(STYLES, 'root');
  croppedImage?: string;
  scale: number;
  ready: boolean;
  minScale: number;
  @ViewChild(LyImageCropper, { static: false }) readonly cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 150, // Default `250`
    height: 150, // Default `200`
    fill: '#ff2997', // Default transparent if type = png else #000
    type: 'image/png', // Or you can also use `image/jpeg`
    round: true
  };
  profileImageUrl: any;
  editImage: boolean = false;

  constructor(
    readonly sRenderer: StyleRenderer,
    private _platform: Platform,
    private interestService: InterestService,
    private http: HttpClient,
    private dialogRef: MatDialogRef<ProfileImagePopupComponent>,
    private authentication: AuthenticationService,
     private UserService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
    this.editImage = false;
    // if(this.authentication.isLoggedIn()) {
    //   this.user = this.authentication.get_user_info();
    //   this.authentication.getCurrentUserImage(this.user.authdata.user_id).subscribe(data => {
    //     this.profileImageUrl = data.data.profile_image_path;
    //     console.log(this.profileImageUrl);
    //     // this.profileImageUrl = `https://firebasestorage.googleapis.com/v0/b/alyle-ui.appspot.com/o/img%2Flarm-rmah-47685-unsplash-1.png?alt=media&token=96a29be5-e3ef-4f71-8437-76ac8013372c`
    //   })
    // }

    this.profileImageUrl = this.data.imageURL;

  }


  ngAfterViewInit() {

    // demo: Load image from URL and update position, scale, rotate
    // this is supported only for browsers

  }

  imageEdit() {
    this.editImage = true;
    setTimeout(() => {
      if (this._platform.isBrowser) {
        const config: ImgCropperLoaderConfig = {
          scale: 0.745864772531767,
          xOrigin: 142.380608078103,
          yOrigin: 236.26357452128866,
          // rotation: 90,
          originalDataURL: this.profileImageUrl
        };
        this.cropper.loadImage(config);
      }
    }, 1);
  }

  onCropped(e: ImgCropperEvent) {
    this.croppedImage = e.dataURL;
    console.log(e);
    console.log(e.dataURL);
    console.log(e.originalDataURL);
    this.UserService.updateUserProfileImg(e.originalDataURL).subscribe(data=>{
console.log(data)
    });
    this.dialogRef.close();

  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', this.profileImageUrl);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
