import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { AbstractBaseClient } from '@core/base/domain/clients/base.interface.client';
import { FilterEvent } from '@core/base/domain/models/filter-event.model';

/**
 * L'interface `<%= classify(name) %>Client` définit les méthodes qui devront être implémentées par les classes qui manipulent les entités <%= classify(name) %> (via mock ou http)
 * C'est notre contrat pour manipuler les entités <%= classify(name) %>.
 * On y rajoutera les méthodes spécifiques à la manipulation des entités <%= classify(name) %>.
 * Les méthodes communes à tous les clients sont déjà définies dans `AbstractBaseClient`.
 */
export interface <%= classify(name) %>Client extends AbstractBaseClient<<%= classify(name) %>, FilterEvent> {}
