import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user and retrieve it', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }],
    };
    service.addUser(user);
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('John Doe');
  });

  it('should search users by name', () => {
    const user1: User = { id: 1, name: 'John Doe', workouts: [] };
    const user2: User = { id: 2, name: 'Jane Smith', workouts: [] };
    service.addUser(user1);
    service.addUser(user2);

    const results = service.searchUsersByName('Jane');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Jane Smith');
  });

  it('should filter users by workout type', () => {
    const user1: User = {
      id: 1,
      name: 'John Doe',
      workouts: [{ type: 'Running', minutes: 30 }],
    };
    const user2: User = {
      id: 2,
      name: 'Jane Smith',
      workouts: [{ type: 'Cycling', minutes: 45 }],
    };
    service.addUser(user1);
    service.addUser(user2);

    const results = service.filterUsersByWorkoutType('Cycling');
    expect(results.length).toBe(1);
    expect(results[0].name).toBe('Jane Smith');
  });
});