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

import { MultiModalResponse } from '@kui-shell/core/api/ui-lite'
import { Arguments, Registrar } from '@kui-shell/core/api/commands'

import ok from '../ok'
import respondWith from './as-package'
import standardOptions from '../aliases'
import { kvOptions } from '../key-value'
import { Package } from '../../lib/models/resource'
import { synonyms } from '../../lib/models/synonyms'
import { clientOptions, getClient } from '../../client/get'
import { isHeadless } from '@kui-shell/core/api/capabilities'

/**
 * Create a package
 *
 */
const createPackage = (verb: string, overwrite: boolean) => async ({
  argv,
  execOptions
}: Arguments): Promise<HTMLElement | MultiModalResponse<Package>> => {
  const { kv, argvNoOptions, nameIdx } = kvOptions(argv, verb)
  const name = argvNoOptions[nameIdx]

  const raw = await getClient(execOptions).packages.create(
    Object.assign(
      {
        name,
        overwrite,
        package: {
          name,
          annotations: kv.annotations,
          parameters: kv.parameters
        }
      },
      clientOptions
    )
  )

  if (isHeadless()) {
    return ok(`updated package ${name}`)
  } else {
    return respondWith(raw)
  }
}

export default (registrar: Registrar) => {
  synonyms('packages').forEach(syn => {
    registrar.listen(`/wsk/${syn}/create`, createPackage('create', false), standardOptions)
    registrar.listen(`/wsk/${syn}/update`, createPackage('update', true), standardOptions)
  })
}