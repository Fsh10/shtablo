import type { StructureResolver } from 'sanity/structure'
import { CogIcon } from '@sanity/icons'
import settings from './schemaTypes/settings'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton для Settings
      S.listItem()
        .title(settings.title || 'Settings')
        .icon(CogIcon)
        .child(
          S.editor()
            .id(settings.name)
            .schemaType(settings.name)
            .documentId(settings.name)
            .views([S.view.form()])
        ),
      S.divider(),
      // Остальные документы
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'settings'
      ),
    ])
