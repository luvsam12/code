import { SettingsComponent } from './main-screen/large-screen/settings/settings.component';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from "@ngrx/store";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenu, MatMenuModule, MAT_MENU_SCROLL_STRATEGY} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LeftScreenComponent } from './main-screen/left-screen/left-screen.component';
import { MiddleScreenComponent } from './main-screen/middle-screen/middle-screen.component';
import { CoursesComponent } from './main-screen/middle-screen/courses/courses.component';
import { MyfeedComponent } from './main-screen/middle-screen/myfeed/myfeed.component';
import { ForumComponent } from './main-screen/middle-screen/forum/forum.component';
import { BlogsComponent } from './main-screen/middle-screen/blogs/blogs.component';
// import { NetworkComponent } from './main-screen/middle-screen/network/network.component';
import { AssessmentComponent } from './main-screen/middle-screen/assessment/assessment.component';
import { CategoryListComponent } from './main-screen/left-screen/category-list/category-list.component';
import { TestListComponent } from './main-screen/left-screen/test-list/test-list.component';
import { UserDetailsComponent } from './main-screen/left-screen/user-details/user-details.component';

import { currentRouteReducer } from "./shared/reducer/currentRoute.reducer";
import { RightScreenComponent } from './main-screen/right-screen/right-screen.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { InterestsComponent } from './main-screen/middle-screen/myfeed/interests/interests.component';
import { MyNetworkComponent } from './main-screen/middle-screen/myfeed/my-network/my-network.component';
import { MyPostsComponent } from './main-screen/middle-screen/myfeed/my-posts/my-posts.component';
import { BookmarkedComponent } from './main-screen/middle-screen/myfeed/bookmarked/bookmarked.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InterestPopupComponent } from './popups/interest-popup/interest-popup.component';
import { BreadcrumbModule } from 'angular-crumbs';
import { TextEditorComponent } from './main-screen/large-screen/text-editor/text-editor.component';
import { GuidelinesPopupComponent } from './popups/guidelines-popup/guidelines-popup.component';
import { UserpageComponent } from './main-screen/large-screen/userpage/userpage.component';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FileUploadModule } from 'ng2-file-upload';
import { ShowBlogComponent } from './main-screen/large-screen/show-blog/show-blog.component';
import { ForumDetailComponent } from './main-screen/large-screen/show-forum/forum-detail.component';
import { EditForumComponent } from './main-screen/large-screen/edit-forum/edit-forum.component';
import { DeleteConfirmPopupComponent } from './popups/delete-confirm-popup/delete-confirm-popup.component';
import { ReportSpamPopupComponent } from './popups/report-spam-popup/report-spam-popup.component';
import { SharePopupComponent } from './popups/share-popup/share-popup.component';
import { ShareOnFeedPopupComponent } from './popups/share-on-feed-popup/share-on-feed-popup.component';
import { SigninPopupComponent } from './popups/signin-popup/signin-popup.component';
import { UploadMediaPopupComponent } from './popups/upload-media-popup/upload-media-popup.component';
import { ConfirmationComponent } from './popups/confirmation/confirmation.component';
import { DefaultMyfeedComponent } from './main-screen/middle-screen/myfeed/default-myfeed/default-myfeed.component';
import { SignupComponent } from './main-screen/large-screen/signup/signup.component';

import { NotificationComponent } from './main-screen/middle-screen/notification/notification.component';
import { LargeScreenComponent } from './main-screen/large-screen/large-screen.component';
import { MyAttemptsComponent } from './main-screen/middle-screen/assessment/my-attempts/my-attempts.component';
import { SolvedQuestionsComponent } from './main-screen/middle-screen/assessment/solved-questions/solved-questions.component';
import { TestsRightScreenComponent } from './main-screen/right-screen/tests-right-screen/tests-right-screen.component';
import { UploadQuestionsComponent } from './main-screen/middle-screen/assessment/upload-questions/upload-questions.component';
import { LyHammerGestureConfig, LyThemeModule, LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2 ,LY_THEME_GLOBAL_VARIABLES,} from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyImageCropper, ImgCropperConfig, ImgCropperEvent  } from '@alyle/ui/image-cropper';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { LyTypographyModule } from '@alyle/ui/typography';
import {AuthguardGuard} from './shared/services/authguard.guard';
import { AuthdeactiveGuard } from './shared/services/authdeactive.guard';
/** Alyle UI */

