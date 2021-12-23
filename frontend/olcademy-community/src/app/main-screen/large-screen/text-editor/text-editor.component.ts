import { CategoryService } from './../../../shared/services/category-list.service';
import { style } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlogsListService } from 'src/app/shared/services/blogs-list.service';
import { UploadMediaPopupComponent } from 'src/app/popups/upload-media-popup/upload-media-popup.component';
import { EditorChangeContent, EditorChangeSelection} from 'ngx-quill';
import { GuidelinesPopupComponent } from 'src/app/popups/guidelines-popup/guidelines-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate } from '@angular/common';
import { ConfirmationComponent } from 'src/app/popups/confirmation/confirmation.component';
import { CancomponentLeave } from 'src/app/shared/services/authdeactive.guard';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class TextEditorComponent implements OnInit,CancomponentLeave
{

  canleave(): boolean {
    if(this.texteditor.dirty){
     return  window.confirm("Warning: Changes you made may not be saved.");
       }
     return true;
 }

  // all the variables are initialized here.
    categories;
    user_id = this.AuthenticationService.get_user_info().authdata.user_id;
    post_title = '';
    author_name= this.AuthenticationService.get_user_info().authdata.full_name;
    Time_stamp = formatDate(Date() ,'dd-MM-yyyy', 'en-US');
    editor_text = '';
    category_selected: string;
    tags = [];
    media_check:Array<string> = []
    media_tag_check : Array<string> = []
    post_type = "Blogs"
    registerForm: FormGroup;
    submitted = false;
    error_tag: boolean = false;
    params;
    Is_editable: boolean = false
    del_media_array = []
    counter = 80;
    show_link:boolean = false
    editor_counter = 12000
    // check_editor = true
    tags_limit = false
    category_selected_id;

    texteditor: FormControl = new FormControl();

  constructor(private formBuilder: FormBuilder,
                private dialogue: MatDialog,
                private BlogsListService: BlogsListService,
                private AuthenticationService: AuthenticationService,
                private router: Router,
                private route: ActivatedRoute,
                private CategoryService: CategoryService) {  }


    ngOnInit()
      {
         this.route.queryParams.filter(params =>params.id).subscribe
        ( params =>
          {
            this.params = params.id;
          }
        );
        if(this.params !== undefined)
        {
          this.Is_editable = true;
          this.BlogsListService.get_particular_blog(this.params).subscribe(
                    mainData => {
                      const data= mainData[0]
              this.editor_text = data.post_content;
              this.post_title = data.post_title
              this.category_selected = data.category.name
              this.tags = data.hashtags
              this.media_tag_check = data.media_tag
              this.media_check = data.media
            }
          );
        }
        this.registerForm = this.formBuilder.group
        (
          {
            title: ['', Validators.required],
            editor_text: ['', Validators.required],
            category_selected: ['', Validators.required]
          }
        );

        this.CategoryService.getCategoriesData().subscribe(
          data => {
            this.categories = data
          }
        )
    }
    editorModules = {
                      toolbar:
                      [
                          ['bold', 'italic', 'underline', 'strike'],                     // toggled buttons
                          // ['blockquote', 'code-block'],
                          ['code-block'],

                          // [{ 'header': 1 }, { 'header': 2 }],                         // custom button values
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'script': 'sub'}, { 'script': 'super' }],                   // superscript/subscript
                          [{ 'indent': '-1'}, { 'indent': '+1' }],                       // outdent/indent
                          // [{ 'direction': 'rtl' }],                                   // text direction

                          // [{ 'size': [ 'small', false, 'large', 'huge'] }],           // custom dropdown
                          [{ 'size': [ 'small', false, 'large'] }],                      // custom dropdown

                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                          [{ 'color': [] }, { 'background': [] }],                       // dropdown with defaults from theme
                          [{ 'font': [] }],
                          [{ 'align': [] }],

                          ['clean'],                                                     // remove formatting button

                          ['link', 'image', 'video']                                     // link and image, video
                      ]
                    };

 // all the functions are defined here.

    get f()
    {
      return this.registerForm.controls;
    }

    go_to_profile()
    {
      this.router.navigateByUrl("/user-page")
    }

    openGuidelinesDialogue()
    {
       this.dialogue.open(GuidelinesPopupComponent);
    }

    title_counter(){
      this.counter = 80 - this.post_title.length
      if(this.counter < 10){
        document.getElementById("counter").style.color = "red"
      }
      else
      {
        document.getElementById("counter").style.color = "#b9b6b6"
      }
      return this.counter
    }



    editor_text_counter(){
      this.editor_counter = 12000 - document.getElementById("editor").innerText.length
      if(this.editor_counter < 20)
      {
        document.getElementById("editor-counter").style.color = "red"
      }
      // else if(this.editor_counter <= 0){
      //   document.getElementById("editor-counter").style.color = "red"
      //   // this.check_editor = false;
      //   // document.getElementById("editor").disabled = "true"
      // }
      // else
      // {
      //   document.getElementById("editor-counter").style.color = "#b9b6b6"
      // }
      return this.editor_counter;
    }
    check_editor(){
      if(this.editor_counter <= 0){
        return true
        }
        else{
          return false
        }
    }

    go_back(){
      window.history.back()
    }

    showlink(){
      this.show_link = !this.show_link
    }

    addlink(value){
      if(value !== ""){
      var main = value.substring(0,24) + "embed/" + value.substring(32,43)
      this.editor_text += "<div><iframe height='265px' width='459px' class='ql-video' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen='true' src='" +
      main +
      "'></iframe></div><br>";
      this.show_link = !this.show_link
      }
    }





    addtag(value: any)
    {
      if(this.tags.length < 11)
      {
      if(value.length !== 0 && value.indexOf(' ') < 0)
        {
          this.tags.push(value);
          this.error_tag = false;
        }
      else
        {
          this.error_tag = true;
        }
      }
      else{
        this.tags_limit = true
      }
    }

    delete_tag(index)
    {
      this.tags.splice(index,1)
    }

    openuploadDialogue(item)
    {
      const dialogRef = this.dialogue.open(UploadMediaPopupComponent,
        {
          backdropClass: 'transparent',
          data: {name: item}
        });

      dialogRef.afterClosed().subscribe
      (result =>
        {
          console.log(result);
          if(result !== "")
          {
              for(var i=0;i<result[1].length;i++)
              {
                  this.media_tag_check.push(result[1][i])
                  this.media_check.push(result[0][i]);
                  this.editor_text += result[1][i];
              }
          }
        }
      );
    }

    post()
    {
      this.submitted = true;
      if (this.registerForm.invalid)
      {
        return;
      }
      var formData = new FormData();
      formData.append('user_id',this.user_id)
      formData.append('post_title',this.post_title)
      formData.append('author_name',this.author_name);
      for(var i=0;i<this.categories.length;i++)
      {
        if(this.category_selected === this.categories[i].name)
        {
          this.category_selected_id = this.categories[i]._id
        }
      }
      formData.append('category',this.category_selected_id);
      if(this.tags.length >0)
      {
        for( var index =0; index < this.tags.length; index++){
          formData.append('hashtags',this.tags[index])
        }
      }
      else
      {
        formData.append('hashtags',"empty")
      }
      {
        if(this.media_check.length > 0)
        {
          for( var index =0; index < this.media_check.length; index++)
          {
            // if(this.editor_text.indexOf(this.media_check[index].substring(7)) > -1)
            {
              formData.append('media',this.media_check[index])
              formData.append('media_tag',this.media_tag_check[index])
            }
          }
        }
        else
        {
          formData.append('media',"empty")
          formData.append('media_tag',"empty")
        }
      }
      formData.append('post_content',this.editor_text);
      formData.append('post_type',this.post_type)
      this.dialogue.open(ConfirmationComponent,
        {
          width: "500px",
          data: {type: "Publish",id:'',confirmation_line:'Are you sure you want to publish the Blog?',first_btn:'Publish',second_btn:'Discard', formData: formData}
        });
    }


    update()
    {
      this.submitted = true;
      if (this.registerForm.invalid)
       {
          return;
       }
      var formData = new FormData();
      formData.append('user_id',this.user_id)
      formData.append('post_title',this.post_title)
      formData.append('author_name',this.author_name);
      formData.append('post_content',this.editor_text);
      for(var i=0;i<this.categories.length;i++)
      {
        if(this.category_selected === this.categories[i].name)
        {
          this.category_selected_id = this.categories[i]._id
        }
      }
      formData.append('category',this.category_selected_id);
      if(this.tags.length >0)
      {
        for( var index =0; index < this.tags.length; index++)
        {
          formData.append('hashtags',this.tags[index])
        }
      }
      else
      {
        formData.append('hashtags',"empty")
      }
      {
        if(this.media_tag_check.length > 0)
        {
          for( var index =0; index < this.media_check.length; index++)
          {
            if(this.editor_text.indexOf(this.media_check[index].substring(7)) > -1)
            {
              formData.append('media_tag', this.media_tag_check[index])
              formData.append('media', this.media_check[index])
            }
            else
            {
              this.del_media_array.push(this.media_check[index])
            }
          }
        }
        else
        {
          formData.append('media_tag', "empty")
          formData.append('media', "empty")
        }

        if(this.del_media_array.length > 0)
        {
          for( var index =0; index < this.del_media_array.length; index++)
          {
            formData.append('del_media_array', this.media_check[index])
          }
        }
        else
        {
          formData.append('del_media_array',"empty")
        }
      }
      formData.append('post_type',this.post_type)
      const dialogRef = this.dialogue.open(ConfirmationComponent, {
        width: "500px",
        data: {type: "Update",id:this.params,confirmation_line:'Are you sure you want to update the Blog?',first_btn:'Update',second_btn:'Discard', formData: formData}
      });

    }
  }
