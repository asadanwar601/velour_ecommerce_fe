import http from 'node:http';

const routes = [
  '/',
  '/women',
  '/men',
  '/search?q=coat',
  '/product/w-double-breasted-wool-coat',
  '/cart',
  '/checkout',
  '/login',
  '/about',
  '/contact',
  '/privacy',
];

async function checkRoute(path) {
  return new Promise((resolve) => {
    http
      .get(`http://localhost:3000${path}`, (res) => {
        resolve({ path, statusCode: res.statusCode });
      })
      .on('error', (err) => {
        resolve({ path, error: err.message });
      });
  });
}

async function main() {
  console.log('Testing Baveha routes against http://localhost:3000:');
  let allPass = true;
  for (const route of routes) {
    const result = await checkRoute(route);
    if (result.statusCode === 200) {
      console.log(`  [200 OK] ${result.path}`);
    } else {
      console.error(`  [FAIL ${result.statusCode || result.error}] ${result.path}`);
      allPass = false;
    }
  }

  if (allPass) {
    console.log('\nAll routes returned 200 OK successfully!');
    process.exit(0);
  } else {
    console.error('\nSome routes failed.');
    process.exit(1);
  }
}

main();
