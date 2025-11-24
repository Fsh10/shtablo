import { type DocumentDefinition } from 'sanity'

/**
 * Plugin для работы с singleton документами (например, Settings)
 * Скрывает их из списка создания новых документов и удаляет действия дублирования/удаления
 */
export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Settings)' from new document options
      newDocumentOptions: (prev: any[], { creationContext }: any) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId)
          )
        }
        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Settings)
      actions: (prev: any[], { schemaType }: any) => {
        if (types.includes(schemaType)) {
          return prev.filter(
            ({ action }: any) =>
              !['unpublish', 'delete', 'duplicate'].includes(action)
          )
        }
        return prev
      },
    },
  }
}

