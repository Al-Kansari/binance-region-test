const http = require('http');
const T = [
  ['Binance Spot', 'https://api.binance.com/api/v3/time'],
  ['Binance Futures', 'https://fapi.binance.com/fapi/v1/time'],
];
http.createServer(async (q, r) => {
  const out = [];
  for (const [n, u] of T) {
    try {
      const x = await fetch(u, { signal: AbortSignal.timeout(8000) });
      out.push(n + ': HTTP ' + x.status + (x.ok ? ' PASS' : ' FAIL'));
    } catch (e) { out.push(n + ': ERROR ' + e.message); }
  }
  r.end(out.join('\n'));
}).listen(process.env.PORT || 3000);
