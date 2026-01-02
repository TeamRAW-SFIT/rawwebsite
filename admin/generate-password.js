/**
 * Password Hash Generator for Team RAW Admin
 * 
 * Usage: node generate-password.js <password>
 * Example: node generate-password.js mySecurePassword123
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('❌ Error: Please provide a password');
  console.log('Usage: node generate-password.js <password>');
  console.log('Example: node generate-password.js mySecurePassword123');
  process.exit(1);
}

if (password.length < 8) {
  console.warn('⚠️  Warning: Password is less than 8 characters. Consider using a stronger password.');
}

console.log('\n🔐 Generating password hash...\n');

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('✅ Password Hash Generated!\n');
console.log('Password:', password);
console.log('Hash:', hash);
console.log('\n📋 Add this to ADMIN_USERS in src/lib/auth.ts:\n');
console.log('{\n  email: "admin@example.com",');
console.log(`  passwordHash: "${hash}",`);
console.log('  role: "ADMIN",');
console.log('  name: "Admin Name",\n}');
console.log('\n✅ Done!\n');
