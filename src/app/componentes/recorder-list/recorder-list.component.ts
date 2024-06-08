import { Component, ChangeDetectorRef } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faPause } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recorder-list',
  templateUrl: './recorder-list.component.html',
  styleUrls: ['./recorder-list.component.css'],
})
export class RecorderListComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  chunks: any[] = [];
  mediaRecorder: any;
  audioUrls: any[] = [];
  isRecording = false;
  startRecord: boolean = false;
  content: string = 'record';

  defaultText: string = 'start';
  startRecording(): void {
    this.startRecord = !this.startRecord;
    if (this.startRecord) {
      this.content = 'stop';
      this.defaultText = 'stop';
      this.start();
    } else {
      this.content = 'record';

      this.defaultText = 'start';

      this.stopRecording();
    }
  }
  getAudioDuration(audioUrl: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      audio.addEventListener('loadedmetadata', () => {
        if (audio.duration === Infinity) {
          // Safari has issues with duration metadata, so we try to fix it by setting a timeout
          audio.currentTime = Number.MAX_SAFE_INTEGER;
          audio.ontimeupdate = () => {
            audio.ontimeupdate = null; // Remove the handler
            resolve(audio.duration);
            audio.currentTime = 0; // Reset currentTime
          };
        } else {
          resolve(audio.duration);
        }
      });
      audio.addEventListener('error', (event) => {
        reject('Failed to load audio metadata');
      });
    });
  }
  start(): void {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();
        this.isRecording = true;

        this.mediaRecorder.ondataavailable = (event: any) => {
          this.chunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.chunks, {
            type: 'audio/ogg; codecs=opus',
          });

          const audioUrl = URL.createObjectURL(blob);
          this.getAudioDuration(audioUrl).then((duration) => {
            this.audioUrls.push({
              url: audioUrl,
              duration: this.formatDuration(duration),
              icon: faPlay,
            });

            this.cdr.detectChanges();
          });

          this.chunks = [];
        };
      })
      .catch((error) => {
        console.error('Error accessing audio stream:', error);
      });
  }
  formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes} minute ${seconds} second`;
  }
  stopRecording(): void {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }
  updateAudioState(event: { index: number; isPlaying: boolean }): void {
    this.audioUrls.map((audio, i) => {
      i === event.index && event.isPlaying
        ? (audio.icon = faPause)
        : (audio.icon = faPlay);
      this.cdr.detectChanges();
    });
  }
}
