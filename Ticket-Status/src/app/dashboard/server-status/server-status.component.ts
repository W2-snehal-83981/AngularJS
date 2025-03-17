import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit{
  currentStatus = signal<'online' | 'offline' |'unknown' >('online');
  // private interval?: ReturnType<typeof setInterval>;
  //private interval?: NodeJS.Timeout;
  private destroyRef = inject(DestroyRef);

  constructor(){ //initialized the component 
    effect(()=>{
      console.log(this.currentStatus());
    });
  }

  ngOnInit(){  //runs after initialized the components input
    console.log('ON INIT')
    const interval = setInterval(()=> {
      const random  = Math.random(); //0-0.99999999999
      if(random < 0.5){
        this.currentStatus.set('online');
      } else if(random < 0.9){
        this.currentStatus.set('offline');
      } else{
        this.currentStatus.set('unknown');
      }
    },5000);

    this.destroyRef.onDestroy(()=>{  //alternate way to cleanup the method
      clearInterval(interval);
    })
  }

  ngAfterViewInit(){  //runs after component view initialized
    console.log('AFTER VIEW INIT');
  }

  // ngOnDestroy(): void {   //cleanup the interval
  //   clearTimeout(this.interval);
  // }
}
