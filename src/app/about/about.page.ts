import { File } from '@ionic-native/file/ngx';
import { Component } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {
  text = 'Check out the Ionic Academy!';
  url = 'https://ionicacademy.com';

  constructor(private socialSharing: SocialSharing, private file: File) {}

  async shareTwitter() {
    // Either URL or Image
    this.socialSharing.shareViaTwitter(null, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  async resolveLocalFile() {
    return this.file.copyFile(`${this.file.applicationDirectory}`, 'academy.jpg', this.file.cacheDirectory, `${new Date().getTime()}.jpg` );
  }

  removeTempFile(name) {
    this.file.removeFile(this.file.cacheDirectory, name);
  }

  async shareEmail() {
    const file = await this.resolveLocalFile();
    this.socialSharing.shareViaEmail(this.text, 'My custom subject', ['saimon@devdactic.com'], null, null, file.nativeURL).then(() => {
      this.removeTempFile(file.name);
    }).catch((e) => {
      // Error!
    });
  }

  async shareFacebook() {
    const file = await this.resolveLocalFile();
    // Image or URL works
    this.socialSharing.shareViaFacebook(null, file.nativeURL, null).then(() => {
      this.removeTempFile(file.name);
    }).catch((e) => {
      // Error!
    });
  }

}
