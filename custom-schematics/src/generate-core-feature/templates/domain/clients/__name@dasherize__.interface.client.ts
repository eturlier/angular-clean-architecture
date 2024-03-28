import { <%= classify(name) %> } from '@core/<%= dasherize(name) %>/domain/models/<%= dasherize(name) %>.model';
import { AbstractBaseClient } from '@core/base/domain/clients/base.interface.client';

/**
 * L'interface `<%= classify(name) %>Client` définit les méthodes qui devront être implémentées par les classes qui manipulent les dossiers (via mock ou http)
 * C'est notre contrat pour manipuler les dossiers.
 * On y rajoutera les méthodes spécifiques à la manipulation des dossiers.
 * Les méthodes communes à tous les clients sont déjà définies dans `AbstractBaseClient`.
 */
export interface <%= classify(name) %>Client extends AbstractBaseClient<<%= classify(name) %>> {}
