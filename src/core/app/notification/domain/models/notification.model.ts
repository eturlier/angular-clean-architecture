export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'danger';
    messageKeyTrad: string;
    duration?: number;
    autoDismiss?: boolean;
}
