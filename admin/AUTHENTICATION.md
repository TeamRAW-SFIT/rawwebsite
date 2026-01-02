# Team RAW Admin - Authentication System

## 🔐 Overview

This admin panel features a **production-ready authentication system** with:
- ✅ **JWT-based authentication** with HTTP-only cookies
- ✅ **Bcrypt password hashing** for security
- ✅ **Route protection** via middleware
- ✅ **Session management** with auto-expiry
- ✅ **Professional login UI** with validation
- ✅ **Backend credential verification**

---

## 🚀 Quick Start

### Login Credentials

```
Email: admin@teamraw.com
Password: admin123
```

### Access Points

- **Login Page**: http://localhost:3001/login
- **Dashboard**: http://localhost:3001/dashboard (protected)

---

## 🏗️ Architecture

### Backend Components

#### 1. Authentication Utilities (`src/lib/auth.ts`)
```typescript
- hashPassword(password)      // Bcrypt hashing
- verifyPassword(password, hash)  // Password verification
- createToken(payload)        // JWT generation
- verifyToken(token)          // JWT validation
- validateAdminCredentials(email, password)  // Login validation
```

#### 2. API Endpoints

**Login**: `POST /api/admin/login`
```json
{
  "email": "admin@teamraw.com",
  "password": "admin123"
}
```

**Verify**: `GET /api/admin/verify`
- Checks if JWT token is valid

**Logout**: `POST /api/admin/logout`
- Clears authentication cookie

#### 3. Middleware (`src/middleware.ts`)
- Intercepts all requests
- Redirects unauthenticated users to login
- Adds cache-control headers to dashboard
- Allows public routes (login, API endpoints)

### Frontend Components

#### 1. AuthContext (`src/context/AuthContext.tsx`)
Global authentication state management:
```typescript
const { admin, isAuthenticated, isLoading, login, logout, verifyAuth } = useAuth();
```

#### 2. ProtectedRoute (`src/components/ProtectedRoute.tsx`)
Wrapper component that:
- Shows loading state during auth verification
- Redirects to login if not authenticated
- Prevents rendering of protected content

#### 3. Enhanced Login UI (`src/app/login/page.tsx`)
Features:
- 📧 Email input with validation
- 🔒 Password input with show/hide toggle
- ⚠️ Inline error messages
- ✅ Form validation (client-side)
- 🔄 Loading spinner during authentication
- ⌨️ Enter key submission
- ♿ Keyboard navigation & ARIA labels

---

## 🔒 Security Features

### 1. Password Security
- Passwords hashed with **bcrypt** (salt rounds: 10)
- Never stored or logged in plain text
- Server-side validation only

### 2. Token Security
- JWT tokens with **24-hour expiry**
- Stored in **HTTP-only cookies** (cannot be accessed via JavaScript)
- `Secure` flag in production (HTTPS only)
- `SameSite: strict` to prevent CSRF attacks

### 3. Route Protection

**Backend (Primary)**:
- Middleware blocks all `/dashboard` requests without valid token
- Returns `401 Unauthorized` for invalid/missing tokens
- Prevents API access without authentication

**Frontend (Secondary)**:
- `ProtectedRoute` wrapper verifies auth on page load
- Redirects to login if session expired
- Shows loading state during verification

### 4. Session Management
- Tokens expire after 24 hours
- Auto-logout on token expiration
- Manual logout clears cookie immediately
- `Cache-Control` headers prevent dashboard caching

---

## 🛠️ Adding New Admin Users

Currently using mock data in `src/lib/auth.ts`:

```typescript
const ADMIN_USERS = [
  {
    email: 'admin@teamraw.com',
    passwordHash: '$2a$10$...', // admin123
    role: 'ADMIN',
    name: 'Admin User',
  },
];
```

### To Add New Users:

1. Generate password hash:
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your_password', 10));"
```

2. Add to `ADMIN_USERS` array in `src/lib/auth.ts`

**For Production**: Replace with database integration (MongoDB, PostgreSQL, etc.)

---

## 🔑 Environment Variables

`.env.local`:
```env
JWT_SECRET=your-secret-key-min-32-chars
NODE_ENV=development
```

⚠️ **Important**: In production, use a strong, randomly generated JWT secret.

---

## 📊 Authentication Flow

### Login Process
```
1. User enters email + password
2. Frontend validates format
3. POST request to /api/admin/login
4. Backend verifies credentials (bcrypt)
5. JWT token generated
6. Token set in HTTP-only cookie
7. User redirected to dashboard
```

### Protected Route Access
```
1. User navigates to /dashboard
2. Middleware intercepts request
3. Checks for admin_token cookie
4. If missing → redirect to /login
5. Frontend ProtectedRoute verifies token via /api/admin/verify
6. If invalid → redirect to /login
7. If valid → render dashboard
```

### Logout Process
```
1. User clicks logout button
2. POST request to /api/admin/logout
3. Server clears admin_token cookie
4. Frontend clears auth state
5. Redirect to /login
```

---

## 🚨 Error Handling

### Login Errors
- **400 Bad Request**: Missing or invalid email format
- **401 Unauthorized**: Wrong credentials
- **500 Server Error**: Backend issue

### Route Protection
- **401 Unauthorized**: Invalid/expired token
- **Automatic redirect** to login with return URL

---

## ♿ Accessibility

- Proper `<label>` tags for all inputs
- ARIA labels for screen readers
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators on all interactive elements
- High contrast text and buttons

---

## 📝 Testing

### Test Login Flow
1. Start dev server: `npm run dev`
2. Navigate to http://localhost:3001/login
3. Enter credentials:
   - Email: `admin@teamraw.com`
   - Password: `admin123`
4. Click "Sign In"
5. Verify redirect to dashboard

### Test Route Protection
1. Try accessing http://localhost:3001/dashboard directly
2. Should redirect to login
3. After login, verify access granted
4. Click logout
5. Verify redirect to login and dashboard inaccessible

### Test Session Expiry
1. Login successfully
2. Manually delete `admin_token` cookie (browser DevTools)
3. Refresh dashboard
4. Should redirect to login

---

## 🔄 Future Enhancements

- [ ] "Forgot Password" flow
- [ ] Two-factor authentication (2FA)
- [ ] Login attempt rate limiting
- [ ] IP-based access logs
- [ ] Role-based permissions (Super Admin, Editor, Viewer)
- [ ] Database integration for user management
- [ ] Email verification for new admins
- [ ] Session timeout warning

---

## 📦 Dependencies

```json
{
  "bcryptjs": "^2.4.3",
  "jose": "^5.x.x",
  "@types/bcryptjs": "^2.4.x"
}
```

---

## 🎯 Best Practices

✅ **DO**:
- Use strong JWT secrets (32+ characters)
- Rotate secrets periodically in production
- Enable HTTPS in production
- Monitor failed login attempts
- Keep dependencies updated

❌ **DON'T**:
- Store JWT in localStorage (XSS vulnerable)
- Log passwords or tokens
- Use default credentials in production
- Disable HTTPS in production
- Share JWT secrets

---

## 📞 Support

For issues or questions, contact the development team.

**Security Issues**: Report privately to security@teamraw.com

---

**Last Updated**: January 2026
**Version**: 1.0.0
