interface IUserTechnologie {
  _id?: string | undefined,
  name?: string | undefined,
}

interface IUserData {
  id: string,
  name: string,
  email: string,
  isCompany: boolean,
  isAdmin?: boolean | null,
  description?: string | null,
}


export { IUserData };
