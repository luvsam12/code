import { Router } from '@angular/router';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  type:string
  id: number
  confirmation_line:string
  first_btn:string
  second_btn:string
  formData
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData,
     private BlogsListService: BlogsListService,
     private router: Router) { }

  ngOnInit(): void {
    document.querySelector('p').innerHTML = this.data.confirmation_line
  }

  confirm(id)
  {

    if(this.data.type === 'Delete')
    {
      this.BlogsListService.delete_blog(id).subscribe(
        data => {
          location.reload();
          this.dialogRef.close();
        }
      );
      this.router.navigate(['/blogs']);

    }
    else if(this.data.type === 'Publish')
    {
      console.log(this.data.formData)
        this.BlogsListService.post_blog(this.data.formData).subscribe(
          data => {
            console.log(data)
            this.router.navigateByUrl("/blogs")
            this.dialogRef.close();
            }
          );

    }
    else if(this.data.type === 'Update')
    {
      this.BlogsListService.update_blog(id,this.data.formData).subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigateByUrl("/blogs")

        }
      );

    }
    else if(this.data.type === 'Successfully Registered')
    {
          this.dialogRef.close();
          this.router.navigateByUrl("/login")
    }
}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
