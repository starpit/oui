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

import { encodeComponent } from '@kui-shell/core/api/repl-util'

import { fqn } from '../controller/fqn'
import { WithActions, hasActions } from '../models/resource'

/**
 * The Annotations mode applies to all Action resources.
 *
 */
export default {
  when: hasActions,
  mode: {
    mode: 'actions',
    label: 'Show Actions',
    kind: 'drilldown' as const,

    command: (_, resource: WithActions) => `wsk package list-actions ${encodeComponent(fqn(resource))}`
  }
}
