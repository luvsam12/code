import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './shared/services/authentication.service';
import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import * as CurrentRouteActions from './shared/actions/currentRoute.action';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeVariables, ThemeRef, lyl, StyleRenderer } from '@alyle/ui';

const STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
  const __ = ref.selectorsOf(STYLES);
  return {
    $global: lyl `{
      body {
        background-color: ${theme.background.default}
        color: ${theme.text.default}
        font-family: ${theme.typography.fontFamily}
        margin: 0
        direction: ${theme.direction}
      }
    }`,
    root: lyl `{
      display: block
    }`
  };
};


// @ViewChild('eveForm') public evenListerFrom: NgForm;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StyleRenderer]
})
export class AppComponent {
  readonly classes = this.sRenderer.renderSheet(STYLES, true);

  active : any;
  cookie_id : any;

    constructor(readonly sRenderer: StyleRenderer,
              private router: Router,
              private store: Store<AppState>,
              private AuthenticationService:AuthenticationService) {

      // current route details in saved
      // fuction is called whenever there is a route change
      router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        )
        .subscribe((event: any) => {
          this.active = event.url;     
          this.active = this.active.substring(1); //to remove slash

          if(!this.active){
            this.active = "courses";
          }

          this.store.dispatch(new CurrentRouteActions.SaveCurrentRoute({name: this.active, route: event.url}));

        });


      } // closing of constructor.

        ngOnInit(){ }

                onActivate(event) {
    window.scroll(0,0);

}
     }

