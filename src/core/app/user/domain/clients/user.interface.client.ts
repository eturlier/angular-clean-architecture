import { User } from '@core/user/domain/models/user.model';
import { AbstractBaseClient } from '@core/base/domain/clients/base.interface.client';
import { FilterEvent } from '@core/base/domain/models/filter-event.model';

/**
 * L'interface `UserClient` définit les méthodes qui devront être implémentées par les classes qui manipulent les dossiers (via mock ou http)
 * C'est notre contrat pour manipuler les dossiers.
 * On y rajoutera les méthodes spécifiques à la manipulation des dossiers.
 * Les méthodes communes à tous les clients sont déjà définies dans `AbstractBaseClient`.
 */
export interface UserClient extends AbstractBaseClient<User, FilterEvent> {}
