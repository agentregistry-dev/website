---
title: Security Vulnerabilities
weight: 20
---

Review how the agentregistry project handles the lifecycle of Common Vulnerabilities and Exposures (CVEs).

## Reports

The agentregistry project appreciates efforts in discovering and resolving security vulnerabilities. Sources include:

- Team scans for vulnerability detection
- Participation in early disclosure and security workgroups
- User submissions from security scanning tools

**Where to report:** Email [`agentregistry-vulnerability-reports@googlegroups.com`](mailto:agentregistry-vulnerability-reports@googlegroups.com)

**When to send a report:**

- Discovery of a potential security vulnerability in an agentregistry component
- Uncertainty about how a vulnerability affects agentregistry

**Check before sending:**

- Any crash, especially in core components
- Potential Denial of Service (DoS) attacks

**When NOT to send a report:**

- Configuration assistance requests
- Security update application help
- Non-security-related issues
- Base image dependency concerns

## Evaluation

The team evaluates reports for:

- Severity level
- Impact on agentregistry versus backend code
- Third-party dependency considerations

Information remains private during remediation on a need-to-know basis.

## Remediation

CVE fixes involve code updates and component releases. Fixes may occur in private repositories to maintain security until a public release is ready.

## Disclosures

### Public disclosure

Public disclosure involves:

- Merging private repository changes
- Sharing security scan results
- Publishing releases with documentation
- Announcing remediation through public channels

### Early disclosure

Early disclosure is available to members who meet all of the following criteria:

1. **Significant contribution:** Demonstrated meaningful contribution to the agentregistry project
2. **Redistribution justification:** Valid reason for receiving early disclosure information
3. **Email monitoring:** Active monitoring of security communication channels
4. **Security workgroup participation:** Active participation in the security workgroup
5. **Information confidentiality:** Commitment to keeping disclosed information confidential, with notification obligations if confidentiality is breached

### Membership removal

Organizations that cease meeting the above criteria may be removed from the early disclosure distribution list.

### Membership notes

Upstream dependency security groups may involve separate processes with distinct embargo policies.

## Updates and questions

For questions or policy change suggestions, contact [`agentregistry-vulnerability-reports@googlegroups.com`](mailto:agentregistry-vulnerability-reports@googlegroups.com).
