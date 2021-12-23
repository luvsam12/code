import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForumListService } from 'src/app/shared/services/forum-list.service';

export interface DialogData {
  id: number
}

@Component({
  selector: 'app-share-on-feed-popup',
  templateUrl: './share-on-feed-popup.component.html',
  styleUrls: ['../../main-screen/middle-screen/forum/forum.component.scss', './share-on-feed-popup.component.scss']
})
export class ShareOnFeedPopupComponent implements OnInit {
  post;

  constructor(public dialogRef: MatDialogRef<ShareOnFeedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private forumListService:ForumListService,
    private route: Router) { }

  ngOnInit(): void {
    this.post = this.forumListService.get_post(this.data.id);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
