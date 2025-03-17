import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{
  isFetching = signal(false);
  error = signal('');
  private placesService = inject(PlacesService);
  private destroyRef = inject(DestroyRef); //to clear request
  places = this.placesService.loadedUserPlaces;

  ngOnInit(){  //render only once when component render
      this.isFetching.set(true);
      const subscription = this.placesService.loadUserPlaces().subscribe({
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

    onRemovePlace(place: Place){
      const subscription = this.placesService.removeUserPlace(place).subscribe();

      this.destroyRef.onDestroy(()=>{
        subscription.unsubscribe();
      })
    }
}
