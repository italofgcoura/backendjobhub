interface IUserTechnologie {
  _id?: string | undefined,
  name?: string | undefined,
}

interface IUserData {
  name: string,
  email: string,
  isCompany: boolean,
  userId: string,
  userTechnologies?: IUserTechnologie[],
  cnpj?: string,
  address?: {
    street?: string,
    number?: string,
    city?: string,
  },
  isAdmin?: boolean,
  userDescription?: string,
}


export { IUserData };
