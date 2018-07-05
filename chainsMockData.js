exports.nfConfiguration = [
  {
    name: "rule1",
    ethertype: "IPV4",
    protocol: "TCP",
    sourceIp: "198.162.10.10",
    sourcePort: "30",
    destinationIp: "198.162.10.10.10",
    destinationPort: "100",
    ruleAction: "Accept"
  },
  {
    name: "rule2",
    ethertype: "IPV6",
    protocol: "TCP",
    sourceIp: "dead::meat",
    sourcePort: "30",
    destinationIp: "dead::meat",
    destinationPort: "100",
    ttl: "20",
    ruleAction: "Accept"
  },
  {
    name: "rule3",
    ethertype: "IPV4",
    protocol: "UDP",
    sourceIp: "198.162.10.10",
    sourcePort: "30",
    destinationIp: "198.162.10.10.10",
    destinationPort: "100",
    ruleAction: "Accept"
  },
  {
    name: "rule4",
    ethertype: "IPV4",
    protocol: "UDP",
    sourceIp: "198.162.10.10",
    sourcePort: "30",
    destinationIp: "198.162.10.10.10",
    destinationPort: "100",
    ruleAction: "Accept"
  }
];
