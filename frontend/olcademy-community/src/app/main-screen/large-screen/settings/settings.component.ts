import { Component, Injectable, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

export interface eachObject {
  name: string;
  pushNotification: string;
  emailAlert: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class SettingsComponent implements OnInit {

  color: ThemePalette = 'primary';
  data: eachObject[] = [
    {name: 'Likes', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Comments', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Share', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Tags', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Connection Acceptance', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Connection Request', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Connection Updates', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'New Forum', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'New Blog', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'New Course', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Trending Posts', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Activity', pushNotification: "OFF", emailAlert: "ON"},
    {name: 'Updates', pushNotification: "OFF", emailAlert: "ON"}
 ];

  currentDisplay = "credentials"

  constructor() { }

  ngOnInit(): void {
  }

  credentialsSetting() {
    let changePassword = document.querySelector('#change-password');
    let manageNotifications = document.querySelector('#manage-notifications');

    changePassword.classList.toggle('active');
    manageNotifications.classList.toggle('active');

    if(changePassword.classList.contains("active")) {
      this.currentDisplay = "credentials";
    }
    if(manageNotifications.classList.contains("active")) {
      this.currentDisplay = "notifications";
    }
  }

  turnOffNotification(i) {
    this.data[+i].pushNotification = "OFF"
  }
  turnOnNotification(i) {
    this.data[+i].pushNotification = "ON"
  }

  turnOffEmailalert(i) {
    this.data[+i].emailAlert = "OFF"
  }
  turnOnEmailalert(i) {
    this.data[+i].emailAlert = "ON"
  }

}
