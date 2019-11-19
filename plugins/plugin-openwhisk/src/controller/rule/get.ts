/*
 * Copyright 2019 IBM Corporation
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

import { Arguments, Registrar } from '@kui-shell/core/api/commands'

import { fqn } from '../fqn'
import respondWith from './as-rule'
import standardOptions from '../aliases'
import { clientOptions, getClient } from '../../client/get'
import { synonyms } from '../../lib/models/synonyms'
import { currentSelection } from '../../lib/models/selection'

const doGet = (defaultMode?: string, verb = defaultMode) => async ({ tab, argvNoOptions, execOptions }: Arguments) => {
  const name = argvNoOptions[argvNoOptions.indexOf(verb || 'get') + 1] || fqn(currentSelection(tab))

  return respondWith(
    await getClient(execOptions).rules.get(
      Object.assign(
        {
          name
        },
        clientOptions
      )
    ),
    defaultMode
  )
}

export default (registrar: Registrar) => {
  synonyms('rules').forEach(syn => {
    registrar.listen(`/wsk/${syn}/get`, doGet(), standardOptions)
    registrar.listen(`/wsk/${syn}/raw`, doGet('raw'), standardOptions)
    registrar.listen(`/wsk/${syn}/content`, doGet(undefined, 'content'), standardOptions)
  })
}