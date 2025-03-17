import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService); //injecting service where all methods
  private destroyRef = inject(DestroyRef); //to clear request
  //private httpClient = inject(HttpClient);   //Performs HTTP requests.
  //constructor(private httpClient: hTTPClient){}  Performs HTTP requests.
  

  

  ngOnInit(){  //render only once when component render
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places)=>{
        //console.log(resData.places);
        this.places.set(places);
      },
      error: (error: Error) =>{
        //console.log(error);
        this.error.set(error.message);
      },
      complete: ()=>{
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }

  onSelectPlace(selectedplace: Place){  //sending data to backend and update user-places file
    const subscription = this.placesService.addPlaceToUserPlaces(selectedplace).subscribe({
      next: (resData) => console.log(resData),
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }
}