/** Import theme */
import { MinimaDark } from '@alyle/ui/themes/minima';
import { color } from '@alyle/ui/color';
import { CommonModule } from '@angular/common';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';
import { LySliderModule } from '@alyle/ui/slider';
import { ProfileImagePopupComponent } from './popups/profile-image-popup/profile-image-popup.component';
import { ForgetPasswordComponent } from './main-screen/large-screen/forget-password/forget-password.component';
// import { DeferLoadModule } from '@trademe/ng-defer-load';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {NgxSpinnerModule} from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { InViewportModule } from 'ng-in-viewport';
import {MatBadgeModule} from '@angular/material/badge';
export class GlobalVariables {
  testVal = color(0x00bcd4);
  Quepal = {
    default: `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
    contrast: color(0xffffff),
    shadow: color(0x11998e)
  };
  SublimeLight = {
    default: `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
    contrast: color(0xffffff),
    shadow: color(0xB36FBC)
  };
  Amber = {
    default: color(0xffc107),
    contrast: color(0, 0, 0, 0.87)
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    LeftScreenComponent,
    MiddleScreenComponent,
    CoursesComponent,
    MyfeedComponent,
    ForumComponent,
    BlogsComponent,
    // NetworkComponent,
    AssessmentComponent,
    CategoryListComponent,
    TestListComponent,
    UserDetailsComponent,
    RightScreenComponent,
    MainScreenComponent,
    InterestsComponent,
    MyNetworkComponent,
    MyPostsComponent,
    BookmarkedComponent,
    PageNotFoundComponent,
    InterestPopupComponent,
    TextEditorComponent,
    GuidelinesPopupComponent,
    UserpageComponent,
    ShowBlogComponent,
    ForumDetailComponent,
    EditForumComponent,
    DeleteConfirmPopupComponent,
    ReportSpamPopupComponent,
    SharePopupComponent,
    ShareOnFeedPopupComponent,
    SigninPopupComponent,
    UploadMediaPopupComponent,
    ConfirmationComponent,
    DefaultMyfeedComponent,
    SignupComponent,
    NotificationComponent,
    SettingsComponent,
    LargeScreenComponent,
    MyAttemptsComponent,
    SolvedQuestionsComponent,
    TestsRightScreenComponent,
    UploadQuestionsComponent,
    ProfileImagePopupComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      currentRoute : currentRouteReducer,
    }),

    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonModule,
    // MAT_MENU_SCROLL_STRATEGY,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSliderModule,
    BreadcrumbModule,
    QuillModule.forRoot(),
    NgxDropzoneModule,
    FileUploadModule,
    BreadcrumbModule,
    QuillModule.forRoot(),
    NgxDropzoneModule,
    FileUploadModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LyThemeModule.setTheme('minima-dark'), // or minima-light
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HammerModule,
    CommonModule,
    FormsModule,
    LyImageCropperModule,
    LySliderModule,
    LyButtonModule,
    LyIconModule,
    // LyImageCropper,
    LyTypographyModule,
    // DeferLoadModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    InViewportModule,
    MatBadgeModule,
  ],
  providers: [
    [AuthdeactiveGuard],
    [AuthguardGuard],
    [ LyTheme2 ],
    [ StyleRenderer ],
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    {
      provide: LY_THEME,
      useClass: MinimaLight,
      multi: true
    },
    {
      provide: LY_THEME,
      useClass: MinimaDark,
      multi: true
    },
    {
      provide: LY_THEME_GLOBAL_VARIABLES,
      useClass: GlobalVariables
    }, // global variables
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig }, StyleRenderer, LyTheme2, { provide: LY_THEME_NAME, useValue: 'minima-light' }, { provide: LY_THEME, useClass: MinimaLight, multi: true },{ provide: LY_THEME, useClass: MinimaDark, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
