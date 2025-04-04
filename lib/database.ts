const db: {
  messages: any[],
  projects: any[],
  [key: string]: any,
  collection(name: string): {
    add(data: any): Promise<any>,
    getAll(): Promise<any[]>,
    find(query: Record<string, any>): Promise<any[]>,
    get(id: string): Promise<any | null>,
    update(id: string, data: any): Promise<any | null>,
    delete(id: string): Promise<any | null>,
  }
} = {
  messages: [],
  projects: [],

  collection(name: string) {
    if (!this[name]) {
      this[name] = []
    }

    const collectionRef = this[name] // ✅ capture reference to db[name]

    return {
      async add(data: any) {
        const id = Math.random().toString(36).substring(2, 15)
        const document = { id, ...data, createdAt: new Date() }
        collectionRef.push(document)
        return document
      },

      async getAll() {
        return collectionRef
      },

      async find(query: Record<string, any>) {
        return collectionRef.filter((doc: any) =>
          Object.entries(query).every(([key, value]) => doc[key] === value)
        )
      },

      async get(id: string) {
        return collectionRef.find((doc: any) => doc.id === id) || null
      },

      async update(id: string, data: any) {
        const index = collectionRef.findIndex((doc: any) => doc.id === id)
        if (index !== -1) {
          collectionRef[index] = { ...collectionRef[index], ...data, updatedAt: new Date() }
          return collectionRef[index]
        }
        return null
      },

      async delete(id: string) {
        const index = collectionRef.findIndex((doc: any) => doc.id === id)
        if (index !== -1) {
          const deleted = collectionRef[index]
          collectionRef.splice(index, 1)
          return deleted
        }
        return null
      },
    }
  },
}

export { db }

