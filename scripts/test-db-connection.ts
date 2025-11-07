import prisma from '../prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testConnection() {
  console.log('Testing MongoDB connection...\n');
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✓ Set' : '✗ Not set');
  
  try {
    // Test 1: Basic connection test
    console.log('\n1. Testing basic connection...');
    await prisma.$connect();
    console.log('   ✓ Successfully connected to MongoDB');

    // Test 2: Test query (list databases or collections)
    console.log('\n2. Testing database query...');
    const clinicCount = await prisma.clinics.count();
    console.log(`   ✓ Database query successful`);
    console.log(`   ✓ Found ${clinicCount} clinic(s) in database`);

    // Test 3: Test Providers collection
    const providerCount = await prisma.providers.count();
    console.log(`   ✓ Found ${providerCount} provider(s) in database`);

    console.log('\n✅ All connection tests passed!');
    console.log('   MongoDB connection is working correctly.\n');

  } catch (error) {
    console.error('\n❌ Connection test failed!');
    console.error('Error:', error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('\n💡 Tip: Check your DATABASE_URL in .env file');
        console.error('   Make sure MongoDB is running and accessible');
      } else if (error.message.includes('authentication')) {
        console.error('\n💡 Tip: Check your MongoDB credentials in DATABASE_URL');
      }
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('   Connection closed.');
  }
}

// Run the test
testConnection();

