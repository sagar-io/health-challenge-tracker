import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
import { User, Workout } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  searchTerm: string = '';
  workoutTypeFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  private usersSubscription!: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.usersSubscription = this.userService.getUsersObservable().subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  get filteredUsers(): User[] {
    let users = this.users;

    if (this.searchTerm) {
      users = users.filter(user => 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.workoutTypeFilter) {
      users = users.filter(user => 
        user.workouts.some(workout => workout.type === this.workoutTypeFilter)
      );
    }

    return users;
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredUsers.length) {
      this.currentPage++;
    }
  }

  getWorkoutNames(workouts: Workout[]): string {
    return workouts.map(workout => workout.type).join(', ');
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }
}
