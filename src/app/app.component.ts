import { Component,ViewChild,OnInit } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
import { MouseEvent } from '@agm/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	imageUrl: string = "";
   	panelOpenState = false;
   	wdWidth:any;
   	wdHeight:any;
   	calendarOptions: Options;
 	displayEvent: any;
 	markers:any;
	myInnerHeight:any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;


  constructor(protected eventService: EventSesrvice) { }
   ngOnInit(){
   	    this.wdWidth=screen.width;
    	this.wdHeight=(screen.height-100);
    	console.log(screen.height);
    	this.myInnerHeight= screen.height==1080?'1.14:1':'0.95:1';
    	this.eventService.getEvents().subscribe(data => {
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        /*height: 500,*/
        header: {
          left: 'prev,next today',
          center: 'title',
          right: ''
        },
        events: data
      };
    });
    this.markers = [
	  {
		  lat: 17.3850,
		  lng: 76.4867,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 17.4850,
		  lng: 78.4867,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 17.5850,
		  lng: 77.4867,
		  label: 'C',
		  draggable: true
	  }
  ]
   }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
    zoom: number = 8;
  
  // initial center position for the map
  lat: number = 17.3850;
  lng: number = 78.4867;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
/*  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }*/
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  show1:boolean=true;
  show2:boolean=false;
listView(){
	
	this.show1=false;
	this.show2=true;
}
mapView(){
	this.show1=true;
	this.show2=false;
}
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label: string;
	draggable: boolean;
}
