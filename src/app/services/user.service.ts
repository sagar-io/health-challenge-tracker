import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly storageKey = 'userData';
  private usersSubject = new BehaviorSubject<User[]>(this.loadUsers());

  constructor() {}

  private loadUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    if (!data) {
      const defaultUsers: User[] = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 },
          ],
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 },
          ],
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 },
          ],
        },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    return JSON.parse(data);
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    this.usersSubject.next([...users]);
  }

  getUsersObservable() {
    return this.usersSubject.asObservable();
  }

  getUsers(): User[] {
    return this.usersSubject.getValue();
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.saveUsers(users);
  }

  addWorkoutToUser(userName: string, workoutType: string, minutes: number): void {
    const users = this.getUsers();
    const user = users.find((u) => u.name === userName);

    if (user) {
      user.workouts.push({ type: workoutType, minutes });
      this.saveUsers(users);
    } else {
      const newUser: User = {
        id: Date.now(),
        name: userName,
        workouts: [{ type: workoutType, minutes }],
      };
      users.push(newUser);
      this.saveUsers(users);
    }
  }
}
