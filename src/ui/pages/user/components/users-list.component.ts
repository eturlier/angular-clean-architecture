import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    WritableSignal,
    inject,
    signal,
} from '@angular/core';
import { UserFactory } from '@core/user/config/user.factory';
import { User } from '@core/user/domain/models/user.model';
import { UserHandler } from '@core/user/use-cases/user.handler';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-users-list',
    standalone: true,
    imports: [CommonModule, HttpClientModule, TranslateModule],
    providers: [
        {
            provide: UserHandler,
            useFactory: () => new UserHandler(UserFactory.getClient()),
        },
    ],
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
    public users$: WritableSignal<User[]> = signal<User[]>([]);
    private userHandler$: UserHandler = inject(UserHandler);

    ngOnInit(): void {
        this.userHandler$.all().subscribe((users: User[]) => {
            this.users$.set(users);
        });
    }
}
