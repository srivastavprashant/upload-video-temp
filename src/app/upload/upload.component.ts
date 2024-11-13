import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  uploadProgress = 0;
  isDragging = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.uploadFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('videoFile', file);
    formData.append('video', JSON.stringify("{\"title\": \"Shiva Video\"}"))

    this.http.post('http://localhost:8086/upload-service/v1/upload-video/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / (event.total || event.loaded)));
        }
      },
      error: () => {
        this.snackBar.open('Upload failed', 'Close', { duration: 3000 });
      },
      complete: () => {
        this.snackBar.open('Upload successful', 'Close', { duration: 3000 });
        this.uploadProgress = 0;
      }
    });
  }
}