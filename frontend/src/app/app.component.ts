import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chat';
  isDisabled = true;
  model = 'seiji';

  constructor(private router: Router){

  }

  ngOnInit(){
      //A JavaScript event listener that listens for the storage event, which is triggered
      //when there are changes to localStorage or sessionStorage in the browser.
      window.addEventListener('storage', (event) => {
        if (event.storageArea == localStorage) {
          let token = localStorage.getItem('token');
          if(token == undefined || !(localStorage.getItem('userEmail'))) {
              // DO LOGOUT FROM THIS TAB AS WELL
              this.router.navigate(['/login']);
          }
        }
      }, false);
  }

}