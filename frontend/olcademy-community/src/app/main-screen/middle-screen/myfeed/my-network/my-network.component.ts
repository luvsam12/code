import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { logging } from 'protractor';
import { NetworkService } from './../../../../shared/services/network.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-network',
  templateUrl: './my-network.component.html',
  styleUrls: ['./my-network.component.scss']
})
export class MyNetworkComponent  {

  currentNetwork = "suggestions";
  network_data
  user_image = [];
  user_data = this.AuthenticationService.get_user_info();
  product:any;
  constructor(private NetworkService: NetworkService,
              private AuthenticationService: AuthenticationService,
              private activatedroute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    if(window.location.pathname === '/myfeed/mynetwork/received_request' || window.location.pathname === '/network/received_request')
    {
      this.currentNetwork = "requestsReceived"
      this.showRequestsReceived();
    }
    else if(window.location.pathname === '/myfeed/mynetwork/sent_request' || window.location.pathname === '/network/sent_request')
    {
      this.currentNetwork = "requestsSent"
      this.showRequestsSent();
    }
    else if(window.location.pathname === '/myfeed/mynetwork/connections' || window.location.pathname === '/network/connections')
    {
      this.currentNetwork = "connections"
      this.showConnections();
    }else{
      this.currentNetwork="suggestions";
      this.showSuggestions();
    }
    // else{
    //   this.NetworkService.get_suggestion().subscribe(
    //     data =>
    //     {
    //       this.network_data = data.list
    //       for(let user of this.network_data)
    //       {
    //       this.AuthenticationService.getCurrentUserImage(user.id).subscribe(
    //         data =>
    //         {
    //           this.user_image.push(data.data.profile_image_path)
    //         }
    //       )
    //       }
    //     }
    //   )
    // }
  }

  showSuggestions() {
    this.network_data = []
    this.NetworkService.get_suggestion().subscribe(
      data =>
      {
        console.log(data)
        this.user_image = []
        this.network_data = data.list
        for(let user of this.network_data)
        {
        this.AuthenticationService.getCurrentUserImage(user.id).subscribe(
          data =>
          {
            this.user_image.push(data.data.profile_image_path)
          }
        )
        }
      }
    )
    document.querySelector('#suggestions-btn').classList.add("active");
    document.querySelector('#request-received-btn').classList.remove("active");
    document.querySelector('#request-sent-btn').classList.remove("active");
    document.querySelector('#connections-btn').classList.remove("active");
    this.currentNetwork = "suggestions"
    if(window.location.pathname[1] === 'n')
    this.router.navigateByUrl("/network/suggestions")
    else if (window.location.pathname[1] === 'm')
    this.router.navigateByUrl("/myfeed/mynetwork/suggestions")
  }

  showRequestsReceived() {
    this.network_data = []
    this.NetworkService.get_pending_request().subscribe(
      data =>
      {
        this.user_image = []
        if(data.msg === "Data available")
        {
        this.network_data = data.list
        for(let user of this.network_data)
        {
        this.AuthenticationService.getCurrentUserImage(user.id).subscribe(
          data =>
          {
            this.user_image.push(data.data.profile_image_path)
          }
        )
        }
      }
      }
    );
    document.querySelector('#suggestions-btn').classList.remove("active");
    document.querySelector('#request-received-btn').classList.add("active");
    document.querySelector('#request-sent-btn').classList.remove("active");
    document.querySelector('#connections-btn').classList.remove("active");
    this.currentNetwork = "requestsReceived"
    if(window.location.pathname[1] === 'n')
    this.router.navigateByUrl("/network/received_request")
    else if (window.location.pathname[1] === 'm')
    this.router.navigateByUrl("/myfeed/mynetwork/received_request")
  }

  showRequestsSent() {
    this.network_data = []
    this.NetworkService.get_sent_request().subscribe(
      data =>
      {
        this.user_image = []
        if(data.msg === "Data available")
        {
        this.network_data = data.list
        for(let user of this.network_data)
        {
        this.AuthenticationService.getCurrentUserImage(user.id).subscribe(
          data =>
          {
            this.user_image.push(data.data.profile_image_path)
          }
        )
        }
      }
      }
    );
    document.querySelector('#suggestions-btn').classList.remove("active");
    document.querySelector('#request-received-btn').classList.remove("active");
    document.querySelector('#request-sent-btn').classList.add("active");
    document.querySelector('#connections-btn').classList.remove("active");
    this.currentNetwork = "requestsSent"
    if(window.location.pathname[1] === 'n')
    this.router.navigateByUrl("/network/sent_request")
    else if (window.location.pathname[1] === 'm')
    this.router.navigateByUrl("/myfeed/mynetwork/sent_request")
  }

  showConnections() {
    this.network_data = []
    this.NetworkService.get_connections().subscribe(
      data =>
      {
        this.user_image = []
        if(data.msg === "Data available")
        {
        this.network_data = data.list
        for(let user of this.network_data)
        {
        this.AuthenticationService.getCurrentUserImage(user.id).subscribe(
          data =>
          {
            this.user_image.push(data.data.profile_image_path)
          }
        )
        }
      }
      }
    )
    document.querySelector('#suggestions-btn').classList.remove("active");
    document.querySelector('#request-received-btn').classList.remove("active");
    document.querySelector('#request-sent-btn').classList.remove("active");
    document.querySelector('#connections-btn').classList.add("active");
    this.currentNetwork = "connections"
    if(window.location.pathname[1] === 'n')
    this.router.navigateByUrl("/network/connections")
    else if (window.location.pathname[1] === 'm')
    this.router.navigateByUrl("/myfeed/mynetwork/connections")
  }

  following_user(id,i){
    var element = document.getElementById("following-"+i).innerHTML
    if(element === "Follow"){
      this.NetworkService.follow_user(id).subscribe(
        data =>
        {
          var change = document.getElementById("following-"+i)
          change.innerHTML = "Unfollow"
          change.style.backgroundColor = 'rgb(242, 242, 242)'
          change.style.color = "black"
        }
      )

    }
    else if(element === "Unfollow"){
      this.NetworkService.unfollow_user(id).subscribe(
        data =>
        {
          var change = document.getElementById("following-"+i)
          change.innerHTML = "Follow"
          change.style.backgroundColor = 'rgb(1, 169, 242)'
          change.style.color = "white"
        }
      )
    }
  }

  accept_request(from_user,i){
    this.NetworkService.accept_connect_request(this.user_data.authdata.user_id,from_user).subscribe(
      data =>
      {
        this.network_data.splice(i,1);
        this.user_image.splice(i,1);
      }
    )
  }


  remove_user(to_user,i){
    this.NetworkService.remove_user(to_user,this.user_data.authdata.user_id).subscribe(
      data =>
      {
        this.network_data.splice(i,1);
        this.user_image.splice(i,1);
      }
    )
  }

  reject_connection_request(to_user,i){
    this.NetworkService.reject_connection_request(to_user,this.user_data.authdata.user_id).subscribe(
      data =>
      {
        this.network_data.splice(i,1);
        this.user_image.splice(i,1);
      }
    )
  }

  withdraw_connection_request(to_user,i){
    this.NetworkService.reject_connection_request(this.user_data.authdata.user_id,to_user).subscribe(
      data =>
      {
        this.network_data.splice(i,1);
        this.user_image.splice(i,1);
      }
    )
  }

  send_connection_request(to_user){
    this.NetworkService.send_connection_request(this.user_data.authdata.user_id,to_user).subscribe(
      data =>
      {
      }
    )
  }

}
