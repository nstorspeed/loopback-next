// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {config, inject} from '@loopback/context';
import {CoreBindings} from '@loopback/core';
import {ApplicationWithRepositories,} from '@loopback/repository';
import debugFactory from 'debug';
import {BootBindings} from '../keys';
import {ArtifactOptions, booter} from '../types';
import {BaseArtifactBooter} from './base-artifact.booter';

const debug = debugFactory('loopback:boot:model-booter');

/**
 * Booter class for custom configuration of application instance with scripts.
 *
 * @example
 * ```ts
 * // ~/config/services
 * function addServices(app) {
 *   app.bind('user-identity-service').toClass(MyUserIdentityService);
 * }
 *
 * // ~/config/components
 * function addRestExplorer(app) {
 *   app.component(RestExplorerComponent);
 * }
 *
 * ```
 * @param app - Application instance
 * @param projectRoot - Root of User Project relative to which all paths are resolved
 * @param scriptsOption - options to pick scripts from
 */
@booter('config')
export class ConfigurationScriptsBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    public app: ApplicationWithRepositories,
    @inject(BootBindings.PROJECT_ROOT) projectRoot: string,
    @config()
    public scriptsOption: ArtifactOptions = {},
  ) {
    super(
      projectRoot,
      Object.assign({}, ConfigScriptsDefault, scriptsOption),
    );
  }

  async load() {

  }
}

export const ConfigScriptsDefault: ArtifactOptions = {
  dirs: ['config'],
  extensions: ['.config.js'],
  nested: true,
};
