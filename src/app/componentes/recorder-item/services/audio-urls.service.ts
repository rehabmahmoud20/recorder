import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioUrlsService {

  constructor() { }
  private audioUrls = new Subject<any[]>();
  data$ = this.audioUrls.asObservable();
  updateAudioUrls(newData: any) {
    this.audioUrls.next(newData);
  }
}
