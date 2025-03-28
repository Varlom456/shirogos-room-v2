export interface IUniqueRole {
  id: number
  title: string
  type: UniqueRoleType
  cost: number
  isForSale: boolean
}

export interface ICreateUniqueRole {
  title: string
  cost: number
  isForSale: boolean
}

export interface IUpdateUniqueRole extends Omit<ICreateUniqueRole, 'isForSale'> {}

export enum UniqueRoleType {
  'ADJECTIVES' = 'ADJECTIVES',
  'NOUNS' = 'NOUNS'
}
