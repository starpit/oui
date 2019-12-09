/*
 * Copyright 2018-19 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Registrar } from '@kui-shell/core'
import { Action } from '@kui-shell/plugin-openwhisk'

import { appGet } from '../../utility/usage'
import * as parseUtil from '../../utility/parse'

export default async (commandTree: Registrar) => {
  /* command handler for app get */
  commandTree.listen(
    `/wsk/app/get`,
    ({ argvNoOptions, execOptions, parsedOptions, REPL }) =>
      REPL.qexec<Action>(
        `wsk action get "${parseUtil.parseName(argvNoOptions, 'get')}"`,
        undefined,
        undefined,
        Object.assign({}, execOptions, {
          override: true,
          originalOptions: parsedOptions
        })
      ),
    { usage: appGet('get') }
  )
}
