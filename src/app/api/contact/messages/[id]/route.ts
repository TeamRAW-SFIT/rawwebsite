import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Types
interface ContactMessage {
  _id: string;
  fullName: string;
  email: string;
  inquiryType: 'general' | 'membership' | 'sponsorship' | 'collaboration';
  message: string;
  timestamp: string;
  status: 'unread' | 'read';
  replied?: boolean;
}

// Data file path
const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Read contacts from file
async function readContacts(): Promise<ContactMessage[]> {
  try {
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write contacts to file
async function writeContacts(contacts: ContactMessage[]) {
  await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}

// GET - Fetch single contact message by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contacts = await readContacts();
    const contact = contacts.find((c) => c._id === id);

    if (!contact) {
      const response = NextResponse.json(
        {
          success: false,
          message: 'Contact message not found',
        },
        { status: 404 }
      );
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }

    const response = NextResponse.json({
      success: true,
      data: contact,
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error fetching contact:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// PATCH - Update contact message (mark as read/replied)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const contacts = await readContacts();

    const contactIndex = contacts.findIndex((c) => c._id === id);

    if (contactIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact message not found',
        },
        { status: 404 }
      );
    }

    // Update only allowed fields
    if (body.status && ['read', 'unread'].includes(body.status)) {
      contacts[contactIndex].status = body.status;
    }

    if (typeof body.replied === 'boolean') {
      contacts[contactIndex].replied = body.replied;
    }

    await writeContacts(contacts);

    const response = NextResponse.json({
      success: true,
      message: 'Contact message updated successfully',
      data: contacts[contactIndex],
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error updating contact:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to update contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}

// DELETE - Delete contact message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contacts = await readContacts();

    const contactIndex = contacts.findIndex((c) => c._id === id);

    if (contactIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact message not found',
        },
        { status: 404 }
      );
    }

    // Remove contact
    contacts.splice(contactIndex, 1);
    await writeContacts(contacts);

    const response = NextResponse.json({
      success: true,
      message: 'Contact message deleted successfully',
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error deleting contact:', error);
    const response = NextResponse.json(
      {
        success: false,
        message: 'Failed to delete contact message',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  }
}
