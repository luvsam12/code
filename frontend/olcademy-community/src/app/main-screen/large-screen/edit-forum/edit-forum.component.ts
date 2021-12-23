import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ForumListService } from 'src/app/shared/services/forum-list.service';

@Component({
  selector: 'app-edit-forum',
  templateUrl: './edit-forum.component.html',
  styleUrls: ['./edit-forum.component.scss']
})
export class EditForumComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  post;

  constructor(private forumService: ForumListService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.post = this.forumService.get_post(+params['id']);
        if(this.post === undefined) {
          this.route.navigate(['/forum']);
        }
      }
    )
  }

  deleteImage(i, img){
    this.forumService.delete_image(+i, img);
    // this.route.navigate(['/forum']);
  }

  onSubmit() {
    this.forumService.update_post(+this.activatedRoute.snapshot.params['id'], this.editForm.value.editedTopicName, this.editForm.value.editedQuestion)
    this.route.navigate(['/forum-detail', +this.activatedRoute.snapshot.params['id']]);
  }

  goBack() {
    this.route.navigate(['/forum-detail', +this.activatedRoute.snapshot.params['id']]);
  }

}
