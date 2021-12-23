import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForumListService } from 'src/app/shared/services/forum-list.service';

export interface DialogData {
  postId: number
}

@Component({
  selector: 'app-delete-confirm-popup',
  templateUrl: './delete-confirm-popup.component.html',
  styleUrls: ['./delete-confirm-popup.component.scss']
})
export class DeleteConfirmPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteConfirmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private forumListService:ForumListService,
    private route: Router) { }

  ngOnInit(): void {
  }

  confirmDelete(postId) {
    this.forumListService.delete_Post(+postId);
    this.dialogRef.close();
    this.route.navigate(['/forum']);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
