import { Notification } from '@core/notification/domain/models/notification.model';
import { NOTIFICATION_DURATION } from '@utils/constants';
import { BehaviorSubject, of, timer } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';

/**
 * Classe de service de notification.
 * Gère la création et la suppression des notifications.
 */
export class NotificationHandler {
    /**
     * Un BehaviorSubject qui émet un tableau de notifications.
     */
    public notifications$ = new BehaviorSubject<Notification[]>([]);

    constructor() {}

    /**
     * Crée une notification avec un type et un contenu spécifique.
     * @param {Notification['type']} type - Le type de la notification ('info' | 'success' | 'warning' | 'danger').
     * @param {Omit<Notification, 'id' | 'type'>} notification - Les détails de la notification (Type Notification sans id et type).
     */
    private createOne(
        type: Notification['type'],
        notification: Omit<Notification, 'id' | 'type'>
    ) {
        if (!notification) return;

        const notificationItem: Required<Notification> = {
            id: `notification-${Date.now()}`,
            type,
            duration: NOTIFICATION_DURATION,
            autoDismiss: true,
            ...notification,
        };

        of(notificationItem)
            .pipe(
                tap(notification =>
                    this.notifications$.next([
                        ...this.notifications$.value,
                        notification,
                    ])
                ),
                filter(notification => notification.autoDismiss),
                switchMap(() =>
                    timer(notificationItem.duration).pipe(
                        takeUntil(
                            this.notifications$.pipe(
                                filter(
                                    notifications =>
                                        !notifications.includes(
                                            notificationItem
                                        )
                                )
                            )
                        )
                    )
                ),
                tap(() => this.remove(notificationItem))
            )
            .subscribe();
    }

    /**
     * Crée une notification de type 'info'.
     * @param {Omit<Notification, 'id' | 'type'>} notification - Les détails de la notification (Type Notification sans id et type).
     */
    info(notification: Omit<Notification, 'id' | 'type'>): void {
        this.createOne('info', notification);
    }

    /**
     * Crée une notification de type 'success'.
     * @param {Omit<Notification, 'id' | 'type'>} notification - Les détails de la notification (Type Notification sans id et type).
     */
    success(notification: Omit<Notification, 'id' | 'type'>): void {
        this.createOne('success', notification);
    }

    /**
     * Crée une notification de type 'warning'.
     * @param {Omit<Notification, 'id' | 'type'>} notification - Les détails de la notification (Type Notification sans id et type).
     */
    warning(notification: Omit<Notification, 'id' | 'type'>): void {
        this.createOne('warning', notification);
    }

    /**
     * Crée une notification de type 'danger'.
     * @param {Omit<Notification, 'id' | 'type'>} notification - Les détails de la notification (Type Notification sans id et type).
     */
    danger(notification: Omit<Notification, 'id' | 'type'>): void {
        this.createOne('danger', notification);
    }

    /**
     * Supprime une notification spécifique.
     * @param {Notification} notification - La notification à supprimer.
     */
    remove(notification: Notification) {
        if (!notification) return;

        this.notifications$.next(
            this.notifications$.value.filter(
                item => item.id !== notification.id
            )
        );
    }
}
