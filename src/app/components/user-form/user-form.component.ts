import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number | null = null;

  constructor(private userService: UserService) {}

  addWorkout(): void {
    if (!this.userName.trim()) {
      alert('Please enter a user name before adding a workout.');
      return;
    }
    if (!this.workoutType || this.workoutMinutes === null || this.workoutMinutes <= 0) {
      alert('Please enter a valid workout type and duration.');
      return;
    }

    this.userService.addWorkoutToUser(this.userName, this.workoutType, this.workoutMinutes);

    this.workoutType = '';
    this.workoutMinutes = null;
  }
}
