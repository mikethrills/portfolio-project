// This is a simplified database connection module for demonstration purposes
// In a real application, you would use a proper database like MongoDB, PostgreSQL, etc.

// Simulated in-memory database
const db = {
  messages: [] as any[],
  projects: [] as any[],

  // Collection methods
  collection(name: string) {
    // Create collection if it doesn't exist
    if (!this[name]) {
      this[name] = []
    }

    return {
      // Add document to collection
      async add(data: any) {
        const id = Math.random().toString(36).substring(2, 15)
        const document = { id, ...data, createdAt: new Date() }
        this[name].push(document)
        return { id, ...document }
      },

      // Get all documents in collection
      async getAll() {
        return this[name]
      },

      // Find documents by query
      async find(query: Record<string, any>) {
        return this[name].filter((doc: any) => {
          return Object.entries(query).every(([key, value]) => doc[key] === value)
        })
      },

      // Get document by ID
      async get(id: string) {
        const doc = this[name].find((doc: any) => doc.id === id)
        return doc || null
      },

      // Update document
      async update(id: string, data: any) {
        const index = this[name].findIndex((doc: any) => doc.id === id)
        if (index !== -1) {
          this[name][index] = { ...this[name][index], ...data, updatedAt: new Date() }
          return this[name][index]
        }
        return null
      },

      // Delete document
      async delete(id: string) {
        const index = this[name].findIndex((doc: any) => doc.id === id)
        if (index !== -1) {
          const deleted = this[name][index]
          this[name].splice(index, 1)
          return deleted
        }
        return null
      },
    }
  },
}

export { db }

