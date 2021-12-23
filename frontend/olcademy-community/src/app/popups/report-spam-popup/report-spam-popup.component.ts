import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';

interface DialogData{
  type :string;
  id   :string;
}

@Component({
  selector: 'app-report-spam-popup',
  templateUrl: './report-spam-popup.component.html',
  styleUrls: ['./report-spam-popup.component.scss']
})
export class ReportSpamPopupComponent implements OnInit {
 selected_report;
  comment;
  categories = ['Spam','Inappropriate Content','Harassment','Copyright Issue','Other']

  constructor(public dialogRef: MatDialogRef<ReportSpamPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data :DialogData   ,
    private route: Router,
    private BlogsListService: BlogsListService,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  reportSubmit() {
    if(this.data.type === "Blog")
    {
      this.comment = document.getElementById("comment").textContent;
      this.BlogsListService.post_report(this.data.id,this.selected_report,this.comment).subscribe(
        data => {
        }
      )
      this.dialogRef.close();
    }
    else if(this.data.type === "comment")
    {
      this.comment = document.getElementById("comment").textContent;
      this.BlogsListService.post_report(this.data.id,this.selected_report,this.comment).subscribe(
        data => {
        }
      )
      this.dialogRef.close();
    }
    else if(this.data.type === "replycomment")
    {
      this.comment = document.getElementById("comment").textContent;
      this.BlogsListService.post_report(this.data.id,this.selected_report,this.comment).subscribe(
        data => {
        }
      )
      this.dialogRef.close();
    }
  }
}
