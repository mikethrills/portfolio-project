// Contact form API for Michael Mutie's portfolio
// Handles storing contact form submissions
import { NextResponse } from "next/server"
import type { ContactFormData } from "@/types/contact"

// This would be a real database connection in a production app
// For this demo, we'll simulate storing the data
const messages: ContactFormData[] = []

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json()

    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would store this in a database
    // For this demo, we'll just add it to our in-memory array
    messages.push(data)

    console.log("Received contact message:", data)
    console.log("Total messages:", messages.length)

    // Return success response
    return NextResponse.json({ success: true, message: "Contact message received" }, { status: 200 })
  } catch (error) {
    console.error("Error processing contact form submission:", error)

    return NextResponse.json({ error: "Failed to process contact form submission" }, { status: 500 })
  }
}

// For demonstration purposes, we'll add a GET endpoint to retrieve messages
// In a real app, you would add authentication to protect this endpoint
export async function GET() {
  return NextResponse.json({ messages })
}

