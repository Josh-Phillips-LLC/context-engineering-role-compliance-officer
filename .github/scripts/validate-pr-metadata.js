const REQUIRED_KEYS = [
  "Primary-Role:",
  "Reviewed-By-Role:",
  "Executive-Sponsor-Approval:",
];

const ALLOWED_PRIMARY_ROLES = [
  "Executive Sponsor",
  "AI Governance Manager",
  "Compliance Officer",
  "Business Analyst",
  "Implementation Specialist",
  "Systems Architect",
];

const ALLOWED_REVIEWED_BY_ROLES = [
  "Compliance Officer",
  "Executive Sponsor",
  "N/A",
];

const ALLOWED_EXEC_APPROVAL = [
  "Required",
  "Not-Required",
  "Provided",
];

function extractValue(body, key) {
  const line = (body || "")
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith(key));
  if (!line) {
    return "";
  }
  return line.slice(line.indexOf(":") + 1).trim();
}

function validatePullRequestMetadata({ body = "", labels = [] } = {}) {
  const errors = [];

  for (const key of REQUIRED_KEYS) {
    if (!body.includes(key)) {
      errors.push(`Missing required PR metadata key: ${key}`);
    }
  }

  const primaryRole = extractValue(body, "Primary-Role:");
  const reviewedByRole = extractValue(body, "Reviewed-By-Role:");
  const execApproval = extractValue(body, "Executive-Sponsor-Approval:");

  if (!primaryRole) {
    errors.push("Missing required PR metadata value for field: Primary-Role");
  } else if (!ALLOWED_PRIMARY_ROLES.includes(primaryRole)) {
    errors.push(
      `Invalid Primary-Role value: \"${primaryRole}\". Allowed: ${ALLOWED_PRIMARY_ROLES.join(", ")}`
    );
  }

  if (!reviewedByRole) {
    errors.push("Missing required PR metadata value for field: Reviewed-By-Role");
  } else if (!ALLOWED_REVIEWED_BY_ROLES.includes(reviewedByRole)) {
    errors.push(
      `Invalid Reviewed-By-Role value: \"${reviewedByRole}\". Allowed: ${ALLOWED_REVIEWED_BY_ROLES.join(
        ", "
      )}`
    );
  }

  if (!execApproval) {
    errors.push("Missing required PR metadata value for field: Executive-Sponsor-Approval");
  } else if (!ALLOWED_EXEC_APPROVAL.includes(execApproval)) {
    errors.push(
      `Invalid Executive-Sponsor-Approval value: \"${execApproval}\". Allowed: ${ALLOWED_EXEC_APPROVAL.join(
        ", "
      )}`
    );
  }

  const roleLabels = labels.filter((name) => name.startsWith("role:"));
  const statusLabels = labels.filter((name) => name.startsWith("status:"));

  if (roleLabels.length < 1) {
    errors.push("Missing role label: add at least one label with prefix role:");
  }

  if (statusLabels.length !== 1) {
    errors.push(
      `Invalid status labels: expected exactly 1 label with prefix status:, found ${statusLabels.length}`
    );
  }

  return {
    errors,
  };
}

module.exports = {
  validatePullRequestMetadata,
};