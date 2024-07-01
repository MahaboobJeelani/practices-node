const dns = require('dns')

// getting IP address of the current localhost
// console.log(dns.getServers());

const option = {
    family: 6,
    hints: dns.ADDRCONFIG | dns.V4MAPPED
}

// dns.lookup('geekyants.com', option, (err, address, family) => {
//     console.log(address, "+++", family);
// })

// dns.lookupService('203.192.246.2', 22, (err, hostname, service) => {
//     console.log(hostname, service, "====");
// })

// dns.lookup('www.geeksforgeeks.org', option, (err, address, family) => {
//     console.log('adress', address, family);
//     if (err) {
//         console.log(err.stack);
//     }
//     dns.lookupService(address, 80, (err, hostname, service) => {
//         if (err) { console.log(err.stack); }
//         console.log(hostname, service);
//     })
// })


// const rrtype = 'A'
// const rrtype = 'MX'
// const rrtype = 'TXT'
const rrtype = 'NS'

dns.resolve('geeksforgeeks.org', rrtype, (err, records) => { console.log("records %j", records); })